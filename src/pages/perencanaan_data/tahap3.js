import React, { useState, useEffect } from "react";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/Tabs";
import SearchBox from "../../components/searchbox";
import Button from "../../components/button";
import axios from "axios";

const Tahap3 = ({ onNext, onBack }) => {
  const [data, setData] = useState({ material: [], equipment: [], labor: [] });
  const [currentPage, setCurrentPage] = useState({
    material: 1,
    equipment: 1,
    labor: 1,
  });
  const itemsPerPage = 10;
  const [materialData, setMaterialData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [laborData, setLaborData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [identifikasi_kebutuhan_id, setIdentifikasi_Kebutuhan_id] =
    useState("");
  const [allDataMaterial, setAllDataMaterial] = useState([]);
  const [allDataPeralatan, setAllDataPeralatan] = useState([]);
  const [allDataTenagaKerja, setAllDataTenagaKerja] = useState([]);
  const [allDataVendor, setAllDataVendor] = useState([]);
  const [searchMaterialQuery, setSearchMaterialQuery] = useState("");
  const [searchPeralatanQuery, setSearchPeralatanQuery] = useState("");
  const [searchTenagaKerjaQuery, setSearchTenagaKerjaQuery] = useState("");
  const [searchVendorQuery, setSearchVendorQuery] = useState("");

  useEffect(() => {
    // Ambil identifikasi_kebutuhan_id dari localStorage
    const storedId = localStorage.getItem("identifikasi_kebutuhan_id");
    if (storedId) {
      setIdentifikasi_Kebutuhan_id(storedId);

      // Request ke API dengan ID langsung di URL
      axios
        .get(
          `https://api-ecatalogue-staging.online/api/perencanaan-data/get-data-vendor/${storedId}`
        )
        .then((response) => {
          const { material, peralatan, tenaga_kerja } = response.data.data;
          setMaterialData(material || []);
          setEquipmentData(peralatan || []);
          setLaborData(tenaga_kerja || []);
          setAllDataMaterial(material || []);
          // setDataPeralatan(peralatan || []);
          setAllDataPeralatan(peralatan || []);
          // setDataTenagaKerja(tenaga_kerja || []);
          setAllDataTenagaKerja(tenaga_kerja || []);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.warn(
        "identifikasi_kebutuhan_id tidak ditemukan di localStorage."
      );
    }
  }, []);

  const handleCheckboxChange = (vendor, isChecked) => {
    setSelectedVendors((prevSelectedVendors) => {
      const updatedVendors = isChecked
        ? [
            ...prevSelectedVendors,
            {
              data_vendor_id: vendor.id,
              nama_vendor: vendor.nama_vendor,
              pemilik_vendor: vendor.pemilik_vendor,
              sumber_daya: vendor.sumber_daya,
              alamat: vendor.alamat,
              kontak: vendor.kontak,
            },
          ]
        : prevSelectedVendors.filter(
            (selectedVendor) => selectedVendor.data_vendor_id !== vendor.id
          );
      return updatedVendors;
    });
  };

  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    if (selectedVendors.length === 0) {
      console.error("Silakan pilih minimal satu vendor.");
      isValid = false;
    }

    selectedVendors.forEach((vendor, index) => {
      if (!vendor.data_vendor_id) {
        newErrors[`shortlist_vendor.${index}.data_vendor_id`] =
          "ID Vendor diperlukan.";
        isValid = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };
  const handleSearchMaterial = (query) => {
    setSearchMaterialQuery(query);

    if (!query) {
      setMaterialData(allDataMaterial); // Reset if query is empty
      return;
    }

    const filteredMaterials = allDataMaterial.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(query.toLowerCase())
      )
    );
    setMaterialData(filteredMaterials); // Use setMaterialData
  };

  // Search for Peralatan
  const handleSearchPeralatan = (query) => {
    setSearchPeralatanQuery(query);

    if (!query) {
      setEquipmentData(allDataPeralatan); // Reset if query is empty
      return;
    }

    const filteredPeralatan = allDataPeralatan.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(query.toLowerCase())
      )
    );
    setEquipmentData(filteredPeralatan);
  };

  // Search for Tenaga Kerja
  const handleSearchTenagaKerja = (query) => {
    setSearchTenagaKerjaQuery(query);

    if (!query) {
      setLaborData(allDataTenagaKerja); // Reset if query is empty
      return;
    }

    const filteredTenagaKerja = allDataTenagaKerja.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(query.toLowerCase())
      )
    );
    setLaborData(filteredTenagaKerja); // Use setLaborData instead of setDataTenagaKerja
  };
  const handleSubmit = async () => {
    // Validasi input
    if (!validateInputs()) {
      console.error("Input tidak valid, silakan periksa kembali.");
      return;
    }

    const payload = {
      identifikasi_kebutuhan_id: identifikasi_kebutuhan_id,
      shortlist_vendor: selectedVendors.map((vendor) => ({
        data_vendor_id: vendor.data_vendor_id,
        nama_vendor: vendor.nama_vendor,
        sumber_daya: vendor.sumber_daya,
        pemilik_vendor: vendor.pemilik_vendor,
        alamat: vendor.alamat,
        kontak: vendor.kontak || "",
      })),
    };

    console.log("Payload yang akan dikirim:", payload); // Tambahkan ini

    if (payload.shortlist_vendor.length === 0) {
      console.error("Silakan pilih vendor sebelum melanjutkan.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api-ecatalogue-staging.online/api/perencanaan-data/store-shortlist-vendor",
        payload
      );
      console.log("Data berhasil dikirim:", response.data);
      if (typeof onNext === "function") {
        onNext();
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const columns = [
    {
      title: "",
      accessor: "select",
      type: "checkbox",
      width: "48px",
      onChange: handleCheckboxChange,
    },
    {
      title: "Responden/Vendor",
      accessor: "nama_vendor",
      type: "text",
      width: "408px",
    },
    {
      title: "Sumber Daya",
      accessor: "sumber_daya",
      type: "text",
      width: "408px",
    },
    {
      title: "Pemilik Vendor",
      accessor: "pemilik_vendor",
      type: "text",
      width: "260px",
    },
    {
      title: "Alamat",
      accessor: "alamat",
      type: "text",
      placeholder: "Masukkan Spesifikasi",
      width: "340px",
    },
    {
      title: "Kontak",
      accessor: "kontak",
      type: "text",
      placeholder: "Masukkan Spesifikasi",
      width: "200px",
    },
  ];

  const tabs = [
    {
      label: "Material",
      content: (
        <div className="mt-3 space-y-8">
          <SearchBox
            placeholder="Cari Material..."
            onSearch={handleSearchMaterial}
          />
          <Table
            columns={columns}
            data={materialData}
            errors={formErrors}
            setParentState={() => {}}
          />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalData={materialData.length}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
    {
      label: "Peralatan",
      content: (
        <div className="mt-3 space-y-8">
          <SearchBox
            placeholder="Cari Peralatan..."
            onSearch={handleSearchPeralatan}
          />
          <Table
            columns={columns}
            data={equipmentData}
            errors={formErrors}
            setParentState={() => {}}
          />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalData={equipmentData.length}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
    {
      label: "Tenaga Kerja",
      content: (
        <div className="mt-3 ">
          <SearchBox
            placeholder="Cari Tenaga Kerja..."
            onSearch={handleSearchTenagaKerja}
          />
          <Table
            columns={columns}
            data={laborData}
            errors={formErrors}
            setParentState={() => {}}
          />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalData={laborData.length}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h4 className="text-H4 text-emphasis-on_surface-high">
        Penentuan Shortlist Vendor
      </h4>
      <div className="mt-6">
        <Tabs tabs={tabs} />
      </div>
      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button variant="outlined_yellow" size="Medium" onClick={onBack}>
          Kembali
        </Button>
        <Button variant="solid_blue" size="Medium" onClick={handleSubmit}>
          Simpan & Lanjut
        </Button>
      </div>
    </div>
  );
};

export default Tahap3;
