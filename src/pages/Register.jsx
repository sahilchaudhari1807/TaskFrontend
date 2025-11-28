import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      return setError("All fields are required");
    }
    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    try {
      setLoading(true);
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl shadow-blue-500/10 w-full max-w-md p-6"
      >
        <h2 className="text-2xl font-semibold mb-1 text-center">
          Create an account ✨
        </h2>
        <p className="text-sm text-slate-400 mb-5 text-center">
          Sign up to start organizing your tasks.
        </p>

        {error && (
          <div className="mb-3 text-sm text-red-300 bg-red-950/60 border border-red-800 p-2 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label className="block text-xs mb-1 text-slate-300">Name</label>
          <input
            type="text"
            name="name"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/70"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>

        <div className="mb-3">
          <label className="block text-xs mb-1 text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/70"
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
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/70"
            value={form.password}
            onChange={handleChange}
            placeholder="min 6 characters"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-slate-950 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-blue-500/30 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="mt-3 text-xs text-center text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
