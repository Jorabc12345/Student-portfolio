import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { level1Subjects, programLearningOutcomes } from "../data/level1Content";
import { useConfirmationDialog } from "../components/useConfirmationDialog";
import {
  getPortfolioItem,
  setPortfolioItem,
  subscribeToPortfolioItem,
} from "../services/portfolioStorage";

type ArtifactOption = {
  id: string;
  title: string;
  subject: string;
  fileName: string;
};

type PLOEvidence = {
  artifactId: string;
  description: string;
  significance: string;
  reflection: string;
  subject: string;
  context: string;
  updatedAt: string | null;
};

const STORAGE_KEY = "buksu-plo-evidence";
const emptyEvidence: PLOEvidence = {
  artifactId: "",
  description: "",
  significance: "",
  reflection: "",
  subject: "",
  context: "",
  updatedAt: null,
};

function loadEvidence(): Record<string, PLOEvidence> {
  const savedEvidence = getPortfolioItem(STORAGE_KEY);

  if (!savedEvidence) {
    return {};
  }

  try {
    return JSON.parse(savedEvidence) as Record<string, PLOEvidence>;
  } catch (error) {
    console.error("Unable to read saved PLO evidence.", error);
    return {};
  }
}

function loadArtifacts(): ArtifactOption[] {
  const savedArtifacts = getPortfolioItem("buksu-artifacts");

  if (!savedArtifacts) {
    return [];
  }

  try {
    return JSON.parse(savedArtifacts) as ArtifactOption[];
  } catch (error) {
    console.error("Unable to read artifacts for PLO association.", error);
    return [];
  }
}

