import Table from "../../components/table";
import { useProjects } from "../../store/projects";

export const Home = () => {
  const { totalPages, paginatedData, setCurrentPage, currentPage } =
    useProjects();

  if (!paginatedData?.length) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="home">
      <Table
        data={paginatedData}
        handlePageChange={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        columns={[
          { key: "id", label: "S.No." },
          { key: "percentageFunded", label: "Percentage Funded" },
          { key: "amountPledged", label: "Amount Pledged" },
        ]}
      />
    </div>
  );
};
