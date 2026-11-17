import { useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  FolderOpen,
  House,
  Layers3,
  LogOut,
  Menu,
  Target,
  UserRound,
  X,
} from "lucide-react";
import HomePage from "../pages/HomePage";
import {
  AcademicFolder,
  AcademicQuestion,
  LearningDomain,
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
import {
  getPortfolioItem,
  initializePortfolioStorage,
  subscribeToPortfolioItem,
  subscribeToPortfolioUpdates,
} from "../services/portfolioStorage";
import collegeOfMedicineLogo from "../assets/college-of-medicine-logo.jpg";

type Page =
  | "home"
  | "level"
  | "subject"
  | "folder"
  | "domains"
  | "domain"
  | "plos"
  | "final-musings"
  | "artifacts"
  | "profile";

const OWNER_DISPLAY_NAME = "Nour-Aliah N. Macarampat";

function isConfiguredPortfolioOwner(session: Session | null) {
  const ownerEmail = import.meta.env.VITE_PORTFOLIO_OWNER_EMAIL?.trim().toLowerCase();
  return Boolean(
    session?.user.email_confirmed_at &&
    ownerEmail &&
    session.user.email?.trim().toLowerCase() === ownerEmail,
  );
}

function getAccountName(session: Session | null) {
  const profileName = session?.user.user_metadata.full_name;
  return typeof profileName === "string" && profileName.trim() && !profileName.includes("@")
    ? profileName.trim()
    : OWNER_DISPLAY_NAME;
}

function formatPortfolioError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const errorFields = error as Record<string, unknown>;
    const message = typeof errorFields.message === "string" ? errorFields.message : "";
    const code = typeof errorFields.code === "string" ? errorFields.code : "";
    if (message) {
      return code ? `${message} (${code})` : message;
    }
  }

  return String(error);
}

