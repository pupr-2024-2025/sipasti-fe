import React, { useEffect, useState, useCallback } from "react";
import Table from "../../../components/table";
import { More, CloseCircle } from "iconsax-react";
import Link from "next/link";
import usePengumpulanInformasiStore from "../../../store/pengumpulanInformasiStore";
import SearchBox from "../../../components/searchbox";
import Pagination from "../../../components/pagination";
import Modal from "../../../components/modal";

const Vendor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(400);
  const {
    handleLinkClick,
    activeMenu,
    tableDataVendor,
    menuPosition,
    setSelectedIdPaket,
    selectedIdLinkKuesioner,
    setSelectedIdLinkKuesioner,
    allDataVendor,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    fetchVendor,
    selectedIdPaket,
    setActiveMenu,
    searchQuery,
    handleToggleMenuVendor,
    handleSearchVendor,
    handleFilterClickVendor,
  } = usePengumpulanInformasiStore();

  useEffect(() => {
    const storedId = localStorage.getItem("selectedIdPaket");
    if (storedId) {
      console.log("id dari localstorage:", storedId);
      fetchVendor(storedId);
    }
  }, [fetchVendor, selectedIdPaket]);

  useEffect(() => {
    if (isModalOpen && selectedIdLinkKuesioner) {
      const iframe = document.getElementById("iframe-id");
      if (iframe) {
        iframe.contentWindow.postMessage({ id: selectedIdLinkKuesioner }, "*");
      }
    }
  }, [isModalOpen, selectedIdLinkKuesioner]);

  useEffect(() => {
    if (isModalOpen && selectedIdLinkKuesioner) {
      const iframe = document.getElementById("iframe-id");
      if (iframe) {
        iframe.contentWindow.postMessage({ id: selectedIdLinkKuesioner }, "*");
      }
    }
  }, [isModalOpen, selectedIdLinkKuesioner]);

  const openModal = useCallback(
    (id) => {
      console.log("Opening modal with id:", id);
      if (!isModalOpen) {
        localStorage.setItem("selectedIdLinkKuesioner", id);
        setSelectedIdLinkKuesioner(id);
        setIsModalOpen(true);
      }
    },
    [isModalOpen, setSelectedIdPaket]
  );

  const closeModal = () => {
    setIsModalOpen(false);
    localStorage.removeItem("selectedIdLinkKuesioner");
  };

  const columnsWithNumbering = [
    {
      title: "Responden/Vendor",
      accessor: "nama_vendor",
      type: "text",
      width: "280px",
    },
    { title: "Pemilik Vendor", accessor: "pic", type: "text", width: "280px" },
    {
      title: "Alamat",
      accessor: "alamat_vendor",
      type: "text",
      width: "200px",
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButtonWithEvent",
      icon: More,
      width: "52px",
      onClick: (row, event) => {
        handleToggleMenuVendor(row.shortlist_id, event, row.shortlist_id);
      },
    },
  ];

  return (
    <div className="space-y-3 p-4">
      <SearchBox
        placeholder="Cari Data..."
        onSearch={handleSearchVendor}
        withFilter={true}
        filterOptions={[
          {
            label: "Responden/Vendor",
            accessor: "nama_vendor",
            checked: false,
          },
          { label: "Pemilik Vendor", accessor: "pic", checked: false },
          { label: "Alamat", accessor: "alamat_vendor", checked: false },
        ]}
        onFilterClick={handleFilterClickVendor}
      />

      <Table
        columns={columnsWithNumbering}
        data={tableDataVendor}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

      {tableDataVendor.length === 0 && (
        <div className="text-center mt-4 text-B1 text-emphasis-on_surface-medium">
          <span>: (</span>
          <p className="py-6">Tidak ada data tersedia</p>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalData={tableDataVendor.length}
        onPageChange={setCurrentPage}
      />
      {tableDataVendor.map(
        (item) =>
          activeMenu === item.shortlist_id && (
            <div
              key={item.shortlist_id}
              className="absolute bg-white rounded-[12px] mr-[12px] shadow-lg p-2 w-56"
              style={{
                top: menuPosition.top,
                left: menuPosition.alignRight ? undefined : menuPosition.left,
                right: menuPosition.alignRight ? 0 : undefined,
                zIndex: 10,
                boxShadow: "0px 4px 16px 0px rgba(165, 163, 174, 0.45)",
              }}>
              {(() => {
                const role = localStorage.getItem("role");

                return (
                  <>
                    {(role === "superadmin" ||
                      role === "Pengawas" ||
                      role === "Pengolah Data" ||
                      role === "Petugas Lapangan") && (
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-emphasis-on_surface-high hover:bg-custom-blue-50 rounded-[12px] transition-all duration-200"
                        onClick={() => {
                          console.log(
                            "Link clicked for shortlist_id:",
                            item.shortlist_id
                          );
                          handleLinkClick(item.shortlist_id);
                        }}>
                        Lihat PDF
                      </Link>
                    )}
                    {(role === "superadmin" || role === "Pengolah Data") && (
                      <Link
                        href={`/pengumpulan_data/pengolah_data/entri_data_softcopy/${item.shortlist_id}`}
                        target="_blank"
                        className="block px-4 py-2 text-sm text-emphasis-on_surface-high hover:bg-custom-blue-50 rounded-[12px] transition-all duration-200">
                        Entri Data Soft Copy
                      </Link>
                    )}
                    {(role === "superadmin" || role === "Pengolah Data") && (
                      <Link
                        href={`/pengumpulan_data/pengolah_data/entri_data_hardcopy/${item.shortlist_id}`}
                        target="_blank"
                        className="block px-4 py-2 text-sm text-emphasis-on_surface-high hover:bg-custom-blue-50 rounded-[12px] transition-all duration-200">
                        Entri Data Hard Copy
                      </Link>
                    )}
                    {(role === "superadmin" || role === "Pengawas") && (
                      <Link
                        href={`/pengumpulan_data/pengawas/pemeriksaan_data/${item.shortlist_id}`}
                        target="_blank"
                        className="block px-4 py-2 text-sm text-emphasis-on_surface-high hover:bg-custom-blue-50 rounded-[12px] transition-all duration-200">
                        Pemeriksaan
                      </Link>
                    )}
                    {(role === "superadmin" || role === "Pengawas") && (
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-emphasis-on_surface-high hover:bg-custom-blue-50 rounded-[12px] transition-all duration-200"
                        onClick={() => openModal(item.shortlist_id)}>
                        Generate Link Kuesioner
                      </Link>
                    )}
                  </>
                );
              })()}
            </div>
          )
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-4">
          <div className="flex justify-between items-center pt-4 pl-4 pr-4">
            <div className="text-xl font-bold">Link Kuesioner</div>
            <button onClick={closeModal}>
              <CloseCircle size="24" />
            </button>
          </div>
          <div className="mt-4">
            <iframe
              src={`./link_kuesioner?id=${selectedIdPaket}`}
              width="100%"
              height={iframeHeight}
              frameBorder="0"
              title="Test1 Page Content"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Vendor;
