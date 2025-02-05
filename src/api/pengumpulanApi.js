import api from "./apiCalls";
import axios from "axios";
import { useStore } from "../store/pengumpulanInformasiStore";

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
    const response = await api.get("/pengumpulan-data/table-list-pengumpulan");
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

export const fetchVendor = async (id) => {
  try {
    console.log("Calling API with ID:", id);
    const response = await api.get(
      `/pengumpulan-data/list-vendor-by-paket/${id}`
    );
    const { data } = response;

    console.log("API Response:", data);

    if (data.status === "success" && Array.isArray(data.data)) {
      console.log("Vendor data fetched:", data.data);
      return data.data;
    } else {
      console.error("API success but no data:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching vendor data:", error.message);
    return [];
  }
};
export const fetchPDF = async (shortlist_id) => {
  try {
    console.log("Fetching PDF with shortlist_id:", shortlist_id);
    const response = await api.get(
      `/pengumpulan-data/view-pdf-kuisioner/${shortlist_id}`
    );

    const { data } = response;
    console.log("API Response:", JSON.stringify(data, null, 2));

    if (data.status === "success" && data.data?.url_kuisioner) {
      console.log("PDF URL found:", data.data.url_kuisioner);
      return {
        status: data.status,
        message: data.message,
        data: data.data,
      };
    } else {
      console.error("Failed to fetch data:", data.message);
      return {
        status: "error",
        message: "Failed to fetch PDF data",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error fetching PDF:", error.message);
    return {
      status: "error",
      message: "An error occurred while fetching PDF",
      data: null,
    };
  }
};

export const generateLinkKuisioner = async (shortlist_id) => {
  try {
    console.log("🔍 Checking shortlist_id:", shortlist_id);

    const response = await api.get(
      `/pengumpulan-data/generate-link/${shortlist_id}`
    );
    const { data } = response;

    console.log("🔄 Response API generate link:", data);

    if (
      data.status === "success" &&
      data.data?.token &&
      data.data?.date_expired
    ) {
      console.log("Link generated:", data.data.token);
      console.log("Expiry Date:", data.data.date_expired);

      return {
        token: data.data.token,
        date_expired: data.data.date_expired,
      };
    } else {
      console.error("Gagal generate link:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error saat generate link:", error.message);
    return null;
  }
};
