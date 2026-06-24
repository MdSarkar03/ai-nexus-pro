import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import WorkflowBuilder from "./pages/WorkflowBuilder.jsx";
import ModelHub from "./pages/ModelHub.jsx";
import StackExplorer from "./pages/StackExplorer.jsx";
import PromptLibrary from "./pages/PromptLibrary.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/workflows" element={<WorkflowBuilder />} />
          <Route path="/models" element={<ModelHub />} />
          <Route path="/stacks" element={<StackExplorer />} />
          <Route path="/prompts" element={<PromptLibrary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
