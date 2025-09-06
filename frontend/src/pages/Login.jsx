import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    navigate("/catalog");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold text-center mb-1">Welcome back</h1>
        <p className="text-sm text-gray-600 text-center mb-6">Sign in to continue</p>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 hover:bg-gray-900 active:scale-[.99] transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account? <Link to="/signup" className="underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
