import React, { useCallback, useEffect, useState } from "react";
import TextInput from "../../components/input";
import FileInput from "../../components/FileInput";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/Tabs";
import SearchBox from "../../components/searchbox";
import Button from "../../components/button";
import axios from "axios";
import Modal from "../../components/Modal";

const Tahap4 = ({ onNext, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [commonInformation, setCommonInformation] = useState({
    kode_rup: "",
    nama_balai: "",
    nama_paket: "",
    nama_ppk: "",
    jabatan_ppk: "",
    jenis_informasi: "",
  });
  const [dataMaterial, setDataMaterial] = useState([]);
  const [dataPeralatan, setDataPeralatan] = useState([]);
  const [dataTenagaKerja, setDataTenagaKerja] = useState([]);
  const [dataVendor, setDataVendor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCommonInformation = useCallback(async () => {
    const informasi_umum_id = localStorage.getItem("informasi_umum_id");

    try {
      const response = await fetch(
        `https://api-ecatalogue-staging.online/api/perencanaan-data/perencanaan-data-result?id=${informasi_umum_id}`
      );

      if (!response.ok) {
        console.error("Failed to fetch data:", response.statusText);
        return;
      }

      const data = await response.json();
      if (!data || !data.data) {
        console.warn("Data tidak ditemukan atau kosong");
        return;
      }

      setCommonInformation(data.data.informasi_umum || {});
      setDataMaterial(data.data.material || []);
      setDataPeralatan(data.data.peralatan || []);
      setDataTenagaKerja(data.data.tenaga_kerja || []);
      setDataVendor(data.data.shortlist_vendor || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchCommonInformation();
  }, [fetchCommonInformation]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchMaterial = (query) => {
    // Implement search functionality for material
  };

  const handleSearchPeralatan = (query) => {
    // Implement search functionality for peralatan
  };

  const handleSearchTenagaKerja = (query) => {
    // Implement search functionality for tenaga kerja
  };

  return (
    <div className="space-y-3">
      <h4 className="text-H4 text-emphasis-on_surface-high">
        Perancangan Kuesioner
      </h4>
      <div className="space-y-2">
        <h5 className="text-H5 text-emphasis-on_surface-high">
          1. Informasi Umum
        </h5>
        <div className="mt-3 bg-custom-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
          <TextInput
            label="Kode RUP"
            labelPosition="left"
            size="Medium"
            placeholder={commonInformation.kode_rup}
            disabledActive={true}
          />
          <TextInput
            label="Nama Balai"
            labelPosition="left"
            size="Medium"
            placeholder={commonInformation.nama_balai}
            disabledActive={true}
          />
          <TextInput
            label="Nama Paket"
            labelPosition="left"
            size="Medium"
            placeholder={commonInformation.nama_paket}
            disabledActive={true}
          />
          <TextInput
            label="Nama PPK"
            labelPosition="left"
            size="Medium"
            placeholder={commonInformation.nama_ppk}
            disabledActive={true}
          />
          <TextInput
            label="Jabatan PPK"
            labelPosition="left"
            size="Medium"
            placeholder={commonInformation.jabatan_ppk}
            disabledActive={true}
          />
        </div>
      </div>
      <h5 className="text-H5 text-emphasis-on_surface-high">
        2. Identifikasi Kebutuhan
      </h5>
      <Tabs
        tabs={[
          {
            label: "Material",
            content: (
              <div className="mt-3 space-y-4">
                <SearchBox
                  placeholder="Cari Material..."
                  onSearch={handleSearchMaterial}
                />
                <Table
                  columns={[
                    { title: "Nama Material", accessor: "nama_material" },
                    { title: "Satuan", accessor: "satuan" },
                    { title: "Jumlah Kebutuhan", accessor: "jumlah_kebutuhan" },
                  ]}
                  data={dataMaterial.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )}
                />
                <Pagination
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalData={dataVendor.length} // Adjust this
                  onPageChange={setCurrentPage}
                />
              </div>
            ),
          },
          {
            label: "Peralatan",
            content: (
              <div className="mt-3 space-y-4">
                <SearchBox
                  placeholder="Cari Peralatan..."
                  onSearch={handleSearchPeralatan}
                />
                <Table
                  columns={[
                    { title: "Nama Peralatan", accessor: "nama_peralatan" },
                    { title: "Satuan", accessor: "satuan" },
                    { title: "Jumlah Kebutuhan", accessor: "jumlah_kebutuhan" },
                  ]}
                  data={dataPeralatan.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(dataPeralatan.length / itemsPerPage)}
                  onPageChange={setCurrentPage}
                />
              </div>
            ),
          },
          {
            label: "Tenaga Kerja",
            content: (
              <div className="mt-3 space-y-4">
                <SearchBox
                  placeholder="Cari Tenaga Kerja..."
                  onSearch={handleSearchTenagaKerja}
                />
                <Table
                  columns={[
                    { title: "Nama Pekerja", accessor: "jenis_tenaga_kerja" },
                    { title: "Kategori", accessor: "kategori" },
                    { title: "Upah", accessor: "upah" },
                    { title: "Jumlah Kebutuhan", accessor: "jumlah_kebutuhan" },
                  ]}
                  data={dataTenagaKerja.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(dataTenagaKerja.length / itemsPerPage)}
                  onPageChange={setCurrentPage}
                />
              </div>
            ),
          },
        ]}
      />
      <h5 className="text-H5 text-emphasis-on_surface-high">3. Vendor</h5>
      <Table
        columns={[
          {
            title: "Responden/Vendor",
            accessor: "nama_vendor",
            width: "252px",
          },
          {
            title: "Pemilik Vendor",
            accessor: "pemilik_vendor",
            width: "260px",
          },
          { title: "Alamat", accessor: "alamat", width: "340px" },
          { title: "Kontak", accessor: "kontak", width: "200px" },
          {
            title: "Rancangan Kuesioner",
            accessor: "url_kuisioner",
            type: "button",
            buttonLabel: "Sunting PDF",
            alignment: "center",
            width: "300px",
            onClick: handleOpenModal,
          },
        ]}
        data={dataVendor.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(dataVendor.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="p-4">
          <h3 className="text-H3">Edit PDF</h3>
          <FileInput label="Upload PDF" />
          <Button onClick={handleCloseModal}>Close</Button>
        </div>
      </Modal>
      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button variant="outlined_yellow" size="Medium" onClick={onBack}>
          Kembali
        </Button>
        <Button
          variant="solid_blue"
          size="Medium"
          onClick={async () => {
            try {
              onNext();
            } catch (error) {
              alert(error.message);
            }
          }}>
          Simpan & Lanjut
        </Button>
      </div>
    </div>
  );
};

export default Tahap4;
