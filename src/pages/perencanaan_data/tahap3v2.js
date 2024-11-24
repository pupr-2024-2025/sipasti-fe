import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Tahap3 = ({ onNext, onBack }) => {
  const [data, setData] = useState({ material: [], equipment: [], labor: [] });
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [identifikasi_kebutuhan_id, setIdentifikasi_Kebutuhan_id] =
    useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Fetch selected vendors from localStorage when the component mounts
  useEffect(() => {
    const storedVendors = localStorage.getItem("selectedVendors");
    if (storedVendors) {
      setSelectedVendors(JSON.parse(storedVendors));
    }
  }, []);

  useEffect(() => {
    // Fetch identifikasi_kebutuhan_id from localStorage and fetch data from API
    const storedId = localStorage.getItem("identifikasi_kebutuhan_id");
    if (storedId) {
      setIdentifikasi_Kebutuhan_id(storedId);

      axios
        .get(
          `https://api-ecatalogue-staging.online/api/perencanaan-data/get-data-vendor/${storedId}`
        )
        .then((response) => {
          const { material, peralatan, tenaga_kerja } = response.data.data;
          setData({
            material,
            equipment: peralatan,
            labor: tenaga_kerja,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.warn("Identifikasi kebutuhan ID not found in localStorage.");
    }
  }, []);

  const handleNextStep = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Assuming validation and payload logic here
      const payload = {
        identifikasi_kebutuhan_id,
        shortlist_vendor: selectedVendors.map((vendor) => ({
          data_vendor_id: vendor.data_vendor_id,
          nama_vendor: vendor.nama_vendor,
          sumber_daya: vendor.sumber_daya,
          pemilik_vendor: vendor.pemilik_vendor,
          alamat: vendor.alamat,
          kontak: vendor.kontak || "",
        })),
      };

      const response = await axios.post(
        "https://api-ecatalogue-staging.online/api/perencanaan-data/store-shortlist-vendor",
        payload
      );
      console.log("Data successfully sent:", response.data);

      router.replace("/perencanaan_data/tahap4");
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Your component JSX */}
      <button onClick={handleNextStep}>Next Step</button>
    </div>
  );
};

export default Tahap3;
