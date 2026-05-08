import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { isAuthenticated , isLocked} = useAuth();
  const location = useLocation();

  if (!isAuthenticated || isLocked) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
