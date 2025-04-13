import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "./../Form/modal";
import Input from "../Form/Input";

const CategoryData = [
  {
    id: 1,
    name: "Laravel",
  },
  {
    id: 2,
    name: "React Js",
  },
  {
    id: 3,
    name: "Web Development",
  },
];

const CategoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(CategoryData);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = CategoryData.filter((category) =>
      category.name.toLowerCase().includes(term)
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
        const filtered = CategoryData.filter((product) => product.id !== id);
        setFilteredData(filtered);
        Swal.fire("Deleted!", "Category has been deleted.", "success");
        navigate("/category");
      }
    });
  };

  const openModal = () => {
    const modal = document.getElementById("add_category_modal");
    if (modal) modal.showModal();
  };

  const handleEdit = (category) => {
    setEditData(category);
    const modal = document.getElementById("edit_category_modal");
    if (modal) modal.showModal();
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, name: e.target.value });
  };

  return (
    <>
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
        <form>
          <Input label="Category Name" id="name" type="text" />
          <div className="flex justify-end mt-4 ">
            <button className="btn btn-primary">Add</button>
          </div>
        </form>
      </Modal>

      <Modal id="edit_category_modal" title="Edit Category">
        {editData && (
          <>
            <Input
              label="Category Name"
              id="name"
              type="text"
              value={editData.name}
              onChange={handleEditChange}
            />
            <div className="flex justify-end mt-4 ">
              <button className="btn btn-primary">Update</button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
export default CategoryTable;
