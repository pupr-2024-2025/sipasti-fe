import React, { useState } from "react";
import Navbar from "../../components/navigationbar";
import TextInput from "../../components/input";
import FileInput from "../../components/FileInput";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/Tabs";
import SearchBox from "../../components/searchbox";
import Button from "../../components/Button";
const Tahap4 = ({ onNext, onBack }) => {
  // State untuk setiap input form
  const [formValues, setFormValues] = useState({
    vendorName: "",
    category: "",
    resources: "",
    address: "",
    phone: "",
    mobile: "",
    picName: "",
    province: "",
    city: "",
  });

  const [dataMaterial, setDataMaterial] = useState([
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
    // Tambahkan data lainnya sesuai kebutuhan
  ]);

  const [dataPeralatan, setDataPeralatan] = useState([
    {
      id: 1,
      namaPeralatan: "Excavator",
      satuan: "unit",
      tipe: "",
      merk: "",
      kapasitas: "",
      jumlahKebutuhan: "",
      provinsi: "",
      kabupatenKota: "",
    },
    // Tambahkan data lainnya sesuai kebutuhan
  ]);

  const [dataTenagaKerja, setDataTenagaKerja] = useState([
    {
      id: 1,
      namaPekerja: "Tukang Batu",
      kategori: "Pekerja Harian",
      upah: "",
      jumlahKebutuhan: "",
      provinsi: "",
      kabupatenKota: "",
    },
    // Tambahkan data lainnya sesuai kebutuhan
  ]);
  const [dataVendor, setDataVendor] = useState([
    {
      id: 1,
      namaVendor: "PT. Konstruksi Mandiri",
      pemilikVendor: "Ir. H. Sutrisno, M. T.",
      Alamat: "Jl. Raya Bogor KM 23, Jakarta Timur, DKI Jakarta",
      Kontak: "021-1234567",
    },
    {
      id: 2,
      namaVendor: "CV. Prima Beton",
      pemilikVendor: "Dr. H. Budi Santoso, S.T., M.T.",
      Alamat: "Jl. Gajah Mada No. 12, Surabaya, Jawa Timur",
      Kontak: "031-7654321",
    },
  ]);

  // State tambahan untuk pagination dan pencarian
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Ubah sesuai kebutuhan
  const [searchQueryMaterial, setSearchQueryMaterial] = useState("");
  const [searchQueryPeralatan, setSearchQueryPeralatan] = useState("");
  const [searchQueryTenagaKerja, setSearchQueryTenagaKerja] = useState("");

  const handleSearchMaterial = (query) => {
    setSearchQueryMaterial(query);
    setCurrentPage(1);
  };

  const handleSearchPeralatan = (query) => {
    setSearchQueryPeralatan(query);
    setCurrentPage(1);
  };

  const handleSearchTenagaKerja = (query) => {
    setSearchQueryTenagaKerja(query);
    setCurrentPage(1);
  };

  // Filter data berdasarkan pencarian
  const filteredDataMaterial = dataMaterial.filter((item) =>
    item.namaMaterial.toLowerCase().includes(searchQueryMaterial.toLowerCase())
  );

  const filteredDataPeralatan = dataPeralatan.filter((item) =>
    item.namaPeralatan
      .toLowerCase()
      .includes(searchQueryPeralatan.toLowerCase())
  );

  const filteredDataTenagaKerja = dataTenagaKerja.filter((item) =>
    item.namaPekerja
      .toLowerCase()
      .includes(searchQueryTenagaKerja.toLowerCase())
  );

  // Fungsi onChange untuk mengupdate nilai form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Fungsi untuk menangani file yang dipilih
  const handleFileSelect = (files) => {
    // Logika untuk menangani file upload
  };

  const handleCancel = () => {
    // Logika untuk membatalkan upload file
  };

  return (
    <div className="space-y-3">
      <Navbar />
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
            placeholder="92381023123913"
            disabledActive={true}
          />
          <TextInput
            label="Nama Balai"
            labelPosition="left"
            size="Medium"
            placeholder="Balai Diklat PU WIlayah IV Surabaya"
            disabledActive={true}
          />
          <TextInput
            label="Nama Paket"
            labelPosition="left"
            size="Medium"
            placeholder="Pembangunan Jembatan Gantung 6"
            disabledActive={true}
          />
          <TextInput
            label="Nama PPK"
            labelPosition="left"
            size="Medium"
            placeholder="Farhan"
            disabledActive={true}
          />
          <TextInput
            label="Jabatan PPK"
            labelPosition="left"
            size="Medium"
            placeholder="PPK 3.1 Satker PJN Wilayah 3 Provinsi Jatim"
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
                    { title: "Nama Material", accessor: "namaMaterial" },
                    { title: "Satuan", accessor: "satuan" },
                    { title: "Jumlah Kebutuhan", accessor: "jumlahKebutuhan" },
                  ]}
                  data={filteredDataMaterial.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    filteredDataMaterial.length / itemsPerPage
                  )}
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
                    { title: "Nama Peralatan", accessor: "namaPeralatan" },
                    { title: "Satuan", accessor: "satuan" },
                    { title: "Jumlah Kebutuhan", accessor: "jumlahKebutuhan" },
                  ]}
                  data={filteredDataPeralatan.slice(
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
                    { title: "Nama Pekerja", accessor: "namaPekerja" },
                    { title: "Kategori", accessor: "kategori" },
                    { title: "Upah", accessor: "upah" },
                    { title: "Jumlah Kebutuhan", accessor: "jumlahKebutuhan" },
                  ]}
                  data={filteredDataTenagaKerja.slice(
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
          { title: "Nama Vendor", accessor: "namaVendor" },
          { title: "Pemilik Vendor", accessor: "pemilikVendor" },
          { title: "Alamat", accessor: "Alamat" },
          { title: "Kontak", accessor: "Kontak" },
          {
            title: "Aksi",
            accessor: "Aksi",
            type: "button",
            align: "center",
            // onClick: (row) => handleVendorAction(row), // Function to handle button click
            buttonLabel: "Detail", // Button label
          },
        ]}
        data={dataVendor} // Use your vendor data here
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(dataVendor.length / itemsPerPage)} // Use dataVendor for pagination
        onPageChange={setCurrentPage}
      />
      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button variant="outlined_yellow" size="Medium" onClick={onBack}>
          Kembali
        </Button>
        <Button variant="solid_blue" size="Medium" onClick={onNext}>
          Simpan & Lanjut
        </Button>
      </div>
    </div>
  );
};

export default Tahap4;
