import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Bell, BookOpenText, FolderOpen, House, Layers3, LogOut, Menu, Target, UserRound, X } from "lucide-react";
import HomePage from "../pages/HomePage";
import {
  AcademicFolder,
  AcademicQuestion,
  Level1Subject,
  level1Subjects,
  med102Questions,
} from "../data/level1Content";
import ReflectionEditor from "../pages/ReflectionEditor";
import ArtifactsPage from "../pages/ArtifactsPage";
import PLOPage from "../pages/PLOPage";
import FinalMusingsPage from "../pages/FinalMusingsPage";
import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ProfilePage from "../pages/ProfilePage";
import { supabase } from "../services/supabase";
import collegeOfMedicineLogo from "../assets/college-of-medicine-logo.jpg";

type Page =
  | "home"
  | "level"
  | "subject"
  | "plos"
  | "final-musings"
  | "artifacts"
  | "profile";

function App() {
  const [sessionReady, setSessionReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isPortfolioOwner, setIsPortfolioOwner] = useState(false);
  const [accountEmail, setAccountEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountProgram, setAccountProgram] = useState("Doctor of Medicine · Level 1");
  const [page, setPage] = useState<Page>("home");
  const [selectedSubject, setSelectedSubject] = useState(level1Subjects[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setAuthenticated(Boolean(data.session));
        setIsPortfolioOwner(Boolean(
          data.session?.user.email_confirmed_at &&
          data.session.user.email?.trim().toLowerCase() === import.meta.env.VITE_PORTFOLIO_OWNER_EMAIL?.trim().toLowerCase(),
        ));
        setAccountEmail(data.session?.user.email ?? "");
        setAccountName(String(data.session?.user.user_metadata.full_name ?? data.session?.user.email ?? "My portfolio"));
        setAccountProgram(String(data.session?.user.user_metadata.program ?? "Doctor of Medicine · Level 1"));
        setSessionReady(true);
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(Boolean(session));
      setIsPortfolioOwner(Boolean(
        session?.user.email_confirmed_at &&
        session.user.email?.trim().toLowerCase() === import.meta.env.VITE_PORTFOLIO_OWNER_EMAIL?.trim().toLowerCase(),
      ));
      setAccountEmail(session?.user.email ?? "");
      setAccountName(String(session?.user.user_metadata.full_name ?? session?.user.email ?? "My portfolio"));
      setAccountProgram(String(session?.user.user_metadata.program ?? "Doctor of Medicine · Level 1"));
      setSessionReady(true);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (!sessionReady) return <div className="auth-loading" aria-label="Loading portfolio" />;
  if (window.location.pathname === "/reset-password") return <ResetPasswordPage />;
  if (!authenticated) return <LoginPage />;

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <button
        className={`mobile-overlay ${mobileMenuOpen ? "visible" : ""}`}
        aria-label="Close navigation menu"
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside className={`sidebar ${mobileMenuOpen ? "open" : ""}`}>
        <div className="brand">
          <img className="brand-mark" src={collegeOfMedicineLogo} alt="BukSU College of Medicine seal" />
          <div>
            <strong>My Portfolio</strong>
            <span>BukSU College of Medicine</span>
          </div>
        </div>
        <button
          type="button"
          className="profile-chip profile-home-link"
          onClick={() => navigate("home")}
          aria-label="Go to portfolio home"
        >
          <div className="avatar">{accountName.slice(0, 3).toUpperCase()}</div>
          <div>
            <strong>{isPortfolioOwner ? accountName : "Portfolio viewer"}</strong>
            <span>{accountEmail}</span>
          </div>
        </button>
        <nav aria-label="Portfolio navigation">
          <NavItem
            label="Home"
            active={page === "home"}
            onClick={() => navigate("home")}
            icon={<House size={18} aria-hidden="true" />}
          />
          <NavItem
            label="Level 1"
            active={page === "level" || page === "subject" || page === "plos" || page === "final-musings"}
            onClick={() => navigate("level")}
            icon={<Layers3 size={18} aria-hidden="true" />}
          />
          <NavItem
            label="Artifacts"
            active={page === "artifacts"}
            onClick={() => navigate("artifacts")}
            icon={<FolderOpen size={18} aria-hidden="true" />}
          />
        </nav>
        <div className="sidebar-bottom">
          <NavItem
            label="Profile & settings"
            active={page === "profile"}
            onClick={() => navigate("profile")}
            icon={<UserRound size={18} aria-hidden="true" />}
          />
          <button className="sign-out" onClick={() => void supabase.auth.signOut()}>
            Sign out <LogOut size={16} aria-hidden="true" />
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="breadcrumb">
            <span>Portfolio</span>
            <b>/</b>
            <strong>{pageTitle(page)}</strong>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Notifications"><Bell size={18} aria-hidden="true" /></button>
          </div>
        </header>
        <div className={`page-wrap ${isPortfolioOwner ? "" : "read-only-portfolio"}`}>
          {page === "home" && <HomePage readOnly={!isPortfolioOwner} />}
          {page === "plos" && <PLOPage readOnly={!isPortfolioOwner} onBack={() => navigate("level")} />}
          {page === "final-musings" && <FinalMusingsPage readOnly={!isPortfolioOwner} onBack={() => navigate("level")} />}
          {page === "level" && (
            <LevelPage
              onSelectSubject={(subject) => {
                setSelectedSubject(subject);
                navigate("subject");
              }}
              onNavigate={navigate}
            />
          )}
          {page === "subject" && (
            <SubjectPage
              key={selectedSubject.code}
              subject={selectedSubject}
              onBack={() => navigate("level")}
              readOnly={!isPortfolioOwner}
            />
          )}
          {page === "artifacts" && <ArtifactsPage readOnly={!isPortfolioOwner} />}
          {page === "profile" && <ProfilePage
            name={accountName}
            email={accountEmail}
            program={accountProgram}
            onProfileUpdated={(name, program) => {
              setAccountName(name);
              setAccountProgram(program);
            }}
          />}
        </div>
      </main>
    </div>
  );
}

function NavItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      <span className="nav-icon">{icon}</span>
      {label}
    </button>
  );
}

