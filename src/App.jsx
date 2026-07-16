import Header from "./components/Header";
import LoginSection from "./components/LoginSection";
import MainSection from "./components/MainSection";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div 
      className="
        text-base leading-base tracking-base text-purple-600 bg-navy-950 min-h-screen bg-[url('/images/bg-mobile-dark.jpg')] 
        bg-no-repeat bg-top bg-contain px-6 py-12 flex flex-col gap-10
      "
    >
      <Header />
      
      <Routes>
        <Route path="/" element={<MainSection />} />

        <Route path="/login" element={<LoginSection />} />
      </Routes>
    </div>
  )
}

export default App;