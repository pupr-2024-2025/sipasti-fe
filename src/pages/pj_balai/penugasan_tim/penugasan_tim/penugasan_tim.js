import { create } from "zustand";
import axios from "axios";

const usePenugasanTimStore = create((set) => ({
  userOptions: [],
  suratPenugasanPengawas: null,
  skPenugasan: null,
  setSuratPenugasanPengawas: (file) => set({ suratPenugasanPengawas: file }),
  setSkPenugasan: (file) => set({ skPenugasan: file }),

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
  savePengawasData: async (data) => {
    try {
      const response = await axios.post(
        "http://api-ecatalogue-staging.online/api/pengumpulan-data/store-pengawas",
        data
      );
      console.log("Data berhasil disimpan:", response.data);
      set({ pengawasData: data });
    } catch (error) {
      console.error("Gagal menyimpan data pengawas:", error);
    }
  },
}));

export default usePenugasanTimStore;
