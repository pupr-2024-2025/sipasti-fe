import React, { useState, useEffect } from "react";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/Tabs";
import Button from "../../components/Button";
import { Trash } from "iconsax-react";
import axios from "axios";

const Tahap3 = ({ onNext, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [materialData, setMaterialData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [laborData, setLaborData] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch data dari API saat komponen dimuat
    axios
      .get(
        "https://api-ecatalogue-staging.online/api/perencanaan-data/get-data-vendor"
      )
      .then((response) => {
        setMaterialData(response.data.data.material);
        setEquipmentData(response.data.data.peralatan);
        setLaborData(response.data.data.tenaga_kerja);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Define columns for each type
  const columns = [
    {
      title: "",
      accessor: "select",
      type: "checkbox",
      width: "20px",
    },
    {
      title: "Responden/Vendor",
      accessor: "nama_vendor",
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

  const startIndex = (currentPage - 1) * itemsPerPage;

  // Validate inputs before proceeding
  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    // Validate material data
    const currentData = materialData.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    currentData.forEach((row) => {
      newErrors[row.id] = {};
      columns.forEach((column) => {
        if (column.required) {
          const value = row[column.accessor];
          if (!value) {
            isValid = false;
            newErrors[row.id][column.accessor] = `${column.title} wajib diisi`; // Set error message
          }
        }
      });
    });

    setFormErrors(newErrors); // Update state with new errors
    return isValid;
  };

  const handleNext = () => {
    if (validateInputs()) {
      onNext(); // Proceed to the next step if valid
    }
  };

  // Tabs configuration
  const tabs = [
    {
      label: "Material",
      content: (
        <div className="mt-3 space-y-8">
          <div className="rounded-[16px] overflow-hidden">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                data={materialData}
                errors={formErrors}
                setParentState={() => {}}
              />{" "}
              {/* Pass errors to Table */}
            </div>
          </div>
          {materialData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(materialData.length / itemsPerPage)}
              onPageChange={setCurrentPage}
              totalData={materialData.length}
            />
          )}
        </div>
      ),
    },
    {
      label: "Peralatan",
      content: (
        <div className="mt-3 space-y-8">
          <div className="rounded-[16px] overflow-hidden">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                data={equipmentData}
                errors={formErrors}
                setParentState={() => {}}
              />{" "}
              {/* Pass errors to Table */}
            </div>
          </div>
          {equipmentData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(equipmentData.length / itemsPerPage)}
              onPageChange={setCurrentPage}
              totalData={equipmentData.length}
            />
          )}
        </div>
      ),
    },
    {
      label: "Tenaga Kerja",
      content: (
        <div className="mt-3 space-y-8">
          <div className="rounded-[16px] overflow-hidden">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                data={laborData}
                errors={formErrors}
                setParentState={() => {}}
              />{" "}
              {/* Pass errors to Table */}
            </div>
          </div>
          {laborData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(laborData.length / itemsPerPage)}
              onPageChange={setCurrentPage}
              totalData={laborData.length}
            />
          )}
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

        <Button
          variant="solid_blue"
          size="Medium"
          onClick={() => {
            console.log("onNext called");
            onNext();
          }}>
          Simpan & Lanjut
        </Button>
      </div>
    </div>
  );
};

export default Tahap3;
