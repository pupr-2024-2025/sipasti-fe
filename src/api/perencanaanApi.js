import api from "./apiCalls";
import axios from "axios";

export const FetchInformasiPerencanaanData = async () => {
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
