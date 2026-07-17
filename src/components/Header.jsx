import sunIcon from "/images/icon-sun.svg";

function Header() {
  return (
    <header className="flex justify-between items-center gap-4">
      <h1 
        className="
          uppercase text-white tracking-[10px] text-[26px] leading-base 
          font-bold mt-1.5 tablet:text-[40px] tablet:tracking-[14px]
        "
      >
        Todo
      </h1>

      <img src={sunIcon} alt="Sun icon" className="w-5 aspect-square tablet:w-6.5" />
    </header>
  )
}

export default Header;