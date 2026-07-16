import LoginSection from "./LoginSection";

function LoginWrapper() {
  return (
    <div className="flex flex-col gap-10">
      <LoginSection />
      
      <p className="text-center text-[14px] leading-base">First time here? <a>Sign Up</a></p>
    </div>
  )
}

export default LoginWrapper;