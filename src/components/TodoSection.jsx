import TodoList from "./TodoList";
import NewTodo from "./NewTodo";

function TodoSection() {
  return (
    <div className="flex flex-col gap-4">
      <NewTodo />

      <div className="flex flex-col gap-4">
        <TodoList />

        <div className="bg-navy-900 h-12 px-6 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)] flex items-center justify-center gap-4 font-bold text-[14px] leading-base">
          <p className="text-blue-500">All</p>
          <p>Active</p>
          <p>Completed</p>
        </div>
      </div>
    </div>
  )
}

export default TodoSection;