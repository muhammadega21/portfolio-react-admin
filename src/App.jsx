import { Routes, Route } from "react-router-dom";
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
import PublicLayout from "./PublicLayout";
import ProtectedLayout from "./ProtectedLayout";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/article/add" element={<ArticleAddPage />} />
          <Route path="/article/edit/:id" element={<ArticleEditPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
