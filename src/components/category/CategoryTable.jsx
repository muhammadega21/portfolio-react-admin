import { AnimatePresence, motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Modal from "./../Form/modal";
import Input from "../Form/Input";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/categoryService";
import CircleLoading from "../elements/CircleLoading";
import AlertSuccess from "../alerts/AlertSuccess";
import AlertError from "../alerts/AlertError";
import ThreeDots from "../elements/ThreeDots";

const CategoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      await getCategories().then((response) => {
        setCategories(response?.data || []);
        setFilteredData(response?.data || []);
      });
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredData(categories);
    } else {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(term)
      );
      setFilteredData(filtered);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setIsButtonLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      const res = await addCategory(data);

      document.getElementById("add_category_modal").close();
      setFormData({ name: "" });

      const response = await getCategories();
      setCategories(response?.data || []);
      setFilteredData(response?.data || []);
      AlertSuccess(res.message);
    } catch (err) {
      document.getElementById("add_category_modal").close();
      AlertError(err.response.data.message.name);
    } finally {
      setIsButtonLoading(false);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!formData.id || !formData.name.trim()) {
      AlertError("ID kategori atau nama kategori tidak valid");
      return;
    }

    setIsButtonLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("_method", "PUT");

      const res = await updateCategory(formData.id, data);

      AlertSuccess(res.message || "Kategori berhasil diperbarui");

      // Tutup modal dan reset form
      document.getElementById("edit_category_modal").close();
      setFormData({ name: "" });

      // Refresh data
      const response = await getCategories();
      setCategories(response?.data || []);
      setFilteredData(response?.data || []);
    } catch (err) {
      document.getElementById("add_category_modal").close();
      AlertError(err.response.data.message.name);
    } finally {
      setIsButtonLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak dapat membatalkan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleteLoading(true);
        deleteCategory(id)
          .then((response) => {
            AlertSuccess(response.message);
            return fetchCategories();
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

  const openModal = () => {
    setFormData({ name: "" });
    document.getElementById("add_category_modal").showModal();
  };

  const handleEdit = (category) => {
    setFormData(category);
    document.getElementById("edit_category_modal").showModal();
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center my-5">
        <CircleLoading />
      </div>
    );
  }

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
          <h2 className="text-xl font-semibold text-gray-100">Category List</h2>
          <div className="flex gap-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search category..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <button className="btn btn-primary" onClick={openModal}>
              Add Category
            </button>
          </div>
        </div>

        {filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="pe-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    No
                  </th>
                  <th className="pe-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className=" py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {filteredData.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="pe-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {index + 1}
                    </td>
                    <td className="pe-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {product.name}
                    </td>
                    <td className=" py-4 whitespace-nowrap text-sm text-gray-300 flex items-center">
                      <button
                        className="text-indigo-400 hover:text-indigo-300 mr-2 cursor-pointer"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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

      {/* Modal Component */}
      <Modal id="add_category_modal" title="Add New Category">
        <form onSubmit={handleAddCategory}>
          <Input
            label="Category Name"
            id="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
            labelColor={"#fff"}
          />
          <div className="flex justify-end mt-4 ">
            <button className="btn btn-primary">
              {isButtonLoading ? <ThreeDots size={7} /> : "Add"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal id="edit_category_modal" title="Edit Category">
        {formData && (
          <form onSubmit={handleUpdateCategory}>
            <Input
              label="Category Name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              labelColor={"#fff"}
            />
            <div className="flex justify-end mt-4 ">
              <button className="btn btn-primary">
                {isButtonLoading ? <ThreeDots size={7} /> : "Update"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};
export default CategoryTable;
