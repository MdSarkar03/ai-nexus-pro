export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#3B82F6] mb-6 text-center">Sign In</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold py-3 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
