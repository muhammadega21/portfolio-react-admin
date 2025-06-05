import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import ConnectedAccounts from "../components/settings/ConnectedAccounts";
import DangerZone from "../components/settings/DangerZone";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";
import CircleLoading from "../components/elements/CircleLoading";
import { getUser, updateProfileUser } from "../services/userService";
import AlertSuccess from "../components/alerts/AlertSuccess";
import { useNavigate } from "react-router-dom";
import AlertError from "../components/alerts/AlertError";

const SettingPage = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const getUserProfile = async () => {
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
    getUserProfile();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const res = await updateProfileUser(formData);
      const updatedUser = await getUser();
      localStorage.setItem("user", JSON.stringify(updatedUser.data));
      getUserProfile();
      AlertSuccess(res.message, () => navigate("/setting"));
    } catch (err) {
      AlertError("Gagal update profile.");
      setError(err.response?.data?.message || {});
    } finally {
      setIsLoading(false);
    }
  };
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
          handleOnSubmit={handleSubmit}
          error={error}
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
