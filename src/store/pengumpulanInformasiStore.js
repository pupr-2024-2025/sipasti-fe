import { create } from "zustand";
import {
  tablelistpengumpulan,
  fetchVendor,
  fetchPDF,
  generateLinkKuisioner,
} from "../api/pengumpulanApi";

const usePengumpulanInformasiStore = create((set) => ({
  allData: [],
  allDataVendor: [],
  tableData: [],
  tableDataVendor: [],
  searchQuery: "",
  vendorFilters: [],
  currentPage: 1,
  itemsPerPage: 10,
  activeMenu: null,
  menuPosition: null,
  selectedIdPaket: null,
  selectedIdLinkKuesioner: null,
  urlKuisionerResult: null,
  dateExpired: null,

  setAllData: (data) => set({ allData: data, tableData: data }),
  setAllDataVendor: (data) =>
    set({ allDataVendor: data, tableDataVendor: data }),
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  setMenuPosition: (position) => set({ menuPosition: position }),
  setTableData: (data) => set({ tableData: data }),
  setTableDataVendor: (data) => set({ tableDataVendor: data }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setVendorFilters: (filters) => set({ vendorFilters: filters }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedIdPaket: (id) => set({ selectedIdPaket: id }),
  setSelectedIdLinkKuesioner: (id) => set({ selectedIdLinkKuesioner: id }),

  fetchData: async () => {
    try {
      const data = await tablelistpengumpulan();
      console.log("Fetched data:", data);
      set({ allData: data, tableData: data });
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  },

  fetchVendor: async (id) => {
    console.log("Fetching vendor data for id:", id);
    try {
      const vendorData = await fetchVendor(id);
      console.log("Vendor data received:", vendorData);
      set({ allDataVendor: vendorData, tableDataVendor: vendorData });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  },

  // fetchPDFKuisioner: async (shortlist_id) => {
  //   if (!shortlist_id) {
  //     alert("ID Shortlist tidak ditemukan.");
  //     console.error("Shortlist ID is null or undefined");
  //     return;
  //   }
  //   try {
  //     const response = await fetchPDF(shortlist_id);
  //     console.log("API Response:", JSON.stringify(response, null, 2)); // Log the entire response

  //     // Ensure the response contains the correct data and URL
  //     if (
  //       response &&
  //       response.status === "success" &&
  //       response.data &&
  //       response.data.url_kuisioner
  //     ) {
  //       // Store the PDF URL in state
  //       set({
  //         PDFKuisioner: response.data.url_kuisioner, // Store only the URL
  //       });
  //     } else {
  //       alert("Gagal mendapatkan data kuisioner.");
  //       console.error(
  //         "Failed to get survey data:",
  //         response.message || "Unknown error"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching PDF:", error.message);
  //     alert("Terjadi kesalahan saat mengambil PDF.");
  //   }
  // },

  openGenerateLinkModal: async (shortlist_id) => {
    console.log(
      "🔍 openGenerateLinkModal dipanggil dengan shortlist_id:",
      shortlist_id
    );

    if (!shortlist_id) {
      alert("ID Shortlist tidak ditemukan.");
      console.error("❌ Shortlist ID is null or undefined");
      return;
    }

    try {
      console.log("📡 Mengirim request ke API untuk generate link...");
      const { token, date_expired } = await generateLinkKuisioner(shortlist_id);
      console.log("✅ Response dari API:", { token, date_expired });

      if (token) {
        set({ urlKuisionerResult: token, dateExpired: date_expired });
        console.log("🔗 Link Kuesioner:", token);
      } else {
        console.warn("⚠️ API tidak mengembalikan link.");
        alert("Gagal generate link kuesioner.");
      }
    } catch (error) {
      console.error("❌ Error saat generate link:", error.message);
      alert("Terjadi kesalahan saat generate link kuesioner.");
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

  handleSearchVendor: (query) =>
    set((state) => {
      if (!query) {
        return {
          searchQuery: query,
          tableDataVendor: state.allDataVendor,
          currentPage: 1,
        };
      }

      const filteredDataVendor = state.allDataVendor.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(query.toLowerCase())
        )
      );

      return {
        searchQuery: query,
        tableDataVendor: filteredDataVendor,
        currentPage: 1,
      };
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

  handleFilterClickVendor: (filters) =>
    set((state) => {
      const selectedFiltersVendor = filters
        .filter((filter) => filter.checked)
        .map((filter) => filter.accessor);

      const filteredData = state.allDataVendor.filter((item) => {
        const matchesSearchQuery = Object.values(item).some((val) =>
          String(val).toLowerCase().includes(state.searchQuery.toLowerCase())
        );

        const matchesFilters =
          selectedFiltersVendor.length === 0 ||
          selectedFiltersVendor.some((key) =>
            String(item[key])
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase())
          );

        return matchesSearchQuery && matchesFilters;
      });

      return {
        vendorFilters: selectedFiltersVendor,
        tableDataVendor: filteredData,
      };
    }),
  handleToggleMenu: (rowId, event, id) => {
    console.log("Opening modal with id:", id);
    const { activeMenu, setActiveMenu, setMenuPosition, setSelectedIdPaket } =
      usePengumpulanInformasiStore.getState();

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
  handleToggleMenuVendor: (rowId, event) => {
    console.log("Opening menu for row with id:", rowId);
    const { activeMenu, setActiveMenu, setMenuPosition } =
      usePengumpulanInformasiStore.getState();

    if (activeMenu === rowId) {
      setActiveMenu(null);
    } else {
      const rect = event.target.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      const menuHeight = 200;
      const menuWidth = 200;

      let positionLeft = rect.left + window.scrollX;
      let positionTop = rect.bottom + window.scrollY + 10;
      let alignRight = false;

      if (positionLeft + menuWidth > screenWidth) {
        positionLeft = screenWidth - menuWidth - 10;
        alignRight = true;
      }

      if (positionTop + menuHeight > screenHeight) {
        positionTop = rect.top + window.scrollY - menuHeight - 10;
      }

      setMenuPosition({
        top: positionTop,
        left: positionLeft,
        alignRight: alignRight,
      });
      setActiveMenu(rowId);
    }
  },
  handleLinkClick: async (shortlist_id) => {
    if (!shortlist_id) {
      alert("ID Shortlist tidak ditemukan.");
      console.error("Shortlist ID is null or undefined");
      return;
    }

    try {
      const PDFKuisioner = await fetchPDF(shortlist_id);

      console.log("Link PDF Kuisioner:", PDFKuisioner);

      const urlKuisioner = PDFKuisioner?.data?.url_kuisioner;

      if (urlKuisioner && urlKuisioner !== "") {
        const url = new URL(urlKuisioner);
        console.log("URL yang akan dibuka:", url.href);
        window.open(url.href, "_blank");
      } else {
        alert("Gagal mendapatkan link kuisioner. Silakan coba lagi.");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengambil data kuisioner.");
      console.error("Error fetching PDF:", error);
    }
  },
}));

export default usePengumpulanInformasiStore;
