import React, { useCallback, useEffect, useState } from "react";
import TextInput from "../../components/input";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/Tabs";
import SearchBox from "../../components/searchbox";
import Button from "../../components/button";
import axios from "axios";
import Modal from "../../components/modal";
import { CloseCircle } from "iconsax-react";
const Tahap4 = ({ onNext, onBack, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [commonInformation, setCommonInformation] = useState({
    kode_rup: "",
    nama_balai: "",
    nama_paket: "",
    nama_ppk: "",
    jabatan_ppk: "",
    jenis_informasi: "",
  });
  const [selectedVendors, setSelectedVendors] = useState([]);
  const isVendorSelected = (vendorId) => {
    return selectedVendors.some(
      (selectedVendor) => selectedVendor.data_vendor_id === vendorId
    );
  };
  const handleCheckboxChange = (vendor, isChecked) => {
    console.log("Vendor ID yang dipilih:", vendor.id);
    console.log("Apakah checkboxnya dipilih?", isChecked);

    setSelectedVendors((prevSelectedVendors) => {
      const updatedVendors = isChecked
        ? [
            ...prevSelectedVendors,
            {
              data_vendor_id: vendor.id,
              nama_vendor: vendor.nama_vendor,
              pemilik_vendor: vendor.pemilik_vendor,
              alamat: vendor.alamat,
              kontak: vendor.kontak,
            },
          ]
        : prevSelectedVendors.filter(
            (selectedVendor) => selectedVendor.data_vendor_id !== vendor.id
          );

      console.log("Daftar selectedVendors yang diperbarui:", updatedVendors);
      return updatedVendors;
    });
  };
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [vendorDetail, setVendorDetail] = useState([]);
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

  const handleOpenModal = (id) => {
    setSelectedVendorId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVendorId(null);
    setVendorDetail(null);
  };

  const handleSearchMaterial = (query) => {
    const filteredMaterials = allDataMaterial.filter((item) =>
      item.nama_material.toLowerCase().includes(query.toLowerCase())
    );
    setDataMaterial(filteredMaterials);
  };

  const handleSearchPeralatan = (query) => {
    const filteredPeralatan = allDataPeralatan.filter((item) =>
      item.nama_peralatan.toLowerCase().includes(query.toLowerCase())
    );
    setDataPeralatan(filteredPeralatan);
  };
  useEffect(() => {
    if (selectedVendorId && isModalOpen) {
      const informasi_umum_id = localStorage.getItem("informasi_umum_id");
      axios
        .get(
          `https://api-ecatalogue-staging.online/api/perencanaan-data/shortlist-detail-identifikasi?id=${selectedVendorId}&informasi_umum_id=${informasi_umum_id}`
        )
        .then((response) => {
          console.log(
            "Vendor Detail Data (JSON):",
            JSON.stringify(response.data, null, 2)
          ); // Menampilkan data dalam format JSON
          setVendorDetail(response.data.data); // Memastikan respons diatur ke vendorDetail
        })
        .catch((error) =>
          console.error("Failed to fetch vendor details:", error)
        );
    }
  }, [selectedVendorId, isModalOpen]);

  const handleSearchTenagaKerja = (query) => {
    // Implement search functionality for tenaga kerja
  };
  const handleAdjustData = async () => {
    // Ensure a vendor is selected
    if (!selectedVendorId) {
      console.error("No vendor selected.");
      return; // Stop the function if no vendor is selected
    }

    // Retrieve the informasi_umum_id from localStorage
    const informasi_umum_id = localStorage.getItem("informasi_umum_id");

    // Prepare payload with the selected vendor's ID
    const payload = {
      id_vendor: selectedVendorId, // Only send the selected vendor ID
      shortlist_vendor_id: informasi_umum_id
        ? parseInt(informasi_umum_id)
        : null, // Single value, check if it's available
      material: dataMaterial.map((item) => ({ id: item.id })),
      peralatan: dataPeralatan.map((item) => ({ id: item.id })),
      tenaga_kerja: dataTenagaKerja.map((item) => ({ id: item.id })),
    };

    // Log payload to verify the data being sent
    console.log("Payload being sent:", JSON.stringify(payload));

    try {
      const response = await axios.post(
        "https://api-ecatalogue-staging.online/api/perencanaan-data/adjust-identifikasi-kebutuhan",
        payload
      );
      if (response.status === 200) {
        console.log("Data submitted successfully:", response.data);
        // Proceed with success actions, like navigating to the next step
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during submission:", error);
    }
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
            onClick: (row) => handleOpenModal(row.id), // Pass the vendor ID to handleOpenModal
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
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-H5">Seleksi</h5>
            <button
              className="text-emphasis-on_surface-high"
              onClick={handleCloseModal}>
              <CloseCircle size="24" />
            </button>
          </div>
          {/* <Table
            columns={[
              { title: "Responder/Vendor", accessor: "nama_material" },
              { title: "Pemilik Vendor", accessor: "satuan" },
              { title: "Alamat", accessor: "jumlah_kebutuhan" },
              { title: "Kontak", accessor: "jumlah_kebutuhan" },
            ]}
            data={dataMaterial} // Display all material data in modal table
          /> */}
          {console.log("Vendor Detail in Modal:", vendorDetail)}{" "}
          {/* Check vendorDetail data */}
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
                        {
                          title: "",
                          accessor: "select",
                          type: "checkbox",
                          width: "48px",
                          onChange: (material) =>
                            handleCheckboxChange(
                              material,
                              !isVendorSelected(material.id)
                            ),
                          isChecked: (material) =>
                            isVendorSelected(material.id),
                        },
                        {
                          title: "Nama Material",
                          accessor: "nama_material",
                        },
                        { title: "Satuan", accessor: "satuan" },
                        {
                          title: "Spesifikasi",
                          accessor: "spesifikasi",
                        },
                      ]}
                      data={
                        vendorDetail?.identifikasi_kebutuhan?.material ?? []
                      }
                      setParentState={setCommonInformation}
                    />
                    <Pagination
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      totalData={
                        vendorDetail?.identifikasi_kebutuhan?.material
                          ?.length || 0
                      }
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
                        {
                          title: "",
                          accessor: "select",
                          type: "checkbox",
                          width: "48px",
                          onChange: (equipment) =>
                            handleCheckboxChange(
                              equipment,
                              !isVendorSelected(equipment.id)
                            ),
                          isChecked: (equipment) =>
                            isVendorSelected(equipment.id),
                        },
                        {
                          title: "Nama Peralatan",
                          accessor: "jenis_peralatan",
                        },
                        { title: "Satuan", accessor: "satuan" },
                        {
                          title: "Jumlah Kebutuhan",
                          accessor: "jumlah_kebutuhan",
                        },
                      ]}
                      data={
                        vendorDetail?.identifikasi_kebutuhan?.peralatan
                          ? vendorDetail.identifikasi_kebutuhan.peralatan.slice(
                              (currentPage - 1) * itemsPerPage,
                              currentPage * itemsPerPage
                            )
                          : []
                      }
                      setParentState={setCommonInformation}
                    />
                    <Pagination
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      totalData={
                        vendorDetail?.identifikasi_kebutuhan?.peralatan
                          ?.length || 0
                      }
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
                        {
                          title: "",
                          accessor: "select",
                          type: "checkbox",
                          width: "48px",
                          onChange: (worker) =>
                            handleCheckboxChange(
                              worker,
                              !isVendorSelected(worker.id)
                            ),
                          isChecked: (worker) => isVendorSelected(worker.id),
                        },
                        {
                          title: "Nama Pekerja",
                          accessor: "jenis_tenaga_kerja",
                        },
                        { title: "Satuan", accessor: "satuan" },
                      ]}
                      data={
                        vendorDetail?.identifikasi_kebutuhan?.tenaga_kerja?.slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        ) || []
                      }
                      setParentState={setCommonInformation}
                    />
                    <Pagination
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      totalData={
                        vendorDetail?.identifikasi_kebutuhan?.tenaga_kerja
                          ?.length || 0
                      }
                      onPageChange={setCurrentPage}
                    />
                  </div>
                ),
              },
            ]}
          />
          <div className="flex flex-row justify-end items-right space-x-4 mt-3 ">
            <Button
              variant="outlined_yellow"
              size="Medium"
              onClick={handleCloseModal}>
              Kembali
            </Button>
            <Button
              variant="solid_blue"
              size="Medium"
              // onClick={async () => {
              //   try {
              //     onNext();
              //   } catch (error) {
              //     alert(error.message);
              //   }
              // }}
              onClick={handleAdjustData}>
              Hapus & Lanjut
            </Button>
          </div>
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
