import { ChangeEvent, useEffect, useState } from "react";
import { AcademicQuestion } from "../data/level1Content";
import { getPortfolioItem, setPortfolioItem } from "../services/portfolioStorage";

type ReflectionStatus = "draft" | "published";

type ReflectionDraft = {
  response: string;
  status: ReflectionStatus;
  artifactName: string;
  plo: string;
  academicIntegrityAcknowledged: boolean;
  updatedAt: string | null;
};

const PLOS = [
  "PLO 1 - Demonstrate clinical competence.",
  "PLO 2 - Communicate effectively.",
  "PLO 3 - Lead and manage health care teams.",
  "PLO 4 - Engage in research activities.",
  "PLO 5 - Collaborate within interprofessional teams.",
  "PLO 6 - Utilize systems-based approach to healthcare.",
  "PLO 7 - Engage in continuing personal and professional development.",
  "PLO 8 - Adhere to ethical, professional, and legal standards.",
  "PLO 9 - Demonstrate nationalism, internationalism and dedication to service.",
  "PLO 10 - Practice the principles of social accountability.",
  "PLO 11 - Apply the core values of BukSU-COM to the medical practice in the communities.",
];

const emptyDraft: ReflectionDraft = {
  response: "",
  status: "draft",
  artifactName: "",
  plo: "",
  academicIntegrityAcknowledged: false,
  updatedAt: null,
};

function storageKey(context: string, questionIndex: number) {
  return `buksu-reflection-${context}-${questionIndex}`;
}

function loadDraft(context: string, questionIndex: number): ReflectionDraft {
  const savedDraft = getPortfolioItem(storageKey(context, questionIndex));

  if (!savedDraft) {
    return emptyDraft;
  }

  try {
    return { ...emptyDraft, ...JSON.parse(savedDraft) };
  } catch (error) {
    console.error("Unable to read the saved reflection draft.", error);
    return emptyDraft;
  }
}

export default function ReflectionEditor({
  context,
  question,
  questionIndex,
  onClose,
}: {
  context: string;
  question: AcademicQuestion;
  questionIndex: number;
  onClose: () => void;
}) {
  const [savedDraft, setSavedDraft] = useState(() => loadDraft(context, questionIndex));
  const [draft, setDraft] = useState(savedDraft);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const isDirty = JSON.stringify(savedDraft) !== JSON.stringify(draft);

  useEffect(() => {
    if (!isDirty) {
      return;
    }

    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [isDirty]);

  const updateDraft = <K extends keyof ReflectionDraft>(field: K, value: ReflectionDraft[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
  };

  const saveDraft = () => {
    if (!draft.academicIntegrityAcknowledged) {
      setError("Please acknowledge academic integrity before saving this reflection.");
      return;
    }

    const nextDraft = { ...draft, updatedAt: new Date().toISOString() };

    try {
      setPortfolioItem(storageKey(context, questionIndex), JSON.stringify(nextDraft));
      setSavedDraft(nextDraft);
      setDraft(nextDraft);
      setMessage("Reflection saved successfully.");
      setError("");
    } catch (storageError) {
      console.error("Unable to save the reflection.", storageError);
      setError("This reflection could not be saved on this device. Please try again.");
    }
  };

  const closeEditor = () => {
    if (isDirty && !window.confirm("Discard your unsaved reflection changes?")) {
      return;
    }
    onClose();
  };

  const handleArtifact = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (file) {
      updateDraft("artifactName", file.name);
    }
  };

  return (
    <section className="reflection-editor" aria-label="Reflection editor">
      <div className="reflection-editor-header">
        <div>
          <p className="eyebrow">Reflection editor</p>
          <h2>Respond to the official question</h2>
          <p className="reflection-context">{context}</p>
        </div>
        <button className="secondary-button" onClick={closeEditor}>
          Close editor
        </button>
      </div>

      <div className="official-question">
        <span>Official question {questionIndex + 1}</span>
        <h3>{question.prompt}</h3>
        {question.evidence && <p>{question.evidence}</p>}
      </div>

      {(message || error) && (
        <div className={`home-alert ${error ? "error-alert" : "success-alert"}`} role="status">
          {error || message}
        </div>
      )}

      <label className="reflection-response-field">
        <span>Your long-form response</span>
        <textarea
          value={draft.response}
          onChange={(event) => updateDraft("response", event.target.value)}
          placeholder="Write your reflection in your own words..."
          rows={12}
        />
      </label>

      <div className="reflection-fields-grid">
        <label className="reflection-control">
          <span>Reflection status</span>
          <select
            value={draft.status}
            onChange={(event) => updateDraft("status", event.target.value as ReflectionStatus)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label className="reflection-control">
          <span>Related PLO association</span>
          <select value={draft.plo} onChange={(event) => updateDraft("plo", event.target.value)}>
            <option value="">Select a related PLO (optional)</option>
            {PLOS.map((plo) => (
              <option value={plo} key={plo}>
                {plo}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="artifact-attachment">
        <label className="upload-button">
          {draft.artifactName ? "Replace related artifact" : "Attach related artifact"}
          <input type="file" onChange={handleArtifact} />
        </label>
        {draft.artifactName && <span>{draft.artifactName}</span>}
        <small>Do not attach patient-identifying information.</small>
      </div>

      <div className="reflection-warning">
        <strong>Privacy and academic integrity</strong>
        <p>
          Keep this portfolio private and remove patient names, faces, identifying dates, record
          numbers, and other confidential information from your response and artifacts.
        </p>
        <label className="integrity-check">
          <input
            type="checkbox"
            checked={draft.academicIntegrityAcknowledged}
            onChange={(event) => updateDraft("academicIntegrityAcknowledged", event.target.checked)}
          />
          <span>
            I confirm that this reflection represents my own work and that I have respected
            confidentiality, permissions, citations, collaborators, and academic integrity.
          </span>
        </label>
      </div>

      <div className="reflection-editor-actions">
        <button className="secondary-button" onClick={closeEditor}>
          Cancel
        </button>
        <button className="primary-button compact-button" onClick={saveDraft}>
          Save reflection
        </button>
      </div>
    </section>
  );
}
