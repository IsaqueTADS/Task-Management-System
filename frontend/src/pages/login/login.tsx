import { useUser } from "@/context/user-context";
import { Navigate, Outlet } from "react-router-dom";

const Login = () => {
  const { isLogin } = useUser();

  if (isLogin) return <Navigate to={"/"} />;
  return <Outlet />;
};

export default Login;
