import Header from "../../components/common/Header";
import ArticlesForm from "../../components/articles/ArticlesForm";

function ArticleEditPage() {
  const categories = [
    { id: 1, name: "Laravel" },
    { id: 2, name: "React Js" },
    { id: 3, name: "Web Development" },
  ];

  const ArticleData = {
    id: 1,
    title: "Cara Install Laravel",
    category: 1,
    date: "2023-07-01",
    content: "<p><strong>Test</strong></p>",
  };
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Articles" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <ArticlesForm category={categories} data={ArticleData} />
        </main>
      </div>
    </>
  );
}

export default ArticleEditPage;
