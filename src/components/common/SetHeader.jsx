import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Input from "./../Form/Input";
import { useState } from "react";
const SetHeader = ({ title, img, inputValue }) => {
  const [formData, setFormData] = useState({
    article_intro: inputValue || "Empty",
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="my-3">
        <div className="flex items-center gap-x-2">
          <h2 className="text-xl font-semibold text-gray-100">
            Sub Header {title}
          </h2>
          <div className="tooltip tooltip-right ">
            <div className="tooltip-content">
              <div>
                <img src={`/img/${img}.png`} alt={img} />
              </div>
            </div>
            <div className="cursor-pointer">
              <HelpCircle size={16} />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <form>
            <Input
              id="page_intro"
              type="text"
              value={formData["article_intro"]}
              labelColor="text-white"
              onChange={handleChange}
            />
          </form>
          <div className="mt-3 flex justify-end">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4  rounded transition duration-200 w-full sm:w-auto">
              Update
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SetHeader;
