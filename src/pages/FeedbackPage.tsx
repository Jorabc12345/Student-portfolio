import { useState } from "react";

type ReviewRecord = {
  id: string;
  kind: "review" | "feedback";
  instructor: string;
  target: string;
  body: string;
  createdAt: string;
};

const REVIEWS_KEY = "buksu-instructor-reviews";
const GRANTS_KEY = "buksu-access-grants";

function readReviews(): ReviewRecord[] {
  const saved = localStorage.getItem(REVIEWS_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved) as ReviewRecord[];
  } catch (error) {
    console.error("Unable to read local instructor reviews.", error);
    return [];
  }
}

function hasActiveGrant() {
  const saved = localStorage.getItem(GRANTS_KEY);
  if (!saved) return false;
  try {
    return (JSON.parse(saved) as { status: string }[]).some((grant) => grant.status === "active");
  } catch (error) {
    console.error("Unable to read local portfolio grants.", error);
    return false;
  }
}

export default function FeedbackPage() {
  const [role, setRole] = useState(() => localStorage.getItem("buksu-prototype-role") || "student");
  const [reviews, setReviews] = useState(readReviews);
  const [target, setTarget] = useState("Level 1 portfolio");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const activeGrant = hasActiveGrant();

  const createRecord = (kind: ReviewRecord["kind"]) => {
    if (!activeGrant) {
      setError("An active student portfolio authorization is required before instructor review.");
      return;
    }
    if (!body.trim()) {
      setError(`Write a ${kind} before saving.`);
      return;
    }
    const nextReviews = [
      ...reviews,
      {
        id: crypto.randomUUID(),
        kind,
        instructor: "Prototype Instructor",
        target,
        body: body.trim(),
        createdAt: new Date().toISOString(),
      },
    ];
    setReviews(nextReviews);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(nextReviews));
    setBody("");
    setMessage(
      `${kind === "review" ? "Review" : "Feedback"} created separately from student content.`,
    );
    setError("");
  };

  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">Guidance</p>
        <h1>Reviews & feedback</h1>
        <p>Instructor guidance is separate from original student portfolio content.</p>
      </div>
      <div className="prototype-role-bar">
        <label>
          Prototype role
          <select
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
              localStorage.setItem("buksu-prototype-role", event.target.value);
            }}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </label>
        <span>Local prototype mode - real authentication and RLS are not active yet.</span>
      </div>
      {(message || error) && (
        <div className={`home-alert ${error ? "error-alert" : "success-alert"}`} role="status">
          {error || message}
        </div>
      )}
      {role === "instructor" && (
        <section className="feedback-composer">
          <div className="detail-heading">
            <div>
              <span className="code-pill">INSTRUCTOR WORKSPACE</span>
              <h2>Create separate guidance</h2>
              <p>Original student content is read-only and cannot be edited or deleted.</p>
            </div>
          </div>
          <label>
            Review or feedback target
            <input value={target} onChange={(event) => setTarget(event.target.value)} />
          </label>
          <label>
            Guidance
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="Write a review or feedback note..."
              rows={6}
            />
          </label>
          <div className="feedback-actions">
            <button className="secondary-button" onClick={() => createRecord("review")}>
              Create review
            </button>
            <button
              className="primary-button compact-button"
              onClick={() => createRecord("feedback")}
            >
              Create separate feedback
            </button>
          </div>
        </section>
      )}
      <section className="feedback-records">
        <div className="list-header">
          <h2>{role === "instructor" ? "Created guidance" : "Received guidance"}</h2>
        </div>
        {reviews.length === 0 ? (
          <div className="empty-guidance">
            <span>✧</span>
            <h2>No guidance yet</h2>
            <p>
              Reviews and feedback will appear here after an authorized instructor creates them.
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <article className="feedback-card" key={review.id}>
              <div className="feedback-meta">
                <span className="avatar small">PI</span>
                <div>
                  <strong>{review.instructor}</strong>
                  <small>
                    {review.kind === "review" ? "Review" : "Separate feedback"} · {review.target} ·{" "}
                    {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <span className="status-badge">{review.kind}</span>
              </div>
              <p>{review.body}</p>
            </article>
          ))
        )}
      </section>
    </>
  );
}
