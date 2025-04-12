import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Input from "./../Form/Input";
import Select from "./../Form/select";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { useState } from "react";
function ArticlesForm({ category, data }) {
  const [formData, setFormData] = useState({
    title: data?.title || "",
    category: data?.category || "",
    image: null,
    content: data?.content || "",
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // kirim formData ke server dengan fetch/axios dll
  };
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Add Article</h2>
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
              group
            />
            <Select
              label="Category"
              id="category"
              labelColor="text-white"
              category={category}
              defaultValue="Select Category"
              inputStyle="bg-gray-800 !text-base"
              value={formData.category}
              onChange={handleChange}
              group
            />
            <Input
              label="Image"
              id="image"
              type="file"
              labelColor="text-white"
              inputStyle="file-input w-full bg-gray-800 focus:outline-none border border-gray-300"
              onChange={handleChange}
            />
            <div className="col-span-2 h-auto">
              <label className={"block text-sm font-medium mb-2 text-white"}>
                Content
              </label>
              <FroalaEditorComponent
                tag="textarea"
                config={{
                  placeholderText: "Write your article here",
                  heightMin: 200,
                }}
                model={formData.content}
                onModelChange={handleContentChange}
              />
            </div>
            <div className="col-span-2 flex justify-end mt-4">
              <button type="submit" className="btn btn-info text-white">
                {data ? "Update" : "Add"} Article
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default ArticlesForm;
