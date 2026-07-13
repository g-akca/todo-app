import TodoItem from "./TodoItem";

function TodoList() {
  return (
    <div className="bg-navy-900 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)] flex flex-col">
      <TodoItem />
      <TodoItem />

      <div className="py-4 px-5 flex justify-between items-center">
        <p>5 items left</p>

        <p>Clear Completed</p>
      </div>
    </div>
  )
}

export default TodoList;