import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "../../components/Dropdown";

function Tahap2() {
  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await axios.get(
          "https://api-ecatalogue-staging.online/api/provinces-and-cities"
        );
        console.log("API Response Data:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          console.log(
            "Full API Response:",
            JSON.stringify(response.data, null, 2)
          );

          const formattedOptions = response.data.data.map((provinsi) => ({
            label:
              provinsi.nama_provinsi ||
              provinsi.name ||
              "Nama Provinsi Tidak Tersedia",
            value: provinsi.id_provinsi || provinsi.id || null,
          }));
          setProvinsiOptions(formattedOptions);
          console.log("Formatted Provinsi Options:", formattedOptions);
        } else {
          console.warn("Format data tidak sesuai:", response.data);
          setProvinsiOptions([]);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
        setProvinsiOptions([]);
      }
    }

    fetchProvinces();
  }, []);

  return (
    <div>
      <Dropdown
        options={provinsiOptions}
        value={selectedProvinsi}
        onSelect={(option) => setSelectedProvinsi(option)}
        placeholder="Pilih Provinsi"
      />
    </div>
  );
}

export default Tahap2;
