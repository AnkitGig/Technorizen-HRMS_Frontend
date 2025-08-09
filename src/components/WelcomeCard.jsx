import { Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { checkIn, checkOut, getAttendance } from '../api/api';

export default function WelcomeCard({ user }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [loadingOut, setLoadingOut] = useState(false);
  const [successOut, setSuccessOut] = useState(null);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceError, setAttendanceError] = useState(null);
  // Helper to get today's date in YYYY-MM-DD
  function getTodayDateString() {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  }

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      setAttendanceLoading(true);
      setAttendanceError(null);
      try {
        const token = user?.token || localStorage.getItem('token');
        const attendanceData = await getAttendance(token);
        // Find today's attendance
        const todayStr = getTodayDateString();
        const todayAtt = Array.isArray(attendanceData)
          ? attendanceData.find(a => a.date && a.date.slice(0, 10) === todayStr)
          : null;
        setTodayAttendance(todayAtt || null);
      } catch (err) {
        setAttendanceError(err.message || 'Failed to fetch attendance');
      } finally {
        setAttendanceLoading(false);
      }
    };
    fetchTodayAttendance();
  }, [user]);

  const handleCheckIn = async () => {
    setLoading(true);
    setSuccess(null);
    try {
      await checkIn(user?.token);
      setSuccess('Checked in successfully!');
      // Refresh today's attendance
      const token = user?.token || localStorage.getItem('token');
      const attendanceData = await getAttendance(token);
      const todayStr = getTodayDateString();
      const todayAtt = Array.isArray(attendanceData)
        ? attendanceData.find(a => a.date && a.date.slice(0, 10) === todayStr)
        : null;
      setTodayAttendance(todayAtt || null);
    } catch (error) {
      setSuccess('Check-in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoadingOut(true);
    setSuccessOut(null);
    try {
      await checkOut(user?.token);
      setSuccessOut('Checked out successfully!');
      // Refresh today's attendance
      const token = user?.token || localStorage.getItem('token');
      const attendanceData = await getAttendance(token);
      const todayStr = getTodayDateString();
      const todayAtt = Array.isArray(attendanceData)
        ? attendanceData.find(a => a.date && a.date.slice(0, 10) === todayStr)
        : null;
      setTodayAttendance(todayAtt || null);
    } catch (error) {
      setSuccessOut('Check-out failed.');
    } finally {
      setLoadingOut(false);
    }
  };

  // Button logic
  let showCheckIn = false;
  let showCheckOut = false;
  if (!attendanceLoading && !attendanceError) {
    if (!todayAttendance) {
      showCheckIn = true;
    } else if (todayAttendance.checkIn && !todayAttendance.checkOut) {
      showCheckOut = true;
    }
    // If both checkIn and checkOut exist, show neither
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-4 lg:p-6 text-white">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left content */}
        <div className="flex-1">
          <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-2">
            Welcome, {user?.name || 'User'}!
          </h1>
          <p className="text-blue-100 text-sm lg:text-base opacity-90">
            Our dashboard is your hub for all things work...
          </p>
        </div>

        {/* Right content */}
        <div className="flex items-center justify-between lg:justify-end gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg lg:text-xl">👤</span>
            </div>
            <div className="lg:hidden">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-blue-100">{user?.role}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {attendanceLoading ? (
              <span className="text-xs text-white bg-black/30 rounded px-2 py-1">Loading attendance...</span>
            ) : attendanceError ? (
              <span className="text-xs text-red-200 bg-black/30 rounded px-2 py-1">{attendanceError}</span>
            ) : (
              <>
                {showCheckIn && (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm lg:text-base disabled:opacity-60"
                      onClick={handleCheckIn}
                      disabled={loading}
                    >
                      <Clock className="h-4 w-4" />
                      {loading ? (
                        <span>Checking In...</span>
                      ) : (
                        <>
                          <span className="hidden sm:inline">Check In</span>
                          <span className="sm:hidden">In</span>
                        </>
                      )}
                    </button>
                    {success && (
                      <span className="ml-2 text-xs font-semibold text-white bg-black/30 rounded px-2 py-1">{success}</span>
                    )}
                  </>
                )}
                {showCheckOut && (
                  <>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm lg:text-base disabled:opacity-60 mt-2"
                      onClick={handleCheckOut}
                      disabled={loadingOut}
                    >
                      <Clock className="h-4 w-4 rotate-180" />
                      {loadingOut ? (
                        <span>Checking Out...</span>
                      ) : (
                        <>
                          <span className="hidden sm:inline">Check Out</span>
                          <span className="sm:hidden">Out</span>
                        </>
                      )}
                    </button>
                    {successOut && (
                      <span className="ml-2 text-xs font-semibold text-white bg-black/30 rounded px-2 py-1">{successOut}</span>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

