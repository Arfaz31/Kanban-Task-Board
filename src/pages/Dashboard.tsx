import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hook";
import { taskService, type Task } from "../services/taskService";

const Dashboard = () => {
  const { userInfo, organizationInfo, selectedPlan } = useAppSelector(
    (state) => state.onboarding
  );
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentTasks = async () => {
      try {
        const tasks = await taskService.getTasks();

        setRecentTasks(tasks.slice(-3).reverse());
      } catch (error) {
        console.error("Failed to fetch recent tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTasks();
  }, []);

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "📋";
      case "inprogress":
        return "⚡";
      case "done":
        return "✅";
      default:
        return "📋";
    }
  };

  const getStatusText = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "added to To Do";
      case "inprogress":
        return "moved to In Progress";
      case "done":
        return "completed";
      default:
        return "updated";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {userInfo.name}! 👋
        </h2>
        <p className="text-gray-600">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">User Information</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">👤</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Name: {userInfo.name}</p>
          <p className="text-gray-600 text-sm">Email: {userInfo.email}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Workspace</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">🏢</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Name: {organizationInfo.workspaceName}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Current Plan</h3>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">💎</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm capitalize">{selectedPlan}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">
                      {getStatusIcon(task.status)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Task "{task.title}" {getStatusText(task.status)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Priority: {task.priority} • ID: {task.id}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No recent activity</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
