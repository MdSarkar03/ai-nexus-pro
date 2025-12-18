import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button.jsx";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("opacity-100");
      }, index * 200);
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0f0f1a]">
          {/* Dot grid pattern */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(59, 130, 246, 0.15) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          {/* Sphere grid overlay */}
          <div className="absolute inset-0 opacity-80">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="sphereGrid"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="30"
                    cy="30"
                    r="1.5"
                    fill="rgba(59, 130, 246, 0.4)"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="8"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.2)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sphereGrid)" />
            </svg>
          </div>

          {/* Animated glowing spheres */}
          <div className="absolute top-1/4 left-1/4 w-125 h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
          <div
            className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-orange-600/10 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />

          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="fade-in opacity-0 transition-opacity duration-1000 text-5xl md:text-7xl lg:text-[72px] font-bold text-white mb-6 leading-tight">
            Unlock The Power of
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h1>
          <p className="fade-in opacity-0 transition-opacity duration-1000 delay-200 text-xl md:text-3xl lg:text-[28px] text-white/90 mb-12 leading-relaxed">
            Your ultimate platform for AI tool discovery, comparison, and
            collaborative learning
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/home")}
            className="fade-in opacity-0 transition-opacity duration-1000 delay-400 bg-[#FF6B35] hover:bg-[#FF5722] text-white text-lg px-12 py-7 h-[60px] rounded-lg shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Explore AI Tools →
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3B82F6] text-center mb-16">
            Why Choose AI Nexus Pro?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Smart Discovery
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Search and filter 50+ AI tools by category, features, and
                pricing
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Side-by-Side Comparison
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Compare up to 3 tools feature-by-feature in real-time
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Integrated Tutorials
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Access curated YouTube tutorials for every tool
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Personalized Guidance
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Chat with AI to find the perfect tool for your needs
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
