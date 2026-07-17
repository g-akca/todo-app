import Header from "./components/Header";
import LoginWrapper from "./components/LoginWrapper";
import SignupWrapper from "./components/SignupWrapper";
import MainSection from "./components/MainSection";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div 
      className="
        text-base leading-base tracking-base text-purple-600 bg-navy-950 min-h-screen 
        bg-[url('/images/bg-mobile-dark.jpg')] bg-no-repeat bg-top bg-contain px-6 py-12 flex justify-center
      "
    >
      <div className="flex flex-col gap-10 grow max-w-135.25">
        <Header />
      
        <Routes>
          <Route path="/" element={<MainSection />} />

          <Route path="/login" element={<LoginWrapper />} />

          <Route path="/signup" element={<SignupWrapper />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;