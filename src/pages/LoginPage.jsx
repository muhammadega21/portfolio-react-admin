import { useState } from "react";
import Input from "../components/Form/Input";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { AlertSuccess } from "./../components/alerts/AlertSuccess";
import { AlertError } from "../components/alerts/AlertError";
import { ThreeDots } from "../components/elements/ThreeDots";
function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await login(formData);
      const token = response.access_token;
      const user = response.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      AlertSuccess(response.message, () => navigate("/"));
    } catch (err) {
      console.log(err);

      AlertError("Email atau password salah.");
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
            Login to Your Account
          </h2>
          <p className="text-gray-500 mt-2">
            Fill in the details below to get started
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="yourmail@example.com"
              error={error?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {/* Phone Number */}
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="**********"
              error={error?.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {/* Terms and Conditions */}
            <div className="md:col-span-2 mt-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? <ThreeDots /> : "Sign In"}
            </button>
          </div>
          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
