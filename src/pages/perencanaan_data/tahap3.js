import React, { useState } from "react";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/Tabs";
import Button from "../../components/button";
import { Trash } from "iconsax-react"; // Import ikon Trash

const Tahap2 = ({ onNext, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalData = 20; // Total rows in your data array
  const totalPages = Math.ceil(totalData / itemsPerPage);

  const [data, setData] = useState([
    { id: 1, namaMaterial: "Pasir", satuan: "m³", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 2, namaMaterial: "Batu", satuan: "m³", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 3, namaMaterial: "Semen", satuan: "ton", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 4, namaMaterial: "Baja", satuan: "kg", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 5, namaMaterial: "Kaca", satuan: "m²", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 6, namaMaterial: "Papan", satuan: "m³", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 7, namaMaterial: "Koral", satuan: "m³", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 8, namaMaterial: "Asphalt", satuan: "ton", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 9, namaMaterial: "Cat", satuan: "liter", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 10, namaMaterial: "Pipa PVC", satuan: "meter", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 11, namaMaterial: "Beton", satuan: "m³", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 12, namaMaterial: "Tali", satuan: "meter", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 13, namaMaterial: "Paku", satuan: "kg", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 14, namaMaterial: "Bata", satuan: "biji", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 15, namaMaterial: "Sandal", satuan: "pasang", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 16, namaMaterial: "Kunci", satuan: "biji", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 17, namaMaterial: "Besi", satuan: "kg", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 18, namaMaterial: "Plester", satuan: "ton", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 19, namaMaterial: "Kawat", satuan: "kg", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 20, namaMaterial: "Kaca Film", satuan: "m²", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
  ]);

  // State to manage errors
  const [formErrors, setFormErrors] = useState({});

  // Function to delete a row
  const handleDelete = (row) => {
    const confirmed = window.confirm(`Apakah kamu yakin ingin menghapus material ${row.namaMaterial}?`);
    if (confirmed) {
      const newData = data.filter((item) => item.id !== row.id);
      setData(newData); // Update state after deletion
    }
  };

  const columns = [
    { title: "Nama Material", accessor: "namaMaterial", type: "text", width: "300px" },
    { title: "Satuan", accessor: "satuan", type: "text", width: "154px", tooltipText: "Contoh pengisian: m³, m²" },
    {
      title: "Spesifikasi",
      accessor: "spesifikasi",
      type: "textInput",
      placeholder: "Masukkan Spesifikasi",
      width: "240px",
      tooltipText: "Contoh pengisian: Silika, GI Medium - Socket",
      required: true, // Required
    },
    // Add more columns as needed...
    {
      title: "Aksi",
      accessor: "delete",
      type: "iconButton",
      icon: Trash,
      onClick: handleDelete, // Delete function for the icon button
      width: "100px",
    },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  // Validate inputs before proceeding
  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

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
              <Table columns={columns} data={currentData} errors={formErrors} /> {/* Pass errors to Table */}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage} // Update current page state
            totalData={totalData} // Total data for pagination display
          />
          <Button label="Next" onClick={handleNext} /> {/* Validate on next */}
        </div>
      ),
    },
    // Additional tabs can be added here...
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Tahap2;
