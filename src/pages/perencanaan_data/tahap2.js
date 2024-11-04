import React, { useState, useEffect } from "react";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/Tabs";
import Button from "../../components/button";
import { Trash } from "iconsax-react";
import SearchBox from "../../components/searchbox";
import axios from "axios";
import Dropdown from "../../components/Dropdown";

const Tahap2 = ({ onNext, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsToAdd, setRowsToAdd] = useState(0);
  const [kota_id, setkota_id] = useState("");
  const [provinsi_id, setprovinsi_id] = useState("");
  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kotaOptions, setKotaOptions] = useState([]);

  const [dataMaterial, setDataMaterial] = useState([
    {
      id: 1,
      namaMaterial: "",
      satuan: "",
      spesifikasi: "",
      ukuran: "",
      kodefikasi: "",
      jumlahKebutuhan: "",
      merk: "",
      provinsi: "",
      kabupatenKota: "",
      kelompokMaterial: "",
    },
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
  ]);

  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const response = await axios.get(
          "https://api-ecatalogue-staging.online/api/provinces-and-cities"
        );
        console.log("API Response:", response.data.data);

        if (response.data.data && Array.isArray(response.data.data)) {
          const formattedProvinsi = response.data.data.map((provinsi) => ({
            value: provinsi.id_province.toString(),
            label: provinsi.province_name,
            cities: provinsi.cities,
          }));

          setProvinsiOptions(formattedProvinsi);
        } else {
          console.error("Provinces not found in the response");
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinsi();
  }, []); // Runs only once on mount

  const handleProvinsiChange = (selectedOption) => {
    setprovinsi_id(selectedOption.value);
    setkota_id(""); // Reset kota_id when the province changes

    const selectedProvinsi = provinsiOptions.find(
      (provinsi) => provinsi.value === selectedOption.value
    );

    // Set kotaOptions based on selected province
    setKotaOptions(
      selectedProvinsi?.cities.map((city) => ({
        value: city.cities_id.toString(), // Ensure cities_id is a string
        label: city.cities_name,
      })) || []
    );

    console.log("Selected Provinsi:", selectedProvinsi);
    console.log("Updated Kota Options:", selectedProvinsi?.cities);
  };

  const handleAddRowMaterial = () => {
    const newRows = Array.from({ length: rowsToAdd }, (_, index) => ({
      id: dataMaterial.length + index + 1,
      namaMaterial: "",
      satuan: "",
      spesifikasi: "",
      ukuran: "",
      kodefikasi: "",
      jumlahKebutuhan: "",
      merk: "",
      provinsi: "",
      kabupatenKota: "",
      kelompokMaterial: "",
    }));

    setDataMaterial((prevData) => [...newRows, ...prevData]);
    setFilteredDataMaterial((prevData) => [...newRows, ...prevData]);
    setRowsToAdd(0);
    setIsModalOpen(false);
  };

  const handleAddRowsPeralatan = () => {
    const newRows = Array.from({ length: rowsToAdd }, (_, index) => ({
      id: dataPeralatan.length + index + 1,
      namaPeralatan: "",
      satuan: "",
      tipe: "",
      merk: "",
      kapasitas: "",
      jumlahKebutuhan: "",
      provinsi: "",
      kabupatenKota: "",
    }));

    setDataPeralatan((prevData) => [...newRows, ...prevData]);
    setFilteredDataPeralatan((prevData) => [...newRows, ...prevData]);
    setRowsToAdd(0);
    setIsModalOpen(false);
  };

  const handleAddRowsTenagaKerja = () => {
    const newRows = Array.from({ length: rowsToAdd }, (_, index) => ({
      id: dataTenagaKerja.length + index + 1,
      namaPekerja: "",
      kategori: "",
      upah: "",
      jumlahKebutuhan: "",
      provinsi: "",
      kabupatenKota: "",
    }));

    setDataTenagaKerja((prevData) => [...newRows, ...prevData]);
    setFilteredDataTenagaKerja((prevData) => [...newRows, ...prevData]);
    setRowsToAdd(0);
    setIsModalOpen(false);
  };

  const [filteredDataMaterial, setFilteredDataMaterial] =
    useState(dataMaterial);
  const [filteredDataPeralatan, setFilteredDataPeralatan] =
    useState(dataPeralatan);
  const [filteredDataTenagaKerja, setFilteredDataTenagaKerja] =
    useState(dataTenagaKerja);

  const [stateMaterial, setStateMaterial] = useState(null);
  const [statePeralatan, setStatePeralatan] = useState([]);
  const [stateTenagaKerja, setStateTenagaKerja] = useState(null);

  let result = [];

  const handleSearch = (query, tab) => {
    const data =
      tab === "Material"
        ? dataMaterial
        : tab === "Peralatan"
        ? dataPeralatan
        : dataTenagaKerja;

    if (data) {
      result = data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
    }

    if (tab === "Material") {
      setFilteredDataMaterial(result);
    } else if (tab === "Peralatan") {
      setFilteredDataPeralatan(result);
    } else {
      setFilteredDataTenagaKerja(result);
    }

    setCurrentPage(1);
  };

  const handleDelete = (row, tab) => {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus item ${
        tab === "Material"
          ? row.namaMaterial
          : tab === "Peralatan"
          ? row.namaPeralatan
          : row.namaPekerja
      }?`
    );
    if (confirmed) {
      const newData = (
        tab === "Material"
          ? dataMaterial
          : tab === "Peralatan"
          ? dataPeralatan
          : dataTenagaKerja
      ).filter((item) => item.id !== row.id);
      if (tab === "Material") {
        setDataMaterial(newData);
        setFilteredDataMaterial(newData);
      } else if (tab === "Peralatan") {
        setDataPeralatan(newData);
        setFilteredDataPeralatan(newData);
      } else {
        setDataTenagaKerja(newData);
        setFilteredDataTenagaKerja(newData);
      }
      setCurrentPage(1);
    }
  };

  const columnsMaterial = [
    {
      title: "Nama Material",
      accessor: "nama_material",
      placeholder: "Masukkan Nama Material",
      type: "textInput",
      width: "300px",
      required: true,
    },
    {
      title: "Satuan",
      accessor: "satuan",
      type: "textInput",
      width: "154px",
      placeholder: "Masukkan Satuan",
      tooltipText: "Contoh pengisian: m³, m²",
      required: true,
    },
    {
      title: "Spesifikasi",
      accessor: "spesifikasi",
      type: "textInput",
      placeholder: "Masukkan Spesifikasi",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: Silika, GI Medium - Socket ",
    },
    {
      title: "Ukuran",
      accessor: "ukuran",
      type: "textInput",
      placeholder: "Masukkan Ukuran",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: Silika, GI Medium - Socket ",
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      type: "textInput",
      placeholder: "Masukkan Kodefikasi",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: M304, M.114.e  ",
    },
    {
      title: "Kelompok Material",
      accessor: "kelompok_material",
      type: "dropdown",
      // options: ["Bahan Baku", "Bahan Olahan", "Bahan Jadi"],
      options: [
        { value: "Bahan Baku", label: "Bahan Baku" },
        { value: "Bahan Olahan", label: "Bahan Olahan" },
        { value: "Bahan Jadi", label: "Bahan Jadi" },
      ],
      width: "240px",
      required: true,
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlah_kebutuhan",
      type: "textInput",
      placeholder: "Masukkan Jumlah",
      width: "260px",
      required: true,
    },
    {
      title: "Merk",
      accessor: "merk",
      type: "textInput",
      placeholder: "Masukkan Merk",
      width: "200px",
      required: true,
    },
    {
      title: "Provinsi",
      accessor: "provinsi",
      type: "dropdown",
      // options: provinsiOptions.map((option) => option.label),
      options: provinsiOptions,
      width: "200px",
      required: true,
      errorMessage: "Provinsi harus dipilih",
    },
    {
      title: "Kabupaten/Kota",
      accessor: "kabupatenKota",
      type: "dropdown",
      // options: kotaOptions.map((option) => option.label),
      options: kotaOptions,
      required: true,
      errorMessage: "Kota harus dipilih",
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: Trash,
      onClick: (row) => handleDelete(row, "Material"),
      width: "52px",
    },
  ];

  const columnsPeralatan = [
    {
      title: "Nama Peralatan",
      accessor: "nama_peralatan",
      placeholder: "Masukkan Nama Peralatan",
      type: "textInput",
      width: "300px",
      required: true,
    },
    {
      title: "Satuan",
      accessor: "satuan",
      placeholder: "Masukkan Satuan",
      type: "textInput",
      width: "154px",
      required: true,
      tooltipText: "Contoh pengisian: m³, m²",
    },
    {
      title: "Spesifikasi",
      accessor: "spesifikasi",
      type: "textInput",
      placeholder: "Masukkan Spesifikasi",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: 80 HP, 20 HP",
    },
    {
      title: "Kapasitas",
      accessor: "kapasitas",
      type: "textInput",
      placeholder: "Masukkan Kapasitas",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: 0,9 m3, 0.6 m3",
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      type: "textInput",
      placeholder: "Masukkan Kodefikasi",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: E10, E06 ",
    },
    {
      title: "Kelompok Peralatan",
      accessor: "kelompok_peralatan",
      type: "dropdown",
      options: [
        { value: "Mekanis", label: "Mekanis" },
        { value: "Semi Mekanis", label: "Semi Mekanis" },
      ],
      // placeholder: "Masukkan Kelompok Peralatan",
      width: "240px",
      required: true,
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlah_kebutuhan",
      type: "textInput",
      placeholder: "Masukkan Jumlah Kebutuhan",
      width: "260px",
      required: true,
    },
    {
      title: "Merk",
      accessor: "merk",
      type: "textInput",
      placeholder: "Masukkan Merk",
      width: "200px",
      required: true,
    },
    {
      title: "Provinsi",
      accessor: "provinsi",
      type: "dropdown",
      // options: provinsiOptions.map((option) => option.label),
      options: provinsiOptions,
      width: "200px",
      required: true,
      errorMessage: "Provinsi harus dipilih",
    },
    {
      title: "Kabupaten/Kota",
      accessor: "kabupatenKota",
      type: "dropdown",
      // options: kotaOptions.map((option) => option.label),
      options: kotaOptions,
      required: true,
      errorMessage: "Kota harus dipilih",
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: Trash,
      onClick: (row) => handleDelete(row, "Peralatan"),
      width: "52px",
    },
  ];

  const columnsTenagaKerja = [
    {
      title: "Jenis Tenaga Kerja",
      accessor: "jenis_tenaga_kerja",
      type: "textInput",
      placeholder: "Masukkan Tenaga Kerja",
      width: "300px",
      required: true,
    },
    {
      title: "Satuan",
      accessor: "satuan",
      placeholder: "Masukkan Satuan",
      type: "textInput",
      width: "154px",
      required: true,
      tooltipText: "Nama harus diisi sesuai KTP",
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlah_kebutuhan",
      type: "textInput",
      placeholder: "Masukkan Jumlah Kebutuhan",
      width: "240px",
      required: true,
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      type: "textInput",
      placeholder: "Masukkan Kodefikasi",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: L04,L02",
    },
    {
      title: "Provinsi",
      accessor: "provinsi",
      type: "dropdown",
      // options: provinsiOptions.map((option) => option.label),
      options: provinsiOptions,
      width: "200px",
      required: true,
      errorMessage: "Provinsi harus dipilih",
    },
    {
      title: "Kabupaten/Kota",
      accessor: "kabupatenKota",
      type: "dropdown",
      // options: kotaOptions.map((option) => option.label),
      options: kotaOptions,
      required: true,
      errorMessage: "Kota harus dipilih",
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: Trash,
      onClick: (row) => handleDelete(row, "Tenaga Kerja"),
      width: "52px",
    },
  ];

  const tabs = [
    {
      label: "Material",
      content: (
        <div className="mt-3 space-y-8">
          <div className="flex items-center space-x-3 mt-3">
            <SearchBox placeholder="Cari Material..." onSearch={handleSearch} />
            <Button
              variant="solid_blue"
              size="Medium"
              onClick={() => setIsModalOpen(true)}>
              Tambah Data
            </Button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="bg-white p-6 shadow-md w-96 rounded-[12px]">
                <label className="block mb-2">
                  <p className="text-Medium font-bold text-emphasis-on_surface-high">
                    Tambah Data
                  </p>
                  <p className="text-Small text-emphasis-on_surface-medium">
                    Masukkan jumlah baris yang ingin ditambahkan:
                  </p>
                  <input
                    type="number"
                    value={rowsToAdd}
                    onChange={(e) => setRowsToAdd(Number(e.target.value))}
                    min="1"
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outlined_yellow"
                    size="Medium"
                    onClick={() => setIsModalOpen(false)}>
                    Batal{" "}
                  </Button>
                  <Button onClick={handleAddRowMaterial}>Tambah</Button>
                </div>
              </div>
            </div>
          )}

          <Table
            columns={columnsMaterial}
            data={filteredDataMaterial.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            setParentState={setStateMaterial}
            //
            renderCell={(column, row) => {
              if (column.type === "dropdown") {
                const value =
                  column.accessor === "provinsi" ? provinsi_id : kota_id;

                return (
                  <Dropdown
                    options={column.options}
                    placeholder={`Pilih ${column.title}`}
                    onSelect={(selected) => {
                      if (column.accessor === "provinsi") {
                        handleProvinsiChange(selected);
                      } else if (column.accessor === "kabupatenKota") {
                        setkota_id(selected.value);
                      }
                    }}
                    value={
                      column.accessor === "provinsi"
                        ? column.options.find(
                            (option) => option.value === provinsi_id
                          )
                        : column.accessor === "kabupatenKota"
                        ? column.options.find(
                            (option) => option.value === kota_id
                          )
                        : null
                    }
                    isRequired={column.required}
                    errorMessage={column.errorMessage}
                  />
                );
              }
              return row[column.accessor];
            }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredDataMaterial.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
    {
      label: "Peralatan",
      content: (
        <div className="mt-3 space-y-8">
          <div className="flex items-center space-x-3 mt-3">
            <SearchBox
              placeholder="Cari Peralatan..."
              onSearch={handleSearch}
            />
            <Button
              variant="solid_blue"
              size="Medium"
              onClick={() => setIsModalOpen(true)}>
              Tambah Data
            </Button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="bg-white p-6 shadow-md w-96 rounded-[12px]">
                <label className="block mb-2">
                  <p className="text-Medium font-bold text-emphasis-on_surface-high">
                    Tambah Data
                  </p>
                  <p className="text-Small text-emphasis-on_surface-medium">
                    Masukkan jumlah baris yang ingin ditambahkan:
                  </p>
                  <input
                    type="number"
                    value={rowsToAdd}
                    onChange={(e) => setRowsToAdd(Number(e.target.value))}
                    min="1"
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outlined_yellow"
                    size="Medium"
                    onClick={() => setIsModalOpen(false)}>
                    Batal{" "}
                  </Button>
                  <Button onClick={handleAddRowsPeralatan}>Tambah</Button>
                </div>
              </div>
            </div>
          )}
          <Table
            columns={columnsPeralatan}
            data={filteredDataPeralatan.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            setParentState={setStatePeralatan}
            renderCell={(column, row) => {
              if (column.type === "dropdown") {
                const value =
                  column.accessor === "provinsi"
                    ? provinsi_id
                    : column.accessor === "kabupatenKota"
                    ? kota_id
                    : row[column.accessor];

                return (
                  <Dropdown
                    options={column.options}
                    placeholder={`Pilih ${column.title}`}
                    onSelect={(selected) => {
                      if (column.accessor === "provinsi") {
                        handleProvinsiChange(selected);
                      } else if (column.accessor === "kabupatenKota") {
                        setkota_id(selected.value);
                      } else if (column.accessor === "kelompok_peralatan") {
                        setStatePeralatan(
                          (prevState) =>
                            Array.isArray(prevState)
                              ? prevState.map((item, index) =>
                                  index === rowIndex // Pastikan rowIndex didefinisikan di scope ini
                                    ? {
                                        ...item,
                                        kelompok_peralatan: selected.value,
                                      }
                                    : item
                                )
                              : [{ kelompok_peralatan: selected.value }] // Jika `prevState` null, mulai dengan item baru
                        );
                      }
                    }}
                    value={
                      column.accessor === "provinsi"
                        ? column.options.find(
                            (option) => option.value === provinsi_id
                          )
                        : column.accessor === "kabupatenKota"
                        ? column.options.find(
                            (option) => option.value === kota_id
                          )
                        : column.accessor === "kelompok_peralatan"
                        ? column.options.find(
                            (option) => option.value === row[column.accessor]
                          )
                        : null
                    }
                    isRequired={column.required}
                    errorMessage={column.errorMessage}
                  />
                );
              }
              return row[column.accessor];
            }}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredDataPeralatan.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
    {
      label: "Tenaga Kerja",
      content: (
        <div className="mt-3 space-y-8">
          <div className="flex items-center space-x-3 mt-3">
            <SearchBox
              placeholder="Cari Tenaga Kerja..."
              onSearch={handleSearch}
            />
            <Button
              variant="solid_blue"
              size="Medium"
              onClick={() => setIsModalOpen(true)}>
              Tambah Data
            </Button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="bg-white p-6 shadow-md w-96 rounded-[12px]">
                <label className="block mb-2">
                  <p className="text-Medium font-bold text-emphasis-on_surface-high">
                    Tambah Data
                  </p>
                  <p className="text-Small text-emphasis-on_surface-medium">
                    Masukkan jumlah baris yang ingin ditambahkan:
                  </p>
                  <input
                    type="number"
                    value={rowsToAdd}
                    onChange={(e) => setRowsToAdd(Number(e.target.value))}
                    min="1"
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outlined_yellow"
                    size="Medium"
                    onClick={() => setIsModalOpen(false)}>
                    Batal{" "}
                  </Button>
                  <Button onClick={handleAddRowsTenagaKerja}>Tambah</Button>
                </div>
              </div>
            </div>
          )}
          <Table
            columns={columnsTenagaKerja}
            data={filteredDataTenagaKerja.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            setParentState={setStateTenagaKerja}
            renderCell={(column, row) => {
              if (column.type === "dropdown") {
                const value =
                  column.accessor === "provinsi"
                    ? provinsi_id
                    : column.accessor === "kabupatenKota"
                    ? kota_id
                    : row[column.accessor];

                return (
                  <Dropdown
                    options={column.options}
                    placeholder={`Pilih ${column.title}`}
                    onSelect={(selected) => {
                      if (column.accessor === "provinsi") {
                        handleProvinsiChange(selected);
                      } else if (column.accessor === "kabupatenKota") {
                        setkota_id(selected.value);
                      }
                    }}
                    value={
                      column.accessor === "provinsi"
                        ? column.options.find(
                            (option) => option.value === provinsi_id
                          )
                        : column.accessor === "kabupatenKota"
                        ? column.options.find(
                            (option) => option.value === kota_id
                          )
                        : null
                    }
                    isRequired={column.required}
                    errorMessage={column.errorMessage}
                  />
                );
              }
              return row[column.accessor];
            }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(
              filteredDataTenagaKerja.length / itemsPerPage
            )}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
  ];

  const handleSubmitSecondStep = async () => {
    try {
      if (!stateMaterial) throw new Error("Data material belum diisi!");
      if (!statePeralatan) throw new Error("Data peralatan belum diisi!");
      if (!stateTenagaKerja) throw new Error("Data tenaga kerja belum diisi!");

      console.log(JSON.stringify(stateMaterial));
      const stateMaterialFirst = stateMaterial["1"];
      const statePeralatanFirst = statePeralatan["1"];
      const stateTenagaKerjaFirst = stateTenagaKerja["1"];
      const informasi_umum_id = localStorage.getItem("informasi_umum_id");

      const requestData = {
        informasi_umum_id: informasi_umum_id,
        material: [
          {
            ...stateMaterialFirst,
            provincies_id: 1,
            cities_id: 1,
          },
        ],
        peralatan: [
          {
            ...statePeralatanFirst,
            provincies_id: 1,
            cities_id: 1,
          },
        ],
        tenaga_kerja: [
          {
            ...stateTenagaKerjaFirst,
            provincies_id: 1,
            cities_id: 1,
          },
        ],
      };

      console.log(JSON.stringify(requestData));

      // Kirim data ke API
      const response = await fetch(
        "https://api-ecatalogue-staging.online/api/perencanaan-data/store-identifikasi-kebutuhan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("Submit tahap 2 gagal");
      }

      const responseData = await response.json(); // Parse the JSON data
      console.log(responseData);

      // Menyimpan identifikasi_kebutuhan_id ke localStorage jika responsnya ada
      localStorage.setItem(
        "identifikasi_kebutuhan_id",
        responseData.data?.material[0]?.identifikasi_kebutuhan_id ?? 0
      );
    } catch (error) {
      console.error("Error saat mengirim data:", error);
      alert(error.message); // Menampilkan pesan kesalahan kepada pengguna
    }
  };
  return (
    <div>
      <h4 className="text-H4 text-emphasis-on_surface-high">
        Identifikasi Kebutuhan{" "}
      </h4>
      <div className="mt-6">
        <Tabs tabs={tabs} />
      </div>
      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button variant="outlined_yellow" size="Medium" onClick={onBack}>
          Kembali
        </Button>

        <Button
          variant="solid_blue"
          size="Medium"
          onClick={async () => {
            console.log("onNext called");
            try {
              await handleSubmitSecondStep();
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

export default Tahap2;
