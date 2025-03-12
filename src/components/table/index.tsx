import { Pagination } from "../pagination";
import "./table.css";

interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const Table = <T,>({
  data,
  columns,
  handlePageChange,
  currentPage,
  totalPages,
}: TableProps<T>) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={String(col.key)}>{String(item[col.key])}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="no-data">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Table;
