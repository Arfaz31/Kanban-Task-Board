import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Onboarding from "../pages/Onboarding";
import Dashboard from "../pages/Dashboard";
import TaskBoard from "../components/TaskBoard";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "tasks",
        element: <TaskBoard />,
      },
    ],
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
