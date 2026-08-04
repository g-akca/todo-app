import TodoDashboard from "./TodoDashboard";

function MainSection() {
  return (
    <main className="flex flex-col gap-10 tablet:gap-6">
      <TodoDashboard />
      
      <p className="text-center text-[14px] leading-base">Drag and drop to reorder list</p>
    </main>
  )
}

export default MainSection;