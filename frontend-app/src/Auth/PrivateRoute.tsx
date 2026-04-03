import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
  allowedRoles?: string[];
};

function PrivateRoute({ children, allowedRoles }: Props) {
  const token = localStorage.getItem("access");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ❌ Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Role check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;