export default function PLOPage({ readOnly = false, onBack }: { readOnly?: boolean; onBack: () => void }) {
  const [selectedPloIndex, setSelectedPloIndex] = useState(0);
  const [savedEvidence, setSavedEvidence] = useState(loadEvidence);
  const [draft, setDraft] = useState<PLOEvidence>(savedEvidence["0"] ?? emptyEvidence);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [artifacts, setArtifacts] = useState(loadArtifacts);
  const { requestConfirmation, confirmationDialog } = useConfirmationDialog();
  const selectedPlo = programLearningOutcomes[selectedPloIndex];
  const selectedEvidence = savedEvidence[String(selectedPloIndex)];
  const selectedArtifact = artifacts.find((artifact) => artifact.id === selectedEvidence?.artifactId);
  const artifactValidationMessage =
    validationAttempted && !draft.artifactId ? "Select an artifact before saving." : "";
  const descriptionValidationMessage =
    validationAttempted && !draft.description.trim() ? "Describe the supporting artifact." : "";
  const significanceValidationMessage =
    validationAttempted && !draft.significance.trim()
      ? "Explain the significance of this artifact."
      : "";
  const reflectionValidationMessage =
    validationAttempted && !draft.reflection.trim() ? "Add a short reflection." : "";
  const isDirty =
    JSON.stringify(savedEvidence[String(selectedPloIndex)] ?? emptyEvidence) !==
    JSON.stringify(draft);

  useEffect(() => {
    if (!isDirty) {
      setDraft(savedEvidence[String(selectedPloIndex)] ?? emptyEvidence);
    }
    setMessage("");
    setError("");
  }, [isDirty, savedEvidence, selectedPloIndex]);

  useEffect(
    () =>
      subscribeToPortfolioItem(STORAGE_KEY, () => {
        const previousEvidence = savedEvidence;
        const updatedEvidence = loadEvidence();
        const savedSelection = previousEvidence[String(selectedPloIndex)] ?? emptyEvidence;
        const updatedSelection = updatedEvidence[String(selectedPloIndex)] ?? emptyEvidence;
        setSavedEvidence(updatedEvidence);
        setDraft((current) =>
          JSON.stringify(current) === JSON.stringify(savedSelection)
            ? updatedSelection
            : current,
        );
      }),
    [savedEvidence, selectedPloIndex],
  );

  useEffect(
    () =>
      subscribeToPortfolioItem("buksu-artifacts", () => {
        setArtifacts(loadArtifacts());
      }),
    [],
  );

  if (readOnly) {
    return (
      <>
        <div className="page-intro"><button className="back-button" onClick={onBack}><ArrowLeft size={16} aria-hidden="true" /> Back to Level 1</button><p className="eyebrow">Level 1 global section</p><h1>PLO Attainment</h1><p>Review the portfolio owner's evidence and reflections for each Program Learning Outcome.</p></div>
        <div className="plo-layout">
          <div className="plo-list">{programLearningOutcomes.map((plo, index) => <button className={`plo-item ${selectedPloIndex === index ? "selected" : ""}`} key={plo} onClick={() => setSelectedPloIndex(index)}><span>PLO {index + 1}</span><strong>{plo}</strong><small>{savedEvidence[String(index)]?.updatedAt ? "Evidence recorded" : "No evidence recorded"}</small></button>)}</div>
          <section className="plo-editor"><div className="detail-heading"><div><span className="code-pill">PLO {selectedPloIndex + 1}</span><h2>{selectedPlo}</h2></div></div>{selectedEvidence?.updatedAt ? <div className="readonly-evidence"><p><strong>Supporting artifact</strong><br />{selectedArtifact?.title ?? "Artifact details unavailable"}</p><p><strong>Description</strong><br />{selectedEvidence.description}</p><p><strong>Significance</strong><br />{selectedEvidence.significance}</p><p><strong>Student reflection</strong><br />{selectedEvidence.reflection}</p><p><strong>Related subject or context</strong><br />{[selectedEvidence.subject, selectedEvidence.context].filter(Boolean).join(" · ") || "Not specified"}</p></div> : <div className="empty-guidance"><h2>No evidence recorded for this outcome</h2><p>The portfolio owner has not added PLO evidence here yet.</p></div>}</section>
        </div>
      </>
    );
  }

  const selectPlo = async (index: number) => {
    if (isDirty) {
      const confirmed = await requestConfirmation({
        eyebrow: "Unsaved PLO evidence",
        title: "Discard your changes?",
        description:
          "Your current evidence record hasn’t been saved. Switching outcomes will discard those edits.",
        confirmLabel: "Discard changes",
        cancelLabel: "Keep editing",
        destructive: true,
      });
      if (!confirmed) {
        return;
      }
    }
    setSelectedPloIndex(index);
    setValidationAttempted(false);
  };

  const updateDraft = <K extends keyof PLOEvidence>(field: K, value: PLOEvidence[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
  };

  const saveEvidence = async () => {
    setValidationAttempted(true);
    setError("");
    setMessage("");
    if (
      !draft.artifactId ||
      !draft.description.trim() ||
      !draft.significance.trim() ||
      !draft.reflection.trim()
    ) {
      return;
    }

    const savedRecord = { ...draft, updatedAt: new Date().toISOString() };
    const nextEvidence = {
      ...savedEvidence,
      [String(selectedPloIndex)]: savedRecord,
    };

    setSaving(true);
    try {
      await setPortfolioItem(STORAGE_KEY, JSON.stringify(nextEvidence));
      setSavedEvidence(nextEvidence);
      setDraft(savedRecord);
      setValidationAttempted(false);
      setMessage("PLO evidence saved. Attainment remains a student and faculty review decision.");
    } catch (saveError: unknown) {
      console.error("Unable to save PLO evidence.", saveError);
      setError(
        `PLO evidence could not be saved to the shared portfolio. ${
          saveError instanceof Error ? saveError.message : String(saveError)
        }`,
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="page-intro">
        <button className="back-button" onClick={onBack}><ArrowLeft size={16} aria-hidden="true" /> Back to Level 1</button>
        <p className="eyebrow">Level 1 global section</p>
        <h1>PLO Attainment</h1>
        <p>
          Connect your evidence and reflection to the eleven official Program Learning Outcomes.
        </p>
      </div>
      <div className="notice yellow-note">
        <strong>Evidence record, not an automatic result</strong>
        <span>
          This section does not automatically declare that you have attained a PLO. It records your
          selected evidence and explanation for later review.
        </span>
      </div>
      {(message || error) && (
        <div className={`home-alert ${error ? "error-alert" : "success-alert"}`} role="status">
          {error || message}
        </div>
      )}
      <div className="plo-layout">
        <div className="plo-list">
          {programLearningOutcomes.map((plo, index) => {
            const hasEvidence = Boolean(savedEvidence[String(index)]?.updatedAt);
            return (
              <button
                className={`plo-item ${selectedPloIndex === index ? "selected" : ""}`}
                key={plo}
                onClick={() => void selectPlo(index)}
              >
                <span>PLO {index + 1}</span>
                <strong>{plo}</strong>
                <small>{hasEvidence ? "Evidence saved" : "No evidence recorded yet"}</small>
              </button>
            );
          })}
        </div>
        <section className="plo-editor">
          <div className="detail-heading">
            <div>
              <span className="code-pill">PLO {selectedPloIndex + 1}</span>
              <h2>{selectedPlo}</h2>
              <p>Document evidence without making an automatic attainment claim.</p>
            </div>
          </div>
          <label>
            Supporting artifact
            <select
              value={draft.artifactId}
              onChange={(event) => updateDraft("artifactId", event.target.value)}
              aria-invalid={Boolean(artifactValidationMessage)}
              aria-describedby={artifactValidationMessage ? "plo-artifact-error" : undefined}
            >
              <option value="">Select an artifact</option>
              {artifacts.map((artifact) => (
                <option value={artifact.id} key={artifact.id}>
                  {artifact.title} · {artifact.subject}
                </option>
              ))}
            </select>
            {artifactValidationMessage && (
              <small className="field-validation-error" id="plo-artifact-error">
                {artifactValidationMessage}
              </small>
            )}
          </label>
          {artifacts.length === 0 && (
            <p className="field-note">
              Upload an artifact first to associate supporting evidence.
            </p>
          )}
          <label>
            Artifact description
            <textarea
              value={draft.description}
              onChange={(event) => updateDraft("description", event.target.value)}
              placeholder="Describe what the artifact is."
              rows={4}
              aria-invalid={Boolean(descriptionValidationMessage)}
              aria-describedby={
                descriptionValidationMessage ? "plo-description-error" : undefined
              }
            />
            {descriptionValidationMessage && (
              <small className="field-validation-error" id="plo-description-error">
                {descriptionValidationMessage}
              </small>
            )}
          </label>
          <label>
            Explanation of significance
            <textarea
              value={draft.significance}
              onChange={(event) => updateDraft("significance", event.target.value)}
              placeholder="Explain what this artifact demonstrates in relation to this PLO."
              rows={5}
              aria-invalid={Boolean(significanceValidationMessage)}
              aria-describedby={
                significanceValidationMessage ? "plo-significance-error" : undefined
              }
            />
            {significanceValidationMessage && (
              <small className="field-validation-error" id="plo-significance-error">
                {significanceValidationMessage}
              </small>
            )}
          </label>
          <label>
            Short student reflection
            <textarea
              value={draft.reflection}
              onChange={(event) => updateDraft("reflection", event.target.value)}
              placeholder="Reflect briefly on your growth and learning."
              rows={6}
              aria-invalid={Boolean(reflectionValidationMessage)}
              aria-describedby={
                reflectionValidationMessage ? "plo-reflection-error" : undefined
              }
            />
            {reflectionValidationMessage && (
              <small className="field-validation-error" id="plo-reflection-error">
                {reflectionValidationMessage}
              </small>
            )}
          </label>
          <div className="plo-fields-grid">
            <label>
              Related subject
              <select
                value={draft.subject}
                onChange={(event) => updateDraft("subject", event.target.value)}
              >
                <option value="">Select a subject (optional)</option>
                {level1Subjects.map((subject) => (
                  <option value={subject.code} key={subject.code}>
                    {subject.code} - {subject.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Related reflection or context
              <input
                value={draft.context}
                onChange={(event) => updateDraft("context", event.target.value)}
                placeholder="e.g. 1st Bimonthly or domain name"
              />
            </label>
          </div>
          {draft.updatedAt && (
            <p className="field-note">
              Last saved {new Date(draft.updatedAt).toLocaleString()}. This is evidence
              documentation, not an attainment decision.
            </p>
          )}
          <div className="plo-actions">
            <button
              className="primary-button compact-button"
              onClick={() => void saveEvidence()}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save PLO evidence"}
            </button>
          </div>
        </section>
      </div>
      {confirmationDialog}
    </>
  );
}
