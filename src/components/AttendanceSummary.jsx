import React, { useEffect, useState } from "react";
import { getAttendance, getLeave } from "../api/api";

export default function AttendanceSummary() {
  const [attendance, setAttendance] = useState([]);
  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual auth token logic if needed
        const token = localStorage.getItem("token");
        const [attendanceData, leaveData] = await Promise.all([
          getAttendance(token),
          getLeave(token),
        ]);
        setAttendance(attendanceData);
        setLeave(leaveData);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate stats
  const presentCount = attendance.filter(a => a.checkIn && a.checkOut).length;
  const halfDayCount = attendance.filter(a => a.checkIn && !a.checkOut).length;
  const leaveCount = leave.length;
  const totalDays = attendance.length;

  const stats = [
    { label: "Present", value: presentCount, color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Half Day", value: halfDayCount, color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { label: "Leave", value: leaveCount, color: "text-red-600", bgColor: "bg-red-50" },
  ];

  if (loading) {
    return <div className="bg-white p-4 rounded-lg">Loading...</div>;
  }
  if (error) {
    return <div className="bg-white p-4 rounded-lg text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg lg:text-xl font-bold mb-4 text-gray-800">
        Attendance Summary
      </h2>
      <div className="space-y-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} p-3 rounded-lg flex justify-between items-center`}>
            <span className="text-sm lg:text-base font-medium text-gray-700">
              {stat.label}
            </span>
            <span className={`${stat.color} font-bold text-lg lg:text-xl`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm lg:text-base font-medium text-gray-700">
            Total Days
          </span>
          <span className="font-bold text-lg lg:text-xl text-gray-800">
            {totalDays}
          </span>
        </div>
      </div>
    </div>
  );
}
