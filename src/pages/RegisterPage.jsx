import Input from "./../components/Form/Input";
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
            <Input label="Name" id="name" type="text" placeholder="John Doe" />
            {/* Email */}
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="yourmail@example.com"
            />
            {/* Phone Number */}
            <Input label="Phone Number" id="phone" placeholder="1234567890" />
            {/* Password */}
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              group
            />
            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              id="password_confirmation"
              type="password"
              placeholder="••••••••"
              group
            />
            {/* Date of Birth */}
            <Input label="Date of Birth" id="date_of_birth" type="date" group />
            {/* Profession */}
            <Input
              label="Profession"
              id="profession"
              type="text"
              placeholder="Profession"
              group
            />
            {/* Address */}
            <Input
              label="Address"
              id="address"
              type="text"
              placeholder="Jakarta, Indonesia"
            />
            {/* Profile Picture */}
            <Input
              label="Profile Picture"
              id="profile_image"
              type="file"
              inputStyle="file-input w-full"
            />
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
