import { useEffect, useRef } from "react";
import TodoDashboard from "./TodoDashboard";

function MainSection() {
  const mainRef = useRef(null);

  useEffect(() => {
    mainRef.current?.focus();
  }, []);

  return (
    <main
      id="todo-dashboard"
      ref={mainRef}
      tabIndex={-1}
      aria-label="Todo dashboard"
      className="flex flex-col gap-10 tablet:gap-6"
    >
      <TodoDashboard />

      <p className="text-center text-[14px] leading-base">Drag and drop to reorder list</p>
    </main>
  )
}

export default MainSection;