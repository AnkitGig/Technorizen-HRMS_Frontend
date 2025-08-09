import React, { useState, useEffect } from "react";
import { applyLeave, getLeave } from "../api/api";

const Leave = () => {
  const [form, setForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchLeaves = async () => {
      setFetching(true);
      try {
        const token = localStorage.getItem("token");
        const data = await getLeave(token);
        setLeaves(Array.isArray(data) ? data : data.leaves || []);
      } catch (error) {}
      setFetching(false);
    };
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      await applyLeave(form, token);
      setMessage("Leave applied successfully!");
      setForm({ leaveType: "", startDate: "", endDate: "", reason: "" });
      const data = await getLeave(token);
      setLeaves(Array.isArray(data) ? data : data.leaves || []);
    } catch (error) {
      setMessage(error.message || "Error applying leave.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full p-8 bg-gradient-to-br from-slate-50 to-indigo-100 shadow-lg rounded-lg">
      <h2 className="text-center text-gray-700 font-bold mb-8 tracking-wide text-2xl">
        Apply for Leave
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 shadow-md mb-8"
      >
        <div className="flex flex-col md:flex-row gap-5 mb-5">
          <div className="flex-1">
            <label className="font-medium text-gray-700">Leave Type</label>
            <select
              name="leaveType"
              value={form.leaveType}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 rounded-md border border-indigo-200 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Type</option>
              <option value="Sick">Sick</option>
              <option value="Casual">Casual</option>
              <option value="Earned">Earned</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 rounded-md border border-indigo-200 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex-1">
            <label className="font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 rounded-md border border-indigo-200 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="font-medium text-gray-700">Reason</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
            rows={3}
            className="w-full p-2 mt-1 rounded-md border border-indigo-200 bg-indigo-50 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-semibold rounded-md shadow hover:opacity-90 transition"
        >
          {loading ? "Applying..." : "Apply Leave"}
        </button>

        {message && (
          <div
            className={`mt-4 font-medium text-center ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </form>

      <h3 className="text-lg font-bold text-gray-700 mb-4">
        My Leave Applications
      </h3>
      <div className="bg-white rounded-lg shadow-md p-5">
        {fetching ? (
          <div className="text-center text-indigo-500 font-medium">
            Loading leave applications...
          </div>
        ) : leaves.length === 0 ? (
          <div className="text-center text-gray-500 font-medium">
            No leave applications found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-0 text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-blue-400 text-white">
                  <th className="p-3 rounded-tl-md">Type</th>
                  <th className="p-3">Start</th>
                  <th className="p-3">End</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-tr-md">Applied At</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, idx) => (
                  <tr
                    key={leave._id}
                    className={`transition ${
                      idx % 2 === 0 ? "bg-slate-50" : "bg-indigo-50"
                    }`}
                  >
                    <td className="p-3 text-center font-medium">
                      {leave.leaveType}
                    </td>
                    <td className="p-3 text-center">
                      {leave.startDate
                        ? new Date(leave.startDate).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="p-3 text-center">
                      {leave.endDate
                        ? new Date(leave.endDate).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="p-3">{leave.reason}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          leave.status === "Approved"
                            ? "bg-green-200 text-green-800"
                            : leave.status === "Rejected"
                            ? "bg-red-200 text-red-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {leave.appliedAt
                        ? new Date(leave.appliedAt).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leave;
