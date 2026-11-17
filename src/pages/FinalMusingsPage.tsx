import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useConfirmationDialog } from "../components/useConfirmationDialog";
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

export default function FinalMusingsPage({
  readOnly = false,
  onBack,
}: {
  readOnly?: boolean;
  onBack: () => void;
}) {
  const [savedResponses, setSavedResponses] = useState(loadResponses);
  const [draftResponses, setDraftResponses] = useState(savedResponses);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { requestConfirmation, confirmationDialog } = useConfirmationDialog();
  const isEditing = editingIndex !== null;
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

  const startEditing = async (index: number) => {
    if (isDirty) {
      const confirmed = await requestConfirmation({
        eyebrow: "Unsaved Final Musings",
        title: "Discard your changes?",
        description:
          "Your current response hasn’t been saved. Switching questions will discard those edits.",
        confirmLabel: "Discard changes",
        cancelLabel: "Keep editing",
        destructive: true,
      });
      if (!confirmed) {
        return;
      }
    }

    setDraftResponses(savedResponses);
    setEditingIndex(index);
    setMessage("");
    setError("");
  };

  const cancelEditing = async () => {
    if (isDirty) {
      const confirmed = await requestConfirmation({
        eyebrow: "Unsaved Final Musings",
        title: "Discard your changes?",
        description: "Your response hasn’t been saved. Leaving now will discard those edits.",
        confirmLabel: "Discard changes",
        cancelLabel: "Keep editing",
        destructive: true,
      });
      if (!confirmed) {
        return;
      }
    }

    setDraftResponses(savedResponses);
    setEditingIndex(null);
    setError("");
  };

  const saveResponses = async () => {
    setError("");
    setMessage("");
    setSaving(true);
    try {
      await setPortfolioItem(STORAGE_KEY, JSON.stringify(draftResponses));
      setSavedResponses(draftResponses);
      setDraftResponses(draftResponses);
      setEditingIndex(null);
      setError("");
      setMessage("Final Musings saved successfully.");
    } catch (saveError: unknown) {
      console.error("Unable to save Final Musings.", saveError);
      setError(
        `Final Musings could not be saved to the shared portfolio. ${
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
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to Level 1
        </button>
        <p className="eyebrow">Level 1 global section</p>
        <h1>Final Musings</h1>
        <p>Look back on your Level 1 journey and the physician you are becoming.</p>
      </div>
      <div className="final-musings-toolbar">
        <div>
          <strong>{completedCount} of 5 questions answered</strong>
          <p>Saved reflections are visible to portfolio visitors.</p>
        </div>
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
            {editingIndex === index ? (
              <div className="final-musing-editor">
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
                <div className="final-musing-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={cancelEditing}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="primary-button compact-button"
                    onClick={() => void saveResponses()}
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
            ) : savedResponses[index] ? (
              <>
                <p className="long-form-copy">{savedResponses[index]}</p>
                {!readOnly && (
                  <button className="text-button" onClick={() => startEditing(index)}>
                    Edit response →
                  </button>
                )}
              </>
            ) : (
              <div className="empty-section">
                <p>This Final Musings response has not been completed yet.</p>
                {!readOnly && (
                  <button className="text-button" onClick={() => startEditing(index)}>
                    Start writing →
                  </button>
                )}
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
      {confirmationDialog}
    </>
  );
}
