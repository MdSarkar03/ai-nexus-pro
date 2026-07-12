import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import SplashScreen from "./components/SplashScreen.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ChatBot from "./pages/ChatBot.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import WorkflowBuilder from "./pages/WorkflowBuilder.jsx";
import ModelHub from "./pages/ModelHub.jsx";
import StackExplorer from "./pages/StackExplorer.jsx";
import PromptLibrary from "./pages/PromptLibrary.jsx";
import PremiumPage from "./pages/PremiumPage.jsx";
import ArchitectPage from "./pages/ArchitectPage.jsx";
import WhyAINexusPro from "./pages/WhyAINexusPro.jsx";
import SignInPage from "./pages/SignInPage.jsx";

function AppContent() {
  const location = useLocation();

  // These pages render their own full-page nav/footer, so hide the app shell's Navbar/Footer
  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/why-ai-nexus-pro" ||
    location.pathname === "/landing" ||
    location.pathname === "/signin";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!hideLayout && <Navbar />}

      <main className={`flex-1 ${hideLayout ? "" : "pt-16"}`}>
        <Routes>
          {/* Onboarding flow: splash -> why -> landing -> signin -> home */}
          <Route path="/" element={<Navigate to="/why-ai-nexus-pro" replace />} />
          <Route path="/why-ai-nexus-pro" element={<WhyAINexusPro />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* Main Platform */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/workflows" element={<WorkflowBuilder />} />
          <Route path="/models" element={<ModelHub />} />
          <Route path="/stacks" element={<StackExplorer />} />
          <Route path="/prompts" element={<PromptLibrary />} />

          {/* Premium */}
          <Route path="/premium" element={<PremiumPage />} />

          {/* Decision Intelligence Engine */}
          <Route path="/architect" element={<ArchitectPage />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);

      // Only redirect first load from root
      if (location.pathname === "/") {
        navigate("/why-ai-nexus-pro", { replace: true });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, location.pathname]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return <AppContent />;
}

export default App;