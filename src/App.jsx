import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import ServicePage from "./pages/ServicePage";
import PortfolioPage from "./pages/PortfolioPage";
import FeedbackPage from "./pages/FeedbackPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import SettingPage from "./pages/SettingPage";
import ArticlePage from "./pages/article/ArticlePage";
import ArticleAddPage from "./pages/article/ArticleAddPage";
import ArticleEditPage from "./pages/article/ArticleEditPage";
import CategoryPage from "./pages/category/CategoryPage";
import AboutPage from "./pages/AboutPage";
import { ProtectedRoute } from "./services/authService";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
                <Sidebar />
                <div className="flex-1 p-4 overflow-auto">
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/article" element={<ArticlePage />} />
                    <Route path="/article/add" element={<ArticleAddPage />} />
                    <Route
                      path="/article/edit/:id"
                      element={<ArticleEditPage />}
                    />
                    <Route path="/category" element={<CategoryPage />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/service" element={<ServicePage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />
                    <Route path="/setting" element={<SettingPage />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
