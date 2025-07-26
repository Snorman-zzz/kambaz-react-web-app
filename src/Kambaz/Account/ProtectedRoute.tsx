import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface RootState {
  accountReducer: {
    currentUser: unknown | null;
  };
}

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  return currentUser ? <>{children}</> : <Navigate to="/Kambaz/Account/Signin" />;
}
