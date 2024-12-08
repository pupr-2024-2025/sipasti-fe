import { create } from "zustand";
import axios from "axios";

const usePenugasanTimStore = create((set) => ({
  userOptions: [],
  suratPenugasanPengawas: null,
  skPenugasan: null,

  // State Management for Files
  setSuratPenugasanPengawas: (file) => set({ suratPenugasanPengawas: file }),
  setSkPenugasan: (file) => set({ skPenugasan: file }),

  // Fetch User Options
  fetchUserOptions: async () => {
    try {
      const response = await axios.get(
        "http://api-ecatalogue-staging.online/api/pengumpulan-data/list-user"
      );
      const options =
        response.data?.data.map((user) => ({
          value: user.user_id,
          label: user.nama_lengkap,
        })) || [];
      set({ userOptions: options });
    } catch (error) {
      console.error("Error fetching user options:", error);
    }
  },

  // Save Data with Dynamic User ID
  savePengawasData: async (userId, file) => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("sk_penugasan", file);

    try {
      const response = await axios.post(
        "http://api-ecatalogue-staging.online/api/pengumpulan-data/store-pengawas",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Data berhasil disimpan:", response.data);
    } catch (error) {
      console.error(
        "Gagal menyimpan data pengawas:",
        error.response?.data || error
      );
    }
  },
}));

export default usePenugasanTimStore;
