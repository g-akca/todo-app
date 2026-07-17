import crossIcon from "/images/icon-cross.svg";
import CheckIcon from "./icons/CheckIcon";

function TodoItem({ id, isCompleted, task }) {
  return (
    <div className="py-4 px-5 border-b border-purple-800 flex justify-between items-center gap-4 tablet:p-6">
      <div className="flex items-center gap-4 tablet:gap-6">
        <div 
          className={`
            shrink-0 w-5 aspect-square rounded-full tablet:w-6
            ${isCompleted ? 
              "flex justify-center items-center bg-linear-135 from-[#55DDFF] to-[#C058F3]" 
              : "border border-purple-800"
            }`
          }
        >
          {isCompleted && (
            <CheckIcon />
          )}
        </div>

        <p 
          className={`
            mt-px tablet:text-[18px] tablet:leading-base tablet:mt-1 
            ${isCompleted ? "text-purple-700 line-through" : "text-purple-100"}
          `}
        >
          {task}
        </p>
      </div>

      <button type="button" className="shrink-0">
        <img src={crossIcon} alt="Remove icon" className="w-3 aspect-square tablet:w-4.25" />
      </button>
    </div>
  )
}

export default TodoItem;