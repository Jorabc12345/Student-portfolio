import { FormEvent, useState } from "react";
import { ArrowRight, BookOpen, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { supabase } from "../services/supabase";
import collegeOfMedicineLogo from "../assets/college-of-medicine-logo.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [recoverySent, setRecoverySent] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [fullName, setFullName] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    if (mode === "register") {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
          emailRedirectTo: window.location.origin,
        },
      });
      setBusy(false);
      if (error) {
        const detail = error.message.toLowerCase();
        if (detail.includes("email_address_not_authorized")) {
          setMessage("Supabase's default email sender only delivers to project team addresses. Configure custom SMTP to send confirmations to other users.");
        } else if (detail.includes("email rate limit") || detail.includes("over_email_send_rate_limit")) {
          setMessage("Supabase's email sending limit has been reached. Wait before trying again or configure custom SMTP.");
        } else {
          setMessage("We couldn't register this account. It may already exist; try signing in or use Forgot password.");
        }
        return;
      }
      if (data.session) await supabase.auth.signOut();
      setMode("login");
      setPassword("");
      setFullName("");
      setRecoverySent(true);
      setMessage(data.session
        ? "Account created. Sign in to view the portfolio."
        : "Registration received. Check your email and spam folder for the confirmation link, then sign in.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setMessage("We couldn't sign you in. Check your email and password, then try again.");
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
            <p className="login-eyebrow">YOUR PRIVATE PORTFOLIO</p>
            <h2>{mode === "login" ? "Sign in to the portfolio" : "Register to view the portfolio"}</h2>
            <p className="login-subtitle">This is one shared portfolio. The owner can edit it; signed-in visitors can view it.</p>
            <form onSubmit={handleSubmit}>
              {mode === "register" && <><label htmlFor="owner-name">Full name</label><div className="login-input-wrap"><input id="owner-name" type="text" autoComplete="name" placeholder="Your full name" value={fullName} onChange={(event) => setFullName(event.target.value)} required /></div></>}
              <label htmlFor="login-email">Email address</label>
              <div className="login-input-wrap"><Mail size={18} aria-hidden="true" /><input id="login-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
              <div className="login-password-heading"><label htmlFor="login-password">Password</label>{mode === "login" && <button type="button" className="forgot-link" onClick={handleRecovery} disabled={busy}>Forgot password?</button>}</div>
              <div className="login-input-wrap"><LockKeyhole size={18} aria-hidden="true" /><input id="login-password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={mode === "register" ? 8 : undefined} placeholder={mode === "login" ? "Enter your password" : "At least 8 characters"} value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" className="password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((shown) => !shown)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
              {message && <p className={`login-message ${recoverySent ? "success" : ""}`} role="status">{message}</p>}
              <button className="login-submit" type="submit" disabled={busy}>{busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}<ArrowRight size={18} /></button>
            </form>
            <p className="login-help">{mode === "login" ? <>No account yet? <button className="forgot-link" type="button" onClick={() => { setMode("register"); setMessage(""); setRecoverySent(false); }}>Register first</button></> : <>Already registered? <button className="forgot-link" type="button" onClick={() => { setMode("login"); setMessage(""); setRecoverySent(false); }}>Sign in</button></>}</p>
          </div>
          <footer className="login-footer"><span>© BukSU College of Medicine</span><span>Your portfolio is private and secure.</span></footer>
        </section>
      </div>
    </main>
  );
}
