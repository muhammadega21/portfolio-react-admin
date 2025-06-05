import { ImageUp, SquarePen, User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useEffect, useRef, useState } from "react";

const Profile = ({
  name,
  slug,
  profession,
  profile_image,
  handleOnSubmit,
  error,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: name || "",
    profession: profession || "",
    slug: slug || "",
  });

  useEffect(() => {
    setFormData({
      name: name || "",
      profession: profession || "",
      slug: slug || "",
    });
    setSelectedImage(null); // Reset selected image when props change
  }, [name, slug, profession]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous URL if exists
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Create new FormData to include the file
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("profession", formData.profession);
    submitData.append("_method", "PUT");

    // Add the image file if selected
    if (fileInputRef.current?.files[0]) {
      submitData.append("profile_image", fileInputRef.current.files[0]);
      submitData.append("old_image", profile_image);
    }

    handleOnSubmit(submitData);
    setIsEditing(false);
    setSelectedImage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedImage(null);
    // Reset form data to original values
    setFormData({
      name: name || "",
      profession: profession || "",
      slug: slug || "",
    });
  };

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  return (
    <SettingSection icon={User} title={"Profile"}>
      {isEditing ? (
        <form onSubmit={onSubmit} encType="multipart/form-data" method="put">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex relative">
              <div className="relative group w-max h-max">
                <img
                  src={
                    selectedImage ||
                    `${import.meta.env.VITE_STORAGE_URL}/${profile_image}`
                  }
                  alt="Profile"
                  className={`rounded-full w-24 h-24 object-cover border-2 ${
                    error?.profile_image
                      ? "border-red-500 group-hover:border-red-600"
                      : "border-transparent group-hover:border-gray-300"
                  }   shadow-lg cursor-pointer transition-transform duration-200  group-hover:scale-105`}
                  onClick={() => fileInputRef.current.click()}
                />
                <div
                  className={`${
                    error?.profile_image ? "block" : "hidden"
                  } max-w-24 text-center`}
                >
                  <span className={`mt-1 text-sm text-red-600`}>
                    {error?.profile_image}
                  </span>
                </div>
                <input
                  type="file"
                  hidden
                  name="profile_image"
                  id="profile_image"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <label
                  htmlFor="profile_image"
                  className="cursor-pointer flex items-center justify-center h-8 w-8 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                >
                  <ImageUp size={16} />
                </label>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-4 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full outline-none bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <span
                    className={`${
                      error?.name ? "block" : "hidden"
                    } mt-1 text-sm text-red-600`}
                  >
                    {error?.name}
                  </span>
                </div>

                <div>
                  <label
                    htmlFor="profession"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Profession
                  </label>
                  <input
                    type="text"
                    name="profession"
                    id="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className="w-full outline-none bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <span
                    className={`${
                      error?.profession ? "block" : "hidden"
                    } mt-1 text-sm text-red-600`}
                  >
                    {error?.profession}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-400">Profile Link: </span>
                <a
                  className="text-indigo-400 underline text-sm"
                  href={`https://mhdega-portfolioreact.vercel.app/${formData.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://mhdega-portfolioreact.vercel.app/{formData.slug}
                </a>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition duration-200"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_STORAGE_URL}/${profile_image}`}
              alt="Profile"
              className="rounded-full w-20 h-20 object-cover border-2 border-gray-700"
            />
            <button
              className="absolute cursor-pointer -bottom-1 -right-1 bg-yellow-500 hover:bg-yellow-600 rounded-full p-1.5 transition"
              onClick={() => setIsEditing(true)}
              aria-label="Edit profile"
            >
              <SquarePen size={14} color="white" />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-100">{name}</h3>
            </div>
            <p className="text-gray-400 mb-2">{profession}</p>
            <div>
              <span className="text-sm text-gray-400">Profile Link: </span>
              <a
                className="text-indigo-400 underline text-sm"
                href={`https://mhdega-portfolioreact.vercel.app/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                https://mhdega-portfolioreact.vercel.app/{slug}
              </a>
            </div>
          </div>
        </div>
      )}
    </SettingSection>
  );
};

export default Profile;
