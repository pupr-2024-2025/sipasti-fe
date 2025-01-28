import { useState } from "react";

export const usePengumpulanInformasiState = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [vendorFilters, setVendorFilters] = useState([]);

  return {
    tableData,
    setTableData,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    vendorFilters,
    setVendorFilters,
  };
};
