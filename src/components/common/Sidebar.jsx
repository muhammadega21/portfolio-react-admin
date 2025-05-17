import "./index.css";
import {
  CircleHelp,
  HandPlatter,
  LayoutDashboard,
  LayoutList,
  LogOut,
  Menu,
  MessageCircle,
  Newspaper,
  Settings,
  SquareChartGantt,
  Users,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import AlertSuccess from "../alerts/AlertSuccess";
import AlertConfirm from "../alerts/AlertConfirm";
import CircleLoading from "../elements/CircleLoading";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function handleLogout() {
    const result = await AlertConfirm({
      message: "Are you sure you want to logout?",
    });
    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await logout(token);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        AlertSuccess(response.message, () =>
          navigate("/login", { replace: true })
        );
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const SIDEBAR_ITEMS = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      color: "#6366f1",
      href: "/",
    },
    { name: "Article", icon: Newspaper, color: "#8B5CF6", href: "/article" },
    { name: "Category", icon: LayoutList, color: "#b811b3", href: "/category" },
    { name: "User", icon: Users, color: "#EC4899", href: "/user" },
    { name: "About", icon: CircleHelp, color: "#f52f5d", href: "/about" },
    { name: "Service", icon: HandPlatter, color: "#10B981", href: "/service" },
    {
      name: "Portfolio",
      icon: SquareChartGantt,
      color: "#F59E0B",
      href: "/portfolio",
    },
    {
      name: "Feedback",
      icon: MessageCircle,
      color: "#3B82F6",
      href: "/feedback",
    },
    { name: "Setting", icon: Settings, color: "#6EE7B7", href: "/setting" },
    {
      name: "Logout",
      icon: LogOut,
      color: "#EF4444",
      href: "#",
      onClick: () => handleLogout(),
    },
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md bg-opacity-50"
          >
            <CircleLoading />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 overflow-auto no-scrollbar ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <div className="h-max bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
          <motion.button
            whileHover={{ transform: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 ms-1 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
          >
            <Menu size={24} />
          </motion.button>

          <nav className="mt-5 flex-grow">
            {SIDEBAR_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={item.onClick}
                className="nav"
              >
                <motion.div className="nav-link flex items-center p-4 pe-3 ps-3.5 text-sm font-medium rounded-lg hover:bg-gray-700  transition-colors mb-2">
                  <item.icon
                    size={20}
                    style={{ color: item.color, minWidth: "20px" }}
                  />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );
};
export default Sidebar;
