import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import AuthField from "./AuthField";
import AuthFormShell from "./AuthFormShell";

// Handles the signup form, password confirmation, and redirect after account creation.
function SignupSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Submit the new account details, show errors if validation fails, and route the user in.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(email, password, confirmPassword, rememberMe);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormShell
      title="Sign Up"
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      submitText="Sign Up"
      loadingText="Signing up..."
      errorId="signup-error"
      headingId="signup-heading"
    >
      <AuthField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
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
        autoComplete="new-password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={8}
        maxLength={32}
        required
      />

      <AuthField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
        placeholder="Enter your password again"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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

export default SignupSection;