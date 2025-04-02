import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import ArticlePage from "./pages/ArticlePage";
import ServicePage from "./pages/ServicePage";
import PortfolioPage from "./pages/PortfolioPage";
import FeedbackPage from "./pages/FeedbackPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
              <Sidebar />
              <div className="flex-1 p-4 overflow-auto">
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/articles" element={<ArticlePage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/services" element={<ServicePage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/feedback" element={<FeedbackPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
