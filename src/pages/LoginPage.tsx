import { FormEvent, useState } from "react";
import { ArrowRight, BookOpen, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { supabase } from "../services/supabase";
import collegeOfMedicineLogo from "../assets/college-of-medicine-logo.jpg";

export default function LoginPage({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [recoverySent, setRecoverySent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        if (error.code === "email_not_confirmed") {
          setMessage("This account's email hasn't been confirmed. Check your inbox and spam folder, or ask for a new confirmation email.");
        } else if (error.code === "invalid_credentials") {
          setMessage("This email and password weren't recognized by the deployed portfolio. Confirm you registered on this same Supabase project, then try again.");
        } else if (error.code === "over_request_rate_limit") {
          setMessage("Too many sign-in attempts. Wait a few minutes, then try again.");
        } else {
          setMessage(`Sign-in failed (${error.code ?? error.status}): ${error.message}`);
        }
      } else onSignedIn();
    } catch {
      setMessage("The portfolio couldn't reach Supabase. Check the deployment's VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY settings.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRecovery() {
    if (!email.trim()) {
      setMessage("Enter your email address first, then select Forgot password.");
      return;
    }
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    setRecoverySent(true);
    setMessage(error
      ? "We couldn't send the reset email right now. Please try again later."
      : "If an account exists for that email, a password reset link is on its way.");
  }

  return (
    <main className="login-page">
      <div className="login-frame">
        <section className="login-story" aria-label="BukSU College of Medicine portfolio">
          <div className="login-brand">
            <img className="login-brand-mark" src={collegeOfMedicineLogo} alt="BukSU College of Medicine seal" />
            <span><strong>BukSU</strong><small>College of Medicine</small></span>
          </div>
          <div className="story-content">
            <span className="story-kicker"><BookOpen size={15} /> A space for your growth</span>
            <h1>Your journey<br />in medicine,<br /><em>all in one place.</em></h1>
            <p>Reflect on what you learn, gather the work you’re proud of, and see how far you’ve come.</p>
            <div className="story-rule"><span /><span /><span /></div>
          </div>
          <div className="story-footer">LEARN WITH PURPOSE <span>·</span> GROW WITH CARE</div>
          <div className="story-orbit orbit-one" /><div className="story-orbit orbit-two" />
        </section>

        <section className="login-panel">
          <div className="login-panel-top"><span>STUDENT PORTFOLIO</span><span className="secure-label"><LockKeyhole size={13} /> Secure sign in</span></div>
          <div className="login-form-wrap">
            <div className="login-mobile-brand"><img className="login-brand-mark" src={collegeOfMedicineLogo} alt="BukSU College of Medicine seal" /><span><strong>BukSU</strong><small>College of Medicine</small></span></div>
            <p className="login-eyebrow">OWNER ACCESS</p>
            <h2>Sign in to manage your portfolio</h2>
            <p className="login-subtitle">Owner access only. Everyone else can view the portfolio without signing in.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="login-email">Email address</label>
              <div className="login-input-wrap"><Mail size={18} aria-hidden="true" /><input id="login-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
              <div className="login-password-heading"><label htmlFor="login-password">Password</label><button type="button" className="forgot-link" onClick={handleRecovery} disabled={busy}>Forgot password?</button></div>
              <div className="login-input-wrap"><LockKeyhole size={18} aria-hidden="true" /><input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" className="password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((shown) => !shown)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
              {message && <p className={`login-message ${recoverySent ? "success" : ""}`} role="status">{message}</p>}
              <button className="login-submit" type="submit" disabled={busy}>{busy ? "Please wait…" : "Sign in"}<ArrowRight size={18} /></button>
            </form>
            <p className="login-help"><a className="forgot-link" href="/">Back to public portfolio</a></p>
          </div>
          <footer className="login-footer"><span>© BukSU College of Medicine</span><span>Secure owner sign in</span></footer>
        </section>
      </div>
    </main>
  );
}
