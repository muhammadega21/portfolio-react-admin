import { useState } from "react";
import Input from "../components/Form/Input";
import { register } from "../services/authService";
import ThreeDots from "./../components/elements/ThreeDots";
import AlertError from "../components/alerts/AlertError";
import AlertSuccess from "./../components/Alerts/AlertSuccess";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profession: "",
    profile_image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await register(formData);
      AlertSuccess(response.message, () => navigate("/login"));
    } catch (err) {
      AlertError("Terjadi kesalahan ketika melakukan pendaftaran.");
      setError(
        err.response.data.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Your Account
          </h2>
          <p className="text-gray-500 mt-2">
            Fill in the details below to get started
          </p>
        </div>

        <form onSubmit={handleRegister} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <Input
              label="Name"
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              error={error?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {/* Email */}
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="yourmail@example.com"
              value={formData.email}
              error={error?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {/* Password */}
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              error={error?.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              group
            />
            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              id="password_confirmation"
              type="password"
              placeholder="••••••••"
              value={formData.password_confirmation}
              error={error?.password_confirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
              group
            />
            {/* Profession */}
            <Input
              label="Profession"
              id="profession"
              type="text"
              placeholder="Mobile Programming, Web Programming, etc."
              value={formData.profession}
              error={error?.profession}
              onChange={(e) =>
                setFormData({ ...formData, profession: e.target.value })
              }
            />
            {/* Profile Picture */}
            <Input
              label="Profile Picture"
              id="profile_image"
              type="file"
              inputStyle="file-input w-full"
              toolTip={true}
              toolTipImg="profile-image"
              value={formData.profile_image}
              error={error?.profile_image}
              onChange={(e) =>
                setFormData({ ...formData, profile_image: e.target.files[0] })
              }
            />
          </div>
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? <ThreeDots /> : "Create Account"}
            </button>
          </div>
          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
