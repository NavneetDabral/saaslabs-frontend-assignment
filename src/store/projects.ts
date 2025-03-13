import { useState, useEffect } from "react";
import { Project, RawProject } from "../schemas/data";
import { API_URL, RECORDS_PER_PAGE } from "./constant";

export const useProjects = () => {
  const [data, setData] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        const transformedData = result?.map((item: RawProject) => ({
          id: item["s.no"],
          percentageFunded: item["percentage.funded"],
          amountPledged: `$${item["amt.pledged"]}`,
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
