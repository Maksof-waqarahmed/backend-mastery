import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuth } from "../hooks/auth-context ";

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRoutesProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
