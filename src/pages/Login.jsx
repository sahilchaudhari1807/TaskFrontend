import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("Email and password are required");
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", form);
      const { token } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", form.email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl shadow-emerald-500/10 w-full max-w-md p-6"
      >
        <h2 className="text-2xl font-semibold mb-1 text-center">
          Welcome back 👋
        </h2>
        <p className="text-sm text-slate-400 mb-5 text-center">
          Log in to manage your tasks.
        </p>

        {error && (
          <div className="mb-3 text-sm text-red-300 bg-red-950/60 border border-red-800 p-2 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label className="block text-xs mb-1 text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs mb-1 text-slate-300">Password</label>
          <input
            type="password"
            name="password"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
            value={form.password}
            onChange={handleChange}
            placeholder="Your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-emerald-500/30 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-xs text-center text-slate-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-emerald-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
