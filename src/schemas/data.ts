import React from "react";

export interface RawProject {
  "s.no": number;
  "amt.pledged": number;
  "percentage.funded": number;
}

export interface Project {
  id: number;
  percentageFunded: number;
  amountPledged: string;
}

export interface PaginationProps {
  totalPages: number;
  currentPage?: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

export interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  handlePageChange: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
}
