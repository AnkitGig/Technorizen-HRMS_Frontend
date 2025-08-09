import { Menu, Bell, User, ChevronDown } from 'lucide-react';

export default function Header({ onMenuClick, sidebarOpen, user }) {
  return (
    <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-4 lg:px-6">
      {/* Left side - Menu button and date */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="font-medium text-sm lg:text-base text-gray-700">
          <span className="hidden sm:inline">1 Jan, 2025 - 31 Jan, 2025</span>
          <span className="sm:hidden">Jan 2025</span>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2 lg:gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User Profile Dropdown */}
        <div className="hidden sm:flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>

        {/* Mobile user button */}
        <button className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition-colors">
          <User className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
