import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import AuthField from "./AuthField";
import AuthFormShell from "./AuthFormShell";

// Handles the login form, validation feedback, and redirect after authentication.
function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Submit the credentials, show errors if needed, and send the user to the dashboard.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password, rememberMe);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormShell
      title="Log In"
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      submitText="Log In"
      loadingText="Logging in..."
      errorId="login-error"
      headingId="login-heading"
    >
      <AuthField
        id="email"
        label="Email"
        type="email"
        autoComplete="username"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        minLength={5}
        maxLength={254}
        required
      />

      <AuthField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={8}
        maxLength={32}
        required
      />

      <label className="flex cursor-pointer items-center gap-2 text-base leading-base tablet:text-[15px] light:text-navy-850">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-3.5 aspect-square rounded border-purple-600 accent-blue-500 cursor-pointer tablet:h-4 light:border-purple-300"
        />
        <p className="mt-px tablet:mt-0.75">Remember me</p>
      </label>
    </AuthFormShell>
  );
}

export default LoginSection;