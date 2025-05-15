import Header from "../../components/common/Header";
import ArticlesForm from "../../components/articles/ArticlesForm";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import CircleLoading from "../../components/elements/CircleLoading";

function ArticleAddPage() {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchCategories = async () => {
        const response = await getCategories();
        setCategory(response);
      };
      fetchCategories();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
          <ArticlesForm category={category} />
        </main>
      </div>
    </>
  );
}

export default ArticleAddPage;
