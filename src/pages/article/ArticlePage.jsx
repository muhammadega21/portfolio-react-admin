import Header from "../../components/common/Header";

import ArticlesTable from "../../components/articles/ArticlesTable";
import SubHeader from "../../components/common/SubHeader";
import { useEffect, useState } from "react";
import { getArticlePageTitle, getBlog } from "../../services/blogService";
import CircleLoading from "./../../components/elements/CircleLoading";

const ArticlePage = () => {
  const [articlePageTitle, setArticlePageTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        // Fetch data secara paralel
        const [titleResponse, blogsResponse] = await Promise.all([
          getArticlePageTitle(),
          getBlog(),
        ]);

        setArticlePageTitle(titleResponse?.page_intro || "Empty Page Title");
        setBlogs(blogsResponse?.data || []);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (isLoading) {
    return (
      <div className="grid place-items-center my-5">
        <CircleLoading />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Articles" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <SubHeader
          title={"Article"}
          img={"page-header"}
          inputTitle={"Sub Header Article"}
          inputValue={articlePageTitle}
          route={"/article"}
        />
        <ArticlesTable data={blogs} />
      </main>
    </div>
  );
};
export default ArticlePage;