function App() {
  const [sessionReady, setSessionReady] = useState(false);
  const [portfolioReady, setPortfolioReady] = useState(false);
  const [portfolioLoadError, setPortfolioLoadError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isPortfolioOwner, setIsPortfolioOwner] = useState(false);
  const [accountEmail, setAccountEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountProgram, setAccountProgram] = useState("Doctor of Medicine · Level 1");
  const [pathname, setPathname] = useState(window.location.pathname);
  const [page, setPage] = useState<Page>("home");
  const [selectedSubject, setSelectedSubject] = useState(level1Subjects[0]);
  const [selectedFolder, setSelectedFolder] = useState<AcademicFolder | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<LearningDomain | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const updateAccount = (session: Session | null) => {
      setAuthenticated(Boolean(session));
      setIsPortfolioOwner(isConfiguredPortfolioOwner(session));
      setAccountEmail(session?.user.email ?? "");
      setAccountName(getAccountName(session));
      setAccountProgram(
        String(session?.user.user_metadata.program ?? "Doctor of Medicine · Level 1"),
      );
    };

    void (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        if (!active) {
          return;
        }

        updateAccount(data.session);
        await initializePortfolioStorage(isConfiguredPortfolioOwner(data.session));
        if (active) {
          setPortfolioLoadError("");
          setPortfolioReady(true);
          setSessionReady(true);
        }
      } catch (loadError: unknown) {
        if (active) {
          console.error("Unable to load shared portfolio data.", loadError);
          setPortfolioLoadError(formatPortfolioError(loadError));
          setPortfolioReady(true);
          setSessionReady(true);
        }
      }
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      updateAccount(session);
      setSessionReady(true);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!portfolioReady || portfolioLoadError) {
      return;
    }

    return subscribeToPortfolioUpdates();
  }, [portfolioLoadError, portfolioReady]);

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  const finishOwnerSignIn = async () => {
    setPortfolioReady(false);
    setPortfolioLoadError("");

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }

      const ownerSession = data.session;
      if (!ownerSession || !isConfiguredPortfolioOwner(ownerSession)) {
        throw new Error("The signed-in account is not configured as the portfolio owner.");
      }

      setAuthenticated(true);
      setIsPortfolioOwner(true);
      setAccountEmail(ownerSession.user.email ?? "");
      setAccountName(getAccountName(ownerSession));
      setAccountProgram(
        String(ownerSession.user.user_metadata.program ?? "Doctor of Medicine · Level 1"),
      );
      await initializePortfolioStorage(true);
      setPortfolioReady(true);
      window.history.replaceState({}, "", "/admin");
      setPathname("/admin");
    } catch (loadError: unknown) {
      console.error("Unable to initialize the owner's shared portfolio.", loadError);
      setPortfolioLoadError(formatPortfolioError(loadError));
      setPortfolioReady(true);
    }
  };

  if (!sessionReady || !portfolioReady)
    return <div className="auth-loading" aria-label="Loading portfolio" />;
  if (portfolioLoadError) {
    return (
      <main className="admin-denied">
        <h1>Portfolio data could not be loaded</h1>
        <p>{portfolioLoadError}</p>
        <p>Check that the Supabase portfolio-sync setup has been applied, then reload this page.</p>
        <button className="primary-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </main>
    );
  }
  if (pathname === "/reset-password") return <ResetPasswordPage />;
  const isAdminRoute = pathname.replace(/\/$/, "") === "/admin";
  const ownerMode = isAdminRoute && authenticated && isPortfolioOwner;
  if (isAdminRoute && !authenticated) {
    return <LoginPage onSignedIn={() => void finishOwnerSignIn()} />;
  }
  if (isAdminRoute && authenticated && !isPortfolioOwner) {
    return (
      <main className="admin-denied">
        <h1>Owner access only</h1>
        <p>This account is not configured as the portfolio owner.</p>
        <a className="primary-button" href="/">
          Return to the public portfolio
        </a>
        <button className="sign-out" onClick={() => void supabase.auth.signOut()}>
          Sign out
        </button>
      </main>
    );
  }

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
          <img
            className="brand-mark"
            src={collegeOfMedicineLogo}
            alt="BukSU College of Medicine seal"
          />
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
          <div className="avatar">{ownerMode ? accountName.slice(0, 3).toUpperCase() : "PUB"}</div>
          <div>
            <strong>{ownerMode ? accountName : "Public portfolio"}</strong>
            <span>{ownerMode ? "Portfolio owner" : "Open to everyone"}</span>
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
            active={
              page === "level" ||
              page === "subject" ||
              page === "folder" ||
              page === "domains" ||
              page === "domain" ||
              page === "plos" ||
              page === "final-musings"
            }
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
        {ownerMode && (
          <div className="sidebar-bottom">
            <NavItem
              label="Profile & settings"
              active={page === "profile"}
              onClick={() => navigate("profile")}
              icon={<UserRound size={18} aria-hidden="true" />}
            />
            <button
              className="sign-out"
              onClick={() => {
                void supabase.auth.signOut();
                window.history.replaceState({}, "", "/");
                setPathname("/");
              }}
            >
              Sign out <LogOut size={16} aria-hidden="true" />
            </button>
          </div>
        )}
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
        </header>
        <div className={`page-wrap ${ownerMode ? "" : "read-only-portfolio"}`}>
          {page === "home" && <HomePage readOnly={!ownerMode} />}
          {page === "plos" && <PLOPage readOnly={!ownerMode} onBack={() => navigate("level")} />}
          {page === "final-musings" && (
            <FinalMusingsPage readOnly={!ownerMode} onBack={() => navigate("level")} />
          )}
          {page === "level" && (
            <LevelPage
              onSelectSubject={(subject) => {
                setSelectedSubject(subject);
                setSelectedFolder(null);
                setSelectedDomain(null);
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
              onOpenFolder={(folder) => {
                setSelectedFolder(folder);
                navigate(selectedSubject.domains ? "domains" : "folder");
              }}
            />
          )}
          {page === "domains" && selectedSubject.domains && selectedFolder && (
            <DomainListPage
              subject={selectedSubject}
              folder={selectedFolder}
              onBack={() => navigate("subject")}
              onOpenDomain={(domain) => {
                setSelectedDomain(domain);
                navigate("domain");
              }}
            />
          )}
          {page === "domain" && selectedDomain && (
            <DomainPage
              key={selectedDomain.id}
              domain={selectedDomain}
              onBack={() => navigate("domains")}
              readOnly={!ownerMode}
            />
          )}
          {page === "folder" && selectedFolder && (
            <FolderPage
              subject={selectedSubject}
              folder={selectedFolder}
              onBack={() => navigate("subject")}
              readOnly={!ownerMode}
            />
          )}
          {page === "artifacts" && <ArtifactsPage readOnly={!ownerMode} />}
          {page === "profile" && ownerMode && (
            <ProfilePage
              name={accountName}
              email={accountEmail}
              program={accountProgram}
              onProfileUpdated={(name, program) => {
                setAccountName(name);
                setAccountProgram(program);
              }}
            />
          )}
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
            <span className="text-button">
              {subject.domains ? "Open learning domains" : "Open subject page"}{" "}
              <ArrowRight size={14} aria-hidden="true" />
            </span>
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

function SubjectPage({
  subject,
  onBack,
  onOpenFolder,
}: {
  subject: Level1Subject;
  onBack: () => void;
  onOpenFolder: (folder: AcademicFolder) => void;
}) {
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
        </div>
        <div className="folder-grid">
          {subject.folders.map((folder, index) => (
            <button
              className="folder-card folder-card-button"
              key={folder.id}
              onClick={() => onOpenFolder(folder)}
            >
              <span className="folder-number">0{index + 1}</span>
              <h3>{folder.name}</h3>
              <p>{folder.description}</p>
              <span className="text-button">
                {subject.domains ? "Open domains" : "Open section"}{" "}
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function DomainListPage({
  subject,
  folder,
  onBack,
  onOpenDomain,
}: {
  subject: Level1Subject;
  folder: AcademicFolder;
  onBack: () => void;
  onOpenDomain: (domain: LearningDomain) => void;
}) {
  const domains = subject.domains ?? [];

  return (
    <>
      <div className="page-intro">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to {subject.code}
        </button>
        <p className="eyebrow">Level 1 subject</p>
        <h1>{subject.code}</h1>
        <p>Explore the learning domains available through {folder.name}.</p>
      </div>
      <section className="domain-section">
        <div className="detail-heading">
          <div>
            <span className="code-pill">INDIVIDUAL DOMAINS</span>
            <h2>MED 102 learning domains</h2>
            <p>Each domain contains its own official reflection questions and evidence guidance.</p>
          </div>
        </div>
        <div className="domain-list">
          {domains.map((domain) => (
            <button className="domain-item" key={domain.id} onClick={() => onOpenDomain(domain)}>
              <strong>{domain.name}</strong>
              <small>
                View reflection and required evidence <ArrowRight size={13} aria-hidden="true" />
              </small>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function DomainPage({
  domain,
  onBack,
  readOnly,
}: {
  domain: LearningDomain;
  onBack: () => void;
  readOnly: boolean;
}) {
  const [reflectionTarget, setReflectionTarget] = useState<{
    context: string;
    question: AcademicQuestion;
    questionIndex: number;
  } | null>(null);
  const context = `MED 102 - ${domain.name}`;

  if (reflectionTarget) {
    return (
      <ReflectionEditor
        context={reflectionTarget.context}
        question={reflectionTarget.question}
        questionIndex={reflectionTarget.questionIndex}
        onClose={() => setReflectionTarget(null)}
      />
    );
  }

  return (
    <>
      <div className="page-intro">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to MED 102 learning domains
        </button>
        <p className="eyebrow">MED 102 · Learning domain</p>
        <p>Write and save reflections for this domain.</p>
      </div>
      <DomainDetail
        name={domain.name}
        context={context}
        evidence={domain.evidence}
        readOnly={readOnly}
        onStartReflection={(question, questionIndex) =>
          setReflectionTarget({ context, question, questionIndex })
        }
      />
    </>
  );
}

function FolderPage({
  subject,
  folder,
  onBack,
  readOnly,
}: {
  subject: Level1Subject;
  folder: AcademicFolder;
  onBack: () => void;
  readOnly: boolean;
}) {
  const [reflectionTarget, setReflectionTarget] = useState<{
    context: string;
    question: AcademicQuestion;
    questionIndex: number;
  } | null>(null);
  const context = `${subject.code} - ${folder.name}`;

  if (reflectionTarget) {
    return (
      <ReflectionEditor
        context={reflectionTarget.context}
        question={reflectionTarget.question}
        questionIndex={reflectionTarget.questionIndex}
        onClose={() => setReflectionTarget(null)}
      />
    );
  }

  return (
    <>
      <div className="page-intro">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to {subject.code}
        </button>
        <p className="eyebrow">{subject.code} · Bimonthly section</p>
        <p>Write and save reflections for this section.</p>
      </div>
      <FolderDetail
        folder={folder}
        context={context}
        readOnly={readOnly}
        onStartReflection={(question, questionIndex) =>
          setReflectionTarget({ context, question, questionIndex })
        }
      />
    </>
  );
}

function FolderDetail({
  folder,
  context,
  onStartReflection,
  readOnly,
}: {
  folder: AcademicFolder;
  context: string;
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
      </div>
      <div className="question-list">
        {folder.questions.map((question, index) => (
          <article className="question-card" key={question.prompt}>
            <span className="question-number">0{index + 1}</span>
            <div>
              <h3>{question.prompt}</h3>
              {question.evidence && <p className="evidence-note">{question.evidence}</p>}
              <SavedReflection context={context} questionIndex={index} />
            </div>
            {!readOnly && (
              <button
                className="text-button question-action"
                onClick={() => onStartReflection(question, index)}
              >
                Write response <ArrowRight size={14} aria-hidden="true" />
              </button>
            )}
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
  context,
  evidence,
  onStartReflection,
  readOnly,
}: {
  name: string;
  context: string;
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
      </div>
      <div className="question-list">
        {med102Questions.map((question, index) => (
          <article className="question-card" key={question.prompt}>
            <span className="question-number">0{index + 1}</span>
            <div>
              <h3>{question.prompt}</h3>
              <p className="evidence-note">{question.evidence}</p>
              <SavedReflection context={context} questionIndex={index} />
            </div>
            {!readOnly && (
              <button
                className="text-button question-action"
                onClick={() => onStartReflection(question, index)}
              >
                Write response <ArrowRight size={14} aria-hidden="true" />
              </button>
            )}
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

function SavedReflection({ context, questionIndex }: { context: string; questionIndex: number }) {
  const key = `buksu-reflection-${context}-${questionIndex}`;
  const readResponse = () => {
    const savedResponse = getPortfolioItem(key);
    if (!savedResponse) {
      return "";
    }

    try {
      const reflection = JSON.parse(savedResponse) as { response?: string };
      return reflection.response?.trim() ?? "";
    } catch (error) {
      console.error("Unable to read a saved public reflection.", error);
      return "";
    }
  };
  const [response, setResponse] = useState(readResponse);

  useEffect(
    () =>
      subscribeToPortfolioItem(key, (savedResponse) => {
        try {
          const reflection = JSON.parse(savedResponse) as { response?: string };
          setResponse(reflection.response?.trim() ?? "");
        } catch (error) {
          console.error("Unable to read a saved public reflection.", error);
          setResponse("");
        }
      }),
    [key],
  );

  if (!response) {
    return null;
  }

  return (
    <div className="readonly-evidence question-reflection">
      <strong>Student reflection</strong>
      <p>{response}</p>
    </div>
  );
}

function pageTitle(page: Page) {
  return {
    home: "Home",
    level: "Level 1",
    subject: "Subject",
    folder: "Bimonthly reflections",
    domains: "MED 102 learning domains",
    domain: "MED 102 domain",
    plos: "PLO Attainment",
    "final-musings": "Final Musings",
    artifacts: "Artifacts",
    profile: "Profile & settings",
  }[page];
}

export default App;
