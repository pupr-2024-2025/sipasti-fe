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
    { id: 17, namaMaterial: "Lampu", satuan: "biji", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 18, namaMaterial: "Kabel", satuan: "meter", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 19, namaMaterial: "Lem", satuan: "kg", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
    { id: 20, namaMaterial: "Lantai", satuan: "m²", spesifikasi: "", ukuran: "", kodefikasi: "", jumlahKebutuhan: "", merk: "", provinsi: "", kabupatenKota: "", kelompokMaterial: "" },
  ]);

  // Function to delete a row
  const handleDelete = (row) => {
    const confirmed = window.confirm(`Apakah kamu yakin ingin menghapus material ${row.namaMaterial}?`);
    if (confirmed) {
      const newData = data.filter((item) => item.id !== row.id);
      setData(newData); // Update state after deletion
    }
  };

  const columns = [
    { title: "Nama Material", accessor: "namaMaterial", type: "text", width: "300px" }, // Not required
    { title: "Satuan", accessor: "satuan", type: "text", width: "154px", tooltipText: "Contoh pengisian: m³, m²"}, // Not required
    {
      title: "Spesifikasi",
      accessor: "spesifikasi",
      type: "textInput",
      placeholder: "Masukkan Spesifikasi",
      width: "240px",
      tooltipText: "Contoh pengisian: Silika, GI Medium - Socket",
      required: true, // Required
    },
    {
      title: "Ukuran",
      accessor: "ukuran",
      type: "textInput",
      placeholder: "Masukkan Ukuran",
      width: "240px",
      tooltipText: "Contoh pengisian: 16-30 mm, D 1,25 inch",
      required: true, // Required
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      type: "textInput",
      placeholder: "Masukkan Kodefikasi",
      width: "240px",
      tooltipText: "Contoh pengisian: M304, M.114.e",
      required: true, // Required
    },
    {
      title: "Kelompok Material",
      accessor: "kelompokMaterial",
      type: "dropdown",
      options: ["Kelompok A", "Kelompok B", "Kelompok C"],
      width: "240px",
      required: true, // Required
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlahKebutuhan",
      type: "textInput",
      placeholder: "Masukkan Jumlah",
      width: "260px",
      required: true, // Required
    },
    {
      title: "Merk",
      accessor: "merk",
      type: "textInput",
      placeholder: "Masukkan Merk",
      width: "200px",
      required: true, // Required
    },
    {
      title: "Provinsi",
      accessor: "provinsi",
      type: "dropdown",
      options: ["Jawa Barat", "Jawa Timur", "DKI Jakarta"],
      width: "200px",
      required: true, // Required
    },
    {
      title: "Kabupaten/Kota",
      accessor: "kabupatenKota",
      type: "dropdown",
      options: ["Bandung", "Surabaya", "Jakarta"],
      width: "300px",
      required: true, // Required
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: Trash, // Use Trash icon for delete action
      onClick: (row) => handleDelete(row), // Handle delete action
      width: "52px",
    },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const tabs = [
    {
      label: "Material",
      content: (
        <div className="mt-3 space-y-8">
          <Table columns={columns} data={currentData} /> {/* Render the table */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalData={totalData}
          />
        </div>
      ),
    },
    {
      label: "Peralatan",
      content: (
        <div className="flex flex-col gap-4">
          <Button label="Back" onClick={onBack} />
          <Button label="Next" onClick={onNext} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Tahap2;
