import TodoSection from "./TodoSection";

function MainSection() {
  return (
    <main className="flex flex-col gap-10">
      <TodoSection />
      
      <p className="text-center text-[14px] leading-base">Drag and drop to reorder list</p>
    </main>
  )
}

export default MainSection;