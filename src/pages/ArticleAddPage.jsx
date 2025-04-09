import Header from "../components/common/Header";
import ArticlesForm from "./../components/articles/ArticlesForm";

function ArticleAddPage() {
  const data = [
    { id: 1, name: "Laravel" },
    { id: 2, name: "React Js" },
    { id: 3, name: "Web Development" },
  ];
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Articles" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <ArticlesForm data={data} />
        </main>
      </div>
    </>
  );
}

export default ArticleAddPage;
