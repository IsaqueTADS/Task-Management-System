import { useUser } from "@/context/user-context";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }: React.PropsWithChildren) => {
  const { isLogin } = useUser();

  console.log("islogin", isLogin);

  const navigate = useNavigate();

  if (isLogin === true) return children;
  else if (isLogin === false || isLogin === null) {
    navigate("/login");
  } else {
    return <></>;
  }
};

export default ProtectRoute;
