import CheckIcon from "./icons/CheckIcon";

function Checkbox({ isCompleted }) {
  return (
    <div
      className={`
        shrink-0 w-5 aspect-square rounded-full bg-linear-to-br cursor-pointer transition-colors duration-300 tablet:w-6
        ${
          isCompleted
            ? "flex justify-center items-center from-[#55DDFF] to-[#C058F3]"
            : "bg-purple-800 p-px group-hover:border-none group-hover:from-[#55DDFF] group-hover:to-[#C058F3]"
        }
      `}
    >
      {isCompleted ? (
        <CheckIcon />
      ) : (
        <div className="w-full h-full rounded-full bg-navy-900" />
      )}
    </div>
  )
}

export default Checkbox;