function LevelPage({
  onSelectSubject,
  onNavigate,
}: {
  onSelectSubject: (subject: Level1Subject) => void;
  onNavigate: (page: Page) => void;
}) {
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">Academic journey</p>
        <h1>Level 1</h1>
        <p>Select a subject to open its dedicated portfolio page.</p>
      </div>
      <div className="level-subject-grid">
        {level1Subjects.map((subject) => (
          <button
            key={subject.code}
            className="level-subject-card"
            onClick={() => onSelectSubject(subject)}
          >
            <span className="code-pill">{subject.code}</span>
            <h2>{subject.name}</h2>
            <p>{subject.progress}</p>
            <span className="text-button">Open subject page <ArrowRight size={14} aria-hidden="true" /></span>
          </button>
        ))}
      </div>
      <div className="level-global-grid">
        <button className="global-item" onClick={() => onNavigate("plos")}>
          <Target size={20} aria-hidden="true" />
          <strong>PLO Attainment</strong>
          <small>Document your growth across 11 outcomes</small>
        </button>
        <button className="global-item" onClick={() => onNavigate("final-musings")}>
          <BookOpenText size={20} aria-hidden="true" />
          <strong>Final Musings</strong>
          <small>Look back on your Level 1 journey</small>
        </button>
      </div>
    </>
  );
}

