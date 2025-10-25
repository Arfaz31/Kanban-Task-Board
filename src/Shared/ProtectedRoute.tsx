import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isCompleted } = useAppSelector((state) => state.onboarding);

  if (!isCompleted) {
    return <Navigate to="/onboarding" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
