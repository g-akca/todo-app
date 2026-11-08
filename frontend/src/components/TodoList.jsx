import { useEffect, useState } from "react";
import { useTasks } from "../context/useTasks";
import TabList from "./TabList";
import TodoItem from "./TodoItem";

// Displays the current task list, handles loading errors, and manages drag-and-drop reordering.
function TodoList() {
  const {
    filteredTasks,
    itemsLeft,
    completedTasksCount,
    fetchTasks,
    updateTaskCompletion,
    deleteTask,
    deleteCompletedTasks,
    reorderTasks,
  } = useTasks();
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [error, setError] = useState(null);

  // Load tasks on mount. fetchTasks is stable (memoized in TasksProvider), so this runs once.
  // The ignore flag drops results that arrive after unmount.
  useEffect(() => {
    let ignore = false;

    fetchTasks()
      .then(() => {
        if (!ignore) setError(null);
      })
      .catch((error) => {
        if (!ignore) setError(error.message || "Failed to fetch tasks");
      });

    return () => {
      ignore = true;
    };
  }, [fetchTasks]);

  // Manual reload triggered by the Retry button.
  async function loadTasks() {
    try {
      await fetchTasks();
      setError(null);
    } catch (error) {
      setError(error.message || "Failed to fetch tasks");
    }
  }

  function handleDrop(targetTaskId) {
    if (draggedTaskId && draggedTaskId !== targetTaskId) {
      reorderTasks(draggedTaskId, targetTaskId);
    }

    setDraggedTaskId(null);
    setDropTargetId(null);
  }

  async function handleToggleTask(taskId, isCompleted) {
    try {
      await updateTaskCompletion(taskId, isCompleted);
    } catch (error) {
      setError(error.message || "Failed to update task");
    }
  }

  async function handleDeleteTask(taskId) {
    const taskIndex = filteredTasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return;
    }

    const nextTask = filteredTasks[taskIndex + 1] ?? filteredTasks[taskIndex - 1];

    try {
      await deleteTask(taskId);

      requestAnimationFrame(() => {
        const nextTaskButton = nextTask
          ? document.querySelector(`[data-task-id="${nextTask.id}"] [data-delete-button="true"]`)
          : document.getElementById("todo");

        nextTaskButton?.focus();
      });
    } catch (error) {
      setError(error.message || "Failed to delete task");
    }
  }

  return (
    <div 
      className="
        bg-navy-900 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)] 
        light:bg-white light:shadow-[0_35px_50px_rgba(194,195,214,0.5)]
      "
    >
      {error ? (
        <div className="p-5 text-center tablet:px-6">
          <p className="text-[14px] leading-base text-red-400 light:text-red-500">{error}</p>

          <button
            type="button"
            onClick={loadTasks}
            className="
              mt-3 text-[16px] leading-base font-bold text-blue-400 transition-colors cursor-pointer 
              hover:text-blue-300 light:text-blue-600 light:hover:text-blue-500
            "
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <ul aria-label="Todo list">
            {filteredTasks.map(item => (
              <li key={item.id} data-task-id={item.id}>
                <TodoItem
                  id={item.id}
                  description={item.description}
                  isCompleted={item.is_completed}
                  isDragging={draggedTaskId === item.id}
                  isDropTarget={dropTargetId === item.id}
                  onDragStart={() => setDraggedTaskId(item.id)}
                  onDragOver={(event) => {
                    event.preventDefault();
                    if (draggedTaskId && draggedTaskId !== item.id) {
                      setDropTargetId(item.id);
                    }
                  }}
                  onDrop={() => handleDrop(item.id)}
                  onDragEnd={() => {
                    setDraggedTaskId(null);
                    setDropTargetId(null);
                  }}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              </li>
            ))}
          </ul>

          <div className="py-4 px-5 flex justify-between items-center tablet:p-6 tablet:grid tablet:grid-cols-3">
            <p>{itemsLeft} items left</p>

            <div className="hidden tablet:block">
              <TabList />
            </div>

            <button 
              id="clear-completed"
              type="button" 
              onClick={async () => {
                try {
                  await deleteCompletedTasks();
                } catch (error) {
                  setError(error.message || "Failed to clear completed tasks");
                }
              }}
              disabled={completedTasksCount === 0}
              className={`transition-all tablet:justify-self-end ${completedTasksCount === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:text-purple-300 light:hover:text-navy-850"}`}
            >
              Clear Completed
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default TodoList;