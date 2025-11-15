import { LOGIN_USER_POST, USER_PROFILE_GET } from "@/config/api";
import React from "react";
import { useNavigate } from "react-router-dom";

interface UserContext {
  loginUser: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  userData: UserData | null;
  isLogin: boolean | null;
  logoutUser: () => void;
}

export const UserContext = React.createContext<UserContext | null>(null);
export const useUser = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext deve ser usado dentro de <UserStorage>");
  }

  return context;
};

const UserStorage = ({ children }: React.PropsWithChildren) => {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [isLogin, setIsLogin] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const loginUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { url, options } = LOGIN_USER_POST({ email, password });
      const response = await fetch(url, options);

      if (!response.ok) {
        const err = await response.json();
        setError(err.message);
      }

      const json = await response.json();
      setIsLogin(true);
      window.localStorage.setItem("token", json.token);
      navigate("/");
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) setError(err.message);
      console.log("Erro", err);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    window.localStorage.removeItem("token");
    setError(null);
    setLoading(false);
    setIsLogin(false);
    navigate("/login");
  };

  React.useEffect(() => {
    const getUserProfile = async () => {
      const { url, options } = USER_PROFILE_GET();
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const error = await response.json();
          console.log("TESTE ERROR:", error);
        }
        const json = await response.json();
        setUserData(json);
      } catch (err) {
        if (err instanceof Error) {
          navigate("/login")
        }
      }
    };
    getUserProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{ loginUser, loading, error, userData, isLogin, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserStorage;
