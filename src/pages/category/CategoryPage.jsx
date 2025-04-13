import Header from "../../components/common/Header";

import CategoryTable from "../../components/category/CategoryTable";

const CategoryPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Categories" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <CategoryTable />
      </main>
    </div>
  );
};
export default CategoryPage;
