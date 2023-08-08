import React from "react";
import HomePage from "./pages/home/HomePage";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/router/privateRoute";
import AuthRootComponent from "./pages/auth/AuthRootComponent";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LayoutComponent from "./components/layout/LayoutComponent";
import WatchlistPage from "./pages/watchlist/WatchlistPage";
import NewsPage from "./pages/news/NewsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import { SingleAssetPage } from "./pages/single-asset";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Routes>
            <Route element={<LayoutComponent />}>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/watchlist" element={<WatchlistPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/single/:id"  element={<SingleAssetPage />} />
              </Route>
              <Route path="login" element={<AuthRootComponent />} />
              <Route path="register" element={<AuthRootComponent />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
