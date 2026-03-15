import { Navigate, Outlet } from "react-router-dom";
import { useProfileQuery } from "../services/auth.api";

const ProtectedRoute = () => {
  const { data: profile, isLoading, error } = useProfileQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0c0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !profile) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
