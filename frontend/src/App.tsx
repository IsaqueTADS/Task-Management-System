import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./pages/dashboard/page";
import LoginPage from "./pages/login/login-page";
import SignupPage from "./pages/signup/signup-page";
import UserStorage from "./context/user-context";
import { ThemeProvider } from "./context/theme-provider";
import ProtectRoute from "./helpers/protect-route";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <UserStorage>
          <div className="">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/"
                element={
                  <ProtectRoute>
                    <Page />
                  </ProtectRoute>
                }
              />
            </Routes>
          </div>
        </UserStorage>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
