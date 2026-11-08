import TodoList from "./TodoList";
import NewTodo from "./NewTodo";
import TabList from "./TabList";
import { useTasks } from "../context/TasksContext";

function TodoDashboard() {
  const { announcement } = useTasks();

  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      {/* Shared live region announcing task changes (add, complete, delete, clear) to screen readers.
          Keying the message node forces a DOM change so repeated messages are re-announced. */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement.message && <span key={announcement.id}>{announcement.message}</span>}
      </div>

      <NewTodo />

      <div className="flex flex-col gap-4">
        <TodoList />

        <div 
          className="
            bg-navy-900 h-12 px-6 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)] flex items-center 
            justify-center tablet:hidden light:bg-white light:shadow-[0_35px_50px_rgba(194,195,214,0.5)] 
          "
        >
          <TabList />
        </div>
      </div>
    </div>
  )
}

export default TodoDashboard;