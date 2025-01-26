import { create } from "zustand";
import axios from "axios";

const entri_datastore = create((set) => ({
  selectedValue: 0,
  petugasLapanganuserOptions: [],
  pengawasUserOptions: [],
  initialValues: {
    user_id_petugas_lapangan: "",
    user_id_pengawas: "",
    nip_petugas_lapangan: "",
    nip_pengawas: "",
    nama_pemberi_informasi: "",
    data_vendor_id: "",
    identifikasi_kebutuhan_id: "",
    material: [],
    peralatan: [],
    tenaga_kerja: [],
    verifikasi_dokumen: [],
  },
  dataEntri: null,
  material: null,
  peralatan: null,
  tenaga_kerja: null,
  filePdf: null,
  data_vendor_id: "",
  identifikasi_kebutuhan_id: "",
  setFilePdf: (filePdf) => set({ filePdf }),
  setSelectedValue: (value) => set({ selectedValue: value }),
  fetchData: async (id) => {
    try {
      const response = await axios.get(
        `https://api-ecatalogue-staging.online/api/pengumpulan-data/get-entri-data-survey-kuisioner/${id}`
      );
      const data = response.data.data;

      set((state) => ({
        dataEntri: data,
        material: data.material || [],
        peralatan: data.peralatan || [],
        tenaga_kerja: data.tenaga_kerja || [],
        initialValues: {
          ...state.initialValues,
          data_vendor_id: data.data_vendor_id || "",
          identifikasi_kebutuhan_id: data.identifikasi_kebutuhan_id || "",
        },
        data_vendor_id: data.data_vendor_id || "",
        identifikasi_kebutuhan_id: data.identifikasi_kebutuhan_id || "",
      }));

      console.log("identifikasi_kebutuhan_id:", data.identifikasi_kebutuhan_id);
      console.log("data_vendor_id:", data.data_vendor_id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  fetchDataHardCopy: async (id) => {
    try {
      const response = await axios.get(
        `https://api-ecatalogue-staging.online/api/pengumpulan-data/get-entri-data-survey-kuisioner/${id}`
      );
      const data = response.data.data;

      const updatedData = (data.data.verifikasi_dokumen || []).map((item) => ({
        ...item,
        status_pemeriksaan: item.status_pemeriksaan || "Memenuhi",
      }));

      set((state) => ({
        dataEntri: data,
        material: data.material || [],
        peralatan: data.peralatan || [],
        tenaga_kerja: data.tenaga_kerja || [],
        verifikasi_dokumen: data.data.verifikasi_dokumen || [],
        initialValues: {
          ...state.initialValues,
          data_vendor_id: data.data_vendor_id || "",
          identifikasi_kebutuhan_id: data.identifikasi_kebutuhan_id || "",
        },
        pemeriksaanData:
          updatedData.length === 1 ? [updatedData[0]] : updatedData,
        filePdf: data.file_pdf,
        data_vendor_id: data.data_vendor_id || "",
        identifikasi_kebutuhan_id: data.identifikasi_kebutuhan_id || "",
      }));

      console.log("File PDF URL:", data.file_pdf);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  fetchPetugasLapanganUserOptions: async () => {
    try {
      const response = await axios.get(
        "https://api-ecatalogue-staging.online/api/pengumpulan-data/list-user?role=Petugas%20Lapangan"
      );
      const options =
        response.data?.data.map((user) => ({
          value: user.user_id,
          label: user.nama_lengkap,
          nip: user.nip,
        })) || [];
      set({ petugasLapanganuserOptions: options });
      console.log("User options berhasil diambil:", options);
    } catch (error) {
      console.error(
        "Error fetching user options:",
        error.response?.data || error.message
      );
    }
  },
  fetchPengawasUserOptions: async () => {
    try {
      const response = await axios.get(
        "http://api-ecatalogue-staging.online/api/pengumpulan-data/list-user?role=Pengawas"
      );
      const options =
        response.data?.data.map((user) => ({
          value: user.user_id,
          label: user.nama_lengkap,
          nip: user.nip,
        })) || [];
      set({ pengawasUserOptions: options });
      console.log("User options berhasil diambil:", options);
    } catch (error) {
      console.error(
        "Error fetching user options:",
        error.response?.data || error.message
      );
    }
  },

  dataStatic: [
    {
      nomor: "A",
      kelengkapan_dokumen: "KRITERIA VERIFIKASI",
      item_number: "null1",
      verified_by: null,
    },
    {
      nomor: "1",
      kelengkapan_dokumen:
        "Memeriksa kelengkapan data dan ada tidaknya bukti dukung",
      item_number: "A1",
      status_pemeriksaan: "Memenuhi",
      verified_by: "pengawas",
    },
    {
      nomor: "2",
      kelengkapan_dokumen:
        "Jenis material, peralatan, tenaga kerja yang dilakukan pengumpulan data berdasarkan identifikasi kebutuhan.",
      item_number: "A2",
      status_pemeriksaan: null,
      verified_by: "pengawas",
    },
    {
      nomor: "3",
      kelengkapan_dokumen: "Sumber harga pasar.",
      item_number: "A3",
      status_pemeriksaan: null,
      verified_by: "pengawas",
    },
    {
      nomor: "4",
      kelengkapan_dokumen:
        "Harga survei didapat minimal 3 vendor untuk setiap jenis material peralatan atau sesuai dengan kondisi di lapangan.",
      item_number: "A4",
      status_pemeriksaan: null,
      verified_by: "pengawas",
    },
    {
      nomor: "5",
      kelengkapan_dokumen:
        "Khusus peralatan mencantumkan harga beli dan harga sewa.",
      item_number: "A5",
      status_pemeriksaan: null,
      verified_by: "pengawas",
    },
    {
      nomor: "B",
      kelengkapan_dokumen: "KRITERIA VALIDASI",
      item_number: "null2",
      verified_by: null,
    },
    {
      nomor: "1",
      kelengkapan_dokumen:
        "Kuesioner terisi lengkap dan sesuai dengan petunjuk cara pengisian kuesioner (lampiran iv) dan sudah ditandatangani Responden, Petugas Lapangan, dan Pengawas.",
      item_number: "B1",
      status_pemeriksaan: null,
      verified_by: "pengawas",
    },
    {
      nomor: "2",
      kelengkapan_dokumen:
        "Pemeriksaan dilakukan dengan diskusi/tatap muka antara Pengawas dan Petugas Lapangan.",
      item_number: "B2",
      status_pemeriksaan: null,
      verified_by: "pengawas",
    },
  ],
}));

export default entri_datastore;
