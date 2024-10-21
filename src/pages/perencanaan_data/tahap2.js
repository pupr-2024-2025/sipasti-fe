import React, { useState } from "react"; // Import useState here
import Table from "../../components/table"; // Pastikan jalurnya benar
import Pagination from "../../components/pagination"; // Update the path as needed

const Tahap2 = () => {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Set your total pages here

  // Data kolom untuk tabel
  const columns = [
    { title: "Nama Material", accessor: "namaMaterial", type: "text" },
    { title: "Satuan", accessor: "satuan", type: "text" },
    {
      title: "Spesifikasi",
      accessor: "spesifikasi",
      type: "textInput",
      placeholder: "Masukkan Spesifikasi",
    },
    {
      title: "Ukuran",
      accessor: "ukuran",
      type: "textInput",
      placeholder: "Masukkan Ukuran",
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      type: "textInput",
      placeholder: "Masukkan Kodefikasi",
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlahKebutuhan",
      type: "textInput",
      placeholder: "Masukkan Jumlah",
    },
    {
      title: "Merk",
      accessor: "merk",
      type: "textInput",
      placeholder: "Masukkan Merk",
    },
    {
      title: "Provinsi",
      accessor: "provinsi",
      type: "dropdown",
      options: ["Jawa Barat", "Jawa Timur", "DKI Jakarta"],
    },
    {
      title: "Kabupaten/Kota",
      accessor: "kabupatenKota",
      type: "dropdown",
      options: ["Bandung", "Surabaya", "Jakarta"],
    },
    {
      title: "Kelompok Material",
      accessor: "kelompokMaterial",
      type: "dropdown",
      options: ["Kelompok A", "Kelompok B", "Kelompok C"],
    },
  ];

  // Data dummy untuk baris tabel
  const data = [
    {
      id: 1,
      namaMaterial: "Pasir",
      satuan: "m³",
      spesifikasi: "",
      ukuran: "",
      kodefikasi: "",
      jumlahKebutuhan: "",
      merk: "",
      provinsi: "",
      kabupatenKota: "",
      kelompokMaterial: "",
    },
    {
      id: 2,
      namaMaterial: "Batu",
      satuan: "m³",
      spesifikasi: "",
      ukuran: "",
      kodefikasi: "",
      jumlahKebutuhan: "",
      merk: "",
      provinsi: "",
      kabupatenKota: "",
      kelompokMaterial: "",
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Tahap 2: Input Data Material
      </h2>
      <Table columns={columns} data={data} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} // Use the setter directly
      />
    </div>
  );
};

export default Tahap2;
