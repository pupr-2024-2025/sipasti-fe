import React, { useState, useEffect } from "react";
import Navbar from "../../components/navigationbar";
import Table from "../../components/table";
import { Trash } from "iconsax-react";

const PerencanaanDataList = () => {
  const [tableData, setTableData] = useState([]);
  const [tableState, setTableState] = useState({});

  const columns = [
    {
      title: "Nama Paket",
      accessor: "nama_paket",
      type: "text",
      width: "200px",
    },
    {
      title: "Nama Balai",
      accessor: "nama_balai",
      type: "text",
      width: "200px",
    },
    { title: "Nama PPK", accessor: "nama_ppk", type: "text", width: "200px" },
    {
      title: "Jabatan PPK",
      accessor: "jabatan_ppk",
      type: "text",
      width: "200px",
    },
    { title: "Kode RUP", accessor: "kode_rup", type: "text", width: "150px" },
    { title: "Status", accessor: "status", type: "text", width: "200px" },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: Trash,
      onClick: (row) => alert(`Hapus baris ID: ${row.id}`),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-ecatalogue-staging.online/api/perencanaan-data/table-list-prencanaan-data/",
          {
            headers: {
              "Content-Type": "application/json",
              // "Authorization": "Bearer <TOKEN>" jika perlu
            },
          }
        );
        console.log("Response status:", response.status); // Moved inside try
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setTableData(result);
      } catch (error) {
        console.error("Error detail:", error); // Moved inside catch
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <Navbar />
      <h1 className="text-H3 font-bold mt-8">Informasi Perencanaan Data</h1>
      <Table
        columns={columns}
        data={tableData}
        setParentState={setTableState}
      />
    </div>
  );
};

export default PerencanaanDataList;
