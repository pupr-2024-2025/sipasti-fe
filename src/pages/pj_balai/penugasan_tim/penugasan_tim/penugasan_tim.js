import { create } from "zustand";
import axios from "axios";

const usePenugasanTimStore = create((set) => ({
  userOptions: [],
  suratPenugasanPengawas: null,
  skPenugasan: null,
  alert: { open: false, severity: "info", message: "" },

  setSuratPenugasanPengawas: (file) => set({ suratPenugasanPengawas: file }),
  setSkPenugasan: (file) => set({ skPenugasan: file }),

  setAlert: (alert) => set({ alert }),

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
      console.log("User options berhasil diambil:", options);
    } catch (error) {
      console.error(
        "Error fetching user options:",
        error.response?.data || error.message
      );
    }
  },

  savePengawasData: async (pengawas, skPenugasan) => {
    const formData = new FormData();
    formData.append("user_id", pengawas);
    formData.append("sk_penugasan", skPenugasan);

    try {
      const response = await axios.post(
        "http://api-ecatalogue-staging.online/api/pengumpulan-data/store-pengawas",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const status = response.data?.status || "success";
      const message = response.data?.message || "Data berhasil disimpan.";

      set({
        alert: {
          open: true,
          severity: status === "success" ? "success" : "error",
          message,
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menyimpan data pengawas.";
      console.error(
        "Gagal menyimpan data pengawas:",
        error.response?.data || error.message
      );

      set({
        alert: {
          open: true,
          severity: "error",
          message: errorMessage,
        },
      });
    }
  },
}));

export default usePenugasanTimStore;
