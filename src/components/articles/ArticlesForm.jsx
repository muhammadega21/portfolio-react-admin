import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Input from "./../Form/Input";
import Select from "./../Form/select";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js";
function ArticlesForm({ data }) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Title"
            id="title"
            type="text"
            placeholder="Article Title"
            labelColor={"text-white"}
            group
          />
          <Select
            label={"Category"}
            id={"category"}
            labelColor={"text-white"}
            data={data}
            defaultValue={"Select Category"}
            inputStyle={"bg-gray-800 !text-base "}
            group
          />
          <Input
            label="Image"
            id="img"
            type="file"
            labelColor={"text-white"}
            inputStyle="file-input w-full bg-gray-800 focus:outline-none border border-gray-300"
          />
          <div className="col-span-2 h-auto">
            <FroalaEditorComponent
              tag="textarea"
              config={{
                placeholderText: "Write your article here",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ArticlesForm;
