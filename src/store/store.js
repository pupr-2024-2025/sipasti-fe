import { create } from "zustand";

const usePengumpulanInformasiStore = create((set) => ({
  allData: [],
  tableData: [],
  searchQuery: "",
  vendorFilters: [],
  currentPage: 1,
  itemsPerPage: 10,
  setAllData: (data) => set({ allData: data }),
  setTableData: (data) => set({ tableData: data }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setVendorFilters: (filters) => set({ vendorFilters: filters }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default usePengumpulanInformasiStore;
