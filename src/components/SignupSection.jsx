function SignupSection() {
  return (
    <form 
      className="
        flex flex-col gap-5 rounded-[5px] bg-navy-900 px-5 py-6 
        shadow-[0_35px_50px_rgba(0,0,0,0.5)] tablet:p-6 tablet:gap-6
      "
    >
      <h2 className="text-[24px] font-bold leading-base text-purple-100 tablet:text-[32px]">Sign Up</h2>

      <div className="flex flex-col gap-4 text-[14px] leading-base text-purple-300 tablet:text-[18px] tablet:gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="
              rounded-[5px] border border-purple-700 bg-navy-950/80 px-4 py-3 
              text-purple-100 placeholder:text-purple-600 tablet:py-3.5
            "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="
              rounded-[5px] border border-purple-700 bg-navy-950/80 px-4 py-3 
              text-purple-100 placeholder:text-purple-600 tablet:py-3.5
            "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Enter your password again"
            className="
              rounded-[5px] border border-purple-700 bg-navy-950/80 px-4 py-3 
              text-purple-100 placeholder:text-purple-600 tablet:py-3.5
            "
          />
        </div>

        <label className="flex items-center gap-2 text-base leading-base tablet:text-[15px]">
          <input type="checkbox" className="h-3.5 aspect-square rounded border-purple-600 accent-blue-500 tablet:h-4" />
          <p className="mt-px tablet:mt-0.75">Remember me</p>
        </label>
      </div>

      <button
        type="submit"
        className="rounded-[5px] bg-blue-500 p-3 text-[14px] font-bold leading-base text-white tablet:pt-3.75 tablet:text-[18px]"
      >
        Sign Up
      </button>
    </form>
  )
}

export default SignupSection;