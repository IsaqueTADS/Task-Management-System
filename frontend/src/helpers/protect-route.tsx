import { useUser } from "@/context/user-context";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }: React.PropsWithChildren) => {
  const { isLogin } = useUser();

  console.log("islogin", isLogin);

  if (isLogin === true) return children;
  else if (isLogin === false ) {
    return <Navigate to={"/auth/login"} />;
  } else {
    return <></>;
  }
};

export default ProtectRoute;
