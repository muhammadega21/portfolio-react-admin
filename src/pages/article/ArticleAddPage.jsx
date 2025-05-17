import Header from "../../components/common/Header";
import ArticlesForm from "../../components/articles/ArticlesForm";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import CircleLoading from "../../components/elements/CircleLoading";
import { addBlog } from "../../services/blogService";
import AlertSuccess from "../../components/alerts/AlertSuccess";
import AlertError from "../../components/alerts/AlertError";
import { useNavigate } from "react-router-dom";

function ArticleAddPage() {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategory(response);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (formData) => {
    setError(null);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("content", formData.content);
      if (formData.blog_img) {
        data.append("blog_img", formData.blog_img);
      }

      const res = await addBlog(formData);
      AlertSuccess(res.message, () => navigate("/article"));
    } catch (err) {
      AlertError("Gagal menambahkan artikel.");
      setError(err.response.data.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Articles" />
        <div className="grid place-items-center my-5 relative z-10">
          <CircleLoading />
        </div>
      </div>
    );

  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Articles" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <ArticlesForm
            category={category}
            error={error}
            handleSubmitData={handleSubmit}
          />
        </main>
      </div>
    </>
  );
}

export default ArticleAddPage;
