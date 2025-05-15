import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Input from "../Form/Input";
import { useState } from "react";
import { updatePageTitle } from "../../services/pageTitle";
import { AlertSuccess } from "../alerts/AlertSuccess";
import { useNavigate } from "react-router-dom";
import { AlertError } from "../alerts/AlertError";
import { CircleLoading } from "../elements/CircleLoading";
const SubHeader = ({ title, img, inputValue, route }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    _method: "put",
    page_intro: inputValue || "Empty",
  });

  // const navigate = useNavigate();

  const handleUpdateTitle = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await updatePageTitle(route, formData);
      AlertSuccess(response.message);
    } catch (e) {
      console.error(e);
      AlertError(e.message);
    } finally {
      setIsLoading(false);
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
          <form onSubmit={handleUpdateTitle}>
            <Input
              id="page_intro"
              type="text"
              value={formData["page_intro"]}
              labelColor="text-white"
              onChange={(e) =>
                setFormData({ ...formData, page_intro: e.target.value })
              }
            />
            <div className="mt-3 flex justify-end">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4  rounded transition duration-200 w-full sm:w-auto cursor-pointer">
                {isLoading ? <CircleLoading size={20} /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default SubHeader;
