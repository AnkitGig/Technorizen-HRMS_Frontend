import React from "react";

const MyAttendance = () => {
  return (
    <div className="bg-slate-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="border border-slate-200 rounded-xl w-12 h-12 flex items-center justify-center bg-white shadow-sm">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#0e1726"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-3xl text-slate-900">
              My Attendance
            </h1>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Obsessed with ideas, driven by growth, and always trying to leave
              things better than I found them.
            </p>
          </div>
        </div>
        <div className="ml-auto">
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-1.5 text-slate-700 text-sm shadow-sm">
            1 Jan, 2025 - 31 Jan, 2025
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl mt-8 p-6 md:p-8 shadow-md border border-slate-200">
        <h2 className="font-bold text-2xl mb-6 text-slate-900">
          My Attendance
        </h2>

        <div className="relative overflow-x-auto">
          {/* Table */}
          <table className="w-full text-left bg-slate-50 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-semibold">
              <tr>
                <th className="px-5 py-3">
                  Month <span className="text-xs">▼</span>
                </th>
                <th className="px-5 py-3">
                  Total days <span className="text-xs">▼</span>
                </th>
                <th className="px-5 py-3">
                  Leaves <span className="text-xs">▼</span>
                </th>
                <th className="px-5 py-3">
                  Status <span className="text-xs">▼</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white text-slate-900 text-sm hover:bg-slate-50 transition">
                <td className="px-5 py-3">Jan</td>
                <td className="px-5 py-3">31</td>
                <td className="px-5 py-3">0</td>
                <td className="px-5 py-3">
                  <span className="bg-emerald-100 text-emerald-700 rounded-full px-4 py-1 font-semibold text-xs">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Search Icon */}
          <div className="absolute top-3 right-4">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#0e1726"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 text-slate-500 text-sm gap-3">
          <div>1-10 of 200 items per page</div>
          <div className="flex gap-2">
            <button className="border border-slate-200 bg-white rounded-lg w-9 h-9 flex items-center justify-center hover:bg-slate-100 transition">
              <span className="text-lg text-slate-500">‹</span>
            </button>
            <button className="border border-slate-200 bg-white rounded-lg w-9 h-9 flex items-center justify-center hover:bg-slate-100 transition">
              <span className="text-lg text-slate-500">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttendance;
