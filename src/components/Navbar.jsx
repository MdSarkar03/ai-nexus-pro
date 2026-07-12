import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils.js";
import { Crown, Search } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const menuItems = [
    { label: "Tools", href: "/home" },
    { label: "Workflows", href: "/workflows" },
    { label: "AI Models", href: "/models" },
    { label: "Stacks", href: "/stacks" },
    { label: "Prompts", href: "/prompts" },
    { label: "AI Guide", href: "/chatbot" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-md shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">🧠</span>
            <span className="text-2xl font-bold text-[#FF6B35]">
              AI Nexus Pro
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-gray-600 hover:text-[#FF6B35] transition-colors relative py-2 font-medium",
                  pathname === item.href && "text-[#FF6B35]"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6B35]" />
                )}
              </Link>
            ))}

            {/* Search icon link */}
            <Link
              to="/search"
              className={cn(
                "text-gray-600 hover:text-[#FF6B35] transition-colors p-2 rounded-full hover:bg-orange-50",
                pathname === "/search" && "text-[#FF6B35] bg-orange-50"
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Premium Menu Item with Animated Badge */}
            <Link
              to="/premium"
              className="group relative flex items-center gap-1.5 text-gray-600 hover:text-[#FF6B35] transition-colors py-2 font-medium"
            >
              <span>Premium</span>
              <motion.div
                className="relative flex items-center justify-center px-2.5 py-0.5 text-xs font-bold rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Gold Gradient Background with Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                />

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />

                <span className="relative z-10 text-amber-950 flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  PRO
                </span>
              </motion.div>
            </Link>
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white/95">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "block py-3 text-gray-600 hover:text-[#FF6B35] hover:bg-gray-50 px-4 rounded transition-colors",
                  pathname === item.href && "text-[#FF6B35] bg-gray-50"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Search link in mobile */}
            <Link
              to="/search"
              className={cn(
                "flex items-center gap-2 py-3 text-gray-600 hover:text-[#FF6B35] hover:bg-gray-50 px-4 rounded transition-colors",
                pathname === "/search" && "text-[#FF6B35] bg-gray-50"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="w-4 h-4" />
              Search
            </Link>

            {/* Premium in Mobile */}
            <Link
              to="/premium"
              className="flex items-center gap-2 py-3 text-gray-600 hover:text-[#FF6B35] hover:bg-gray-50 px-4 rounded transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Premium
              <div className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-amber-950 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                PRO
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}