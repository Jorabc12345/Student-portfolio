import { useState } from "react";

type PrototypeRole = "student" | "instructor" | "administrator";
type AccessGrant = {
  id: string;
  name: string;
  email: string;
  status: "active" | "revoked";
  createdAt: string;
};
type InvitationCode = {
  code: string;
  status: "active" | "disabled" | "replaced";
  updatedAt: string;
};

const GRANTS_KEY = "buksu-access-grants";
const CODE_KEY = "buksu-invitation-code";
const ROLE_KEY = "buksu-prototype-role";

function readGrants(): AccessGrant[] {
  const saved = localStorage.getItem(GRANTS_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved) as AccessGrant[];
  } catch (error) {
    console.error("Unable to read local access grants.", error);
    return [];
  }
}

function readCode(): InvitationCode | null {
  const saved = localStorage.getItem(CODE_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as InvitationCode;
  } catch (error) {
    console.error("Unable to read local invitation code.", error);
    return null;
  }
}

function newInvitationCode() {
  return `BUKSU-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export default function AccessPage() {
  const [role, setRole] = useState<PrototypeRole>(
    () => (localStorage.getItem(ROLE_KEY) as PrototypeRole) || "student",
  );
  const [grants, setGrants] = useState(readGrants);
  const [invitationCode, setInvitationCode] = useState(readCode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const changeRole = (nextRole: PrototypeRole) => {
    setRole(nextRole);
    localStorage.setItem(ROLE_KEY, nextRole);
    setMessage("");
    setError("");
  };

  const authorizeInstructor = () => {
    if (!name.trim() || !email.trim()) {
      setError("Enter the instructor name and institutional email.");
      return;
    }

    const nextGrants = [
      ...grants,
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: email.trim(),
        status: "active" as const,
        createdAt: new Date().toISOString(),
      },
    ];
    setGrants(nextGrants);
    localStorage.setItem(GRANTS_KEY, JSON.stringify(nextGrants));
    setName("");
    setEmail("");
    setMessage("Instructor authorized for this prototype portfolio.");
    setError("");
  };

  const revokeInstructor = (grantId: string) => {
    if (!window.confirm("Revoke this instructor's portfolio access?")) return;
    const nextGrants = grants.map((grant) =>
      grant.id === grantId ? { ...grant, status: "revoked" as const } : grant,
    );
    setGrants(nextGrants);
    localStorage.setItem(GRANTS_KEY, JSON.stringify(nextGrants));
    setMessage("Instructor access revoked.");
  };

  const saveCode = (status: InvitationCode["status"], code = invitationCode?.code) => {
    const nextCode = {
      code: code ?? newInvitationCode(),
      status,
      updatedAt: new Date().toISOString(),
    };
    setInvitationCode(nextCode);
    localStorage.setItem(CODE_KEY, JSON.stringify(nextCode));
    setMessage(
      status === "active"
        ? "Invitation code is active for future instructor registrations."
        : `Invitation code ${status}. Existing accounts and authorizations remain unchanged.`,
    );
  };

  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">Privacy & administration</p>
        <h1>Instructor access</h1>
        <p>
          Manage student authorization, instructor read-only access, and invitation-code settings.
        </p>
      </div>
      <div className="prototype-role-bar">
        <label>
          Prototype role
          <select
            value={role}
            onChange={(event) => changeRole(event.target.value as PrototypeRole)}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="administrator">Client administrator</option>
          </select>
        </label>
        <span>Local prototype mode - Supabase Auth and RLS are not active yet.</span>
      </div>
      {(message || error) && (
        <div className={`home-alert ${error ? "error-alert" : "success-alert"}`} role="status">
          {error || message}
        </div>
      )}
      {role === "student" && (
        <StudentAccessView
          grants={grants}
          name={name}
          email={email}
          setName={setName}
          setEmail={setEmail}
          authorize={authorizeInstructor}
          revoke={revokeInstructor}
        />
      )}
      {role === "instructor" && <InstructorView grants={grants} />}
      {role === "administrator" && (
        <AdministratorView code={invitationCode} saveCode={saveCode} grants={grants} />
      )}
    </>
  );
}

function StudentAccessView({
  grants,
  name,
  email,
  setName,
  setEmail,
  authorize,
  revoke,
}: {
  grants: AccessGrant[];
  name: string;
  email: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  authorize: () => void;
  revoke: (id: string) => void;
}) {
  return (
    <>
      <section className="access-form-card">
        <div>
          <p className="eyebrow">Student control</p>
          <h2>Authorize an instructor</h2>
          <p>Authorized instructors can view original content and provide separate guidance.</p>
        </div>
        <div className="access-form-grid">
          <label>
            Instructor name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Dr. Ana Reyes"
            />
          </label>
          <label>
            Institutional email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="instructor@buksu.edu.ph"
            />
          </label>
        </div>
        <button className="primary-button compact-button" onClick={authorize}>
          Authorize instructor
        </button>
      </section>
      <AccessList grants={grants} canRevoke revoke={revoke} />
    </>
  );
}

function AccessList({
  grants,
  canRevoke,
  revoke,
}: {
  grants: AccessGrant[];
  canRevoke: boolean;
  revoke: (id: string) => void;
}) {
  return (
    <section className="access-list">
      <div className="list-header">
        <h2>Portfolio authorizations</h2>
        <span className="private-label">
          {grants.filter((grant) => grant.status === "active").length} active
        </span>
      </div>
      {grants.length === 0 ? (
        <div className="empty-guidance">
          <span>✧</span>
          <h2>No instructors authorized</h2>
          <p>Your portfolio remains private until you authorize an instructor.</p>
        </div>
      ) : (
        grants.map((grant) => (
          <div className="access-row" key={grant.id}>
            <div className="avatar small">{grant.name.slice(0, 2).toUpperCase()}</div>
            <div>
              <strong>{grant.name}</strong>
              <small>
                {grant.email} · Authorized {new Date(grant.createdAt).toLocaleDateString()}
              </small>
            </div>
            <span className={grant.status === "active" ? "active-badge" : "status-badge"}>
              {grant.status === "active" ? "Active" : "Revoked"}
            </span>
            {canRevoke && grant.status === "active" && (
              <button className="danger-button" onClick={() => revoke(grant.id)}>
                Revoke access
              </button>
            )}
          </div>
        ))
      )}
    </section>
  );
}

function InstructorView({ grants }: { grants: AccessGrant[] }) {
  const authorized = grants.filter((grant) => grant.status === "active");
  return (
    <section className="instructor-workspace">
      <div className="detail-heading">
        <div>
          <span className="code-pill">INSTRUCTOR VIEW</span>
          <h2>Authorized portfolios</h2>
          <p>Only active student authorizations appear here.</p>
        </div>
      </div>
      {authorized.length === 0 ? (
        <div className="empty-guidance">
          <span>✧</span>
          <h2>No authorized portfolios</h2>
          <p>A student must authorize this instructor before content can be viewed.</p>
        </div>
      ) : (
        authorized.map((grant) => (
          <article className="authorized-portfolio" key={grant.id}>
            <div>
              <strong>Nour-Aliah N. Macarampat</strong>
              <small>
                {grant.name} · Access granted {new Date(grant.createdAt).toLocaleDateString()}
              </small>
            </div>
            <div className="readonly-content">
              <span>Read-only portfolio view</span>
              <p>Home Page · Level 1 · Artifacts · PLO Attainment · Final Musings</p>
            </div>
            <div className="permission-note">
              Instructors may review and provide separate feedback. They cannot edit, delete,
              upload, grade, or alter original student content.
            </div>
          </article>
        ))
      )}
    </section>
  );
}

function AdministratorView({
  code,
  saveCode,
  grants,
}: {
  code: InvitationCode | null;
  saveCode: (status: InvitationCode["status"], code?: string) => void;
  grants: AccessGrant[];
}) {
  return (
    <section className="admin-workspace">
      <div className="detail-heading">
        <div>
          <span className="code-pill">CLIENT ADMINISTRATOR</span>
          <h2>Instructor invitation-code management</h2>
          <p>Manage the shared code used by future instructor registrations.</p>
        </div>
      </div>
      <div className="admin-code-card">
        <span>Current status</span>
        <strong>{code?.status ?? "Not configured"}</strong>
        <code>{code?.code ?? "No invitation code generated"}</code>
        <small>
          {code
            ? `Last updated ${new Date(code.updatedAt).toLocaleString()}`
            : "Generate a code to begin."}
        </small>
        <div className="admin-actions">
          <button className="primary-button compact-button" onClick={() => saveCode("active")}>
            {code?.status === "active" ? "Reveal / regenerate code" : "Generate code"}
          </button>
          {code?.status === "active" && (
            <>
              <button className="secondary-button" onClick={() => saveCode("replaced")}>
                Replace code
              </button>
              <button className="danger-button" onClick={() => saveCode("disabled")}>
                Disable code
              </button>
            </>
          )}
        </div>
      </div>
      <div className="privacy-note">
        <span className="note-icon">i</span>
        <div>
          <strong>Future registrations only</strong>
          <p>
            Replacing or disabling the code does not revoke existing instructor accounts or
            portfolio authorizations. Current active authorizations in this prototype:{" "}
            {grants.filter((grant) => grant.status === "active").length}.
          </p>
        </div>
      </div>
    </section>
  );
}
