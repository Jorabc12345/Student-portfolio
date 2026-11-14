import { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { supabase } from "../services/supabase";
import collegeOfMedicineLogo from "../assets/college-of-medicine-logo.jpg";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [complete, setComplete] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmation) {
      setMessage("Those passwords don't match yet.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) setMessage("This reset link may have expired. Request a new one and try again.");
    else {
      setComplete(true);
      setMessage("Your password has been updated. You can now continue to your portfolio.");
    }
  }

  return (
    <main className="login-page"><div className="login-frame reset-frame"><section className="login-story"><div className="login-brand"><img className="login-brand-mark" src={collegeOfMedicineLogo} alt="BukSU College of Medicine seal" /><span><strong>BukSU</strong><small>College of Medicine</small></span></div><div className="story-content"><span className="story-kicker"><LockKeyhole size={15} /> Account security</span><h1>A fresh start<br />for your next<br /><em>chapter.</em></h1><p>Choose a new password to keep your learning journey safe.</p></div><div className="story-footer">LEARN WITH PURPOSE <span>·</span> GROW WITH CARE</div></section><section className="login-panel"><div className="login-panel-top"><span>STUDENT PORTFOLIO</span><span className="secure-label"><LockKeyhole size={13} /> Secure sign in</span></div><div className="login-form-wrap"><div className="login-mobile-brand"><img className="login-brand-mark" src={collegeOfMedicineLogo} alt="BukSU College of Medicine seal" /><span><strong>BukSU</strong><small>College of Medicine</small></span></div><p className="login-eyebrow">PASSWORD RECOVERY</p><h2>{complete ? "You're all set" : "Choose a new password"}</h2><p className="login-subtitle">{complete ? "Your account is ready for you." : "Use a password you haven't used for this account before."}</p>{!complete && <form onSubmit={handleSubmit}><label htmlFor="new-password">New password</label><div className="login-input-wrap"><LockKeyhole size={18} /><input id="new-password" type="password" autoComplete="new-password" minLength={8} placeholder="At least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} required /></div><label htmlFor="confirm-password">Confirm new password</label><div className="login-input-wrap"><LockKeyhole size={18} /><input id="confirm-password" type="password" autoComplete="new-password" minLength={8} placeholder="Enter it again" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required /></div><button className="login-submit" disabled={busy}>{busy ? "Updating…" : "Update password"}<ArrowRight size={18} /></button></form>}{message && <p className={`login-message ${complete ? "success" : ""}`} role="status">{message}</p>}{complete && <a className="login-submit reset-link" href="/">Continue to portfolio<ArrowRight size={18} /></a>}</div><footer className="login-footer"><span>© BukSU College of Medicine</span><span>Your portfolio is private and secure.</span></footer></section></div></main>
  );
}


