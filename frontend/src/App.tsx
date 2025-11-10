import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./pages/dashboard/page";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route path="/" element={<Page />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
