import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

type ProfilePageProps = {
  name: string;
  email: string;
  program: string;
  onProfileUpdated: (name: string, program: string) => void;
};

export default function ProfilePage({ name, email, program, onProfileUpdated }: ProfilePageProps) {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [draftProgram, setDraftProgram] = useState(program);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setDraftName(name);
    setDraftProgram(program);
  }, [name, program]);

  function cancelEditing() {
    setDraftName(name);
    setDraftProgram(program);
    setError("");
    setEditing(false);
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    const { data, error: updateError } = await supabase.auth.updateUser({
      data: { full_name: draftName.trim(), program: draftProgram.trim() },
    });
    setSaving(false);

    if (updateError) {
      setError("Your profile changes could not be saved. Please try again.");
      return;
    }

    const savedName = String(data.user.user_metadata.full_name ?? "");
    const savedProgram = String(data.user.user_metadata.program ?? "");
    onProfileUpdated(savedName, savedProgram);
    setDraftName(savedName);
    setDraftProgram(savedProgram);
    setEditing(false);
    setMessage("Your profile was updated.");
  }

  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">Account</p>
        <h1>Profile & settings</h1>
        <p>Manage the name and program shown in your portfolio.</p>
      </div>
      <form className="settings-card" onSubmit={saveProfile}>
        <label>
          Full name
          <input value={editing ? draftName : name} onChange={(event) => setDraftName(event.target.value)} readOnly={!editing} required />
        </label>
        <label>
          Registered sign-in email
          <input value={email} readOnly type="email" aria-label="Registered sign-in email, read only" />
          <small>This is the email used to register and sign in. It cannot be changed here.</small>
        </label>
        <label>
          Program
          <input value={editing ? draftProgram : program} onChange={(event) => setDraftProgram(event.target.value)} readOnly={!editing} required />
        </label>
        {error && <p className="login-message" role="alert">{error}</p>}
        {message && <p className="login-message success" role="status">{message}</p>}
        {editing ? (
          <div className="toolbar-actions">
            <button className="secondary-button" type="button" onClick={cancelEditing} disabled={saving}>Cancel</button>
            <button className="primary-button" type="submit" disabled={saving}>{saving ? "Saving…" : "Save profile"}</button>
          </div>
        ) : (
          <button className="primary-button" type="button" onClick={() => { setMessage(""); setEditing(true); }}>Edit profile</button>
        )}
      </form>
    </>
  );
}
