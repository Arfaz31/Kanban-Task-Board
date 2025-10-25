import { MdDashboard, MdTask, MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { resetOnboarding } from "../../redux/slices/onboardingSlice";

const BottomBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(resetOnboarding());
  };

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: MdDashboard, path: "/" },
    { id: "tasks", name: "Tasks", icon: MdTask, path: "/tasks" },
    { id: "logout", name: "Logout", icon: MdLogout, path: null },
  ];

  const handleNavigation = (path: string | null) => {
    if (path) {
      navigate(path);
    } else {
      handleLogout();
    }
  };

  const isActive = (path: string | null) => {
    if (!path) return false;
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="flex justify-around py-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex flex-col items-center py-2 px-3 rounded-lg transition-colors
                ${
                  active
                    ? "text-blue-600"
                    : item.id === "logout" 
                    ? "text-red-500 hover:text-red-700"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              <IconComponent size={20} />
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomBar;
