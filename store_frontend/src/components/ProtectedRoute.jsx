import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("token"));

  if (!decodedToken || isExpired) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;