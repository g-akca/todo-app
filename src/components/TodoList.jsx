import TodoItem from "./TodoItem";

const todoItems = [
  {
    id: 0,
    completed: true,
    task: "Complete online JavaScript course"
  },
  {
    id: 1,
    completed: false,
    task: "Jog around the park 3x"
  },
  {
    id: 2,
    completed: false,
    task: "10 minutes meditation"
  },
  {
    id: 3,
    completed: false,
    task: "Read for 1 hour"
  },
  {
    id: 4,
    completed: false,
    task: "Pick up groceries"
  },
  {
    id: 5,
    completed: false,
    task: "Complete Todo App on Frontend Mentor"
  },
];

function TodoList() {
  const itemsLeft = todoItems.filter(item => !item.completed).length;

  return (
    <div className="bg-navy-900 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)] flex flex-col">
      {todoItems.map(item => (
        <TodoItem
          key={item.id}
          {...item}
        />
      ))}

      <div className="py-4 px-5 flex justify-between items-center">
        <p>{itemsLeft} items left</p>

        <p>Clear Completed</p>
      </div>
    </div>
  )
}

export default TodoList;