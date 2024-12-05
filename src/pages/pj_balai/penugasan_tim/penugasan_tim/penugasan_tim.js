import { create } from "zustand";
import axios from "axios";

const usePenugasanTimStore = create((set) => ({
  userOptions: [],
  fetchUserOptions: async () => {
    try {
      const response = await axios.get(
        "http://api-ecatalogue-staging.online/api/pengumpulan-data/list-user"
      );
      if (response.data?.data) {
        const options = response.data.data.map((user) => ({
          value: user.user_id,
          label: user.nama_lengkap,
        }));
        set({ userOptions: options });
      }
    } catch (error) {
      console.error("Error fetching user options:", error);
    }
  },
}));

export default usePenugasanTimStore;
