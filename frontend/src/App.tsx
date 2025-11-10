import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./pages/dashboard/page";
import { ThemeProvider } from "./components/theme-provider";
import LoginPage from "./pages/login/login-page";
import SignupPage from "./pages/signup/signup-page";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Page />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
