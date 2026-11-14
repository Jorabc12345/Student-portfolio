import { ChangeEvent, useEffect, useState } from "react";
import { getPortfolioItem, setPortfolioItem } from "../services/portfolioStorage";

type HomePageContent = {
  introduction: string;
  learningPhilosophy: string;
  myWhy: string;
  theGoodDoctor: string;
  portraitDataUrl: string;
  updatedAt: string | null;
};

const STORAGE_KEY = "buksu-student-home-page";
const MAX_PORTRAIT_BYTES = 2 * 1024 * 1024;
const emptyContent: HomePageContent = {
  introduction: "",
  learningPhilosophy: "",
  myWhy: "",
  theGoodDoctor: "",
  portraitDataUrl: "",
  updatedAt: null,
};

function loadHomePage(): HomePageContent {
  const savedContent = getPortfolioItem(STORAGE_KEY);

  if (!savedContent) {
    return emptyContent;
  }

  try {
    return { ...emptyContent, ...JSON.parse(savedContent) };
  } catch (error) {
    console.error("Unable to read the saved Home Page draft.", error);
    return emptyContent;
  }
}

export default function HomePage({ readOnly = false }: { readOnly?: boolean }) {
  const [content, setContent] = useState(loadHomePage);
  const [draft, setDraft] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const isDirty = JSON.stringify(content) !== JSON.stringify(draft);

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

  const beginEditing = () => {
    setDraft(content);
    setMessage("");
    setError("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (isDirty && !window.confirm("Discard your unsaved Home Page changes?")) {
      return;
    }

    setDraft(content);
    setError("");
    setIsEditing(false);
  };

  const updateDraft = (field: keyof HomePageContent, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
  };

  const saveChanges = () => {
    const savedContent = { ...draft, updatedAt: new Date().toISOString() };

    try {
      setPortfolioItem(STORAGE_KEY, JSON.stringify(savedContent));
      setContent(savedContent);
      setDraft(savedContent);
      setIsEditing(false);
      setError("");
      setMessage("Your Home Page was saved successfully.");
    } catch (storageError) {
      console.error("Unable to save the Home Page.", storageError);
      setError("Your changes could not be saved on this device. Please try again.");
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
        updateDraft("portraitDataUrl", reader.result);
        setMessage("Portrait preview updated. Save the Home Page to keep it.");
      }
    };
    reader.onerror = () => setError("The portrait could not be read. Please try again.");
    reader.readAsDataURL(file);
  };

  return (
    <>
      <section className="hero home-page-hero">
        <div className="portrait-preview">
          {content.portraitDataUrl ? (
            <img src={content.portraitDataUrl} alt="Student three-quarter portrait" />
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
            <button className="primary-button compact-button" onClick={saveChanges}>
              Save changes
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
        <HomePageEditor draft={draft} updateDraft={updateDraft} onPortrait={handlePortrait} />
      ) : (
        <HomePagePreview content={content} onEdit={beginEditing} readOnly={readOnly} />
      )}
    </>
  );
}

function HomePageEditor({
  draft,
  updateDraft,
  onPortrait,
}: {
  draft: HomePageContent;
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
              {draft.portraitDataUrl ? (
                <img src={draft.portraitDataUrl} alt="Portrait preview" />
              ) : (
                <span aria-hidden="true">Portrait preview</span>
              )}
            </div>
            <label className="upload-button">
              {draft.portraitDataUrl ? "Replace portrait" : "Upload portrait"}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onPortrait} />
            </label>
            {draft.portraitDataUrl && (
              <button className="remove-button" onClick={() => updateDraft("portraitDataUrl", "")}>
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
          <strong>Your portfolio is private</strong>
          <p>
            Signed-in visitors can view this portfolio. Only its owner can edit entries or upload artifacts.
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
