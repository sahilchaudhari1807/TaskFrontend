import React, { useEffect, useState } from "react";
import api from "../api.js";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("all");
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await api.post("/tasks", { title });
      setTasks((prev) => [...prev, res.data]);
      setTitle("");
    } catch {
      setError("Could not add task");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data : t))
      );
    } catch {
      setError("Could not update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError("Could not delete task");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filterCompleted === "all"
        ? true
        : filterCompleted === "completed"
        ? t.completed
        : !t.completed;
    return matchSearch && matchFilter;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <section className="mt-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Dashboard</h1>
          <p className="text-sm text-slate-400">
            Manage your tasks, mark them done, and filter quickly.
          </p>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40">
            <p className="text-slate-300">Total</p>
            <p className="font-semibold text-emerald-300">{tasks.length}</p>
          </div>
          <div className="px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/40">
            <p className="text-slate-300">Completed</p>
            <p className="font-semibold text-blue-300">{completedCount}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-sm text-amber-300 bg-amber-900/40 border border-amber-700 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* Add Task */}
      <form
        onSubmit={handleAddTask}
        className="flex flex-col md:flex-row gap-3 items-stretch md:items-center bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg shadow-slate-950/40"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-sm font-semibold shadow-md shadow-emerald-500/40"
        >
          Add
        </button>
      </form>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex-1 flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2">
          <span className="text-slate-500 text-xs">Search</span>
          <input
            type="text"
            placeholder="Search tasks..."
            className="flex-1 bg-transparent text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 text-xs">
          {["all", "completed", "pending"].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilterCompleted(value)}
              className={`px-3 py-1.5 rounded-full border capitalize transition ${
                filterCompleted === value
                  ? "bg-slate-100 text-slate-900 border-slate-100"
                  : "border-slate-600 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg shadow-slate-950/40">
        {filteredTasks.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">
            No tasks found. Add one above ✨
          </p>
        ) : (
          <ul className="space-y-2">
            {filteredTasks.map((task) => (
              <li
                key={task._id}
                className="flex items-center justify-between border border-slate-800 rounded-xl px-3 py-2 bg-slate-950/50"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                    className="h-4 w-4 rounded border-slate-500 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span
                    className={`text-sm ${
                      task.completed
                        ? "line-through text-slate-500"
                        : "text-slate-100"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-[11px] px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
