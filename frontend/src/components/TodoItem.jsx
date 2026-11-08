import crossIcon from "/images/icon-cross.svg";
import Checkbox from "./Checkbox";
import { useTasks } from "../context/TasksContext";

// Represents a single task row with completion, deletion, and drag-and-drop controls.
function TodoItem({
  id,
  description,
  isCompleted,
  isDragging,
  isDropTarget,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onDelete,
}) {
  const { updateTaskCompletion } = useTasks();

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`
        group w-full border-b border-purple-800 bg-navy-900 transition-all duration-200
        ${isDragging ? "opacity-50" : "opacity-100"}
        ${isDropTarget ? "bg-purple-950/50" : ""}
        light:bg-white light:border-purple-300
      `}
    >
      <div className="flex w-full items-center gap-4 py-4 px-5 tablet:p-6">
        <button
          type="button"
          onClick={() => updateTaskCompletion(id, !isCompleted)}
          aria-pressed={isCompleted}
          aria-label={`${isCompleted ? "Mark as incomplete" : "Mark as complete"}: ${description}`}
          className="flex flex-1 items-center justify-between gap-4 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4 tablet:gap-6">
            <Checkbox isCompleted={isCompleted} />

            <p
              className={`
                text-start wrap-anywhere mt-px tablet:text-[18px] tablet:leading-base tablet:mt-1
                ${isCompleted ? "text-purple-700 line-through light:text-gray-300" : "text-purple-100 light:text-navy-850"}
              `}
            >
              {description}
            </p>
          </div>
        </button>

        <button
          type="button"
          data-delete-button="true"
          data-task-id={id}
          onClick={() => onDelete(id)}
          aria-label={`Delete task: ${description}`}
          className="shrink-0 cursor-pointer transition-all duration-200 desktop:opacity-0 desktop:group-hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 light:focus-visible:ring-offset-white"
        >
          <img src={crossIcon} alt="" aria-hidden="true" className="w-3 aspect-square tablet:w-4.25" />
        </button>
      </div>
    </div>
  )
}

export default TodoItem;