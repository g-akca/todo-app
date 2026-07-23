import crossIcon from "/images/icon-cross.svg";
import Checkbox from "./Checkbox";

function TodoItem({ id, description, isCompleted }) {
  return (
    <button 
      className="
        group w-full py-4 px-5 border-b border-purple-800 flex justify-between 
        items-center gap-4 cursor-pointer tablet:p-6 light:border-purple-300
      "
    >
      <div className="flex items-center gap-4 tablet:gap-6">
        <Checkbox isCompleted={isCompleted} />

        <p 
          className={`
            mt-px tablet:text-[18px] tablet:leading-base tablet:mt-1 
            ${isCompleted ? "text-purple-700 line-through light:text-gray-300" : "text-purple-100 light:text-navy-850"}
          `}
        >
          {description}
        </p>
      </div>

      <div 
        className="shrink-0 cursor-pointer transition-all duration-200 desktop:opacity-0 desktop:group-hover:opacity-100" 
        role="button"
      >
        <img src={crossIcon} alt="Remove icon" className="w-3 aspect-square tablet:w-4.25" />
      </div>
    </button>
  )
}

export default TodoItem;