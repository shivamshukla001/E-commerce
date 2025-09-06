import { Navigate, useLocation } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // ✅ Only redirect to /home if user is logged in 
  // AND trying to visit login/register
  if (token && (location.pathname === "/" || location.pathname === "/register")) {
    return <Navigate to="/" replace />;
  }

  return children;
}
