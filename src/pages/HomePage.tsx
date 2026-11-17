import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useConfirmationDialog } from "../components/useConfirmationDialog";
import {
  getPortfolioItem,
  setPortfolioItem,
  subscribeToPortfolioItem,
} from "../services/portfolioStorage";
import {
  deletePortfolioPortrait,
  getPortfolioPortraitUrl,
  syncLegacyPortfolioPortrait,
  uploadPortfolioPortrait,
} from "../services/portfolioPortrait";

type HomePageContent = {
  introduction: string;
  learningPhilosophy: string;
  myWhy: string;
  theGoodDoctor: string;
  portraitUrl: string;
  updatedAt: string | null;
};

type ReflectionField = "learningPhilosophy" | "myWhy" | "theGoodDoctor";
type HomePageEditTarget = "profile" | ReflectionField;

const STORAGE_KEY = "buksu-student-home-page";
const MAX_PORTRAIT_BYTES = 2 * 1024 * 1024;
const emptyContent: HomePageContent = {
  introduction: "",
  learningPhilosophy: "",
  myWhy: "",
  theGoodDoctor: "",
  portraitUrl: "",
  updatedAt: null,
};

function loadHomePage(): HomePageContent {
  const savedContent = getPortfolioItem(STORAGE_KEY);

  if (!savedContent) {
    return emptyContent;
  }

  try {
    const parsedContent = JSON.parse(savedContent) as Partial<HomePageContent> & {
      portraitDataUrl?: string;
    };
    const { portraitDataUrl: legacyPortraitUrl, ...savedFields } = parsedContent;
    return {
      ...emptyContent,
      ...savedFields,
      portraitUrl: savedFields.portraitUrl ?? legacyPortraitUrl ?? "",
    };
  } catch (error) {
    console.error("Unable to read the saved Home Page draft.", error);
    return emptyContent;
  }
}

