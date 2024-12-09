import { Field, FieldArray, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useStore from "./tahap2/tahap2store";
import Navbar from "../../components/navigationbar";
import Stepper from "../../components/stepper";
// import Tabs from "../../components/Tabs";
import Button from "../../components/button";
import Pagination from "../../components/pagination";
import TextInput from "../../components/input";
import Dropdown from "../../components/dropdown";
import DropdownAPI from "../../components/DropdownAPI";
import SearchBox from "../../components/searchbox";
import AddRowModal from "../../components/addrowmodal";

export default function Tahap2V2() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentStep, setCurrentStep] = useState(1);
  const NUMBER_OF_STEPS = 4;
  const stepLabels = [
    "Informasi Umum",
    "Identifikasi Kebutuhan",
    "Penentuan Shortlist Vendor",
    "Perancangan Kuesioner",
  ];
  const kelompokMaterialOptions = [
    { value: "Bahan Baku", label: "Bahan Baku" },
    { value: "Bahan Olahan", label: "Bahan Olahan" },
    { value: "Bahan Jadi", label: "Bahan Jadi" },
  ];

  const handleSearch = (query) => {
    console.log(`Searching for: ${query}`);

    const lowerCaseQuery = query.toLowerCase();

    // Jika query kosong, reset ke data asli
    if (!query) {
      setFilteredDataMaterial(dataMaterial);
      setFilteredDataPeralatan(dataPeralatan);
      setFilteredDataTenagaKerja(dataTenagaKerja);
      return;
    }

    // Filter data material
    const newFilteredDataMaterial = dataMaterial.filter((item) => {
      return columnsMaterial.some((column) => {
        const value = item[column.accessor];
        // Jika accessor adalah untuk dropdown, periksa apakah nilai ada dalam options
        if (column.type === "dropdown API") {
          return column.options.some((option) =>
            option.label.toLowerCase().includes(lowerCaseQuery)
          );
        }
        return value && value.toString().toLowerCase().includes(lowerCaseQuery);
      });
    });
    setFilteredDataMaterial(newFilteredDataMaterial);

    // Filter data peralatan
    const newFilteredDataPeralatan = dataPeralatan.filter((item) => {
      return columnsPeralatan.some((column) => {
        const value = item[column.accessor];
        // Jika accessor adalah untuk dropdown, periksa apakah nilai ada dalam options
        if (column.type === "dropdown API") {
          return column.options.some((option) =>
            option.label.toLowerCase().includes(lowerCaseQuery)
          );
        }
        return value && value.toString().toLowerCase().includes(lowerCaseQuery);
      });
    });
    setFilteredDataPeralatan(newFilteredDataPeralatan);

    const newFilteredDataTenagaKerja = dataTenagaKerja.filter((item) => {
      return columnsTenagaKerja.some((column) => {
        const value = item[column.accessor];
        // Jika accessor adalah untuk dropdown, periksa apakah nilai ada dalam options
        if (column.type === "dropdown API") {
          return column.options.some((option) =>
            option.label.toLowerCase().includes(lowerCaseQuery)
          );
        }
        return value && value.toString().toLowerCase().includes(lowerCaseQuery);
      });
    });
    setFilteredDataTenagaKerja(newFilteredDataTenagaKerja);

    console.log(`Filtered Material Data:`, newFilteredDataMaterial);
    console.log(`Filtered Peralatan Data:`, newFilteredDataPeralatan);
    console.log(`Filtered Tenaga Kerja Data:`, newFilteredDataTenagaKerja);
  };

  const navigateToTahap1 = () => {
    window.location.href = "/perencanaan_data/tahap1?fromTahap2=true";
  };
  const {
    selectedValue,
    provincesOptions,
    initialValues,
    citiesOptions,
    setSelectedValue,
    setProvincesOptions,
    setCitiesOptions,
    setInitialValues,
  } = useStore();

  console.log("selectedValue", selectedValue);

  const renderSearchBox = (currentIndex) => {
    const getPlaceholder = () => {
      switch (currentIndex) {
        case 0:
          return "Cari Material...";
        case 1:
          return "Cari Peralatan...";
        case 2:
          return "Cari Tenaga Kerja...";
        default:
          return "";
      }
    };

    return (
      <SearchBox
        placeholder={getPlaceholder()}
        onSearch={handleSearch}
        withFilter={true}
      />
    );
  };

  useEffect(() => {
    const fetchProvincesOptions = async () => {
      try {
        const response = await fetch(
          "https://api-ecatalogue-staging.online/api/provinces-and-cities"
        );
        const data = await response.json();
        console.log(data.data);
        const transformedData = data.data.map(
          ({ id_province, province_name, cities }) => ({
            value: id_province,
            label: province_name,
            cities,
          })
        );
        setProvincesOptions(transformedData);

        // Setelah data provinsi selesai, lanjutkan proses berikutnya
        const params = new URLSearchParams(window.location.search);
        const fromTahap3 = params.get("fromTahap3");

        if (fromTahap3 === "true") {
          const identifikasi_kebutuhan_id = localStorage.getItem(
            "identifikasi_kebutuhan_id"
          );
          console.log("identifikasi_kebutuhan_id", identifikasi_kebutuhan_id);
          if (identifikasi_kebutuhan_id) {
            fetchIdentifikasiKebutuhan(identifikasi_kebutuhan_id);
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching provinces options:", error);
      }
    };

    fetchProvincesOptions();
  }, [setProvincesOptions]);

  const fetchIdentifikasiKebutuhan = async (id) => {
    console.log("Isi balaiOptions:", id);
    try {
      const response = await axios.get(
        `https://api-ecatalogue-staging.online/api/perencanaan-data/get-identifikasi-kebutuhan/${id}`
      );
      const resultMaterial = response.data.data.material;
      const resultPeralatans = response.data.data.peralatan;
      setInitialValues({
        materials: resultMaterial,
        peralatans: resultPeralatans,
      });
    } catch (error) {
      console.error("Gagal memuat data Informasi Umum:", error);
    }
  };

  console.log("initialValues", initialValues);

  const items = ["Material", "Peralatan", "Tenaga Kerja"];

  const handleSubmit = (values) => {
    console.log(values);
  };

  console.log("isModalOpen", isModalOpen);

  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-3 pt-8">
        <h3 className="text-H3 text-emphasis-on_surface-high">
          Tahap Perencanaan Data
        </h3>
        <div className="justify-center items-center space-x-4 mt-3 bg-neutral-100 px-6 pb-8 pt-16 rounded-[16px]">
          <Stepper
            currentStep={currentStep}
            numberOfSteps={NUMBER_OF_STEPS}
            labels={stepLabels}
          />
        </div>
        <h4 className="text-H4 text-emphasis-on_surface-high">
          Identifikasi Kebutuhan
        </h4>
      </div>
      <div className="space-y-4">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}>
          {({ values, setFieldValue }) => (
            <Form>
              <MaterialForm
                values={values}
                setFieldValue={setFieldValue}
                hide={selectedValue !== 0}
                provincesOptions={provincesOptions}
                kelompokMaterialOptions={kelompokMaterialOptions} // Tambahkan ini
              />
              <PeralatanForm
                values={values}
                setFieldValue={setFieldValue}
                hide={selectedValue !== 1}
                provincesOptions={provincesOptions}
              />
              <TenagaKerjaForm
                values={values}
                setFieldValue={setFieldValue}
                hide={selectedValue !== 2}
                provincesOptions={provincesOptions}
              />
              {/* <button type="submit" className="text-black">
              Submit
            </button> */}

              <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
                <Button
                  variant="outlined_yellow"
                  size="Medium"
                  onClick={navigateToTahap1}>
                  Kembali
                </Button>

                <Button
                  variant="solid_blue"
                  size="Medium"
                  onClick={() => handleSubmit(values)}>
                  Simpan & Lanjut
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

const MaterialForm = ({
  values,
  setFieldValue,
  hide,
  provincesOptions,
  kelompokMaterialOptions,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedMaterials = values.materials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // const {
  //   setInitialValues
  // } = useStore();

  // useEffect(() => {
  //   if (currentPage != 0) {
  //     setInitialValues({ materials: [] });
  //   }
  // }, [currentPage, setInitialValues]);

  const { setSelectedValue } = useStore();

  return (
    <div
      className={`${
        hide ? "hidden" : ""
      } rounded-[16px] border border-gray-200 overflow-hidden`}>
      <FieldArray name="materials">
        {({ push, remove }) => (
          <div className="">
            <div className="flex flex-row justify-between items-center">
              <div className="mt-6">
                <Tabs
                  items={["Material", "Peralatan", "Tenaga Kerja"]}
                  onChange={(index) => setSelectedValue(index)}
                  selectedValue={0}
                />
              </div>
              <div className="flex flex-row justify-between items-center space-x-4">
                <SearchBox
                  placeholder="Cari Material..."
                  onSearch={() => {}}
                  withFilter={true}
                />
                <Button
                  variant="solid_blue"
                  size="Medium"
                  onClick={() => setIsModalOpen(true)}>
                  Tambah Data
                </Button>
              </div>
              {isModalOpen && (
                <AddRowModal
                  handleClose={() => setIsModalOpen(false)}
                  handleAddRow={(rowsToAdd) => {
                    for (let i = 0; i < rowsToAdd; i++) {
                      push();
                    }
                  }}
                  currentIndex={0}
                />
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full min-w-max">
                <thead>
                  <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                    <th className="px-3 py-6 text-base font-normal">
                      Nama Material
                    </th>
                    <th className="px-3 py-6 text-base font-normal">Satuan</th>
                    <th className="px-3 py-6 text-base font-normal">
                      Spesifikasi
                    </th>
                    <th className="px-3 py-6 text-base font-normal">Ukuran</th>
                    <th className="px-3 py-6 text-base font-normal">
                      Kodefikasi
                    </th>
                    <th className="px-3 py-6 text-base font-normal">
                      Kelompok Material
                    </th>
                    <th className="px-3 py-6 text-base font-normal">
                      Jumlah Kebutuhan
                    </th>
                    <th className="px-3 py-6 text-base font-normal">Merk</th>
                    <th className="px-3 py-6 text-base font-normal">
                      Provinsi
                    </th>
                    <th className="px-3 py-6 text-base font-normal">Kota</th>
                    <th className="px-3 py-6 text-base font-normal">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-surface-light-background">
                  {paginatedMaterials.map((_, index) => {
                    const actualIndex =
                      (currentPage - 1) * itemsPerPage + index;
                    return (
                      <tr key={actualIndex} className="border-b">
                        <td className="px-3 py-6">
                          <Field
                            name={`materials.${actualIndex}.nama_material`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${actualIndex}.nama_material`,
                                    e.target.value
                                  )
                                }
                                placeholder="Nama Material"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[actualIndex]
                                    ?.material
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${actualIndex}.satuan`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${actualIndex}.satuan`,
                                    e.target.value
                                  )
                                }
                                placeholder="Satuan"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[actualIndex]?.satuan
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${actualIndex}.spesifikasi`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${actualIndex}.spesifikasi`,
                                    e.target.value
                                  )
                                }
                                placeholder="Spesifikasi"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[actualIndex]
                                    ?.spesifikasi
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${actualIndex}.ukuran`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${actualIndex}.ukuran`,
                                    e.target.value
                                  )
                                }
                                placeholder="Ukuran"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[actualIndex]?.ukuran
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${actualIndex}.kodefikasi`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${actualIndex}.kodefikasi`,
                                    e.target.value
                                  )
                                }
                                placeholder="Kodefikasi"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[actualIndex]
                                    ?.kodefikasi
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field
                            name={`materials.${actualIndex}.kelompok_material`}>
                            {({ field, form }) => (
                              <Dropdown
                                options={kelompokMaterialOptions}
                                value={() => {
                                  const selectedKelompokMaterial =
                                    kelompokMaterialOptions.find(
                                      (kelompokMaterial) =>
                                        kelompokMaterial.value === field.value
                                    );
                                  return selectedKelompokMaterial;
                                }}
                                onSelect={(val) =>
                                  setFieldValue(
                                    `materials.${actualIndex}.kelompok_material`,
                                    val.value
                                  )
                                }
                                placeholder="Pilih Kelompok Material"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[actualIndex]
                                    ?.kelompok_material
                                }
                                labelPosition="top"
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field
                            name={`materials.${actualIndex}.jumlah_kebutuhan`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${actualIndex}.jumlah_kebutuhan`,
                                    e.target.value
                                  )
                                }
                                placeholder="Jumlah Kebutuhan"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[actualIndex]
                                    ?.jumlah_kebutuhan
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${actualIndex}.merk`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${actualIndex}.merk`,
                                    e.target.value
                                  )
                                }
                                placeholder="Merk"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[actualIndex]?.merk
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${actualIndex}.provinsi`}>
                            {({ field, form }) => (
                              <Dropdown
                                options={provincesOptions}
                                value={() => {
                                  const selectedProvince =
                                    provincesOptions.find(
                                      (province) =>
                                        province.value ===
                                        values.materials[actualIndex]
                                          ?.provincies_id
                                    );
                                  return selectedProvince;
                                }}
                                onSelect={(val) => {
                                  setFieldValue(
                                    `materials.${actualIndex}.provincies_id`,
                                    val.value
                                  );
                                  setFieldValue(
                                    `materials.${actualIndex}.cities_id`,
                                    ""
                                  ); // Reset cities_id
                                }}
                                placeholder="Pilih Provinsi"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[actualIndex]
                                    ?.province
                                }
                                labelPosition="top"
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${actualIndex}.kota`}>
                            {({ field, form }) => {
                              const selectedProvince = provincesOptions.find(
                                (province) =>
                                  province.value ===
                                  values.materials[actualIndex]?.provincies_id
                              );
                              const cities = selectedProvince
                                ? selectedProvince.cities
                                : [];
                              const transformedCities = cities.map((city) => ({
                                value: city.cities_id,
                                label: city.cities_name,
                              }));

                              return (
                                <Dropdown
                                  options={transformedCities}
                                  value={transformedCities.find(
                                    (city) =>
                                      city.value ===
                                      values.materials[actualIndex]?.cities_id
                                  )}
                                  onSelect={(val) =>
                                    setFieldValue(
                                      `materials.${actualIndex}.cities_id`,
                                      val.value
                                    )
                                  }
                                  placeholder="Pilih Kota"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.materials?.[actualIndex]
                                      ?.cities_id
                                  }
                                  labelPosition="top"
                                />
                              );
                            }}
                          </Field>
                        </td>
                        <td className="px-3 py-6 text-center">
                          <button
                            onClick={() => remove(actualIndex)}
                            className="text-red-500 hover:text-red-700">
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalData={values.materials.length}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

const PeralatanForm = ({ values, setFieldValue, hide, provincesOptions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { setSelectedValue } = useStore();

  const paginatedPeralatan = values.peralatans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className={`${
        hide ? "hidden" : ""
      } rounded-[16px] border border-gray-200 overflow-hidden`}>
      <FieldArray name="peralatans">
        {({ push, remove }) => (
          <div>
            <div className="flex flex-row justify-between items-center">
              <div className="mt-6">
                <Tabs
                  items={["Material", "Peralatan", "Tenaga Kerja"]}
                  onChange={(index) => setSelectedValue(index)}
                  selectedValue={1}
                />
              </div>
              <div className="flex flex-row justify-between items-center space-x-4">
                <SearchBox
                  placeholder="Cari Peralatan..."
                  onSearch={() => {}}
                  withFilter={true}
                />
                <Button
                  variant="solid_blue"
                  size="Medium"
                  onClick={() => setIsModalOpen(true)}>
                  Tambah Data
                </Button>
              </div>
              {isModalOpen && (
                <AddRowModal
                  handleClose={() => setIsModalOpen(false)}
                  handleAddRow={(rowsToAdd) => {
                    for (let i = 0; i < rowsToAdd; i++) {
                      push();
                    }
                  }}
                  currentIndex={1}
                />
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full min-w-max">
                <thead>
                  <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                    <th className="px-3 py-6 text-base font-normal">
                      Nama Peralatan
                    </th>
                    <th className="px-3 py-6 text-base font-normal">Satuan</th>
                    <th className="px-3 py-6 text-base font-normal">
                      Spesifikasi
                    </th>
                    <th className="px-3 py-6 text-base font-normal">
                      Kapasitas
                    </th>
                    <th className="px-3 py-6 text-base font-normal">
                      Kodefikasi
                    </th>
                    <th className="px-3 py-6 text-base font-normal">
                      Kelompok Peralatan
                    </th>
                    <th className="px-3 py-6 text-base font-normal">
                      Jumlah Kebutuhan
                    </th>
                    <th className="px-3 py-6 text-base font-normal">Merk</th>
                    <th className="px-3 py-6 text-base font-normal">
                      Provinsi
                    </th>
                    <th className="px-3 py-6 text-base font-normal">Kota</th>
                    <th className="px-3 py-6 text-base font-normal">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-surface-light-background">
                  {paginatedPeralatan.map((_, index) => {
                    const actualIndex =
                      (currentPage - 1) * itemsPerPage + index;
                    return (
                      <tr key={actualIndex} className="border-b">
                        <td className="px-3 py-6">
                          <Field
                            name={`peralatans.${actualIndex}.nama_peralatan`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `peralatans.${actualIndex}.nama_peralatan`,
                                    e.target.value
                                  )
                                }
                                placeholder="Nama Peralatan"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.peralatans?.[actualIndex]
                                    ?.nama_peralatan
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`peralatans.${actualIndex}.satuan`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `peralatans.${actualIndex}.satuan`,
                                    e.target.value
                                  )
                                }
                                placeholder="Satuan"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.peralatans?.[actualIndex]?.satuan
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`peralatans.${actualIndex}.spesifikasi`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `peralatans.${actualIndex}.spesifikasi`,
                                    e.target.value
                                  )
                                }
                                placeholder="Spesifikasi"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.peralatans?.[actualIndex]
                                    ?.spesifikasi
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`peralatans.${actualIndex}.kapasitas`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `peralatans.${actualIndex}.kapasitas`,
                                    e.target.value
                                  )
                                }
                                placeholder="Kapasitas"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.peralatans?.[actualIndex]
                                    ?.kapasitas
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`peralatans.${actualIndex}.kodefikasi`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `peralatans.${actualIndex}.kodefikasi`,
                                    e.target.value
                                  )
                                }
                                placeholder="Kodefikasi"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.peralatans?.[actualIndex]
                                    ?.kodefikasi
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field
                            name={`peralatans.${actualIndex}.kelompok_peralatan`}>
                            {({ field, form }) => (
                              <Dropdown
                                options={[
                                  { label: "Mekanis", value: "Mekanis" },
                                  {
                                    label: "Semi Mekanis",
                                    value: "Semi Mekanis",
                                  },
                                ]}
                                value={() => {
                                  const selectedKelompokPeralatan = [
                                    { label: "Mekanis", value: "Mekanis" },
                                    {
                                      label: "Semi Mekanis",
                                      value: "Semi Mekanis",
                                    },
                                  ].find(
                                    (kelompokPeralatan) =>
                                      kelompokPeralatan.value === field.value
                                  );
                                  return selectedKelompokPeralatan;
                                }}
                                onSelect={(val) =>
                                  setFieldValue(
                                    `peralatans.${actualIndex}.kelompok_peralatan`,
                                    val.value
                                  )
                                }
                                placeholder="Pilih Kelompok Peralatan"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.peralatans?.[actualIndex]
                                    ?.kelompok_peralatan
                                }
                                labelPosition="top"
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field
                            name={`peralatans.${actualIndex}.jumlah_kebutuhan`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `peralatans.${actualIndex}.jumlah_kebutuhan`,
                                    e.target.value
                                  )
                                }
                                placeholder="Jumlah Kebutuhan"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.peralatans?.[actualIndex]
                                    ?.jumlah_kebutuhan
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`peralatans.${actualIndex}.merk`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `peralatans.${actualIndex}.merk`,
                                    e.target.value
                                  )
                                }
                                placeholder="Merk"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.peralatans?.[actualIndex]?.merk
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field
                            name={`peralatans.${actualIndex}.provincies_id`}>
                            {({ field, form }) => (
                              <Dropdown
                                options={provincesOptions}
                                value={() => {
                                  const selectedProvince =
                                    provincesOptions.find(
                                      (province) =>
                                        province.value === field.value
                                    );
                                  return selectedProvince;
                                }}
                                onSelect={(val) => {
                                  setFieldValue(
                                    `peralatans.${actualIndex}.provincies_id`,
                                    val.value
                                  );
                                  setFieldValue(
                                    `peralatans.${actualIndex}.cities_id`,
                                    ""
                                  );
                                }}
                                placeholder="Pilih Provinsi"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.peralatans?.[actualIndex]
                                    ?.provincies_id
                                }
                                labelPosition="top"
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`peralatans.${actualIndex}.cities_id`}>
                            {({ field, form }) => {
                              const selectedProvince = provincesOptions.find(
                                (province) =>
                                  province.value ===
                                  values.peralatans[actualIndex]?.provincies_id
                              );
                              const cities = selectedProvince
                                ? selectedProvince.cities
                                : [];
                              const transformedCities = cities.map((city) => ({
                                value: city.cities_id,
                                label: city.cities_name,
                              }));

                              const selectedCity =
                                values.peralatans[actualIndex]?.cities_id === ""
                                  ? null
                                  : transformedCities.find(
                                      (city) =>
                                        city.value ===
                                        values.peralatans[actualIndex]
                                          ?.cities_id
                                    );

                              return (
                                <Dropdown
                                  options={transformedCities}
                                  value={selectedCity}
                                  onSelect={(val) =>
                                    setFieldValue(
                                      `peralatans.${actualIndex}.cities_id`,
                                      val.value
                                    )
                                  }
                                  placeholder="Pilih Kota"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.peralatans?.[actualIndex]
                                      ?.cities_id
                                  }
                                />
                              );
                            }}
                          </Field>
                        </td>

                        <td className="px-3 py-6">
                          <button
                            onClick={() => remove(actualIndex)}
                            className="text-red-500">
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalData={values.peralatans.length}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

const TenagaKerjaForm = ({ values, setFieldValue, hide, provincesOptions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { setSelectedValue } = useStore();

  const paginatedTenagaKerjas = values.tenagaKerjas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className={`${
        hide ? "hidden" : ""
      } rounded-[16px] border border-gray-200 overflow-hidden`}>
      <FieldArray name="tenagaKerjas">
        {({ push, remove }) => (
          <div>
            <div className="flex flex-row justify-between items-center">
              <div className="mt-6">
                <Tabs
                  items={["Material", "Peralatan", "Tenaga Kerja"]}
                  onChange={(index) => setSelectedValue(index)}
                  selectedValue={2}
                />
              </div>
              <div className="flex flex-row justify-between items-center space-x-4">
                <SearchBox
                  placeholder="Cari Tenaga Kerja..."
                  onSearch={() => {}}
                  withFilter={true}
                />
                <Button
                  variant="solid_blue"
                  size="Medium"
                  onClick={() => setIsModalOpen(true)}>
                  Tambah Data
                </Button>
              </div>
              {isModalOpen && (
                <AddRowModal
                  handleClose={() => setIsModalOpen(false)}
                  handleAddRow={(rowsToAdd) => {
                    for (let i = 0; i < rowsToAdd; i++) {
                      push();
                    }
                  }}
                  currentIndex={2}
                />
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full min-w-max">
                <thead>
                  <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                    <th className="px-3 py-6 text-base font-normal">
                      Jenis Tenaga Kerja
                    </th>
                    <th className="px-3 py-6 text-base font-normal">Satuan</th>
                    <th className="px-3 py-6 text-base font-normal">
                      Jumlah Kebutuhan
                    </th>
                    <th className="px-3 py-6 text-base font-normal">
                      Kodefikasi
                    </th>
                    <th className="px-3 py-6 text-base font-normal">
                      Provinsi
                    </th>
                    <th className="px-3 py-6 text-base font-normal">Kota</th>
                    <th className="px-3 py-6 text-base font-normal">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-surface-light-background">
                  {paginatedTenagaKerjas.map((_, index) => {
                    const actualIndex =
                      (currentPage - 1) * itemsPerPage + index;
                    return (
                      <tr key={actualIndex} className="border-b">
                        <td className="px-3 py-6">
                          <Field
                            name={`tenagaKerjas.${actualIndex}.jenis_tenaga_kerja`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `tenagaKerjas.${actualIndex}.jenis_tenaga_kerja`,
                                    e.target.value
                                  )
                                }
                                placeholder="Jenis Tenaga Kerja"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.tenagaKerjas?.[actualIndex]
                                    ?.jenis_tenaga_kerja
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`tenagaKerjas.${actualIndex}.satuan`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `tenagaKerjas.${actualIndex}.satuan`,
                                    e.target.value
                                  )
                                }
                                placeholder="Satuan"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.tenagaKerjas?.[actualIndex]
                                    ?.satuan
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field
                            name={`tenagaKerjas.${actualIndex}.jumlah_kebutuhan`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `tenagaKerjas.${actualIndex}.jumlah_kebutuhan`,
                                    e.target.value
                                  )
                                }
                                placeholder="Jumlah Kebutuhan"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.tenagaKerjas?.[actualIndex]
                                    ?.jumlah_kebutuhan
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field
                            name={`tenagaKerjas.${actualIndex}.kodefikasi`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `tenagaKerjas.${actualIndex}.kodefikasi`,
                                    e.target.value
                                  )
                                }
                                placeholder="Kodefikasi"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.tenagaKerjas?.[actualIndex]
                                    ?.kodefikasi
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field
                            name={`tenagaKerjas.${actualIndex}.provincies_id`}>
                            {({ field, form }) => (
                              <Dropdown
                                options={provincesOptions}
                                value={() => {
                                  const selectedProvince =
                                    provincesOptions.find(
                                      (province) =>
                                        province.value === field.value
                                    );
                                  return selectedProvince;
                                }}
                                onSelect={(val) => {
                                  setFieldValue(
                                    `tenagaKerjas.${actualIndex}.provincies_id`,
                                    val.value
                                  );
                                  setFieldValue(
                                    `tenagaKerjas.${actualIndex}.cities_id`,
                                    ""
                                  );
                                }}
                                placeholder="Pilih Provinsi"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.tenagaKerjas?.[actualIndex]
                                    ?.provincies_id
                                }
                                labelPosition="top"
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`tenagaKerjas.${actualIndex}.cities_id`}>
                            {({ field, form }) => {
                              const selectedProvince = provincesOptions.find(
                                (province) =>
                                  province.value ===
                                  values.tenagaKerjas[actualIndex]
                                    ?.provincies_id
                              );
                              const cities = selectedProvince
                                ? selectedProvince.cities
                                : [];
                              const transformedCities = cities.map((city) => ({
                                value: city.cities_id,
                                label: city.cities_name,
                              }));

                              const selectedCity =
                                values.tenagaKerjas[actualIndex]?.cities_id ===
                                ""
                                  ? null
                                  : transformedCities.find(
                                      (city) =>
                                        city.value ===
                                        values.tenagaKerjas[actualIndex]
                                          ?.cities_id
                                    );

                              return (
                                <Dropdown
                                  options={transformedCities}
                                  value={selectedCity}
                                  onSelect={(val) =>
                                    setFieldValue(
                                      `tenagaKerjas.${actualIndex}.cities_id`,
                                      val.value
                                    )
                                  }
                                  placeholder="Pilih Kota"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.tenagaKerjas?.[actualIndex]
                                      ?.cities_id
                                  }
                                  labelPosition="top"
                                />
                              );
                            }}
                          </Field>
                        </td>
                        <td className="px-3 py-6 text-center">
                          <button
                            onClick={() => remove(actualIndex)}
                            className="text-red-500 hover:text-red-700">
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalData={values.tenagaKerjas.length}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

const Tabs = ({ index, items, onChange, selectedValue, button }) => {
  const handleClick = (tabIndex) => {
    onChange(tabIndex);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="inline-flex space-x-2 bg-custom-neutral-100 rounded-[16px] p-2 h-[60px]">
          {items.map((item, tabIndex) => (
            <button
              key={tabIndex}
              onClick={() => handleClick(tabIndex)}
              className={`px-4 py-3 text-Small rounded-[12px] transition-all duration-300 cursor-pointer whitespace-nowrap ${
                selectedValue === tabIndex
                  ? "bg-custom-blue-500 text-emphasis-on_color-high"
                  : "text-emphasis-on_surface-medium hover:bg-surface-light-overlay"
              }`}>
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          {button && (
            <button
              className={`${
                button.variant === "solid_blue"
                  ? "bg-custom-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded-lg`}
              onClick={
                button.onClick || (() => console.log("Button clicked!"))
              }>
              {button.label || "Button"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
