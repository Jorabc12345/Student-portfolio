import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { level1Subjects, programLearningOutcomes } from "../data/level1Content";
import { getPortfolioItem, setPortfolioItem } from "../services/portfolioStorage";

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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const artifacts = useMemo(loadArtifacts, []);
  const selectedPlo = programLearningOutcomes[selectedPloIndex];
  const selectedEvidence = savedEvidence[String(selectedPloIndex)];
  const selectedArtifact = artifacts.find((artifact) => artifact.id === selectedEvidence?.artifactId);
  const isDirty =
    JSON.stringify(savedEvidence[String(selectedPloIndex)] ?? emptyEvidence) !==
    JSON.stringify(draft);

  useEffect(() => {
    setDraft(savedEvidence[String(selectedPloIndex)] ?? emptyEvidence);
    setMessage("");
    setError("");
  }, [savedEvidence, selectedPloIndex]);

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

  const selectPlo = (index: number) => {
    if (isDirty && !window.confirm("Discard your unsaved PLO evidence changes?")) {
      return;
    }
    setSelectedPloIndex(index);
  };

  const updateDraft = <K extends keyof PLOEvidence>(field: K, value: PLOEvidence[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
  };

  const saveEvidence = () => {
    if (
      !draft.artifactId ||
      !draft.description.trim() ||
      !draft.significance.trim() ||
      !draft.reflection.trim()
    ) {
      setError("Select an artifact and complete its description, significance, and reflection.");
      return;
    }

    const nextEvidence = {
      ...savedEvidence,
      [String(selectedPloIndex)]: { ...draft, updatedAt: new Date().toISOString() },
    };

    setPortfolioItem(STORAGE_KEY, JSON.stringify(nextEvidence));
    setSavedEvidence(nextEvidence);
    setMessage("PLO evidence saved. Attainment remains a student and faculty review decision.");
    setError("");
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
                onClick={() => selectPlo(index)}
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
            >
              <option value="">Select a private artifact</option>
              {artifacts.map((artifact) => (
                <option value={artifact.id} key={artifact.id}>
                  {artifact.title} · {artifact.subject}
                </option>
              ))}
            </select>
          </label>
          {artifacts.length === 0 && (
            <p className="field-note">
              Upload a private artifact first to associate supporting evidence.
            </p>
          )}
          <label>
            Artifact description
            <textarea
              value={draft.description}
              onChange={(event) => updateDraft("description", event.target.value)}
              placeholder="Describe what the artifact is."
              rows={4}
            />
          </label>
          <label>
            Explanation of significance
            <textarea
              value={draft.significance}
              onChange={(event) => updateDraft("significance", event.target.value)}
              placeholder="Explain what this artifact demonstrates in relation to this PLO."
              rows={5}
            />
          </label>
          <label>
            Short student reflection
            <textarea
              value={draft.reflection}
              onChange={(event) => updateDraft("reflection", event.target.value)}
              placeholder="Reflect briefly on your growth and learning."
              rows={6}
            />
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
            <button className="primary-button compact-button" onClick={saveEvidence}>
              Save PLO evidence
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
