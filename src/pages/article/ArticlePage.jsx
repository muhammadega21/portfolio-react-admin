import Header from "../../components/common/Header";

import ArticlesTable from "../../components/articles/ArticlesTable";

const ArticlePage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Articles" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <ArticlesTable />
      </main>
    </div>
  );
};
export default ArticlePage;
