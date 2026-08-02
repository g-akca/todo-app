import { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";
import TabList from "./TabList";
import TodoItem from "./TodoItem";

function TodoList() {
  const {
    filteredTasks,
    itemsLeft,
    completedTasksCount,
    fetchTasks,
    deleteCompletedTasks,
    reorderTasks,
  } = useTasks();
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [tasksFetchError, setTasksFetchError] = useState(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        await fetchTasks();

        if (isMounted) {
          setTasksFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          setTasksFetchError(error.message || "Failed to fetch tasks");
        }
      }
    }

    loadTasks();
  }, [fetchTasks]);

  function handleDrop(targetTaskId) {
    if (draggedTaskId && draggedTaskId !== targetTaskId) {
      reorderTasks(draggedTaskId, targetTaskId);
    }

    setDraggedTaskId(null);
    setDropTargetId(null);
  }

  async function handleRetry() {
    try {
      await fetchTasks();
      setTasksFetchError(null);
    } catch (error) {
      setTasksFetchError(error.message || "Failed to fetch tasks");
    }
  }

  return (
    <div 
      className="
        bg-navy-900 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)] 
        light:bg-white light:shadow-[0_35px_50px_rgba(194,195,214,0.5)]
      "
    >
      {tasksFetchError ? (
        <div className="p-5 text-center tablet:px-6">
          <p className="text-[14px] leading-base text-red-400 light:text-red-500">{tasksFetchError}</p>

          <button
            type="button"
            onClick={handleRetry}
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
          {filteredTasks.map(item => (
            <TodoItem
              key={item.id}
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
            />
          ))}

          <div className="py-4 px-5 flex justify-between items-center tablet:p-6 tablet:grid tablet:grid-cols-3">
            <p>{itemsLeft} items left</p>

            <div className="hidden tablet:block">
              <TabList />
            </div>

            <button 
              type="button" 
              onClick={() => deleteCompletedTasks()}
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