export default function HomePage({ readOnly = false }: { readOnly?: boolean }) {
  const [content, setContent] = useState(loadHomePage);
  const contentRef = useRef(content);
  contentRef.current = content;
  const [draft, setDraft] = useState(content);
  const [editingTarget, setEditingTarget] = useState<HomePageEditTarget | null>(null);
  const [saving, setSaving] = useState(false);
  const [syncingLegacyPortrait, setSyncingLegacyPortrait] = useState(false);
  const [portraitUrl, setPortraitUrl] = useState(getPortfolioPortraitUrl);
  const [portraitAvailable, setPortraitAvailable] = useState(true);
  const [portraitFile, setPortraitFile] = useState<File | null>(null);
  const [portraitRemoved, setPortraitRemoved] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { requestConfirmation, confirmationDialog } = useConfirmationDialog();
  const [portraitError, setPortraitError] = useState("");
  const isEditing = editingTarget !== null;
  const isDirty = JSON.stringify(content) !== JSON.stringify(draft);
  const contentPortraitUrl = content.portraitUrl.startsWith("data:")
    ? content.portraitUrl
    : portraitAvailable
      ? portraitUrl
      : "";
  const draftPortraitUrl = draft.portraitUrl.startsWith("data:")
    ? draft.portraitUrl
    : portraitRemoved
      ? ""
      : portraitAvailable
        ? portraitUrl
        : "";

  useEffect(() => {
    if (!isEditing || !isDirty) {
      return;
    }

    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [isDirty, isEditing]);

  useEffect(
    () =>
      subscribeToPortfolioItem(STORAGE_KEY, () => {
        const previousContent = contentRef.current;
        const updatedContent = loadHomePage();
        if (previousContent.portraitUrl !== updatedContent.portraitUrl) {
          setPortraitAvailable(Boolean(updatedContent.portraitUrl));
          if (updatedContent.portraitUrl) {
            setPortraitUrl(getPortfolioPortraitUrl());
          }
        }

        setContent(updatedContent);
        setDraft((current) =>
          JSON.stringify(current) === JSON.stringify(previousContent) ? updatedContent : current,
        );
      }),
    [],
  );

  useEffect(() => {
    if (readOnly || !content.portraitUrl.startsWith("data:")) {
      return;
    }

    const legacyPortraitUrl = content.portraitUrl;
    let active = true;
    setSyncingLegacyPortrait(true);

    void syncLegacyPortfolioPortrait(legacyPortraitUrl)
      .then(async (savedPortraitUrl) => {
        if (!active) {
          return;
        }

        const savedContent = { ...contentRef.current, portraitUrl: savedPortraitUrl };
        await setPortfolioItem(STORAGE_KEY, JSON.stringify(savedContent));

        setContent((current) =>
          current.portraitUrl === legacyPortraitUrl ? savedContent : current,
        );
        setDraft((current) =>
          current.portraitUrl === legacyPortraitUrl
            ? { ...current, portraitUrl: savedPortraitUrl }
            : current,
        );
        setPortraitUrl(savedPortraitUrl);
        setPortraitAvailable(true);
        setMessage("Your previously saved portrait has been synced across devices.");
      })
      .catch((syncError: unknown) => {
        if (active) {
          console.error("Unable to sync the previously saved portrait.", syncError);
          setError(
            `Your portrait could not be synced. Check the portfolio-portraits Storage setup. ${
              syncError instanceof Error ? syncError.message : String(syncError)
            }`,
          );
        }
      })
      .finally(() => {
        if (active) {
          setSyncingLegacyPortrait(false);
        }
      });

    return () => {
      active = false;
    };
  }, [content, readOnly]);

  const beginEditing = async (target: HomePageEditTarget) => {
    if (isDirty) {
      const confirmed = await requestConfirmation({
        eyebrow: "Unsaved Home Page",
        title: "Discard your changes?",
        description: "Your Home Page edits haven’t been saved. Switching sections will discard them.",
        confirmLabel: "Discard changes",
        cancelLabel: "Keep editing",
        destructive: true,
      });
      if (!confirmed) {
        return;
      }
    }

    setDraft(content);
    setPortraitFile(null);
    setPortraitRemoved(false);
    setMessage("");
    setError("");
    setPortraitError("");
    setEditingTarget(target);
  };

  const cancelEditing = async () => {
    if (isDirty) {
      const confirmed = await requestConfirmation({
        eyebrow: "Unsaved Home Page",
        title: "Discard your changes?",
        description: "Your Home Page edits haven’t been saved. Leaving now will discard them.",
        confirmLabel: "Discard changes",
        cancelLabel: "Keep editing",
        destructive: true,
      });
      if (!confirmed) {
        return;
      }
    }

    setDraft(content);
    setPortraitFile(null);
    setPortraitRemoved(false);
    setError("");
    setPortraitError("");
    setEditingTarget(null);
  };

  const updateDraft = (field: keyof HomePageContent, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    if (field === "portraitUrl") {
      setPortraitError("");
      setPortraitRemoved(value === "");
      if (value) {
        setPortraitAvailable(true);
      } else {
        setPortraitFile(null);
      }
    }
    setMessage("");
    setError("");
  };

  const saveChanges = async () => {
    if (!editingTarget) {
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");
    try {
      let savedPortraitUrl = content.portraitUrl;
      if (editingTarget === "profile") {
        if (portraitFile) {
          savedPortraitUrl = await uploadPortfolioPortrait(portraitFile);
        } else if (portraitRemoved) {
          await deletePortfolioPortrait();
          savedPortraitUrl = "";
        } else if (draft.portraitUrl.startsWith("data:")) {
          savedPortraitUrl = await syncLegacyPortfolioPortrait(draft.portraitUrl);
        } else if (content.portraitUrl.startsWith("data:")) {
          savedPortraitUrl = await syncLegacyPortfolioPortrait(content.portraitUrl);
        } else {
          savedPortraitUrl = content.portraitUrl
            ? portraitUrl
            : portraitAvailable
              ? portraitUrl
              : "";
        }
      }

      const updatedAt = new Date().toISOString();
      const savedContent: HomePageContent =
        editingTarget === "profile"
          ? {
              ...content,
              introduction: draft.introduction,
              portraitUrl: savedPortraitUrl,
              updatedAt,
            }
          : { ...content, [editingTarget]: draft[editingTarget], updatedAt };
      await setPortfolioItem(STORAGE_KEY, JSON.stringify(savedContent));
      setContent(savedContent);
      setDraft(savedContent);
      if (editingTarget === "profile") {
        setPortraitUrl(getPortfolioPortraitUrl());
        setPortraitAvailable(Boolean(savedPortraitUrl));
        setPortraitFile(null);
        setPortraitRemoved(false);
      }
      setEditingTarget(null);
      setError("");
      setPortraitError("");
      setMessage(
        editingTarget === "profile"
          ? "Your introduction and portrait were saved."
          : "Your reflection was saved.",
      );
    } catch (saveError: unknown) {
      console.error("Unable to save the Home Page.", saveError);
      setError(
        `Your changes could not be saved. ${
          saveError instanceof Error ? saveError.message : String(saveError)
        }`,
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePortrait = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    setPortraitError("");
    setError("");
    setMessage("");

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setPortraitError("Please choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_PORTRAIT_BYTES) {
      setPortraitError("Please choose an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPortraitFile(file);
        updateDraft("portraitUrl", reader.result);
        setMessage("Portrait preview updated. Save your profile to sync it across devices.");
      }
    };
    reader.onerror = () => setPortraitError("The portrait could not be read. Please try again.");
    reader.readAsDataURL(file);
  };

  if (editingTarget === "profile") {
    return (
      <>
        <section className="home-profile-editor-page">
          <button className="back-button" onClick={cancelEditing}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Home
          </button>
          <div className="page-intro">
            <p className="eyebrow">Homepage profile</p>
            <h1>Edit introduction & portrait</h1>
            <p>Update your personal introduction and profile portrait.</p>
          </div>
          {(message || error) && (
            <div className={`home-alert ${error ? "error-alert" : "success-alert"}`} role="status">
              {error || message}
            </div>
          )}
          <ProfileIntroductionEditor
            draft={draft}
            portraitUrl={draftPortraitUrl}
            portraitError={portraitError}
            saving={saving}
            syncingLegacyPortrait={syncingLegacyPortrait}
            updateDraft={updateDraft}
            onPortrait={handlePortrait}
            onCancel={cancelEditing}
            onSave={() => void saveChanges()}
          />
        </section>
        {confirmationDialog}
      </>
    );
  }

  return (
    <>
      <section className="hero home-page-hero">
        <div className="portrait-preview">
          {contentPortraitUrl ? (
            <img
              src={contentPortraitUrl}
              alt="Student three-quarter portrait"
              onError={() => {
                if (contentPortraitUrl === portraitUrl) {
                  setPortraitAvailable(false);
                }
              }}
            />
          ) : (
            <div className="empty-portrait">
              <span aria-hidden="true">✦</span>
              <strong>Add your portrait</strong>
              <small>Your three-quarter portrait will appear here.</small>
            </div>
          )}
        </div>
        <div className="about-copy">
          <p className="eyebrow">All About Me</p>
          <h2>{content.introduction ? "A little about me" : "Your introduction is waiting"}</h2>
          {content.introduction ? (
            <p className="long-form-copy">{highlightIntroductionName(content.introduction)}</p>
          ) : (
            <div className="empty-section">
              <p>Write a brief personal introduction to begin your Home Page.</p>
            </div>
          )}
          {!readOnly && (
            <div className="home-profile-actions">
              <button className="secondary-button" onClick={() => beginEditing("profile")}>
                Edit introduction & portrait
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <div className="hero-shape" aria-hidden="true">
          <span>✦</span>
        </div>
      </section>

      <div className="home-page-toolbar">
        <div>
          <p className="eyebrow">BukSU-COM Level 1 portfolio</p>
          <p className="last-updated">
            {content.updatedAt
              ? `Last updated ${new Date(content.updatedAt).toLocaleString()}`
              : "This Home Page has not been completed yet."}
          </p>
        </div>
      </div>

      {(message || error) && (
        <div className={`home-alert ${error ? "error-alert" : "success-alert"}`} role="status">
          {error || message}
        </div>
      )}

      <HomePagePreview
        content={content}
        draft={draft}
        editingTarget={editingTarget}
        saving={saving}
        onEdit={beginEditing}
        onChange={updateDraft}
        onCancel={cancelEditing}
        onSave={() => void saveChanges()}
        readOnly={readOnly}
      />
      {confirmationDialog}
    </>
  );
}

function ProfileIntroductionEditor({
  draft,
  portraitUrl,
  portraitError,
  saving,
  syncingLegacyPortrait,
  updateDraft,
  onPortrait,
  onCancel,
  onSave,
}: {
  draft: HomePageContent;
  portraitUrl: string;
  portraitError: string;
  saving: boolean;
  syncingLegacyPortrait: boolean;
  updateDraft: (field: keyof HomePageContent, value: string) => void;
  onPortrait: (event: ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className="home-editor">
      <section className="editor-card about-editor">
        <div className="editor-heading">
          <div>
            <p className="eyebrow">Section 1</p>
            <h2>All About Me</h2>
          </div>
          <div className="final-musing-actions profile-editor-actions">
            <button type="button" className="secondary-button" onClick={onCancel} disabled={saving}>
              Cancel
            </button>
            <button
              type="button"
              className="primary-button compact-button"
              onClick={onSave}
              disabled={saving || syncingLegacyPortrait}
            >
              {saving ? (
                "Saving…"
              ) : syncingLegacyPortrait ? (
                "Syncing portrait…"
              ) : (
                <>
                  <Check size={16} aria-hidden="true" />
                  Save profile
                </>
              )}
            </button>
          </div>
        </div>
        <div className="about-editor-grid">
          <div className="portrait-editor">
            <div className="portrait-frame">
              {portraitUrl ? (
                <img src={portraitUrl} alt="Portrait preview" />
              ) : (
                <span aria-hidden="true">Portrait preview</span>
              )}
            </div>
            <label className={`upload-button ${portraitError ? "has-error" : ""}`}>
              {portraitUrl ? "Replace portrait" : "Upload portrait"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={onPortrait}
                disabled={saving}
                aria-invalid={Boolean(portraitError)}
                aria-describedby={portraitError ? "portrait-upload-error" : undefined}
              />
            </label>
            {portraitError && (
              <small className="field-validation-error" id="portrait-upload-error">
                {portraitError}
              </small>
            )}
            {portraitUrl && (
              <button
                className="remove-button"
                onClick={() => updateDraft("portraitUrl", "")}
                disabled={saving}
              >
                Remove portrait
              </button>
            )}
            <small>JPG, PNG, or WebP · maximum 2 MB</small>
          </div>
          <TextAreaField
            label="Personal introduction"
            value={draft.introduction}
            onChange={(value) => updateDraft("introduction", value)}
            placeholder="Introduce yourself as a medical student and the person behind this portfolio."
            rows={8}
          />
        </div>
      </section>
    </div>
  );
}

function HomePagePreview({
  content,
  draft,
  editingTarget,
  saving,
  onEdit,
  onChange,
  onCancel,
  onSave,
  readOnly,
}: {
  content: HomePageContent;
  draft: HomePageContent;
  editingTarget: HomePageEditTarget | null;
  saving: boolean;
  onEdit: (target: HomePageEditTarget) => void;
  onChange: (field: keyof HomePageContent, value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  readOnly: boolean;
}) {
  return (
    <>
      <div className="reflection-preview-grid">
        <ReflectionPreview
          title="My Learning Philosophy"
          value={content.learningPhilosophy}
          draftValue={draft.learningPhilosophy}
          editing={editingTarget === "learningPhilosophy"}
          onEdit={() => onEdit("learningPhilosophy")}
          onChange={(value) => onChange("learningPhilosophy", value)}
          onCancel={onCancel}
          onSave={onSave}
          saving={saving}
          readOnly={readOnly}
        />
        <ReflectionPreview
          title="My Why"
          value={content.myWhy}
          draftValue={draft.myWhy}
          editing={editingTarget === "myWhy"}
          onEdit={() => onEdit("myWhy")}
          onChange={(value) => onChange("myWhy", value)}
          onCancel={onCancel}
          onSave={onSave}
          saving={saving}
          readOnly={readOnly}
        />
        <ReflectionPreview
          title="The Good Doctor"
          value={content.theGoodDoctor}
          draftValue={draft.theGoodDoctor}
          editing={editingTarget === "theGoodDoctor"}
          onEdit={() => onEdit("theGoodDoctor")}
          onChange={(value) => onChange("theGoodDoctor", value)}
          onCancel={onCancel}
          onSave={onSave}
          saving={saving}
          readOnly={readOnly}
        />
      </div>
      <section className="privacy-note">
        <span className="note-icon">✦</span>
        <div>
          <strong>This portfolio is open to visitors</strong>
          <p>
            Visitors can explore this portfolio without an account. Only the owner can edit entries
            or upload artifacts.
          </p>
        </div>
      </section>
    </>
  );
}

function highlightIntroductionName(introduction: string) {
  return introduction.split(/(Aliah)/gi).map((part, index) =>
    part.toLowerCase() === "aliah" ? (
      <strong className="highlighted-name" key={`${part}-${index}`}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function ReflectionPreview({
  title,
  value,
  draftValue,
  editing,
  onEdit,
  onChange,
  onCancel,
  onSave,
  saving,
  readOnly,
}: {
  title: string;
  value: string;
  draftValue: string;
  editing: boolean;
  onEdit: () => void;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  saving: boolean;
  readOnly: boolean;
}) {
  return (
    <article className={`reflection-preview ${editing ? "is-editing" : ""}`}>
      <p className="eyebrow">Personal reflection</p>
      <h2>{title}</h2>
      {editing ? (
        <div className="reflection-inline-editor">
          <textarea
            aria-label={`${title} response`}
            value={draftValue}
            onChange={(event) => onChange(event.target.value)}
            placeholder={`Write about ${title.toLowerCase()}...`}
            rows={7}
            autoFocus
          />
          <div className="final-musing-actions">
            <button type="button" className="secondary-button" onClick={onCancel} disabled={saving}>
              Cancel
            </button>
            <button
              type="button"
              className="primary-button compact-button"
              onClick={onSave}
              disabled={saving}
            >
              {saving ? (
                "Saving…"
              ) : (
                <>
                  <Check size={16} aria-hidden="true" />
                  Save response
                </>
              )}
            </button>
          </div>
        </div>
      ) : value ? (
        <>
          <p className="long-form-copy">{value}</p>
          {!readOnly && (
            <button className="text-button" onClick={onEdit}>
              Edit response →
            </button>
          )}
        </>
      ) : (
        <EmptySection
          message={`Add your ${title.toLowerCase()} to complete this section.`}
          onEdit={onEdit}
          readOnly={readOnly}
        />
      )}
    </article>
  );
}

function EmptySection({
  message,
  onEdit,
  readOnly = false,
}: {
  message: string;
  onEdit: () => void;
  readOnly?: boolean;
}) {
  return (
    <div className="empty-section">
      <p>{message}</p>
      {!readOnly && (
        <button className="text-button" onClick={onEdit}>
          Start writing →
        </button>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows: number;
}) {
  return (
    <label className="text-area-field">
      <span>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
    </label>
  );
}
