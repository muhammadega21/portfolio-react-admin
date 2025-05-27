import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = ({ name, slug, profession, profile_image, onSubmit }) => {
  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src={`${import.meta.env.VITE_STORAGE_URL}/${profile_image}`}
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-100">{name}</h3>
          <p className="text-gray-400">{profession}</p>
          <span>
            Link :{" "}
            <a
              className="text-indigo-400 underline"
              href={`https://mhdega-portfolioreact.vercel.app/${slug}`}
              target="_blank"
            >
              https://mhdega-portfolioreact.vercel.app/{slug}
            </a>
          </span>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <button
          type="button"
          onClick={() => document.getElementById("profile_image").click()}
          className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
        >
          Edit Profile
        </button>
        <input type="file" hidden name="profile_image" id="profile_image" />
      </form>
    </SettingSection>
  );
};
export default Profile;
