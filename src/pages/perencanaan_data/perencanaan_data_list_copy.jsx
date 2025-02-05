import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/navigationbar";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import SearchBox from "../../components/searchbox";
import { More, CloseCircle } from "iconsax-react";
import { useRouter } from "next/router"; // <-- Import useRouter
import Modal from "../../components/modal";
import usePerencanaanStore from "../../store/perencanaanStore";

const InformasiPengumpulanData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [iframeHeight, setIframeHeight] = useState(400);

  const {
    tableData,
    currentPage,
    itemsPerPage,
    activeMenu,
    menuPosition,
    setActiveMenu,
    setCurrentPage,
    fetchData,
    handleSearch,
    handleFilterClick,
    handleToggleMenu,
    fetchVendor,
    setSelectedIdPaket,
    selectedIdPaket,
  } = usePerencanaanStore();

  const router = useRouter(); // <-- Initialize useRouter

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = tableData.slice(startIndex, endIndex);

  useEffect(() => {
    fetchData();
    const storedId = localStorage.getItem("selectedIdPaket");
    if (storedId) {
      setSelectedIdPaket(storedId);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columnsWithNumbering = [
    {
      title: "Nama Paket",
      accessor: "nama_paket",
      type: "text",
      width: "280px",
    },
    {
      title: "Nama Balai",
      accessor: "nama_balai",
      type: "text",
      width: "280px",
    },
    { title: "Nama PPK", accessor: "nama_ppk", type: "text", width: "200px" },
    {
      title: "Jabatan PPK",
      accessor: "jabatan_ppk",
      type: "text",
      width: "200px",
    },
    { title: "Kode RUP", accessor: "kode_rup", type: "text", width: "140px" },
    { title: "Status", accessor: "status", type: "text", width: "280px" },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButtonWithEvent",
      icon: More,
      width: "52px",
      onClick: (row, event) => {
        handleToggleMenu(row.id, event, row.id);
        setSelectedIdPaket(row.id);
      },
    },
  ];

  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-3">
        <div className="flex flex-row justify-between items-center mt-8 mb-7">
          <h1 className="text-H3 font-bold">
            Informasi Tahap Perencanaan Data
          </h1>
          <SearchBox
            placeholder="Cari Data..."
            onSearch={handleSearch}
            withFilter={true}
            filterOptions={[
              { label: "Nama Paket", accessor: "nama_paket", checked: false },
              { label: "Nama Balai", accessor: "nama_balai", checked: false },
              { label: "Nama PPK", accessor: "nama_ppk", checked: false },
              { label: "Jabatan PPK", accessor: "jabatan_ppk", checked: false },
              { label: "Kode RUP", accessor: "kode_rup", checked: false },
              { label: "Status", accessor: "status", checked: false },
            ]}
            onFilterClick={handleFilterClick}
          />
        </div>
        <Table
          columns={columnsWithNumbering}
          data={paginatedData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        {tableData.length === 0 && (
          <div className="text-center mt-4 text-B1 text-emphasis-on_surface-medium">
            <span>: (</span>
            <p className="py-6">Tidak ada data tersedia</p>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalData={tableData.length}
        onPageChange={setCurrentPage}
      />
      {activeMenu && (
        <div
          className="absolute bg-white rounded-[12px] mr-[12px] shadow-lg p-2 w-56"
          style={{
            top: menuPosition.top,
            left: menuPosition.alignRight ? undefined : menuPosition.left,
            right: menuPosition.alignRight ? 0 : undefined,
            zIndex: 10,
            boxShadow: "0px 4px 16px 0px rgba(165, 163, 174, 0.45)",
          }}>
          <button
            className="block px-4 py-2 text-sm text-emphasis-on_surface-high hover:bg-custom-blue-50 rounded-[12px] transition-all duration-200"
            onClick={() => {
              const item = tableData.find((item) => item.id === activeMenu);
              if (item) {
                console.log("Item found:", item);

                // Set localStorage values
                localStorage.setItem("identifikasi_kebutuhan_id", item.id);
                localStorage.setItem("informasi_umum_id", item.id);

                // Push the new route
                router.push(`/perencanaan_data/tahap1?fromTahap2=true`);
              } else {
                console.log("Item not found for activeMenu:", activeMenu);
              }
            }}>
            Edit Kuesioner
          </button>
        </div>
      )}
    </div>
  );
};

export default InformasiPengumpulanData;
