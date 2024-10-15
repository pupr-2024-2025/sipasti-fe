import React from "react";
import Table from "../../components/Table";
import Tabs from "../../components/Tabs";

const Tahap2 = () => {
  const columns = [
    { title: "Kode RUP", accessor: "kodeRUP", width: "150px" },
    { title: "Nama Paket", accessor: "namaPaket", width: "200px" },
    { title: "Nama PPK", accessor: "namaPPK", width: "150px" },
    { title: "Jabatan PPK", accessor: "jabatanPPK", width: "200px" },
    { title: "Jabatan PPK", accessor: "jabatanPPK", width: "200px" },
    { title: "Jabatan ayam", accessor: "jabatanPPK", width: "200px" },
  ];
  const data = [
    {
      kodeRUP: "12345",
      namaPaket: "Pembangunan Jembatan",
      namaPPK: "Ahmad",
      jabatanPPK: "Manager",
    },
    {
      kodeRUP: "67890",
      namaPaket: "Perbaikan Jalan",
      namaPPK: "Budi",
      jabatanPPK: "Supervisor",
    },
    // Data lainnya
  ];

  // Tabs configuration
  const tabs = [
    {
      label: "Material",
      content: (
        <div className="mt-3 rounded-[16px] space-y-8">
          <Table columns={columns} data={data} />
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
