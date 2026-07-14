import crossIcon from "/images/icon-cross.svg";

function TodoItem({ id, isCompleted, task }) {
  return (
    <div className="py-4 px-5 border-b border-purple-800 flex justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="w-5 aspect-square rounded-full border border-purple-800" />

        <p className="text-purple-100">{task}</p>
      </div>

      <button type="button">
        <img src={crossIcon} alt="" className="w-3 aspect-square" />
      </button>
    </div>
  )
}

export default TodoItem;