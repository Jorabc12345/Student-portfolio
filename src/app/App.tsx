import { useEffect, useState, type FormEvent, type ReactNode } from "react";
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
  MoreHorizontal,
  Pencil,
  Plus,
  Target,
  Trash2,
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
  deletePortfolioItems,
  getPortfolioItem,
  initializePortfolioStorage,
  setPortfolioItem,
  subscribeToPortfolioItem,
  subscribeToPortfolioUpdates,
} from "../services/portfolioStorage";
import { getPortfolioPortraitUrl } from "../services/portfolioPortrait";
import collegeOfMedicineLogo from "../assets/college-of-medicine-logo.jpg";
import { useConfirmationDialog } from "../components/useConfirmationDialog";

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
const HOME_PAGE_STORAGE_KEY = "buksu-student-home-page";
const CUSTOM_DOMAIN_STORAGE_KEYS = {
  "MED 102": "buksu-med102-custom-domains",
  "MED 103": "buksu-med103-custom-domains",
} as const;

type CustomDomainSubjectCode = keyof typeof CUSTOM_DOMAIN_STORAGE_KEYS;
type CustomDomain = LearningDomain & {
  isCustom: true;
  questions: AcademicQuestion[];
};

function isCustomDomainSubjectCode(value: string): value is CustomDomainSubjectCode {
  return value === "MED 102" || value === "MED 103";
}

