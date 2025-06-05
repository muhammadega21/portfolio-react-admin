const Header = ({ title }) => {
  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex gap-2 items-center">
        <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
        <div className="bg-gray-700 rounded-md p-2 w-full">
          <marquee
            behavior="scroll"
            direction="left"
            className="text-sm font-medium text-gray-300"
          >
            News: Update profile pada halaman setting
          </marquee>
        </div>
      </div>
    </header>
  );
};
export default Header;
