import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import ArticlePage from "./pages/ArticlePage";
import ServicePage from "./pages/ServicePage";
import PortfolioPage from "./pages/PortfolioPage";
import FeedbackPage from "./pages/FeedbackPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import SettingPage from "./pages/SettingPage";

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
                  <Route path="/article" element={<ArticlePage />} />
                  <Route path="/user" element={<UserPage />} />
                  <Route path="/service" element={<ServicePage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/feedback" element={<FeedbackPage />} />
                  <Route path="/setting" element={<SettingPage />} />
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
