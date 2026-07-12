import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "signin" ? "/api/auth/login" : "/api/auth/signup";
      const payload =
        mode === "signin"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/home");
    } catch (err) {
      console.error("Auth error:", err);
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#FF6B35] mb-2 text-center">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-gray-500 text-center mb-6">
          {mode === "signin"
            ? "Welcome back to AI Nexus Pro"
            : "Join AI Nexus Pro to get started"}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6B35] hover:bg-[#FF5722] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
            }}
            className="text-[#FF6B35] font-medium hover:underline"
          >
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}