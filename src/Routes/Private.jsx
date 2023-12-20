import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contextsAuth";

export function Private({ children }) {
  const { logged, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div></div>
    )
  }

  if (!logged) {
    return <Navigate to="/" />
  }

  return children;
}