import { create } from "zustand";
import axios from "axios";

const entri_dataStore = create((set) => ({
  dataEntri: null,
  fetchData: async (id) => {
    try {
      const response = await axios.get(
        `https://api-ecatalogue-staging.online/api/pengumpulan-data/get-entri-data/${id}`
      );
      set({ dataEntri: response.data.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

export default entri_dataStore;
