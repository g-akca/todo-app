import SignupSection from "./SignupSection";
import { Link } from "react-router";

function SignupWrapper() {
  return (
    <div className="flex flex-col gap-10 tablet:gap-6">
      <SignupSection />
      
      <p className="text-center text-[14px] leading-base tablet:text-[16px]">
        Got an account? <Link to="/login" className="text-blue-500 font-semibold">Log In</Link>
      </p>
    </div>
  )
}

export default SignupWrapper;