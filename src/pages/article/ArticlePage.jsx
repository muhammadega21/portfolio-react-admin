import Header from "../../components/common/Header";

import ArticlesTable from "../../components/articles/ArticlesTable";
import SubHeader from "../../components/common/SubHeader";
import { useEffect, useState } from "react";
import { getArticlePageTitle } from "../../services/blogService";
import CircleLoading from "./../../components/elements/CircleLoading";

const ArticlePage = () => {
  const [articlePageTitle, setArticlePageTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticlePageTitle = async () => {
      try {
        const response = await getArticlePageTitle();

        if (response?.page_intro) {
          setArticlePageTitle(response.page_intro);
        } else {
          throw new Error("Data page_intro tidak ditemukan dalam response");
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        setArticlePageTitle("Empty Page Title");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticlePageTitle();
  }, []);

  if (isLoading)
    return (
      <div className="grid place-items-center my-5">
        <CircleLoading />
      </div>
    );

  const data = {
    article: {
      id: 1,
      user_id: 1,
      page_intro:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, placeat! Temporibus soluta quo a expedita",
      blogs: [
        {
          id: 1,
          title: "Cara Install Laravel",
          date: "2023-07-01",
          img: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww",
          category: {
            id: 1,
            name: "Laravel",
            slug: "laravel",
          },
        },
        {
          id: 2,
          title: "Cara Install React",
          date: "2023-07-02",
          img: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww",
          category: {
            id: 1,
            name: "Laravel",
            slug: "laravel",
          },
        },
        {
          id: 3,
          title: "Perbedaan Frontend dan Backend",
          date: "2023-07-02",
          img: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww",
          category: {
            id: 1,
            name: "Laravel",
            slug: "laravel",
          },
        },
      ],
    },
  };
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
        <ArticlesTable data={data} />
      </main>
    </div>
  );
};
export default ArticlePage;
