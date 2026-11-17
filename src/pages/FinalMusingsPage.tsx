import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { finalMusingsQuestions } from "../data/level1Content";
import {
  getPortfolioItem,
  setPortfolioItem,
  subscribeToPortfolioItem,
} from "../services/portfolioStorage";

const STORAGE_KEY = "buksu-final-musings";

function loadResponses(): string[] {
  const savedResponses = getPortfolioItem(STORAGE_KEY);

  if (!savedResponses) {
    return finalMusingsQuestions.map(() => "");
  }

  try {
    const responses = JSON.parse(savedResponses) as string[];
    return finalMusingsQuestions.map((_, index) => responses[index] ?? "");
  } catch (error) {
    console.error("Unable to read saved Final Musings responses.", error);
    return finalMusingsQuestions.map(() => "");
  }
}

export default function FinalMusingsPage({ readOnly = false, onBack }: { readOnly?: boolean; onBack: () => void }) {
  const [savedResponses, setSavedResponses] = useState(loadResponses);
  const [draftResponses, setDraftResponses] = useState(savedResponses);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const isDirty = JSON.stringify(savedResponses) !== JSON.stringify(draftResponses);
  const completedCount = savedResponses.filter((response) => response.trim()).length;

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
        const previousResponses = savedResponses;
        const updatedResponses = loadResponses();
        setSavedResponses(updatedResponses);
        setDraftResponses((current) =>
          JSON.stringify(current) === JSON.stringify(previousResponses)
            ? updatedResponses
            : current,
        );
      }),
    [savedResponses],
  );

  const startEditing = () => {
    setDraftResponses(savedResponses);
    setIsEditing(true);
    setMessage("");
    setError("");
  };

  const cancelEditing = () => {
    if (isDirty && !window.confirm("Discard your unsaved Final Musings changes?")) {
      return;
    }

    setDraftResponses(savedResponses);
    setIsEditing(false);
    setError("");
  };

  const saveResponses = async () => {
    setError("");
    setMessage("");
    try {
      await setPortfolioItem(STORAGE_KEY, JSON.stringify(draftResponses));
      setSavedResponses(draftResponses);
      setDraftResponses(draftResponses);
      setIsEditing(false);
      setError("");
      setMessage("Final Musings saved successfully.");
    } catch (saveError: unknown) {
      console.error("Unable to save Final Musings.", saveError);
      setError(
        `Final Musings could not be saved to the shared portfolio. ${
          saveError instanceof Error ? saveError.message : String(saveError)
        }`,
      );
    }
  };

  return (
    <>
      <div className="page-intro">
        <button className="back-button" onClick={onBack}><ArrowLeft size={16} aria-hidden="true" /> Back to Level 1</button>
        <p className="eyebrow">Level 1 global section</p>
        <h1>Final Musings</h1>
        <p>Look back on your Level 1 journey and the physician you are becoming.</p>
      </div>
      <div className="final-musings-toolbar">
        <div>
          <strong>{completedCount} of 5 questions answered</strong>
          <p>Saved reflections are visible to portfolio visitors.</p>
        </div>
        {readOnly ? null : !isEditing ? (
          <button className="primary-button compact-button" onClick={startEditing}>
            {completedCount ? "Edit Final Musings" : "Write Final Musings"}
          </button>
        ) : (
          <div className="toolbar-actions">
            <button className="secondary-button" onClick={cancelEditing}>
              Cancel
            </button>
            <button className="primary-button compact-button" onClick={() => void saveResponses()}>
              Save Final Musings
            </button>
          </div>
        )}
      </div>
      {(message || error) && (
        <div className={`home-alert ${error ? "error-alert" : "success-alert"}`} role="status">
          {error || message}
        </div>
      )}
      <div className="final-musings-list">
        {finalMusingsQuestions.map((question, index) => (
          <article className="final-musing-card" key={question}>
            <div className="final-musing-question">
              <span>Question {index + 1}</span>
              <h2>{question}</h2>
            </div>
            {isEditing ? (
              <textarea
                aria-label={question}
                value={draftResponses[index]}
                onChange={(event) => {
                  const nextResponses = [...draftResponses];
                  nextResponses[index] = event.target.value;
                  setDraftResponses(nextResponses);
                  setMessage("");
                  setError("");
                }}
                placeholder="Write your reflection in your own words..."
                rows={7}
              />
            ) : savedResponses[index] ? (
              <p className="long-form-copy">{savedResponses[index]}</p>
            ) : (
              <div className="empty-section">
                <p>This Final Musings response has not been completed yet.</p>
                {!readOnly && <button className="text-button" onClick={startEditing}>Start writing →</button>}
              </div>
            )}
          </article>
        ))}
      </div>
      <div className="privacy-note">
        <span className="note-icon">✦</span>
        <div>
          <strong>Share your reflection responsibly</strong>
          <p>
            These public responses should represent your own work. Do not include confidential
            patient information, and acknowledge sources, collaborators, and required AI use.
          </p>
        </div>
      </div>
    </>
  );
}
