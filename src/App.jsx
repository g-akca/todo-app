import Header from "./components/Header";
import TodoSection from "./components/TodoSection";

function App() {
  return (
    <div className="text-base leading-base bg-navy-950 min-h-screen bg-[url('/images/bg-mobile-dark.jpg')] bg-no-repeat bg-top bg-contain px-6 py-12 flex flex-col gap-10">
      <Header />

      <TodoSection />
    </div>
  )
}

export default App;