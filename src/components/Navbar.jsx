import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const linkClass = (path) =>
    `px-3 py-1 rounded-full text-sm transition ${
      location.pathname === path
        ? "bg-slate-800 text-slate-50"
        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-100 hover:opacity-90"
        >
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-slate-950 font-black text-sm">
            TF
          </div>
          <div>
            <p className="font-semibold tracking-tight">TaskFlow</p>
            <p className="text-[11px] text-slate-400">
              Simple tasks + auth demo
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {token ? (
            <>
              <Link to="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/profile" className={linkClass("/profile")}>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="ml-1 px-3 py-1.5 rounded-full text-xs font-medium bg-red-500 hover:bg-red-600 text-white shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass("/login")}>
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
