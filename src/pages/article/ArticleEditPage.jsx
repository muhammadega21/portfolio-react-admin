import Header from "../../components/common/Header";
import ArticlesForm from "../../components/articles/ArticlesForm";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import { getBlogById, updateBlog } from "../../services/blogService";
import CircleLoading from "../../components/elements/CircleLoading";
import { useNavigate, useParams } from "react-router-dom";
import AlertSuccess from "../../components/alerts/AlertSuccess";
import AlertError from "../../components/alerts/AlertError";

function ArticleEditPage() {
  const [categories, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState({});
  const [error, setError] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategory(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const blogById = async () => {
      try {
        const response = await getBlogById(id);
        setBlog(response);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    blogById();
  }, [id]);

  const handleSubmit = async (formData) => {
    setError(null);
    try {
      const res = await updateBlog(id, {
        ...formData,
        oldImage: blog.data.blog_img,
        _method: "PUT",
      });
      AlertSuccess(res.message, () => navigate("/article"));
    } catch (err) {
      AlertError("Gagal mengupdate artikel.");
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
            category={categories}
            data={blog}
            error={error}
            handleSubmitData={handleSubmit}
            formLabel="Edit Article"
          />
        </main>
      </div>
    </>
  );
}

export default ArticleEditPage;
