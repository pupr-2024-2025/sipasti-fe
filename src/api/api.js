import api from "./apiCalls";

export const submitData = async (data, options) => {
  try {
    const response = await api.post(
      "/pengumpulan-data/verifikasi-pengawas",
      data,
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting data", error);
    throw error;
  }
};

export const submitDataVerifikasiValidasi = async (data) => {
  try {
    const response = await api.post(
      "/pemeriksaan-rekonsiliasi/store-verifikasi-validasi",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting data", error);
    throw error;
  }
};

export const fetchDataEntriData = async (id) => {
  try {
    const response = await api.get(`/pengumpulan-data/get-entri-data/${id}`);
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
};
