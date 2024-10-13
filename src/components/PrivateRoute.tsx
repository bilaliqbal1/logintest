import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useValidateTokenQuery } from "../store/features/auth/authApi";
import { setUser, logout } from "../store/features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useValidateTokenQuery();

  useEffect(() => {
    if (data?.valid) {
      dispatch(setUser("Authenticated User")); // Example user
    } else if (error) {
      dispatch(logout());
    }
  }, [data, error, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Spinner or loader component
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
