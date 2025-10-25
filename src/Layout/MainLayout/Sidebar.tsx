import { MdDashboard, MdTask, MdClose, MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { resetOnboarding } from "../../redux/slices/onboardingSlice";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(resetOnboarding());
  };

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: MdDashboard, path: "/" },
    { id: "tasks", name: "Tasks", icon: MdTask, path: "/tasks" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // Close sidebar on mobile after navigation
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-56 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900
        transform transition-transform duration-300 ease-in-out z-50 shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* Header with close button for mobile */}
        <div className="flex items-center justify-between p-6 lg:justify-center border-b border-slate-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KB</span>
            </div>
            <h2 className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Kanban Board
            </h2>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-700 p-1 rounded transition-colors duration-200"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 mt-6 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl
                  transition-all duration-200 text-left group relative overflow-hidden
                  ${
                    active
                      ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }
                `}
              >
                {active && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r-full" />
                )}
                <IconComponent
                  size={20}
                  className={`${
                    active
                      ? "text-white"
                      : "text-slate-400 group-hover:text-blue-400"
                  } transition-colors duration-200`}
                />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        {/* <div className="absolute bottom-20 left-4 right-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-slate-400">john@example.com</p>
            </div>
          </div>
        </div> */}

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                     text-slate-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/50
                     border border-slate-700/50 transition-all duration-200 group"
          >
            <MdLogout
              size={20}
              className="text-slate-400 group-hover:text-red-400 transition-colors duration-200"
            />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
