import { useState } from "react";
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
import AccessPage from "../pages/AccessPage";
import FeedbackPage from "../pages/FeedbackPage";

type Page =
  | "home"
  | "level"
  | "subject"
  | "plos"
  | "final-musings"
  | "artifacts"
  | "feedback"
  | "access"
  | "profile";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedSubject, setSelectedSubject] = useState(level1Subjects[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="brand-mark">B</div>
          <div>
            <strong>My Portfolio</strong>
            <span>BukSU College of Medicine</span>
          </div>
        </div>
        <div className="profile-chip">
          <div className="avatar">NAM</div>
          <div>
            <strong>Nour-Aliah N. Macarampat</strong>
            <span>Student portfolio</span>
          </div>
        </div>
        <nav aria-label="Portfolio navigation">
          <NavItem
            label="Home"
            active={page === "home"}
            onClick={() => navigate("home")}
            icon="⌂"
          />
          <NavItem
            label="Level 1"
            active={page === "level"}
            onClick={() => navigate("level")}
            icon="▦"
          />
          <NavItem
            label="Artifacts"
            active={page === "artifacts"}
            onClick={() => navigate("artifacts")}
            icon="▤"
          />
          <NavItem
            label="Reviews & feedback"
            active={page === "feedback"}
            onClick={() => navigate("feedback")}
            icon="◌"
          />
          <NavItem
            label="Instructor access"
            active={page === "access"}
            onClick={() => navigate("access")}
            icon="♧"
          />
        </nav>
        <div className="sidebar-bottom">
          <NavItem
            label="Profile & settings"
            active={page === "profile"}
            onClick={() => navigate("profile")}
            icon="⚙"
          />
          <button className="sign-out">
            Sign out <span>↗</span>
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
            ☰
          </button>
          <div className="breadcrumb">
            <span>Portfolio</span>
            <b>/</b>
            <strong>{pageTitle(page)}</strong>
          </div>
          <div className="topbar-actions">
            <span className="save-status">● All changes saved</span>
            <button className="icon-button" aria-label="Notifications">
              ♢
            </button>
          </div>
        </header>
        <div className="page-wrap">
          {page === "home" && <HomePage onNavigate={navigate} />}
          {page === "plos" && <PLOPage />}
          {page === "final-musings" && <FinalMusingsPage />}
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
            />
          )}
          {page === "artifacts" && <ArtifactsPage />}
          {page === "feedback" && <FeedbackPage />}
          {page === "access" && <AccessPage />}
          {page === "profile" && <ProfilePage />}
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
  icon: string;
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
            <span className="text-button">Open subject page →</span>
          </button>
        ))}
      </div>
      <div className="level-global-grid">
        <button className="global-item" onClick={() => onNavigate("plos")}>
          <span>✦</span>
          <strong>PLO Attainment</strong>
          <small>Document your growth across 11 outcomes</small>
        </button>
        <button className="global-item" onClick={() => onNavigate("final-musings")}>
          <span>✧</span>
          <strong>Final Musings</strong>
          <small>Look back on your Level 1 journey</small>
        </button>
      </div>
    </>
  );
}

function SubjectPage({ subject, onBack }: { subject: Level1Subject; onBack: () => void }) {
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
          ← Back to Level 1 subjects
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
          <button className="secondary-button">Edit subject notes</button>
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
              <span className="text-button">Open section →</span>
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
                  <small>View reflection and required evidence →</small>
                </button>
              ))}
            </div>
            {selectedDomain && (
              <DomainDetail
                name={selectedDomain.name}
                evidence={selectedDomain.evidence}
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
}: {
  folder: AcademicFolder;
  onStartReflection: (question: AcademicQuestion, questionIndex: number) => void;
}) {
  return (
    <section className="academic-detail">
      <div className="detail-heading">
        <div>
          <span className="code-pill">{folder.id}</span>
          <h2>{folder.name}</h2>
          <p>Official CERAE reflection prompts and supporting evidence requirements.</p>
        </div>
        <button
          className="secondary-button"
          onClick={() => folder.questions[0] && onStartReflection(folder.questions[0], 0)}
        >
          Start reflection
        </button>
      </div>
      <div className="question-list">
        {folder.questions.map((question, index) => (
          <article className="question-card" key={question.prompt}>
            <span className="question-number">0{index + 1}</span>
            <div>
              <h3>{question.prompt}</h3>
              {question.evidence && <p className="evidence-note">{question.evidence}</p>}
            </div>
            <button
              className="text-button question-action"
              onClick={() => onStartReflection(question, index)}
            >
              Write response →
            </button>
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
}: {
  name: string;
  evidence: string;
  onStartReflection: (question: AcademicQuestion, questionIndex: number) => void;
}) {
  return (
    <section className="academic-detail">
      <div className="detail-heading">
        <div>
          <span className="code-pill">MED 102 DOMAIN</span>
          <h2>{name}</h2>
          <p>Complete the four official reflection questions for this domain.</p>
        </div>
        <button
          className="secondary-button"
          onClick={() => onStartReflection(med102Questions[0], 0)}
        >
          Start reflection
        </button>
      </div>
      <div className="question-list">
        {med102Questions.map((question, index) => (
          <article className="question-card" key={question.prompt}>
            <span className="question-number">0{index + 1}</span>
            <div>
              <h3>{question.prompt}</h3>
              <p className="evidence-note">{question.evidence}</p>
            </div>
            <button
              className="text-button question-action"
              onClick={() => onStartReflection(question, index)}
            >
              Write response →
            </button>
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

function ProfilePage() {
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">Account</p>
        <h1>Profile & settings</h1>
        <p>Manage your personal information and portfolio preferences.</p>
      </div>
      <div className="settings-card">
        <label>
          Full name
          <input value="Nour-Aliah N. Macarampat" readOnly />
        </label>
        <label>
          Email address
          <input value="juan.santos@buksu.edu.ph" readOnly />
        </label>
        <label>
          Program
          <input value="Doctor of Medicine · Level 1" readOnly />
        </label>
        <button className="primary-button">Edit profile</button>
      </div>
    </>
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
    feedback: "Reviews & feedback",
    access: "Instructor access",
    profile: "Profile & settings",
  }[page];
}

export default App;
