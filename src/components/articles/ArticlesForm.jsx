import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Input from "./../Form/Input";
import Select from "./../Form/select";
import { useEffect, useState } from "react";
import FroalaEditor from "./../common/FroalaEditor";
import ThreeDots from "../elements/ThreeDots";
function ArticlesForm({ category, data, handleSubmitData, error, formLabel }) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category_id: "",
    blog_img: null,
    blog_content: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setFormData({
        title: data.data.title || "",
        category_id: data.data.category_id || "",
        blog_img: data.data.blog_img || null,
        blog_content: data.data.blog_content || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "blog_img" && files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleContentChange = (blog_content) => {
    setFormData((prev) => ({ ...prev, blog_content }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleSubmitData(formData).finally(() => setIsLoading(false));
  };
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">{formLabel}</h2>
        <Link to="/article" className="btn btn-outline btn-info">
          Back
        </Link>
      </div>

      <div className="overflow-x-auto">
        <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Title"
              id="title"
              type="text"
              placeholder="Article Title"
              labelColor="text-white"
              value={formData.title}
              onChange={handleChange}
              error={error?.title}
              group
            />
            <Select
              label="Category"
              id="category_id"
              labelColor="text-white"
              category={category}
              defaultValue="Select Category"
              inputStyle="bg-gray-800 !text-base"
              value={formData.category_id}
              onChange={handleChange}
              error={error?.category_id}
              group
            />
            <Input
              label="Image"
              id="blog_img"
              type="file"
              labelColor="text-white"
              inputStyle="file-input w-full bg-gray-800 focus:outline-none border border-gray-300"
              // value={formData.blog_img}
              error={error?.blog_img}
              onChange={handleChange}
            />
            <div className="col-span-2 h-auto">
              <label
                className={`block text-sm font-medium mb-2 ${
                  error?.blog_content ? "text-red-600" : "text-white"
                }`}
              >
                Content
              </label>
              <FroalaEditor
                tag={"textarea"}
                model={formData.blog_content}
                onModelChange={handleContentChange}
                error={error?.blog_content}
              />
            </div>
            <div className="col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded transition duration-200 w-full sm:w-auto cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ThreeDots size={7} />
                ) : data ? (
                  "Update Article"
                ) : (
                  "Add Article"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default ArticlesForm;
