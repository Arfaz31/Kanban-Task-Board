import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomBar from "./BottomBar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col lg:ml-56">
        <Topbar onMenuClick={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
          <Outlet />
        </main>
      </div>

      <BottomBar />
    </div>
  );
};

export default MainLayout;
