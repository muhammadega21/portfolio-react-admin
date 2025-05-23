import { AnimatePresence, motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CircleLoading from "../elements/CircleLoading";
import { deleteBlog, getBlog } from "../../services/blogService";
import AlertError from "../alerts/AlertError";
import AlertSuccess from "../alerts/AlertSuccess";

const ArticlesTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await getBlog();
      setFilteredData(response?.data || []);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = filteredData.filter(
      (blog) =>
        blog.title.toLowerCase().includes(term) ||
        blog.category.toLowerCase().includes(term)
    );

    setFilteredData(filtered);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeleteLoading(true);
        deleteBlog(id)
          .then((response) => {
            AlertSuccess(response.message);
            return fetchBlogs();
          })
          .catch((error) => {
            AlertError(error.message || "Error deleting blog.");
            console.error("Error deleting blog:", error);
          })
          .finally(() => {
            setIsDeleteLoading(false);
          });
      }
    });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading ||
          (isDeleteLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md bg-opacity-50"
            >
              <CircleLoading />
            </motion.div>
          ))}
      </AnimatePresence>
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Article List</h2>
          <div className="flex gap-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <Link to={"/article/add"} className="btn btn-primary">
              Add Article
            </Link>
          </div>
        </div>

        {filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {filteredData
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((blog) => (
                    <motion.tr
                      key={blog.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                        <img
                          src={`${import.meta.env.VITE_STORAGE_URL}/${
                            blog.blog_img
                          }`}
                          alt={blog.title}
                          className="size-10 rounded-full"
                        />
                        {blog.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {blog.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(blog.date).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center">
                        <Link
                          to={`/article/edit/${blog.id}`}
                          className="text-indigo-400 hover:text-indigo-300 mr-2"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-400 hover:text-red-300 cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400">Data tidak ditemukan</p>
        )}
      </motion.div>
    </>
  );
};

export default ArticlesTable;
