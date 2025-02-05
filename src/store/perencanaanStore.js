import { create } from "zustand";
import { FetchInformasiPerencanaanData } from "../api/perencanaanApi";

const usePerencanaanStore = create((set) => ({
  allData: [],
  tableData: [],
  currentPage: 1,
  itemsPerPage: 10,
  searchQuery: "",
  vendorFilters: [],

  setMenuPosition: (position) => set({ menuPosition: position }),
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  setSelectedIdPaket: (id) => set({ selectedIdPaket: id }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setVendorFilters: (filters) => set({ vendorFilters: filters }),
  setTableData: (data) => set({ tableData: data }),
  setAllData: (data) => set({ allData: data }),

  fetchData: async () => {
    try {
      const data = await FetchInformasiPerencanaanData();
      console.log("Fetched raw data:", data);

      const uniqueData = Array.from(
        new Map(data.map((item) => [item.id, item])).values()
      );

      console.log("Filtered unique data:", uniqueData);

      set({ allData: uniqueData, tableData: uniqueData });
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  },

  handleSearch: (query) =>
    set((state) => {
      const filteredData = state.allData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(query.toLowerCase())
        )
      );
      return { searchQuery: query, tableData: filteredData, currentPage: 1 };
    }),
  handleFilterClick: (filters) =>
    set((state) => {
      const selectedFilters = filters
        .filter((filter) => filter.checked)
        .map((filter) => filter.accessor);

      const filteredData = state.allData.filter((item) => {
        if (selectedFilters.length === 0) {
          return Object.values(item).some((val) =>
            String(val).toLowerCase().includes(state.searchQuery.toLowerCase())
          );
        } else {
          return selectedFilters.some((key) =>
            String(item[key])
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase())
          );
        }
      });

      return { vendorFilters: selectedFilters, tableData: filteredData };
    }),
  handleToggleMenu: (rowId, event, id) => {
    console.log("Opening modal with id:", id);
    const { activeMenu, setActiveMenu, setMenuPosition, setSelectedIdPaket } =
      usePerencanaanStore.getState();

    if (activeMenu === rowId) {
      setActiveMenu(null);
    } else {
      const rect = event.target.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const menuWidth = 200;

      let positionLeft = rect.left + window.scrollX;
      let alignRight = false;

      if (positionLeft + menuWidth > screenWidth) {
        positionLeft = screenWidth - menuWidth - 10;
        alignRight = true;
      }

      setMenuPosition({
        top: rect.bottom + window.scrollY + 10,
        left: positionLeft,
        alignRight: alignRight,
      });
      setActiveMenu(rowId);
    }
  },
}));

export default usePerencanaanStore;
