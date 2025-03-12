import { useState, useEffect } from "react";

interface RawProject {
  "s.no": number;
  "amt.pledged": number;
  "percentage.funded": number;
}

interface Project {
  id: number;
  percentageFunded: number;
  amountPledged: string;
}

const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
const RECORDS_PER_PAGE = 5;

export const useProjects = () => {
  const [data, setData] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        const transformedData = result?.map((item: RawProject) => ({
          id: item["s.no"], // Renaming "s.no" to "id"
          percentageFunded: item["percentage.funded"], // Renaming field
          amountPledged: `$${item["amt.pledged"]}`, // Formatting currency
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data?.length / RECORDS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * RECORDS_PER_PAGE,
    currentPage * RECORDS_PER_PAGE
  );

  return { totalPages, paginatedData, currentPage, setCurrentPage };
};
