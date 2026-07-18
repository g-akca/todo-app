import crossIcon from "/images/icon-cross.svg";
import CheckIcon from "./icons/CheckIcon";

function TodoItem({ id, isCompleted, task }) {
  return (
    <div className="group py-4 px-5 border-b border-purple-800 flex justify-between items-center gap-4 cursor-pointer tablet:p-6">
      <div className="flex items-center gap-4 tablet:gap-6">
        <button
          className={`
            shrink-0 w-5 aspect-square rounded-full cursor-pointer tablet:w-6
            ${
              isCompleted
                ? "flex justify-center items-center bg-linear-to-br from-[#55DDFF] to-[#C058F3]"
                : "border border-purple-800 group-hover:border-none group-hover:p-px group-hover:bg-linear-to-br group-hover:from-[#55DDFF] group-hover:to-[#C058F3]"
            }
          `}
        >
          {isCompleted ? (
            <CheckIcon />
          ) : (
            <div className="w-full h-full rounded-full bg-navy-900" />
          )}
        </button>

        <button 
          className={`
            mt-px cursor-pointer tablet:text-[18px] tablet:leading-base tablet:mt-1 
            ${isCompleted ? "text-purple-700 line-through" : "text-purple-100"}
          `}
        >
          {task}
        </button>
      </div>

      <button type="button" className="shrink-0 cursor-pointer desktop:hidden group-hover:block">
        <img src={crossIcon} alt="Remove icon" className="w-3 aspect-square tablet:w-4.25" />
      </button>
    </div>
  )
}

export default TodoItem;