import { ChangeEvent, useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useConfirmationDialog } from "../components/useConfirmationDialog";
import { AcademicQuestion } from "../data/level1Content";
import {
  getPortfolioItem,
  setPortfolioItem,
  subscribeToPortfolioItem,
} from "../services/portfolioStorage";

type ReflectionDraft = {
  response: string;
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
  artifactName: "",
  plo: "",
  academicIntegrityAcknowledged: false,
  updatedAt: null,
};

function storageKey(context: string, questionIndex: number | string) {
  return `buksu-reflection-${context}-${questionIndex}`;
}

function loadDraft(context: string, questionIndex: number | string): ReflectionDraft {
  const savedDraft = getPortfolioItem(storageKey(context, questionIndex));

  if (!savedDraft) {
    return emptyDraft;
  }

  try {
    const parsedDraft = JSON.parse(savedDraft) as Partial<ReflectionDraft> & {
      status?: unknown;
    };
    if (!parsedDraft || typeof parsedDraft !== "object") {
      return emptyDraft;
    }

    delete parsedDraft.status;
    return { ...emptyDraft, ...parsedDraft };
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
  questionIndex: number | string;
  onClose: () => void;
}) {
  const [savedDraft, setSavedDraft] = useState(() => loadDraft(context, questionIndex));
  const [draft, setDraft] = useState(savedDraft);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validationAttempted, setValidationAttempted] = useState(false);
  const { requestConfirmation, confirmationDialog } = useConfirmationDialog();
  const isDirty = JSON.stringify(savedDraft) !== JSON.stringify(draft);
  const integrityError =
    validationAttempted && !draft.academicIntegrityAcknowledged
      ? "Confirm this acknowledgement before saving."
      : "";
  const questionNumber =
    typeof questionIndex === "number"
      ? questionIndex + 1
      : /^\d+$/.test(questionIndex)
        ? Number(questionIndex) + 1
        : null;

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

  useEffect(
    () =>
      subscribeToPortfolioItem(storageKey(context, questionIndex), () => {
        const previousDraft = savedDraft;
        const updatedDraft = loadDraft(context, questionIndex);
        setSavedDraft(updatedDraft);
        setDraft((current) =>
          JSON.stringify(current) === JSON.stringify(previousDraft) ? updatedDraft : current,
        );
      }),
    [context, questionIndex, savedDraft],
  );

  const updateDraft = <K extends keyof ReflectionDraft>(field: K, value: ReflectionDraft[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
  };

  const saveDraft = async () => {
    setValidationAttempted(true);
    setError("");
    setMessage("");
    if (!draft.academicIntegrityAcknowledged) {
      return;
    }

    const nextDraft = { ...draft, updatedAt: new Date().toISOString() };
    setSaving(true);
    try {
      await setPortfolioItem(storageKey(context, questionIndex), JSON.stringify(nextDraft));
      setSaving(false);
      onClose();
    } catch (saveError: unknown) {
      console.error("Unable to save the reflection.", saveError);
      setError(
        `This reflection could not be saved to the shared portfolio. ${
          saveError instanceof Error ? saveError.message : String(saveError)
        }`,
      );
      setSaving(false);
    }
  };

  const closeEditor = async () => {
    if (isDirty) {
      const confirmed = await requestConfirmation({
        eyebrow: "Unsaved reflection",
        title: "Leave this reflection?",
        description: "Your changes haven’t been saved. If you leave now, they’ll be lost.",
        confirmLabel: "Discard changes",
        cancelLabel: "Keep editing",
        destructive: true,
      });
      if (!confirmed) {
        return;
      }
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
      </div>

      <div className="official-question">
        <span>
          {questionNumber ? `Official question ${questionNumber}` : "Reflection question"}
        </span>
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
        {draft.artifactName && (
          <div className="artifact-file">
            <span className="artifact-file-name">{draft.artifactName}</span>
            <button
              type="button"
              className="attachment-remove-button"
              aria-label="Remove attached artifact"
              onClick={() => updateDraft("artifactName", "")}
              disabled={saving}
            >
              Remove
            </button>
          </div>
        )}
        <small>Do not attach patient-identifying information.</small>
      </div>

      <div className="reflection-warning">
        <strong>Public sharing and academic integrity</strong>
        <p>
          Saved reflections are public. Remove patient names, faces, identifying dates, record
          numbers, and other confidential information from your response and artifacts.
        </p>
        <label className={`integrity-check ${integrityError ? "has-error" : ""}`}>
          <input
            type="checkbox"
            checked={draft.academicIntegrityAcknowledged}
            onChange={(event) => updateDraft("academicIntegrityAcknowledged", event.target.checked)}
            aria-invalid={Boolean(integrityError)}
            aria-describedby={integrityError ? "reflection-integrity-error" : undefined}
          />
          <span>
            I confirm that this reflection represents my own work and that I have respected
            confidentiality, permissions, citations, collaborators, and academic integrity.
          </span>
        </label>
        {integrityError && (
          <small
            className="field-validation-error integrity-validation-error"
            id="reflection-integrity-error"
          >
            {integrityError}
          </small>
        )}
      </div>

      <div className="reflection-editor-actions">
        <button
          type="button"
          className="reflection-cancel-button"
          onClick={closeEditor}
          disabled={saving}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Cancel
        </button>
        <button
          type="button"
          className="reflection-save-button"
          onClick={() => void saveDraft()}
          disabled={saving}
        >
          <Save size={16} aria-hidden="true" />
          {saving ? "Saving…" : "Save reflection"}
        </button>
      </div>
      {confirmationDialog}
    </section>
  );
}
