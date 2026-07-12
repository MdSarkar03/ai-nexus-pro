import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#FF6B35]">
              AI Nexus Pro
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your ultimate platform for discovering, comparing, and mastering
              AI tools, models, workflows, and stacks, powered by an
              intelligent recommendation engine.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/home" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                Tools
              </Link>
              <Link to="/workflows" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                Workflows
              </Link>
              <Link to="/models" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                AI Models
              </Link>
              <Link to="/stacks" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                Stacks
              </Link>
              <Link to="/prompts" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                Prompts
              </Link>
              <Link to="/chatbot" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                AI Guide
              </Link>
              <Link to="/premium" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                Decision Engine
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <p className="text-gray-300 mb-4">contact@ainexuspro.com</p>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-[#FF6B35] transition-colors">
                <span className="sr-only">GitHub</span>
                🔗
              </a>
              <a href="#" className="text-2xl hover:text-[#FF6B35] transition-colors">
                <span className="sr-only">LinkedIn</span>
                🔗
              </a>
              <a href="#" className="text-2xl hover:text-[#FF6B35] transition-colors">
                <span className="sr-only">Twitter</span>
                🔗
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© 2026 AI Nexus Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}