function SubjectPage({ subject, onBack, readOnly }: { subject: Level1Subject; onBack: () => void; readOnly: boolean }) {
  const [selectedFolderId, setSelectedFolderId] = useState(subject.folders[0].id);
  const [selectedDomainId, setSelectedDomainId] = useState(subject.domains?.[0]?.id);
  const [reflectionTarget, setReflectionTarget] = useState<{
    context: string;
    question: AcademicQuestion;
    questionIndex: number;
  } | null>(null);
  const selectedFolder =
    subject.folders.find((folder) => folder.id === selectedFolderId) ?? subject.folders[0];
  const selectedDomain = subject.domains?.find((domain) => domain.id === selectedDomainId);

  return (
    <>
      <div className="page-intro">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to Level 1 subjects
        </button>
        <p className="eyebrow">Level 1 subject</p>
        <h1>{subject.code}</h1>
        <p>Explore this subject's learning experiences, reflections, and evidence.</p>
      </div>
      <section className="subject-detail subject-page-detail">
        <div className="detail-heading">
          <div>
            <span className="code-pill">{subject.code}</span>
            <h2>{subject.name}</h2>
            <p>{subject.progress}</p>
          </div>
          {!readOnly && <button className="secondary-button">Edit subject notes</button>}
        </div>
        <div className="folder-grid">
          {subject.folders.map((folder, index) => (
            <button
              className={`folder-card folder-card-button ${
                selectedFolder.id === folder.id ? "selected" : ""
              }`}
              key={folder.id}
              onClick={() => setSelectedFolderId(folder.id)}
            >
              <span className="folder-number">0{index + 1}</span>
              <h3>{folder.name}</h3>
              <p>{folder.description}</p>
              <span className="text-button">Open section <ArrowRight size={14} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
        {subject.domains && (
          <section className="domain-section">
            <div className="detail-heading">
              <div>
                <span className="code-pill">INDIVIDUAL DOMAINS</span>
                <h2>MED 102 learning domains</h2>
                <p>
                  Each domain remains independently accessible with the same four official
                  questions.
                </p>
              </div>
            </div>
            <div className="domain-list">
              {subject.domains.map((domain) => (
                <button
                  className={`domain-item ${selectedDomain?.id === domain.id ? "selected" : ""}`}
                  key={domain.id}
                  onClick={() => setSelectedDomainId(domain.id)}
                >
                  <strong>{domain.name}</strong>
                  <small>View reflection and required evidence <ArrowRight size={13} aria-hidden="true" /></small>
                </button>
              ))}
            </div>
            {selectedDomain && (
              <DomainDetail
                name={selectedDomain.name}
                evidence={selectedDomain.evidence}
                readOnly={readOnly}
                onStartReflection={(question, questionIndex) =>
                  setReflectionTarget({
                    context: `MED 102 - ${selectedDomain.name}`,
                    question,
                    questionIndex,
                  })
                }
              />
            )}
          </section>
        )}
        {subject.code !== "MED 102" && (
          <FolderDetail
            folder={selectedFolder}
            readOnly={readOnly}
            onStartReflection={(question, questionIndex) =>
              setReflectionTarget({
                context: `${subject.code} - ${selectedFolder.name}`,
                question,
                questionIndex,
              })
            }
          />
        )}
        {reflectionTarget && (
          <ReflectionEditor
            context={reflectionTarget.context}
            question={reflectionTarget.question}
            questionIndex={reflectionTarget.questionIndex}
            onClose={() => setReflectionTarget(null)}
          />
        )}
      </section>
    </>
  );
}

function FolderDetail({
  folder,
  onStartReflection,
  readOnly,
}: {
  folder: AcademicFolder;
  onStartReflection: (question: AcademicQuestion, questionIndex: number) => void;
  readOnly: boolean;
}) {
  return (
    <section className="academic-detail">
      <div className="detail-heading">
        <div>
          <span className="code-pill">{folder.id}</span>
          <h2>{folder.name}</h2>
          <p>Official CERAE reflection prompts and supporting evidence requirements.</p>
        </div>
        {!readOnly && <button
          className="secondary-button"
          onClick={() => folder.questions[0] && onStartReflection(folder.questions[0], 0)}
        >
          Start reflection
        </button>}
      </div>
      <div className="question-list">
        {folder.questions.map((question, index) => (
          <article className="question-card" key={question.prompt}>
            <span className="question-number">0{index + 1}</span>
            <div>
              <h3>{question.prompt}</h3>
              {question.evidence && <p className="evidence-note">{question.evidence}</p>}
            </div>
            {!readOnly && <button
              className="text-button question-action"
              onClick={() => onStartReflection(question, index)}
            >
              Write response <ArrowRight size={14} aria-hidden="true" />
            </button>}
          </article>
        ))}
      </div>
      <div className="evidence-panel">
        <strong>Required supporting evidence</strong>
        {folder.evidence.length > 0 ? (
          <ul>
            {folder.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No separate artifact instruction is stated for this section.</p>
        )}
      </div>
    </section>
  );
}

function DomainDetail({
  name,
  evidence,
  onStartReflection,
  readOnly,
}: {
  name: string;
  evidence: string;
  onStartReflection: (question: AcademicQuestion, questionIndex: number) => void;
  readOnly: boolean;
}) {
  return (
    <section className="academic-detail">
      <div className="detail-heading">
        <div>
          <span className="code-pill">MED 102 DOMAIN</span>
          <h2>{name}</h2>
          <p>Complete the four official reflection questions for this domain.</p>
        </div>
        {!readOnly && <button
          className="secondary-button"
          onClick={() => onStartReflection(med102Questions[0], 0)}
        >
          Start reflection
        </button>}
      </div>
      <div className="question-list">
        {med102Questions.map((question, index) => (
          <article className="question-card" key={question.prompt}>
            <span className="question-number">0{index + 1}</span>
            <div>
              <h3>{question.prompt}</h3>
              <p className="evidence-note">{question.evidence}</p>
            </div>
            {!readOnly && <button
              className="text-button question-action"
              onClick={() => onStartReflection(question, index)}
            >
              Write response <ArrowRight size={14} aria-hidden="true" />
            </button>}
          </article>
        ))}
      </div>
      <div className="evidence-panel">
        <strong>Required supporting evidence</strong>
        <p>{evidence}</p>
      </div>
    </section>
  );
}

function pageTitle(page: Page) {
  return {
    home: "Home",
    level: "Level 1",
    subject: "Subject",
    plos: "PLO Attainment",
    "final-musings": "Final Musings",
    artifacts: "Artifacts",
    profile: "Profile & settings",
  }[page];
}

export default App;


