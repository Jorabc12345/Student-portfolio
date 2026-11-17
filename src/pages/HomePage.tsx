import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [syncingLegacyPortrait, setSyncingLegacyPortrait] = useState(false);
  const [portraitUrl, setPortraitUrl] = useState(getPortfolioPortraitUrl);
  const [portraitAvailable, setPortraitAvailable] = useState(true);
  const [portraitFile, setPortraitFile] = useState<File | null>(null);
  const [portraitRemoved, setPortraitRemoved] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
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

  const beginEditing = () => {
    setDraft(content);
    setPortraitFile(null);
    setPortraitRemoved(false);
    setMessage("");
    setError("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (isDirty && !window.confirm("Discard your unsaved Home Page changes?")) {
      return;
    }

    setDraft(content);
    setPortraitFile(null);
    setPortraitRemoved(false);
    setError("");
    setIsEditing(false);
  };

  const updateDraft = (field: keyof HomePageContent, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    if (field === "portraitUrl") {
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
    setSaving(true);
    setError("");
    setMessage("");
    try {
      let savedPortraitUrl: string;
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
        savedPortraitUrl = content.portraitUrl ? portraitUrl : portraitAvailable ? portraitUrl : "";
      }

      const savedContent = {
        ...draft,
        portraitUrl: savedPortraitUrl,
        updatedAt: new Date().toISOString(),
      };
      await setPortfolioItem(STORAGE_KEY, JSON.stringify(savedContent));
      setContent(savedContent);
      setDraft(savedContent);
      setPortraitUrl(getPortfolioPortraitUrl());
      setPortraitAvailable(Boolean(savedPortraitUrl));
      setPortraitFile(null);
      setPortraitRemoved(false);
      setIsEditing(false);
      setError("");
      setMessage("Your Home Page was saved successfully.");
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

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_PORTRAIT_BYTES) {
      setError("Please choose an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPortraitFile(file);
        updateDraft("portraitUrl", reader.result);
        setMessage("Portrait preview updated. Save the Home Page to sync it across devices.");
      }
    };
    reader.onerror = () => setError("The portrait could not be read. Please try again.");
    reader.readAsDataURL(file);
  };

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
              {!readOnly && <button className="text-button" onClick={beginEditing}>Upload portrait →</button>}
            </div>
          )}
        </div>
        <div className="about-copy">
          <p className="eyebrow">All About Me</p>
          <h2>{content.introduction ? "A little about me" : "Your introduction is waiting"}</h2>
          {content.introduction ? (
            <p className="long-form-copy">{highlightIntroductionName(content.introduction)}</p>
          ) : (
            <EmptySection
              message="Write a brief personal introduction to begin your Home Page."
              onEdit={beginEditing}
              readOnly={readOnly}
            />
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
        {readOnly ? null : !isEditing ? (
          <button className="primary-button compact-button" onClick={beginEditing}>
            Edit Home Page
          </button>
        ) : (
          <div className="toolbar-actions">
            <button className="secondary-button" onClick={cancelEditing}>
              Cancel
            </button>
            <button
              className="primary-button compact-button"
              onClick={() => void saveChanges()}
              disabled={saving || syncingLegacyPortrait}
            >
              {saving ? "Saving…" : syncingLegacyPortrait ? "Syncing portrait…" : "Save changes"}
            </button>
          </div>
        )}
      </div>

      {(message || error) && (
        <div className={`home-alert ${error ? "error-alert" : "success-alert"}`} role="status">
          {error || message}
        </div>
      )}

      {isEditing ? (
        <HomePageEditor
          draft={draft}
          portraitUrl={draftPortraitUrl}
          saving={saving}
          updateDraft={updateDraft}
          onPortrait={handlePortrait}
        />
      ) : (
        <HomePagePreview
          content={content}
          onEdit={beginEditing}
          readOnly={readOnly}
        />
      )}
    </>
  );
}

function HomePageEditor({
  draft,
  portraitUrl,
  saving,
  updateDraft,
  onPortrait,
}: {
  draft: HomePageContent;
  portraitUrl: string;
  saving: boolean;
  updateDraft: (field: keyof HomePageContent, value: string) => void;
  onPortrait: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="home-editor">
      <section className="editor-card about-editor">
        <div className="editor-heading">
          <div>
            <p className="eyebrow">Section 1</p>
            <h2>All About Me</h2>
          </div>
          <span className="required-note">Personal portfolio section</span>
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
            <label className="upload-button">
              {portraitUrl ? "Replace portrait" : "Upload portrait"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={onPortrait}
                disabled={saving}
              />
            </label>
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
      <ReflectionField
        section="Section 2"
        title="My Learning Philosophy"
        value={draft.learningPhilosophy}
        onChange={(value) => updateDraft("learningPhilosophy", value)}
        placeholder="Explain your personal beliefs, values, and approach to learning."
      />
      <ReflectionField
        section="Section 3"
        title="My Why"
        value={draft.myWhy}
        onChange={(value) => updateDraft("myWhy", value)}
        placeholder="Share your personal motivation for pursuing medicine."
      />
      <ReflectionField
        section="Section 4"
        title="The Good Doctor"
        value={draft.theGoodDoctor}
        onChange={(value) => updateDraft("theGoodDoctor", value)}
        placeholder="Describe your understanding and vision of what makes a good doctor."
      />
    </div>
  );
}

function HomePagePreview({
  content,
  onEdit,
  readOnly,
}: {
  content: HomePageContent;
  onEdit: () => void;
  readOnly: boolean;
}) {
  return (
    <>
      <div className="reflection-preview-grid">
        <ReflectionPreview
          title="My Learning Philosophy"
          value={content.learningPhilosophy}
          onEdit={onEdit}
          readOnly={readOnly}
        />
        <ReflectionPreview title="My Why" value={content.myWhy} onEdit={onEdit} readOnly={readOnly} />
        <ReflectionPreview title="The Good Doctor" value={content.theGoodDoctor} onEdit={onEdit} readOnly={readOnly} />
      </div>
      <section className="privacy-note">
        <span className="note-icon">✦</span>
        <div>
          <strong>This portfolio is open to visitors</strong>
          <p>
            Visitors can explore this portfolio without an account. Only the owner can edit entries or upload artifacts.
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
  onEdit,
  readOnly,
}: {
  title: string;
  value: string;
  onEdit: () => void;
  readOnly: boolean;
}) {
  return (
    <article className="reflection-preview">
      <p className="eyebrow">Personal reflection</p>
      <h2>{title}</h2>
      {value ? (
        <p className="long-form-copy">{value}</p>
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

function EmptySection({ message, onEdit, readOnly = false }: { message: string; onEdit: () => void; readOnly?: boolean }) {
  return (
    <div className="empty-section">
      <p>{message}</p>
      {!readOnly && <button className="text-button" onClick={onEdit}>
        Start writing →
      </button>}
    </div>
  );
}

function ReflectionField({
  section,
  title,
  value,
  onChange,
  placeholder,
}: {
  section: string;
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <section className="editor-card">
      <p className="eyebrow">{section}</p>
      <h2>{title}</h2>
      <TextAreaField
        label={title}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={8}
      />
    </section>
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