function getCustomDomainContext(subjectCode: CustomDomainSubjectCode, domainId: string) {
  return `${subjectCode} custom domain ${domainId}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCustomDomain(
  value: unknown,
  subjectCode: CustomDomainSubjectCode,
): value is CustomDomain {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    value.id.startsWith(`${subjectCode.replace(/\s+/g, "")}-CUSTOM-`) &&
    typeof value.name === "string" &&
    typeof value.evidence === "string" &&
    (value.description === undefined || typeof value.description === "string") &&
    value.isCustom === true &&
    Array.isArray(value.questions) &&
    value.questions.every(
      (question) =>
        isRecord(question) &&
        typeof question.prompt === "string" &&
        (question.evidence === undefined || typeof question.evidence === "string") &&
        (question.reflectionId === undefined ||
          (typeof question.reflectionId === "string" && question.reflectionId.length > 0)),
    )
  );
}

function parseCustomDomains(value: string, subjectCode: CustomDomainSubjectCode): CustomDomain[] {
  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed) || !parsed.every((domain) => isCustomDomain(domain, subjectCode))) {
    throw new Error(`The saved custom ${subjectCode} domains have an invalid format.`);
  }
  const normalizedDomains = parsed.map((domain) => ({
    ...domain,
    questions: domain.questions.map((question, index) => ({
      ...question,
      reflectionId: question.reflectionId ?? String(index),
    })),
  }));
  if (
    normalizedDomains.some(
      (domain) =>
        new Set(domain.questions.map((question) => question.reflectionId)).size !==
        domain.questions.length,
    )
  ) {
    throw new Error(
      `The saved custom ${subjectCode} questions have duplicate reflection identifiers.`,
    );
  }
  return normalizedDomains;
}

function getSidebarPortraitUrl() {
  const savedContent = getPortfolioItem(HOME_PAGE_STORAGE_KEY);
  if (!savedContent) {
    return "";
  }

  try {
    const content = JSON.parse(savedContent) as {
      portraitUrl?: unknown;
      portraitDataUrl?: unknown;
    };
    const savedPortrait =
      typeof content.portraitUrl === "string"
        ? content.portraitUrl
        : typeof content.portraitDataUrl === "string"
          ? content.portraitDataUrl
          : "";

    if (!savedPortrait) {
      return "";
    }

    return savedPortrait.startsWith("data:") ? savedPortrait : getPortfolioPortraitUrl();
  } catch (error) {
    console.error("Unable to read the portfolio profile portrait.", error);
    return "";
  }
}

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
  const [sidebarPortraitUrl, setSidebarPortraitUrl] = useState("");
  const [pathname, setPathname] = useState(window.location.pathname);
  const [page, setPage] = useState<Page>("home");
  const [selectedSubject, setSelectedSubject] = useState(level1Subjects[0]);
  const [selectedFolder, setSelectedFolder] = useState<AcademicFolder | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<LearningDomain | null>(null);
  const [customDomainsBySubject, setCustomDomainsBySubject] = useState<
    Record<CustomDomainSubjectCode, CustomDomain[]>
  >({ "MED 102": [], "MED 103": [] });
  const [customDomainErrors, setCustomDomainErrors] = useState<
    Record<CustomDomainSubjectCode, string>
  >({ "MED 102": "", "MED 103": "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { requestConfirmation, confirmationDialog } = useConfirmationDialog();

  const setSubjectCustomDomains = (
    subjectCode: CustomDomainSubjectCode,
    domains: CustomDomain[],
  ) => {
    setCustomDomainsBySubject((current) => ({ ...current, [subjectCode]: domains }));
  };
  const setSubjectCustomDomainError = (subjectCode: CustomDomainSubjectCode, error: string) => {
    setCustomDomainErrors((current) => ({ ...current, [subjectCode]: error }));
  };

  useEffect(() => {
    if (!portfolioReady || portfolioLoadError) {
      return;
    }

    setSidebarPortraitUrl(getSidebarPortraitUrl());
    return subscribeToPortfolioItem(HOME_PAGE_STORAGE_KEY, () => {
      setSidebarPortraitUrl(getSidebarPortraitUrl());
    });
  }, [portfolioLoadError, portfolioReady]);

  useEffect(() => {
    if (!portfolioReady || portfolioLoadError) {
      return;
    }

    const subscriptions = (
      Object.keys(CUSTOM_DOMAIN_STORAGE_KEYS) as CustomDomainSubjectCode[]
    ).map((subjectCode) => {
      const key = CUSTOM_DOMAIN_STORAGE_KEYS[subjectCode];
      const syncCustomDomains = (savedValue = getPortfolioItem(key)) => {
        if (!savedValue) {
          setSubjectCustomDomains(subjectCode, []);
          setSubjectCustomDomainError(subjectCode, "");
          return;
        }

        try {
          setSubjectCustomDomains(subjectCode, parseCustomDomains(savedValue, subjectCode));
          setSubjectCustomDomainError(subjectCode, "");
        } catch (loadError: unknown) {
          console.error(`Unable to read custom ${subjectCode} domains.`, loadError);
          setSubjectCustomDomainError(
            subjectCode,
            `Custom ${subjectCode} domains could not be loaded. ${
              loadError instanceof Error ? loadError.message : String(loadError)
            }`,
          );
        }
      };

      syncCustomDomains();
      return subscribeToPortfolioItem(key, syncCustomDomains);
    });
    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, [portfolioLoadError, portfolioReady]);

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

  const saveCustomDomains = async (
    subjectCode: CustomDomainSubjectCode,
    domains: CustomDomain[],
  ) => {
    await setPortfolioItem(CUSTOM_DOMAIN_STORAGE_KEYS[subjectCode], JSON.stringify(domains));
    setSubjectCustomDomains(subjectCode, domains);
  };

  const addCustomDomain = async (
    subjectCode: CustomDomainSubjectCode,
    name: string,
    description: string,
  ) => {
    const normalizedName = name.trim().toLocaleLowerCase();
    const builtInDomains =
      level1Subjects.find((subject) => subject.code === subjectCode)?.domains ?? [];
    const customDomains = customDomainsBySubject[subjectCode];
    if (
      [...builtInDomains, ...customDomains].some(
        (domain) => domain.name.trim().toLocaleLowerCase() === normalizedName,
      )
    ) {
      throw new Error(`A ${subjectCode} domain with that name already exists.`);
    }

    const nextDomain: CustomDomain = {
      id: `${subjectCode.replace(/\s+/g, "")}-CUSTOM-${crypto.randomUUID()}`,
      name: name.trim(),
      description:
        description.trim() || `Explore learning and reflection related to ${name.trim()}.`,
      evidence: "",
      isCustom: true,
      questions: [],
    };
    await saveCustomDomains(subjectCode, [...customDomains, nextDomain]);
  };

  const addCustomDomainQuestion = async (
    subjectCode: CustomDomainSubjectCode,
    domainId: string,
    prompt: string,
  ) => {
    const customDomains = customDomainsBySubject[subjectCode];
    const nextDomains = customDomains.map((domain) =>
      domain.id === domainId
        ? {
            ...domain,
            questions: [
              ...domain.questions,
              { prompt: prompt.trim(), reflectionId: crypto.randomUUID() },
            ],
          }
        : domain,
    );
    const updatedDomain = nextDomains.find((domain) => domain.id === domainId);
    if (!updatedDomain) {
      throw new Error(`This custom ${subjectCode} domain could not be found.`);
    }

    await saveCustomDomains(subjectCode, nextDomains);
    setSelectedDomain((current) => (current?.id === domainId ? updatedDomain : current));
  };

  const updateCustomDomainQuestion = async (
    subjectCode: CustomDomainSubjectCode,
    domainId: string,
    reflectionId: string,
    prompt: string,
  ) => {
    const customDomains = customDomainsBySubject[subjectCode];
    const existingDomain = customDomains.find((domain) => domain.id === domainId);
    if (!existingDomain) {
      throw new Error(`This custom ${subjectCode} domain could not be found.`);
    }

    const questionExists = existingDomain.questions.some(
      (question, index) => (question.reflectionId ?? String(index)) === reflectionId,
    );
    if (!questionExists) {
      throw new Error(`This custom ${subjectCode} question could not be found.`);
    }

    const updatedDomain = {
      ...existingDomain,
      questions: existingDomain.questions.map((question, index) =>
        (question.reflectionId ?? String(index)) === reflectionId
          ? { ...question, prompt: prompt.trim() }
          : question,
      ),
    };
    const nextDomains = customDomains.map((domain) =>
      domain.id === domainId ? updatedDomain : domain,
    );
    await saveCustomDomains(subjectCode, nextDomains);
    setSelectedDomain((current) => (current?.id === domainId ? updatedDomain : current));
  };

  const deleteCustomDomainQuestion = async (
    subjectCode: CustomDomainSubjectCode,
    domainId: string,
    reflectionId: string,
    prompt: string,
  ) => {
    const confirmed = await requestConfirmation({
      eyebrow: "Delete reflection question",
      title: "Delete this question?",
      description: `"${prompt}" and its saved reflection will be permanently deleted.`,
      confirmLabel: "Delete question",
      cancelLabel: "Keep question",
      destructive: true,
    });
    if (!confirmed) {
      return false;
    }

    const customDomains = customDomainsBySubject[subjectCode];
    const existingDomain = customDomains.find((domain) => domain.id === domainId);
    if (!existingDomain) {
      throw new Error(`This custom ${subjectCode} domain could not be found.`);
    }

    const questionExists = existingDomain.questions.some(
      (question, index) => (question.reflectionId ?? String(index)) === reflectionId,
    );
    if (!questionExists) {
      throw new Error(`This custom ${subjectCode} question could not be found.`);
    }

    const updatedDomain = {
      ...existingDomain,
      questions: existingDomain.questions.filter(
        (question, index) => (question.reflectionId ?? String(index)) !== reflectionId,
      ),
    };
    const nextDomains = customDomains.map((domain) =>
      domain.id === domainId ? updatedDomain : domain,
    );
    await saveCustomDomains(subjectCode, nextDomains);
    setSelectedDomain((current) => (current?.id === domainId ? updatedDomain : current));

    const reflectionKey = `buksu-reflection-${getCustomDomainContext(subjectCode, domainId)}-${reflectionId}`;
    const hadSavedReflection = getPortfolioItem(reflectionKey) !== null;
    const deletedKeys = await deletePortfolioItems([reflectionKey]);
    if (hadSavedReflection && !deletedKeys.includes(reflectionKey)) {
      throw new Error(
        "The question was removed, but its saved reflection could not be deleted from shared storage.",
      );
    }

    return true;
  };

  const updateCustomDomain = async (
    subjectCode: CustomDomainSubjectCode,
    domainId: string,
    name: string,
    description: string,
  ) => {
    const customDomains = customDomainsBySubject[subjectCode];
    const existingDomain = customDomains.find((domain) => domain.id === domainId);
    if (!existingDomain) {
      throw new Error(`This custom ${subjectCode} domain could not be found.`);
    }

    const normalizedName = name.trim().toLocaleLowerCase();
    const builtInDomains =
      level1Subjects.find((subject) => subject.code === subjectCode)?.domains ?? [];
    if (
      [...builtInDomains, ...customDomains].some(
        (domain) =>
          domain.id !== domainId && domain.name.trim().toLocaleLowerCase() === normalizedName,
      )
    ) {
      throw new Error(`A ${subjectCode} domain with that name already exists.`);
    }

    const updatedDomain = {
      ...existingDomain,
      name: name.trim(),
      description:
        description.trim() || `Explore learning and reflection related to ${name.trim()}.`,
    };
    const nextDomains = customDomains.map((domain) =>
      domain.id === domainId ? updatedDomain : domain,
    );
    await saveCustomDomains(subjectCode, nextDomains);
    setSelectedDomain((current) => (current?.id === domainId ? updatedDomain : current));
  };

  const deleteCustomDomain = async (subjectCode: CustomDomainSubjectCode, domain: CustomDomain) => {
    const confirmed = await requestConfirmation({
      eyebrow: "Delete custom domain",
      title: "Delete this domain?",
      description: `"${domain.name}", its ${domain.questions.length} question(s), and any saved reflections will be permanently deleted.`,
      confirmLabel: "Delete domain",
      cancelLabel: "Keep domain",
      destructive: true,
    });
    if (!confirmed) {
      return false;
    }

    const reflectionKeys = domain.questions.map(
      (question, index) =>
        `buksu-reflection-${getCustomDomainContext(subjectCode, domain.id)}-${question.reflectionId ?? index}`,
    );
    const storageKey = CUSTOM_DOMAIN_STORAGE_KEYS[subjectCode];
    const deletedKeys = await deletePortfolioItems([storageKey, ...reflectionKeys]);
    if (!deletedKeys.includes(storageKey)) {
      throw new Error("The custom domain could not be found in shared storage.");
    }

    setSubjectCustomDomains(
      subjectCode,
      customDomainsBySubject[subjectCode].filter((item) => item.id !== domain.id),
    );
    setSelectedDomain((current) => (current?.id === domain.id ? null : current));
    return true;
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
          <div className="avatar">
            {sidebarPortraitUrl ? (
              <img src={sidebarPortraitUrl} alt="" onError={() => setSidebarPortraitUrl("")} />
            ) : ownerMode ? (
              accountName.slice(0, 3).toUpperCase()
            ) : (
              "PUB"
            )}
          </div>
          <div>
            <strong>{OWNER_DISPLAY_NAME}</strong>
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
            <strong>
              {page === "domain" && selectedDomain?.isCustom
                ? `${selectedSubject.code} domain`
                : pageTitle(page)}
            </strong>
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
              isOwner={ownerMode}
              customDomains={
                isCustomDomainSubjectCode(selectedSubject.code)
                  ? customDomainsBySubject[selectedSubject.code]
                  : []
              }
              customDomainsError={
                isCustomDomainSubjectCode(selectedSubject.code)
                  ? customDomainErrors[selectedSubject.code]
                  : ""
              }
              onBack={() => navigate("level")}
              onOpenFolder={(folder) => {
                setSelectedFolder(folder);
                navigate(selectedSubject.domains ? "domains" : "folder");
              }}
              onAddCustomDomain={addCustomDomain}
              onEditCustomDomain={updateCustomDomain}
              onDeleteCustomDomain={deleteCustomDomain}
              onOpenCustomDomain={(domain) => {
                setSelectedDomain(domain);
                navigate("domain");
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
              subjectCode={selectedSubject.code}
              onBack={() => navigate(selectedDomain.isCustom ? "subject" : "domains")}
              readOnly={!ownerMode}
              customDomainsError={
                isCustomDomainSubjectCode(selectedSubject.code)
                  ? customDomainErrors[selectedSubject.code]
                  : ""
              }
              onAddQuestion={(domainId, prompt) => {
                if (!isCustomDomainSubjectCode(selectedSubject.code)) {
                  throw new Error("Custom domains are only available for MED 102 and MED 103.");
                }
                return addCustomDomainQuestion(selectedSubject.code, domainId, prompt);
              }}
              onEditQuestion={(domainId, reflectionId, prompt) => {
                if (!isCustomDomainSubjectCode(selectedSubject.code)) {
                  throw new Error("Custom domains are only available for MED 102 and MED 103.");
                }
                return updateCustomDomainQuestion(
                  selectedSubject.code,
                  domainId,
                  reflectionId,
                  prompt,
                );
              }}
              onDeleteQuestion={(domainId, reflectionId, prompt) => {
                if (!isCustomDomainSubjectCode(selectedSubject.code)) {
                  throw new Error("Custom domains are only available for MED 102 and MED 103.");
                }
                return deleteCustomDomainQuestion(
                  selectedSubject.code,
                  domainId,
                  reflectionId,
                  prompt,
                );
              }}
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
      {confirmationDialog}
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
  isOwner,
  customDomains,
  customDomainsError,
  onBack,
  onOpenFolder,
  onAddCustomDomain,
  onEditCustomDomain,
  onDeleteCustomDomain,
  onOpenCustomDomain,
}: {
  subject: Level1Subject;
  isOwner: boolean;
  customDomains: CustomDomain[];
  customDomainsError: string;
  onBack: () => void;
  onOpenFolder: (folder: AcademicFolder) => void;
  onAddCustomDomain: (
    subjectCode: CustomDomainSubjectCode,
    name: string,
    description: string,
  ) => Promise<void>;
  onEditCustomDomain: (
    subjectCode: CustomDomainSubjectCode,
    id: string,
    name: string,
    description: string,
  ) => Promise<void>;
  onDeleteCustomDomain: (
    subjectCode: CustomDomainSubjectCode,
    domain: CustomDomain,
  ) => Promise<boolean>;
  onOpenCustomDomain: (domain: CustomDomain) => void;
}) {
  const [addingDomain, setAddingDomain] = useState(false);
  const [domainName, setDomainName] = useState("");
  const [domainDescription, setDomainDescription] = useState("");
  const [domainError, setDomainError] = useState("");
  const [savingDomain, setSavingDomain] = useState(false);
  const [editingDomainId, setEditingDomainId] = useState<string | null>(null);
  const [editDomainName, setEditDomainName] = useState("");
  const [editDomainDescription, setEditDomainDescription] = useState("");
  const [editDomainError, setEditDomainError] = useState("");
  const [savingDomainEdit, setSavingDomainEdit] = useState(false);
  const [domainActionError, setDomainActionError] = useState("");
  const customDomainSubjectCode = isCustomDomainSubjectCode(subject.code) ? subject.code : null;
  const showAddDomain = isOwner && customDomainSubjectCode !== null;
  const domainFormPrefix = subject.code.replace(/\s+/g, "").toLowerCase();

  const submitDomain = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = domainName.trim();
    if (!trimmedName) {
      setDomainError("Enter a name for this domain.");
      return;
    }

    if (
      [...(subject.domains ?? []), ...customDomains].some(
        (domain) => domain.name.trim().toLowerCase() === trimmedName.toLowerCase(),
      )
    ) {
      setDomainError("A domain with that name already exists.");
      return;
    }

    setDomainError("");
    setSavingDomain(true);
    try {
      if (!customDomainSubjectCode) {
        throw new Error(`Adding a domain is not supported for ${subject.code}.`);
      }
      await onAddCustomDomain(customDomainSubjectCode, trimmedName, domainDescription);
      setDomainName("");
      setDomainDescription("");
      setAddingDomain(false);
    } catch (saveError: unknown) {
      console.error(`Unable to add a custom ${subject.code} domain.`, saveError);
      setDomainError(
        `The domain could not be saved. ${
          saveError instanceof Error ? saveError.message : String(saveError)
        }`,
      );
    } finally {
      setSavingDomain(false);
    }
  };

  const beginEditingDomain = (domain: CustomDomain) => {
    setEditingDomainId(domain.id);
    setEditDomainName(domain.name);
    setEditDomainDescription(domain.description ?? "");
    setEditDomainError("");
    setDomainActionError("");
  };

  const cancelEditingDomain = () => {
    setEditingDomainId(null);
    setEditDomainName("");
    setEditDomainDescription("");
    setEditDomainError("");
  };

  const submitDomainEdit = async (event: FormEvent<HTMLFormElement>, domain: CustomDomain) => {
    event.preventDefault();
    const trimmedName = editDomainName.trim();
    if (!trimmedName) {
      setEditDomainError("Enter a name for this domain.");
      return;
    }

    if (
      [...(subject.domains ?? []), ...customDomains].some(
        (item) =>
          item.id !== domain.id && item.name.trim().toLowerCase() === trimmedName.toLowerCase(),
      )
    ) {
      setEditDomainError("A domain with that name already exists.");
      return;
    }

    setSavingDomainEdit(true);
    setEditDomainError("");
    setDomainActionError("");
    try {
      if (!customDomainSubjectCode) {
        throw new Error(`Editing a domain is not supported for ${subject.code}.`);
      }
      await onEditCustomDomain(
        customDomainSubjectCode,
        domain.id,
        trimmedName,
        editDomainDescription,
      );
      cancelEditingDomain();
    } catch (saveError: unknown) {
      console.error(`Unable to edit a custom ${subject.code} domain.`, saveError);
      setEditDomainError(
        `The domain could not be saved. ${
          saveError instanceof Error ? saveError.message : String(saveError)
        }`,
      );
    } finally {
      setSavingDomainEdit(false);
    }
  };

  const removeDomain = async (domain: CustomDomain) => {
    setDomainActionError("");
    try {
      if (!customDomainSubjectCode) {
        throw new Error(`Deleting a domain is not supported for ${subject.code}.`);
      }
      await onDeleteCustomDomain(customDomainSubjectCode, domain);
    } catch (deleteError: unknown) {
      console.error(`Unable to delete a custom ${subject.code} domain.`, deleteError);
      setDomainActionError(
        `The domain could not be deleted. ${
          deleteError instanceof Error ? deleteError.message : String(deleteError)
        }`,
      );
    }
  };

  return (
    <>
      <div className="page-intro">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to Level 1 subjects
        </button>
        <div className="subject-page-title-row">
          <div>
            <p className="eyebrow">Level 1 subject</p>
            <h1>{subject.code}</h1>
          </div>
          {showAddDomain && (
            <button
              type="button"
              className="primary-button compact-button add-domain-button"
              onClick={() => {
                setAddingDomain((open) => !open);
                setDomainError("");
              }}
              aria-expanded={addingDomain}
            >
              <Plus size={16} aria-hidden="true" />
              {addingDomain ? "Close" : "Add domain"}
            </button>
          )}
        </div>
        <p>Explore this subject's learning experiences, reflections, and evidence.</p>
      </div>
      {customDomainsError && (
        <div className="home-alert error-alert" role="alert">
          {customDomainsError}
        </div>
      )}
      <section className="subject-detail subject-page-detail">
        <div className="detail-heading">
          <div>
            <span className="code-pill">{subject.code}</span>
            <h2>{subject.name}</h2>
            <p>{subject.progress}</p>
          </div>
        </div>
        {showAddDomain && addingDomain && (
          <form className="custom-domain-form" onSubmit={(event) => void submitDomain(event)}>
            <div>
              <label htmlFor={`custom-${domainFormPrefix}-domain-name`}>Domain name</label>
              <input
                id={`custom-${domainFormPrefix}-domain-name`}
                value={domainName}
                onChange={(event) => {
                  setDomainName(event.target.value);
                  setDomainError("");
                }}
                maxLength={100}
                placeholder="e.g. Community Health Promotion"
                aria-invalid={Boolean(domainError)}
                aria-describedby={
                  domainError ? `custom-${domainFormPrefix}-domain-error` : undefined
                }
                autoFocus
              />
              {domainError && (
                <small
                  className="field-validation-error"
                  id={`custom-${domainFormPrefix}-domain-error`}
                >
                  {domainError}
                </small>
              )}
            </div>
            <label htmlFor={`custom-${domainFormPrefix}-domain-description`}>
              Description <span className="optional-label">Optional</span>
              <textarea
                id={`custom-${domainFormPrefix}-domain-description`}
                value={domainDescription}
                onChange={(event) => setDomainDescription(event.target.value)}
                maxLength={220}
                rows={2}
                placeholder="Briefly describe this learning domain."
              />
            </label>
            <div className="custom-domain-form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setAddingDomain(false);
                  setDomainName("");
                  setDomainDescription("");
                  setDomainError("");
                }}
                disabled={savingDomain}
              >
                Cancel
              </button>
              <button className="primary-button compact-button" disabled={savingDomain}>
                {savingDomain ? "Saving…" : "Save domain"}
              </button>
            </div>
          </form>
        )}
        {domainActionError && (
          <div className="home-alert error-alert" role="alert">
            {domainActionError}
          </div>
        )}
        <div className="folder-grid">
          {subject.folders.map((folder, index) => (
            <button
              className="folder-card folder-card-button"
              key={folder.id}
              onClick={() => onOpenFolder(folder)}
            >
              <span className="folder-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{folder.name}</h3>
              <p>{folder.description}</p>
              <span className="text-button">
                {subject.domains ? "Open domains" : "Open section"}{" "}
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </button>
          ))}
          {customDomains.map((domain, index) => (
            <article className="folder-card custom-domain-card" key={domain.id}>
              <div className="custom-domain-card-top">
                <span className="folder-number">
                  {String(subject.folders.length + index + 1).padStart(2, "0")}
                </span>
                {isOwner && (
                  <details className="custom-domain-options">
                    <summary aria-label={`Options for ${domain.name}`}>
                      <MoreHorizontal size={19} aria-hidden="true" />
                    </summary>
                    <div className="custom-domain-options-panel">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.currentTarget.closest("details")?.removeAttribute("open");
                          beginEditingDomain(domain);
                        }}
                      >
                        <Pencil size={15} aria-hidden="true" />
                        Edit
                      </button>
                      <button
                        type="button"
                        className="is-destructive"
                        onClick={(event) => {
                          event.currentTarget.closest("details")?.removeAttribute("open");
                          void removeDomain(domain);
                        }}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </details>
                )}
              </div>
              {editingDomainId === domain.id ? (
                <form
                  className="custom-domain-edit-form"
                  onSubmit={(event) => void submitDomainEdit(event, domain)}
                >
                  <label htmlFor={`custom-domain-name-${domain.id}`}>Domain name</label>
                  <input
                    id={`custom-domain-name-${domain.id}`}
                    value={editDomainName}
                    onChange={(event) => {
                      setEditDomainName(event.target.value);
                      setEditDomainError("");
                    }}
                    maxLength={100}
                    aria-invalid={Boolean(editDomainError)}
                    aria-describedby={
                      editDomainError ? `custom-domain-error-${domain.id}` : undefined
                    }
                    autoFocus
                  />
                  {editDomainError && (
                    <small
                      className="field-validation-error"
                      id={`custom-domain-error-${domain.id}`}
                    >
                      {editDomainError}
                    </small>
                  )}
                  <label htmlFor={`custom-domain-description-${domain.id}`}>
                    Description <span className="optional-label">Optional</span>
                  </label>
                  <textarea
                    id={`custom-domain-description-${domain.id}`}
                    value={editDomainDescription}
                    onChange={(event) => setEditDomainDescription(event.target.value)}
                    maxLength={220}
                    rows={2}
                  />
                  <div className="custom-domain-form-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={cancelEditingDomain}
                      disabled={savingDomainEdit}
                    >
                      Cancel
                    </button>
                    <button className="primary-button compact-button" disabled={savingDomainEdit}>
                      {savingDomainEdit ? "Saving…" : "Save"}
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  className="custom-domain-card-content"
                  onClick={() => onOpenCustomDomain(domain)}
                >
                  <h3>{domain.name}</h3>
                  <p>
                    {domain.description ||
                      `Explore learning and reflection related to ${domain.name}.`}
                  </p>
                  <span className="text-button">
                    Open domains <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </button>
              )}
            </article>
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
  subjectCode,
  onBack,
  readOnly,
  customDomainsError,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
}: {
  domain: LearningDomain;
  subjectCode: string;
  onBack: () => void;
  readOnly: boolean;
  customDomainsError: string;
  onAddQuestion: (domainId: string, prompt: string) => Promise<void>;
  onEditQuestion: (domainId: string, reflectionId: string, prompt: string) => Promise<void>;
  onDeleteQuestion: (domainId: string, reflectionId: string, prompt: string) => Promise<boolean>;
}) {
  const [reflectionTarget, setReflectionTarget] = useState<{
    context: string;
    question: AcademicQuestion;
    questionIndex: number | string;
  } | null>(null);
  const context = domain.isCustom
    ? `${subjectCode} custom domain ${domain.id}`
    : `MED 102 - ${domain.name}`;

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
          <ArrowLeft size={16} aria-hidden="true" />{" "}
          {domain.isCustom ? `Back to ${subjectCode}` : "Back to MED 102 learning domains"}
        </button>
        {domain.isCustom ? (
          <>
            <p className="eyebrow">Level 1 subject</p>
            <h1>{subjectCode}</h1>
            <p>Explore the reflection questions available through {domain.name}.</p>
          </>
        ) : (
          <>
            <p className="eyebrow">MED 102 · Learning domain</p>
            <p>Write and save reflections for this domain.</p>
          </>
        )}
      </div>
      {customDomainsError && (
        <div className="home-alert error-alert" role="alert">
          {customDomainsError}
        </div>
      )}
      <DomainDetail
        name={domain.name}
        context={context}
        evidence={domain.evidence}
        questions={domain.questions ?? med102Questions}
        isCustom={Boolean(domain.isCustom)}
        onAddQuestion={(prompt) => onAddQuestion(domain.id, prompt)}
        onEditQuestion={(reflectionId, prompt) => onEditQuestion(domain.id, reflectionId, prompt)}
        onDeleteQuestion={(reflectionId, prompt) =>
          onDeleteQuestion(domain.id, reflectionId, prompt)
        }
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
  questions,
  isCustom,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
  onStartReflection,
  readOnly,
}: {
  name: string;
  context: string;
  evidence: string;
  questions: AcademicQuestion[];
  isCustom: boolean;
  onAddQuestion: (prompt: string) => Promise<void>;
  onEditQuestion: (reflectionId: string, prompt: string) => Promise<void>;
  onDeleteQuestion: (reflectionId: string, prompt: string) => Promise<boolean>;
  onStartReflection: (question: AcademicQuestion, questionIndex: number | string) => void;
  readOnly: boolean;
}) {
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [questionPrompt, setQuestionPrompt] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [savingQuestion, setSavingQuestion] = useState(false);
  const [editingReflectionId, setEditingReflectionId] = useState<string | null>(null);
  const [editQuestionPrompt, setEditQuestionPrompt] = useState("");
  const [editQuestionError, setEditQuestionError] = useState("");
  const [savingQuestionEdit, setSavingQuestionEdit] = useState(false);
  const [questionActionError, setQuestionActionError] = useState("");

  const submitQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = questionPrompt.trim();
    if (!prompt) {
      setQuestionError("Enter a question before saving.");
      return;
    }

    setQuestionError("");
    setSavingQuestion(true);
    try {
      await onAddQuestion(prompt);
      setQuestionPrompt("");
      setAddingQuestion(false);
    } catch (saveError: unknown) {
      console.error("Unable to add a custom reflection question.", saveError);
      setQuestionError(
        `The question could not be saved. ${
          saveError instanceof Error ? saveError.message : String(saveError)
        }`,
      );
    } finally {
      setSavingQuestion(false);
    }
  };

  const beginEditingQuestion = (question: AcademicQuestion, index: number) => {
    setEditingReflectionId(question.reflectionId ?? String(index));
    setEditQuestionPrompt(question.prompt);
    setEditQuestionError("");
    setQuestionActionError("");
  };

  const cancelEditingQuestion = () => {
    setEditingReflectionId(null);
    setEditQuestionPrompt("");
    setEditQuestionError("");
  };

  const submitQuestionEdit = async (event: FormEvent<HTMLFormElement>, reflectionId: string) => {
    event.preventDefault();
    const prompt = editQuestionPrompt.trim();
    if (!prompt) {
      setEditQuestionError("Enter a question before saving.");
      return;
    }

    setSavingQuestionEdit(true);
    setEditQuestionError("");
    try {
      await onEditQuestion(reflectionId, prompt);
      cancelEditingQuestion();
    } catch (saveError: unknown) {
      console.error("Unable to edit a custom reflection question.", saveError);
      setEditQuestionError(
        `The question could not be saved. ${
          saveError instanceof Error ? saveError.message : String(saveError)
        }`,
      );
    } finally {
      setSavingQuestionEdit(false);
    }
  };

  const removeQuestion = async (question: AcademicQuestion, index: number) => {
    setQuestionActionError("");
    try {
      const reflectionId = question.reflectionId ?? String(index);
      await onDeleteQuestion(reflectionId, question.prompt);
      if (editingReflectionId === reflectionId) {
        cancelEditingQuestion();
      }
    } catch (deleteError: unknown) {
      console.error("Unable to delete a custom reflection question.", deleteError);
      setQuestionActionError(
        deleteError instanceof Error ? deleteError.message : "The question could not be deleted.",
      );
    }
  };

  return (
    <section className={isCustom ? "domain-section custom-domain-detail" : "academic-detail"}>
      <div className="detail-heading domain-detail-heading">
        <div>
          <span className="code-pill">{isCustom ? "INDIVIDUAL QUESTIONS" : "MED 102 DOMAIN"}</span>
          <h2>{name}</h2>
          <p>
            {isCustom
              ? readOnly
                ? "Review the reflection questions for this domain."
                : "Add, edit, or remove reflection questions for this domain."
              : "Complete the reflection questions for this domain."}
          </p>
        </div>
        {isCustom && !readOnly && (
          <button
            type="button"
            className="secondary-button add-question-button"
            onClick={() => {
              setAddingQuestion((open) => !open);
              setQuestionError("");
            }}
            aria-expanded={addingQuestion}
          >
            <Plus size={16} aria-hidden="true" />
            {addingQuestion ? "Close" : "Add question"}
          </button>
        )}
      </div>
      {isCustom && addingQuestion && !readOnly && (
        <form className="custom-question-form" onSubmit={(event) => void submitQuestion(event)}>
          <label htmlFor="custom-domain-question">Reflection question</label>
          <textarea
            id="custom-domain-question"
            value={questionPrompt}
            onChange={(event) => {
              setQuestionPrompt(event.target.value);
              setQuestionError("");
            }}
            rows={4}
            maxLength={1000}
            placeholder="Write the question the student should reflect on."
            aria-invalid={Boolean(questionError)}
            aria-describedby={questionError ? "custom-domain-question-error" : undefined}
            autoFocus
          />
          {questionError && (
            <small className="field-validation-error" id="custom-domain-question-error">
              {questionError}
            </small>
          )}
          <div className="custom-domain-form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setAddingQuestion(false);
                setQuestionPrompt("");
                setQuestionError("");
              }}
              disabled={savingQuestion}
            >
              Cancel
            </button>
            <button className="primary-button compact-button" disabled={savingQuestion}>
              {savingQuestion ? "Saving…" : "Save question"}
            </button>
          </div>
        </form>
      )}
      {questionActionError && (
        <div className="home-alert error-alert" role="alert">
          {questionActionError}
        </div>
      )}
      {isCustom ? (
        <div className="custom-domain-question-list">
          {questions.map((question, index) => {
            const reflectionId = question.reflectionId ?? String(index);
            const isEditing = editingReflectionId === reflectionId;

            return (
              <article className="custom-domain-question-card" key={reflectionId}>
                {isEditing ? (
                  <form
                    className="custom-question-edit-form"
                    onSubmit={(event) => void submitQuestionEdit(event, reflectionId)}
                  >
                    <label htmlFor={`custom-question-${reflectionId}`}>Reflection question</label>
                    <textarea
                      id={`custom-question-${reflectionId}`}
                      value={editQuestionPrompt}
                      onChange={(event) => {
                        setEditQuestionPrompt(event.target.value);
                        setEditQuestionError("");
                      }}
                      rows={4}
                      maxLength={1000}
                      aria-invalid={Boolean(editQuestionError)}
                      aria-describedby={
                        editQuestionError ? `custom-question-error-${reflectionId}` : undefined
                      }
                      autoFocus
                    />
                    {editQuestionError && (
                      <small
                        className="field-validation-error"
                        id={`custom-question-error-${reflectionId}`}
                      >
                        {editQuestionError}
                      </small>
                    )}
                    <div className="custom-domain-form-actions">
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={cancelEditingQuestion}
                        disabled={savingQuestionEdit}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="primary-button compact-button"
                        disabled={savingQuestionEdit}
                      >
                        {savingQuestionEdit ? "Saving…" : "Save"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="custom-domain-question-card-body">
                      <div className="custom-domain-question-heading">
                        <span className="question-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3>{question.prompt}</h3>
                      </div>
                      {question.evidence && <p className="evidence-note">{question.evidence}</p>}
                      <SavedReflection context={context} questionIndex={reflectionId} />
                    </div>
                    {!readOnly && (
                      <div className="custom-domain-question-actions">
                        <button
                          type="button"
                          className="text-button"
                          onClick={() => onStartReflection(question, reflectionId)}
                        >
                          Write response <ArrowRight size={14} aria-hidden="true" />
                        </button>
                        <div className="custom-domain-question-management">
                          <button
                            type="button"
                            className="text-button"
                            onClick={() => beginEditingQuestion(question, index)}
                          >
                            <Pencil size={14} aria-hidden="true" />
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-button is-destructive"
                            onClick={() => void removeQuestion(question, index)}
                          >
                            <Trash2 size={14} aria-hidden="true" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="question-list">
          {questions.map((question, index) => (
            <article className="question-card" key={`${index}-${question.prompt}`}>
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
      )}
      {questions.length === 0 && (
        <div className="empty-guidance">
          <h3>No reflection questions yet</h3>
          <p>
            {readOnly
              ? "The portfolio owner has not added questions to this domain yet."
              : "Add a question to give this domain a reflection prompt."}
          </p>
        </div>
      )}
      {(evidence || !isCustom) && (
        <div className="evidence-panel">
          <strong>Required supporting evidence</strong>
          {evidence ? <p>{evidence}</p> : <p>No additional evidence guidance is specified.</p>}
        </div>
      )}
    </section>
  );
}

function SavedReflection({
  context,
  questionIndex,
}: {
  context: string;
  questionIndex: number | string;
}) {
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
        if (!savedResponse) {
          setResponse("");
          return;
        }

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
