import React, { useState, useEffect } from "react";
import Navbar from "../../../components/navigationbar";
import Pagination from "../../../components/pagination";
import useStore from "./informasi_tahap_pengumpulan/informasi_tahap_pengumpulan";
import { More } from "iconsax-react";
import colors from "../../../styles/colors";
import Link from "next/link";
import Modal from "../../../components/modal";
import { CloseCircle } from "iconsax-react";
import SearchBox from "../../../components/searchbox";

export default function informasi_tahap_pengumpulan() {
  const { vendor = [] } = useStore((state) => state.initialValues);
  const { fetchVendor } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentModal, setCurrentModal] = useState(1);
  const itemsPerPage = 10;
  const itemsPerPageModal = 5;
  const { initialValues, fetchStatusProgres } = useStore();
  const { status_progres } = initialValues;
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    alignRight: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterOptions = [
    { label: "Responden/Vendor", accessor: "nama_vendor", checked: true },
    { label: "Sumber Daya", accessor: "sumber_daya", checked: false },
    { label: "Pemilik Vendor", accessor: "pemilik_vendor", checked: false },
    { label: "Alamat", accessor: "alamat", checked: false },
    { label: "Kontak", accessor: "kontak", checked: false },
  ];

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleDropdown = (rowId, event) => {
    if (activeDropdown === rowId) {
      setActiveDropdown(null);
    } else {
      const rect = event.target.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const dropdownWidth = 200;

      let positionLeft = rect.left + window.scrollX;
      let alignRight = false;

      if (positionLeft + dropdownWidth > screenWidth) {
        positionLeft = screenWidth - dropdownWidth - 10;
        alignRight = true;
      }

      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: positionLeft,
        alignRight: alignRight,
      });
      setActiveDropdown(rowId);
    }
  };

  useEffect(() => {
    fetchStatusProgres();
  }, [fetchStatusProgres]);

  const paginatedData = status_progres.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginatedVendor = Array.isArray(vendor)
    ? vendor.slice(
        (currentModal - 1) * itemsPerPageModal,
        currentModal * itemsPerPageModal
      )
    : [];

  const openModal = (id_paket) => {
    fetchVendor(id_paket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-3 pt-8">
        <h3 className="text-H3 text-emphasis-on_surface-high">
          Informasi Tahapan Pengumpulan Data
        </h3>
        <div className="rounded-[16px] border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-auto w-full min-w-max">
              <thead>
                <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                  <th className="px-3 py-6 text-sm text-center w-[52px]">No</th>
                  <th className="px-3 py-6 text-sm w-[280px]">Nama Paket</th>
                  <th className="px-3 py-6 text-sm w-[280px]">Nama Balai</th>
                  <th className="px-3 py-6 text-sm w-[200px]">Nama PPK</th>
                  <th className="px-3 py-6 text-sm w-[200px]">Jabatan PPK</th>
                  <th className="px-3 py-6 text-sm w-[140px]">Kode Rup</th>
                  <th className="px-3 py-6 text-sm w-[280px]">Status</th>
                  <th className="px-3 py-6 text-sm w-[52px] text-center relative">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0
                        ? "bg-custom-neutral-0"
                        : "bg-custom-neutral-100"
                    }`}>
                    <td className="px-3 py-6 text-sm text-center">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-3 py-6 text-sm">{item.nama_paket}</td>
                    <td className="px-3 py-6 text-sm">{item.nama_balai}</td>
                    <td className="px-3 py-6 text-sm">{item.nama_ppk}</td>
                    <td className="px-3 py-6 text-sm">{item.jabatan_ppk}</td>
                    <td className="px-3 py-6 text-sm">{item.kode_rup}</td>
                    <td className="px-3 py-6 text-sm">{item.status}</td>
                    <td className="px-3 py-6 text-sm relative">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-colors 
        hover:bg-custom-blue-50 cursor-pointer`}
                          onClick={() => openModal(item.id)}>
                          {" "}
                          {/* Open the modal when clicked */}
                          <More
                            size="24"
                            color={colors.Emphasis.Light.On_Surface.High}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalData={status_progres.length}
        onPageChange={setCurrentPage}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4 content-center">
            <h5 className="text-H5">Vendor</h5>
            <button onClick={closeModal}>
              <CloseCircle size="24" />
            </button>
          </div>
          <SearchBox
            placeholder="Cari Material..."
            onSearch={(query) => handleSearch(query, "material")}
            filterOptions={filterOptions}
            withFilter={true}
            onFilterClick={(filters) => {
              console.log("Filter option clicked:", filters); // Debug
              handleFilterClick(filters);
            }}
            //   onSearch={handleSearch}
          />
          <div className="mt-4">
            <div className="rounded-[16px] border border-surface-light-outline overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table-auto w-full min-w-max">
                  <thead>
                    <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                      <th className="px-3 py-6 text-sm text-left w-[492px]">
                        Responden/Vendor
                      </th>
                      <th className="px-3 py-6 text-sm text-left w-[220px]">
                        Pemilik Vendor
                      </th>
                      <th className="px-3 py-6 text-sm text-left w-[340px]">
                        Alamat
                      </th>
                      <th className="px-3 py-6 text-sm text-left w-[52px]">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendor && Array.isArray(vendor) && vendor.length > 0 ? (
                      paginatedVendor.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-6 text-sm">
                            {item.nama_vendor}
                          </td>
                          <td className="px-3 py-6 text-sm">{item.pic}</td>
                          <td className="px-3 py-6 text-sm">
                            {item.alamat_vendor}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            <button>
                              <More
                                size="24"
                                color={colors.Emphasis.Light.On_Surface.High}
                              />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          className="px-3 py-6 text-sm text-center"
                          colSpan="4">
                          Tidak ada data tersedia
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {vendor && vendor.length > 0 && (
              <Pagination
                currentPage={currentModal}
                itemsPerPage={itemsPerPageModal}
                totalData={vendor.length}
                onPageChange={setCurrentModal}
              />
            )}
          </div>
        </div>
      </Modal>

      {/* Dropdown di luar tabel */}
      {activeDropdown && (
        <div
          className="absolute bg-white rounded-[12px] shadow-lg p-2 w-56"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.alignRight
              ? undefined
              : dropdownPosition.left,
            right: dropdownPosition.alignRight ? 0 : undefined,
            zIndex: 10000,
            boxShadow: "0px 4px 16px 0px rgba(165, 163, 174, 0.45)",
          }}>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-emphasis-on_surface-high hover:bg-custom-blue-50 rounded-[12px] transition-all duration-200"
            onClick={openModal}>
            {" "}
            {/* Trigger the modal here */}
            Lihat Detail Kuesioner
          </Link>
        </div>
      )}
    </div>
  );
}
