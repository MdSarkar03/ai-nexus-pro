import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import LearningPage from "./pages/LearningPage.jsx";
import ChatBot from "./pages/ChatBot.jsx";
import TriviaPage from "./pages/TriviaPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/trivia" element={<TriviaPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
