import LoginSection from "./LoginSection";
import { Link } from "react-router";

function LoginWrapper() {
  return (
    <div className="flex flex-col gap-10 tablet:gap-6">
      <LoginSection />
      
      <p className="text-center text-[14px] leading-base tablet:text-[16px]">
        First time here? <Link to="/signup" className="text-blue-500 font-semibold transition-all hover:text-purple-300">Sign Up</Link>
      </p>
    </div>
  )
}

export default LoginWrapper;