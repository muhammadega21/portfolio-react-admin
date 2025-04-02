function RegisterPage() {
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
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 ease-in-out"
                placeholder="John Doe"
              />
            </div>
            {/* Email */}
            <div className="md:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 ease-in-out"
                placeholder="yourmail@example.com"
              />
            </div>
            {/* Phone Number */}
            <div className="md:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 ease-in-out"
                placeholder="081234567890"
                pattern="[0-9]{12,}"
                title="Invalid phone number"
              />
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 ease-in-out"
                placeholder="••••••••"
              />
            </div>
            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 ease-in-out"
                placeholder="••••••••"
              />
            </div>
            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 ease-in-out"
              />
            </div>
            {/* Profession */}
            <div>
              <label
                htmlFor="profession"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profession
              </label>
              <input
                type="text"
                id="profession"
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 ease-in-out"
                placeholder="Web Programming"
              />
            </div>
            {/* Address */}
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300  transition duration-150 ease-in-out"
                placeholder="Jl. Raya No. 123, Jakarta"
              />
            </div>
            {/* Profile Picture */}
            <div className="md:col-span-2">
              <label
                htmlFor="profile_image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="profile_image"
                className="file-input w-full"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Account
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
