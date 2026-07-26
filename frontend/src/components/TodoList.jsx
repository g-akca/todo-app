import { useTasks } from "../context/TasksContext";
import TabList from "./TabList";
import TodoItem from "./TodoItem";

function TodoList() {
  const { tasks } = useTasks();

  const itemsLeft = tasks.filter(item => !item.is_completed).length;
  const completedTasksCount = tasks.filter(item => item.is_completed).length;

  return (
    <div 
      className="
        bg-navy-900 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)] 
        light:bg-white light:shadow-[0_35px_50px_rgba(194,195,214,0.5)]
      "
    >
      {tasks.map(item => (
        <TodoItem
          key={item.id}
          id={item.id}
          description={item.description}
          isCompleted={item.is_completed}
        />
      ))}

      <div className="py-4 px-5 flex justify-between items-center tablet:p-6 tablet:grid tablet:grid-cols-3">
        <p>{itemsLeft} items left</p>

        <div className="hidden tablet:block">
          <TabList />
        </div>

        <button 
          type="button" 
          disabled={completedTasksCount === 0}
          className={`transition-all tablet:justify-self-end ${completedTasksCount === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:text-purple-300 light:hover:text-navy-850"}`}
        >
          Clear Completed
        </button>
      </div>
    </div>
  )
}

export default TodoList;