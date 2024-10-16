import React from "react";
import Table from "../../components/table";
import Tabs from "../../components/Tabs";
import Button from "../../components/button";

const Tahap2 = () => {
  const columns = [
    {
      title: "Nama Material",
      accessor: "namamaterial",
      width: "300px",
      type: "textInput",
      align: "left",
    },
    {
      title: "Satuan",
      accessor: "satuan",
      width: "185px",
      type: "number",
      align: "left",
    },
    {
      title: "Spesifikasi",
      accessor: "spesifikasi",
      width: "240px",
      type: "input",
      align: "left",
    },
    {
      title: "Ukuran",
      accessor: "ukuran",
      width: "240px",
      type: "text",
      align: "center",
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      width: "240px",
      type: "text",
      align: "center",
    },
    {
      title: "Kelompok Material",
      accessor: "kelompokmaterial",
      width: "240px",
      type: "text",
      align: "center",
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlahkebutuhan",
      width: "260px",
      type: "input",
      align: "right",
    },
    {
      title: "Merk",
      accessor: "merk",
      width: "200px",
      type: "text",
      align: "left",
    },
    {
      title: "Provinsi",
      accessor: "provinsi",
      width: "200px",
      type: "text",
      align: "left",
    },
    {
      title: "Kabupaten/Kota",
      accessor: "kabupate_kota",
      width: "200px",
      type: "text",
      align: "left",
    },
    {
      title: "Aksi",
      accessor: "aksi",
      width: "52px",
      type: "button",
      align: "center",
    },
  ];

  const data = [
    {
      namamaterial: "Pasir",
      satuan: "m³",
      spesifikasi: "Silika",
      ukuran: "16-30 mm",
      kodefikasi: "M304",
      kelompokmaterial: "Bahan Baku",
      jumlahkebutuhan: "15",
      merk: "KDK",
      provinsi: "Jawa Timur",
      kabupate_kota: "Kota Surabaya",
      aksi: "Detail", // Konten untuk tombol
    },
    {
      namamaterial: "Pasar",
      satuan: "m³",
      spesifikasi: "Silika",
      ukuran: "16-30 mm",
      kodefikasi: "M304",
      kelompokmaterial: "Bahan Baku",
      jumlahkebutuhan: "15",
      merk: "KDK",
      provinsi: "Jawa Timur",
      kabupate_kota: "Kota Surabaya",
      aksi: <button>Detail</button>,
    },
    {
      namamaterial: "Pasur",
      satuan: "m³",
      spesifikasi: "Silika",
      ukuran: "16-30 mm",
      kodefikasi: "M304",
      kelompokmaterial: "Bahan Baku",
      jumlahkebutuhan: "15",
      merk: "KDK",
      provinsi: "Jawa Timur",
      kabupate_kota: "Kota Surabaya",
      aksi: <button>Detail</button>,
    },
    {
      namamaterial: "Pasir",
      satuan: "m³",
      spesifikasi: "Silika",
      ukuran: "16-30 mm",
      kodefikasi: "M304",
      kelompokmaterial: "Bahan Baku",
      jumlahkebutuhan: "15",
      merk: "KDK",
      provinsi: "Jawa Timur",
      kabupate_kota: "Kota Surabaya",
      aksi: <button>Detail</button>,
    },
  ];

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
    <div className="p-8">
      <h3 className="text-H4 text-emphasis-on_surface-high">
        Identifikasi Kebutuhan
      </h3>

      {/* Render Tabs component */}
      <div className="mt-6">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default Tahap2;
