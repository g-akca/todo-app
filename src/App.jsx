import Header from "./components/Header";
import LoginWrapper from "./components/LoginWrapper";
import SignupWrapper from "./components/SignupWrapper";
import MainSection from "./components/MainSection";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div 
      className="
        relative text-base leading-base tracking-base text-purple-600 bg-navy-950 px-6 py-12
        min-h-screen flex justify-center tablet:text-[14px] light:text-gray-600 light:bg-gray-50
      "
    >
      <div 
        className="
          absolute inset-x-0 top-0 h-50 bg-[url('/images/bg-mobile-dark.jpg')] bg-cover
          bg-top-left bg-no-repeat tablet:h-75 tablet:bg-[url('/images/bg-desktop-dark.jpg')]
          light:bg-[url('/images/bg-mobile-light.jpg')] light:tablet:bg-[url('/images/bg-desktop-light.jpg')]
        "
      />
      
      <div className="relative z-10 flex flex-col gap-10 grow max-w-135.25 tablet:gap-12">
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