// import { IUserRole } from "@/store/user-store";
// import React, { ReactNode } from "react";
// import { Navigate } from "react-router-dom";

// interface ProtectedRouteProps {
//   children: ReactNode;
//   isAuthenticated: boolean;
//   userRole: IUserRole[];
//   requiredRoles?: IUserRole[];
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   children,
//   isAuthenticated,
//   userRole,
//   requiredRoles,
// }) => {
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (
//     requiredRoles &&
//     userRole.every((role) => !requiredRoles.includes(role))
//   ) {
//     return <Navigate to="/" replace />;
//   }

//   return <div className="w-full">{children}</div>;
// };

// export default ProtectedRoute;


import { IUserRole } from "@/store/user-store";
import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  userRole: IUserRole[];
  requiredRoles?: IUserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  userRole,
  requiredRoles,
}) => {
  const location = useLocation(); // capture current location

  if (!isAuthenticated) {
    // Pass current route as state to login
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  

  if (
    requiredRoles &&
    userRole.every((role) => !requiredRoles.includes(role))
  ) {
    return <Navigate to="/" replace />;
  }

  return <div className="w-full max-h-full overflow-scroll">{children}</div>;
};

export default ProtectedRoute;
