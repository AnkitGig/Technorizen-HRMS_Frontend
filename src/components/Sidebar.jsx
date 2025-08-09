import { X, LogOut } from "lucide-react";
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaFileAlt,
  FaClipboardList,
} from "react-icons/fa";

const menu = [
  { key: "dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
  { key: "profile", name: "My Profile", icon: <FaUser /> },
  { key: "attendance", name: "My Attendance", icon: <FaCalendarCheck /> },
  { key: "leave", name: "Leave Management", icon: <FaClipboardList /> },
  { key: "payroll", name: "Payroll & Salary", icon: <FaMoneyCheckAlt /> },
  { key: "policy", name: "Company Policies", icon: <FaFileAlt /> },
];

export default function Sidebar({
  active,
  onNavigate,
  onClose,
  user,
  onLogout,
}) {
  return (
    <aside className="h-full bg-white shadow-lg flex flex-col">
      {/* Header with close button for mobile */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <div className="font-bold text-lg lg:text-xl">Technorizen</div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group
               ${
                 isActive
                   ? "bg-[linear-gradient(90deg,#0193FA,#0F1D2B)] text-white font-medium shadow-sm"
                   : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
               }
              `}
            >
              <span
                className={`text-lg transition-colors ${
                  isActive
                    ? "text-white-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              >
                {item.icon}
              </span>
              <span className="truncate text-sm lg:text-base">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm lg:text-base">Sign Out</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="text-xs text-gray-500 text-center">
          © 2025 Technorizen
        </div>
      </div>
    </aside>
  );
}
