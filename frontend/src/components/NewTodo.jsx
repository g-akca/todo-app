import { useState } from "react";
import { useTasks } from "../context/TasksContext";

// Renders the input form used to create a new task.
function NewTodo() {
  const { createTask } = useTasks();
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");

  // Submit task for creation, show errors if needed.
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!todo.trim()) {
      setError("A task description is required.");
      return;
    }

    try {
      await createTask(todo);
      setTodo("");
    } catch (e) {
      setError(e.message || "Failed to create new task");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <form 
        onSubmit={handleSubmit}
        className="
          bg-navy-900 h-12 px-6 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)] flex items-center 
          gap-4 tablet:h-16 tablet:gap-6 light:bg-white light:shadow-[0_35px_50px_rgba(194,195,214,0.5)]
        "
      >
        <div className="w-5 aspect-square rounded-full border border-purple-800 tablet:w-6 light:border-purple-300" />

        <input 
          type="text"
          id="todo"
          placeholder="Create a new todo…"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          className="
            w-full py-1 text-gray-600 mt-px caret-blue-500 placeholder:text-gray-600 
            tablet:text-[18px] tablet:leading-base tablet:mt-0.5 focus:outline-none light:text-purple-800
          "
        />
      </form>

      {error && (
        <p className="px-2 text-[13px] text-red-400 tablet:text-[14px]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default NewTodo;