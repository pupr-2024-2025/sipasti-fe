import api from "./apiCalls";

export const submitData = async (data) => {
  try {
    const response = await api.post(
      "/pengumpulan-data/verifikasi-pengawas",
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
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const tablelistpengumpulan = async () => {
  try {
    const response = await api.get(
      "/perencanaan-data/table-list-prencanaan-data"
    );
    const { data } = response;

    if (data.status === "success") {
      return data.data;
    } else {
      console.error("Failed to fetch data:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};
