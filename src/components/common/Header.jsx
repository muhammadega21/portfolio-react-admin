const Header = ({ title }) => {
  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex gap-2 items-center">
        <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
        <div className="bg-gray-700 rounded-md p-2 w-full">
          <span className="text-sm font-medium text-gray-300">
            Update (11/07/2025): perbaikan pada add blog ={">"} hanya bisa
            upload gambar kontent melalui url
          </span>
        </div>
      </div>
    </header>
  );
};
export default Header;
