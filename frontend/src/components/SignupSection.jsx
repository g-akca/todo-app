import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

function SignupSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

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
    <form 
      onSubmit={handleSubmit}
      className="
        flex flex-col gap-5 rounded-[5px] bg-navy-900 px-5 py-6 
        shadow-[0_35px_50px_rgba(0,0,0,0.5)] tablet:p-6 tablet:gap-6
        light:bg-white light:shadow-[0_35px_50px_rgba(194,195,214,0.5)]
      "
    >
      <h2 className="text-[24px] font-bold leading-base text-purple-100 tablet:text-[32px] light:text-navy-850">Sign Up</h2>

      {error && (
        <div className="rounded-[5px] bg-red-900/30 border border-red-600 px-4 py-2 text-[14px] text-red-400">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 text-[14px] leading-base text-purple-300 tablet:text-[18px] tablet:gap-5 light:text-navy-850">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              rounded-[5px] border border-purple-700 bg-navy-950/80 px-4 py-3 transition-all text-purple-100 
              placeholder:text-purple-600 tablet:py-3.5 hover:border-blue-500 focus:outline-none focus:border-blue-500
              light:border-purple-300 light:bg-white light:text-navy-850 light:placeholder:text-purple-300
            "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              rounded-[5px] border border-purple-700 bg-navy-950/80 px-4 py-3 transition-all text-purple-100 
              placeholder:text-purple-600 tablet:py-3.5 hover:border-blue-500 focus:outline-none focus:border-blue-500
              light:border-purple-300 light:bg-white light:text-navy-850 light:placeholder:text-purple-300
            "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="
              rounded-[5px] border border-purple-700 bg-navy-950/80 px-4 py-3 transition-all text-purple-100 
              placeholder:text-purple-600 tablet:py-3.5 hover:border-blue-500 focus:outline-none focus:border-blue-500
              light:border-purple-300 light:bg-white light:text-navy-850 light:placeholder:text-purple-300
            "
          />
        </div>

        <label className="flex items-center gap-2 text-base leading-base cursor-pointer tablet:text-[15px] light:text-navy-850">
          <input 
            type="checkbox" 
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-3.5 aspect-square rounded border-purple-600 accent-blue-500 cursor-pointer tablet:h-4 light:border-purple-300" 
          />
          <p className="mt-px tablet:mt-0.75">Remember me</p>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          rounded-[5px] bg-blue-500 p-3 text-[14px] font-bold leading-base text-white cursor-pointer 
          transition-all tablet:pt-3.75 tablet:text-[18px] hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  )
}

export default SignupSection;