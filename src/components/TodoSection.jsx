import TodoList from "./TodoList";
import NewTodo from "./NewTodo";
import TabList from "./TabList";

function TodoSection() {
  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      <NewTodo />

      <div className="flex flex-col gap-4">
        <TodoList />

        <div 
          className="
            bg-navy-900 h-12 px-6 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)] 
            flex items-center justify-center tablet:hidden
          "
        >
          <TabList />
        </div>
      </div>
    </div>
  )
}

export default TodoSection;