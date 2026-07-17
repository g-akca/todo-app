import TabList from "./TabList";
import TodoItem from "./TodoItem";

const todoItems = [
  {
    id: 0,
    isCompleted: true,
    task: "Complete online JavaScript course"
  },
  {
    id: 1,
    isCompleted: false,
    task: "Jog around the park 3x"
  },
  {
    id: 2,
    isCompleted: false,
    task: "10 minutes meditation"
  },
  {
    id: 3,
    isCompleted: false,
    task: "Read for 1 hour"
  },
  {
    id: 4,
    isCompleted: false,
    task: "Pick up groceries"
  },
  {
    id: 5,
    isCompleted: false,
    task: "Complete Todo App on Frontend Mentor"
  },
];

function TodoList() {
  const itemsLeft = todoItems.filter(item => !item.isCompleted).length;

  return (
    <div className="bg-navy-900 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)]">
      {todoItems.map(item => (
        <TodoItem
          key={item.id}
          {...item}
        />
      ))}

      <div 
        className="
          py-4 px-5 flex justify-between items-center tablet:p-6 
          tablet:text-[14px] tablet:leading-base tablet:grid tablet:grid-cols-3
        "
      >
        <p>{itemsLeft} items left</p>

        <div className="hidden tablet:block">
          <TabList />
        </div>

        <p className="text-end">Clear Completed</p>
      </div>
    </div>
  )
}

export default TodoList;