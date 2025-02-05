import { useState } from "react";

export const usePengumpulanInformasiState = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [vendorFilters, setVendorFilters] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerateLinkModalOpen, setIsGenerateLinkModalOpen] = useState(false);
  const itemsPerPageModal = 5;

  return {
    isModalOpen,
    setIsModalOpen,
    isGenerateLinkModalOpen,
    setIsGenerateLinkModalOpen,
    itemsPerPageModal,
    activeMenu,
    setActiveMenu,
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
