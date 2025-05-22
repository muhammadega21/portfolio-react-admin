import { Outlet } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import { ProtectedRoute } from "./services/authService";

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
