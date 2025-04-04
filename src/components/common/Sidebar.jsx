import "./index.css";
import {
  HandPlatter,
  LayoutDashboard,
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
import { NavLink } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    color: "#6366f1",
    href: "/",
  },
  { name: "Article", icon: Newspaper, color: "#8B5CF6", href: "/article" },
  { name: "User", icon: Users, color: "#EC4899", href: "/user" },
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
    href: "/logout",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink key={item.href} to={item.href} className="nav">
              <motion.div className="nav-link flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700  transition-colors mb-2">
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
  );
};
export default Sidebar;
