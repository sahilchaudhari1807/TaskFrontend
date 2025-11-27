import React from "react";

const Profile = () => {
  const email = localStorage.getItem("userEmail") || "Unknown";
  const name = localStorage.getItem("userName") || "User";

  return (
    <section className="mt-8 max-w-xl">
      <h1 className="text-3xl font-semibold mb-4">Profile</h1>
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-950/40">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-slate-950 font-bold text-lg">
            {name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="text-base font-semibold">{email}</p>
          </div>
        </div>

        <p className="mb-2">
          <span className="font-semibold">Name:</span> {name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {email}
        </p>

        <p className="text-xs text-slate-500 mt-3">
          In a real production app this would come from a protected endpoint
          like <code>/api/auth/me</code>.
        </p>
      </div>
    </section>
  );
};

export default Profile;
