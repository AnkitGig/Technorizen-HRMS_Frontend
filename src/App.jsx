import React, { useState } from "react";
import { Menu, X } from 'lucide-react';
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import WelcomeCard from "./components/WelcomeCard";
import AttendanceSummary from "./components/AttendanceSummary";
import Earnings from "./components/Earnings";
import Holidays from "./components/Holidays";
import Profile from "./components/Profile";
import MyAttendance from "./components/MyAttendance";
import Leave from "./components/Leave";

export default function App() {
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveMenu("dashboard");
    setSidebarOpen(false);
  };

  // Show login page if user is not authenticated
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          active={activeMenu} 
          onNavigate={(menu) => {
            setActiveMenu(menu);
            setSidebarOpen(false); // Close sidebar on mobile after navigation
          }}
          onClose={() => setSidebarOpen(false)}
          user={user}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-0">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          sidebarOpen={sidebarOpen}
          user={user}
        />

        <main className="flex-1 overflow-y-auto ">
          <div className="max-w-7xl mx-auto">
            {/* Conditionally Render Pages */}
            {activeMenu === "dashboard" && (
              <div className="space-y-6 p-4 lg:p-6">
                <WelcomeCard user={user} />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  <AttendanceSummary />
                  <Earnings />
                  <Holidays />
                </div>
              </div>
            )}

            {activeMenu === "profile" && (  
                <Profile/>
            )}

            {activeMenu === "attendance" && (
                <MyAttendance />
            )}

            {activeMenu === "leave" && (
            <Leave/>
            )}

            {activeMenu === "payroll" && (
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
                <h1 className="text-xl lg:text-2xl font-bold mb-4">Payroll & Salary</h1>
                <p className="text-gray-600">Salary details will go here...</p>
              </div>
            )}

            {activeMenu === "policy" && (
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
                <h1 className="text-xl lg:text-2xl font-bold mb-4">Company Policies</h1>
                <p className="text-gray-600">Company policies will go here...</p>
              </div>
            )}

            {/* All Sections View */}
            {activeMenu === "all" && (
              <div className="space-y-6">
                <WelcomeCard user={user} />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  <AttendanceSummary />
                  <Earnings />
                  <Holidays />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
                    <h2 className="text-lg lg:text-xl font-bold mb-4">My Profile</h2>
                    <p className="text-gray-600">Profile details will go here...</p>
                  </div>
                  <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
                    <h2 className="text-lg lg:text-xl font-bold mb-4">My Attendance</h2>
                    <p className="text-gray-600">Attendance data will go here...</p>
                  </div>
                  <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
                    <h2 className="text-lg lg:text-xl font-bold mb-4">Leave Management</h2>
                    <p className="text-gray-600">Leave requests and approvals will go here...</p>
                  </div>
                  <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
                    <h2 className="text-lg lg:text-xl font-bold mb-4">Payroll & Salary</h2>
                    <p className="text-gray-600">Salary details will go here...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
