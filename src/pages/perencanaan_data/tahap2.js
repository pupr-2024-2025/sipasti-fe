import React, { useState } from "react"; 
import Table from "../../components/table"; 
import Pagination from "../../components/pagination"; 
import Tabs from "../../components/Tabs";
import Button from "../../components/button";

const Tahap2 = ({ onNext, onBack }) => { // Ambil props untuk navigasi
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 
    const totalData = 20; // Total rows in your data array
    const totalPages = Math.ceil(totalData / itemsPerPage); 

    const columns = [
        { title: "Nama Material", accessor: "namaMaterial", type: "text", width: "300px" },
        { title: "Satuan", accessor: "satuan", type: "text" , width: "154px"},
        {
          title: "Spesifikasi",
          accessor: "spesifikasi",
          type: "textInput",
          placeholder: "Masukkan Spesifikasi",
          width: "240px"
        },
        {
          title: "Ukuran",
          accessor: "ukuran",
          type: "textInput",
          placeholder: "Masukkan Ukuran",
          width: "240px"
        },
        {
          title: "Kodefikasi",
          accessor: "kodefikasi",
          type: "textInput",
          placeholder: "Masukkan Kodefikasi",
          width: "240px"
        },
        {
          title: "Kelompok Material",
          accessor: "kelompokMaterial",
          type: "dropdown",
          options: ["Kelompok A", "Kelompok B", "Kelompok C"],
          width: "240px"
        },
        {
          title: "Jumlah Kebutuhan",
          accessor: "jumlahKebutuhan",
          type: "textInput",
          placeholder: "Masukkan Jumlah",
          width: "260px"
        },
        {
          title: "Merk",
          accessor: "merk",
          type: "textInput",
          placeholder: "Masukkan Merk",
          width: "200px"
        },
        {
          title: "Provinsi",
          accessor: "provinsi",
          type: "dropdown",
          options: ["Jawa Barat", "Jawa Timur", "DKI Jakarta"],
          width: "200px"
        },
        {
          title: "Kabupaten/Kota",
          accessor: "kabupatenKota",
          type: "dropdown",
          options: ["Bandung", "Surabaya", "Jakarta"],
          width: "300px"
        },
      ];

  const data = [
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
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  // Tabs configuration
  const tabs = [
    {
      label: "Material",
      content: (
        <div className="mt-3 space-y-8">
          <div className="rounded-[16px] overflow-hidden">
            <div className="overflow-x-auto">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Peralatan",
      content: (
        <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
          <p>Konten untuk tab lainnya</p>
        </div>
      ),
    },
    {
      label: "Tenaga Kerja",
      content: (
        <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
          <p>Konten untuk tab lainnya</p>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <h3 className="text-H4 text-emphasis-on_surface-high">
        Identifikasi Kebutuhan
      </h3>

      {/* Render Tabs component */}
      <div className="mt-6">
        <Tabs tabs={tabs} />
      </div>
      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button
          variant="outlined_yellow"
          size="Medium"
          onClick={onBack}>
          Kembali
        </Button>
        <Button
          variant="solid_blue"
          size="Medium"
          onClick={onNext}>
          Lanjut
        </Button>
      </div>
    </div>
    
  );
};

export default Tahap2;