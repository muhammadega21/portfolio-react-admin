import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import ConnectedAccounts from "../components/settings/ConnectedAccounts";
import DangerZone from "../components/settings/DangerZone";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";
import CircleLoading from "../components/elements/CircleLoading";

const SettingPage = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const response = JSON.parse(localStorage.getItem("user"));
      setUser(response);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return (
      <div className="grid place-items-center my-5">
        <CircleLoading />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <Header title="Settings" />
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <Profile
          name={user.name}
          slug={user.slug}
          profession={user.profession}
          profile_image={user.profile_image}
        />
        <Notifications />
        <Security />
        <ConnectedAccounts />
        <DangerZone />
      </main>
    </div>
  );
};
export default SettingPage;
