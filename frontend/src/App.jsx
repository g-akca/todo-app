import BackgroundImage from "./components/BackgroundImage";
import Header from "./components/Header";
import LoginWrapper from "./components/LoginWrapper";
import SignupWrapper from "./components/SignupWrapper";
import MainSection from "./components/MainSection";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router";
import { TasksProvider } from "./context/TasksContext";

function App() {
  return (
    <div 
      className="
        relative text-base leading-base tracking-base text-purple-600 bg-navy-950 px-6 py-12
        min-h-screen flex justify-center tablet:text-[14px] light:text-gray-600 light:bg-gray-50
      "
    >
      <BackgroundImage />
      
      <div className="relative z-10 flex flex-col gap-10 grow max-w-135.25 tablet:gap-12">
        <Header />
      
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute allowedRole="authenticated">
                <TasksProvider>
                  <MainSection />
                </TasksProvider>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/login" 
            element={
              <ProtectedRoute allowedRole="guest">
                <LoginWrapper />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/signup" 
            element={
              <ProtectedRoute allowedRole="guest">
                <SignupWrapper />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;