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
      const result = response.data.data.material;
      console.log("Material from API", result);
      setInitialValues({ materials: result });
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
      {isModalOpen && (
        <AddRowModal
          handleClose={() => setIsModalOpen(false)}
          handleAddRow={(currentIndex, rowsToAdd) =>
            console.log("Add row", currentIndex, rowsToAdd)
          }
          currentIndex={selectedValue}
        />
      )}
      <div className="space-y-4">
        <div className="flex flex-row justify-between items-center">
          <div className="mt-6">
            <Tabs
              items={items}
              onChange={(index) => setSelectedValue(index)}
              selectedValue={selectedValue}
            />
          </div>
          <div className="flex flex-row justify-between items-center space-x-4">
            {renderSearchBox(selectedValue)}
            <Button
              variant="solid_blue"
              size="Medium"
              onClick={() => setIsModalOpen(true)}>
              Tambah Data
            </Button>
          </div>
        </div>
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

  console.log("current page", currentPage);

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

  console.log("paginatedMaterials", paginatedMaterials);

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
                  onChange={(index) => {}}
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
                    return (
                      <tr key={index} className="border-b">
                        <td className="px-3 py-6">
                          <Field name={`materials.${index}.nama_material`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${index}.nama_material`,
                                    e.target.value
                                  )
                                }
                                placeholder="Nama Material"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[index]?.material
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${index}.satuan`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${index}.satuan`,
                                    e.target.value
                                  )
                                }
                                placeholder="Satuan"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[index]?.satuan
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${index}.spesifikasi`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${index}.spesifikasi`,
                                    e.target.value
                                  )
                                }
                                placeholder="Spesifikasi"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[index]?.spesifikasi
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${index}.ukuran`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${index}.ukuran`,
                                    e.target.value
                                  )
                                }
                                placeholder="Ukuran"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[index]?.ukuran
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${index}.kodefikasi`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${index}.kodefikasi`,
                                    e.target.value
                                  )
                                }
                                placeholder="Kodefikasi"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[index]?.kodefikasi
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${index}.kelompok_material`}>
                            {({ field, form }) => (
                              <Dropdown
                                options={kelompokMaterialOptions}
                                value={kelompokMaterialOptions.find(
                                  (el) => el.value === field.value
                                )}
                                onSelect={(val) =>
                                  setFieldValue(
                                    `materials.${index}.kelompok_material`,
                                    val
                                  )
                                }
                                placeholder="Pilih Kelompok Material"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[index]
                                    ?.kelompok_material
                                }
                                labelPosition="top"
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${index}.jumlah_kebutuhan`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${index}.jumlah_kebutuhan`,
                                    e.target.value
                                  )
                                }
                                placeholder="Jumlah Kebutuhan"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[index]
                                    ?.jumlah_kebutuhan
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${index}.merk`}>
                            {({ field, form }) => (
                              <TextInput
                                value={field.value}
                                onChange={(e) =>
                                  form.setFieldValue(
                                    `materials.${index}.merk`,
                                    e.target.value
                                  )
                                }
                                placeholder="Merk"
                                className="input-field"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[index]?.merk
                                }
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${index}.provinsi`}>
                            {({ field, form }) => (
                              <Dropdown
                                options={provincesOptions}
                                value={() => {
                                  const selectedProvince =
                                    provincesOptions.find(
                                      (province) =>
                                        province.value ===
                                        values.materials[index]?.provincies_id
                                    );
                                  return selectedProvince;
                                }}
                                onSelect={(val) => {
                                  setFieldValue(
                                    `materials.${index}.provincies_id`,
                                    val.value
                                  );
                                  setFieldValue(
                                    `materials.${index}.cities_id`,
                                    ""
                                  ); // Reset cities_id
                                }}
                                placeholder="Pilih Provinsi"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.materials?.[index]?.province
                                }
                                labelPosition="top"
                              />
                            )}
                          </Field>
                        </td>
                        <td className="px-3 py-6">
                          <Field name={`materials.${index}.kota`}>
                            {({ field, form }) => {
                              const selectedProvince = provincesOptions.find(
                                (province) =>
                                  province.value ===
                                  values.materials[index]?.provincies_id
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
                                      values.materials[index]?.cities_id
                                  )}
                                  onSelect={(val) =>
                                    setFieldValue(
                                      `materials.${index}.cities_id`,
                                      val.value
                                    )
                                  }
                                  placeholder="Pilih Kota"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.materials?.[index]?.cities_id
                                  }
                                  labelPosition="top"
                                />
                              );
                            }}
                          </Field>
                        </td>
                        <td className="px-3 py-6 text-center">
                          <button
                            onClick={() => remove(index)}
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
  return (
    <div
      className={`${
        hide ? "hidden" : ""
      } rounded-[16px] border border-gray-200 overflow-hidden`}>
      <FieldArray name="peralatans">
        {({ push, remove }) => (
          <div>
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
                  {values.peralatans.map((_, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-3 py-6">
                        <Field name={`peralatans.${index}.nama_peralatan`}>
                          {({ field, form }) => (
                            <TextInput
                              value={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  `peralatans.${index}.nama_peralatan`,
                                  e.target.value
                                )
                              }
                              placeholder="Nama Peralatan"
                              className="input-field"
                              isRequired={true}
                              errorMessage={
                                form.errors?.peralatans?.[index]?.nama_peralatan
                              }
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`peralatans.${index}.satuan`}>
                          {({ field, form }) => (
                            <TextInput
                              value={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  `peralatans.${index}.satuan`,
                                  e.target.value
                                )
                              }
                              placeholder="Satuan"
                              className="input-field"
                              isRequired={true}
                              errorMessage={
                                form.errors?.peralatans?.[index]?.satuan
                              }
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`peralatans.${index}.spesifikasi`}>
                          {({ field, form }) => (
                            <TextInput
                              value={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  `peralatans.${index}.spesifikasi`,
                                  e.target.value
                                )
                              }
                              placeholder="Spesifikasi"
                              className="input-field"
                              isRequired={true}
                              errorMessage={
                                form.errors?.peralatans?.[index]?.spesifikasi
                              }
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`peralatans.${index}.kapasitas`}>
                          {({ field, form }) => (
                            <TextInput
                              value={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  `peralatans.${index}.kapasitas`,
                                  e.target.value
                                )
                              }
                              placeholder="Kapasitas"
                              className="input-field"
                              isRequired={true}
                              errorMessage={
                                form.errors?.peralatans?.[index]?.kapasitas
                              }
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`peralatans.${index}.kodefikasi`}>
                          {({ field, form }) => (
                            <TextInput
                              value={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  `peralatans.${index}.kodefikasi`,
                                  e.target.value
                                )
                              }
                              placeholder="Kodefikasi"
                              className="input-field"
                              isRequired={true}
                              errorMessage={
                                form.errors?.peralatans?.[index]?.kodefikasi
                              }
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`peralatans.${index}.kelompok_peralatan`}>
                          {({ field, form }) => (
                            <Dropdown
                              options={[
                                { label: "Mekanis", value: "Mekanis" },
                                {
                                  label: "Semi Mekanis",
                                  value: "Semi Mekanis",
                                },
                              ]}
                              value={field.value}
                              onSelect={(val) =>
                                setFieldValue(
                                  `peralatans.${index}.kelompok_peralatan`,
                                  val
                                )
                              }
                              placeholder="Pilih Kelompok Peralatan"
                              isRequired={true}
                              errorMessage={
                                form.errors?.peralatans?.[index]
                                  ?.kelompok_peralatan
                              }
                              labelPosition="top"
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`peralatans.${index}.jumlah_kebutuhan`}>
                          {({ field, form }) => (
                            <TextInput
                              value={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  `peralatans.${index}.jumlah_kebutuhan`,
                                  e.target.value
                                )
                              }
                              placeholder="Jumlah Kebutuhan"
                              className="input-field"
                              isRequired={true}
                              errorMessage={
                                form.errors?.peralatans?.[index]
                                  ?.jumlah_kebutuhan
                              }
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`peralatans.${index}.merk`}>
                          {({ field, form }) => (
                            <TextInput
                              value={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  `peralatans.${index}.merk`,
                                  e.target.value
                                )
                              }
                              placeholder="Merk"
                              className="input-field"
                              isRequired={true}
                              errorMessage={
                                form.errors?.peralatans?.[index]?.merk
                              }
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`peralatans.${index}.provincies_id`}>
                          {({ field, form }) => (
                            <Dropdown
                              options={provincesOptions}
                              value={() => {
                                const selectedProvince = provincesOptions.find(
                                  (province) => province.value === field.value
                                );
                                return selectedProvince;
                              }}
                              onSelect={(val) => {
                                setFieldValue(
                                  `peralatans.${index}.provincies_id`,
                                  val.value
                                );
                                setFieldValue(
                                  `peralatans.${index}.cities_id`,
                                  ""
                                );
                              }}
                              placeholder="Pilih Provinsi"
                              isRequired={true}
                              errorMessage={
                                form.errors?.peralatans?.[index]?.provincies_id
                              }
                              labelPosition="top"
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`peralatans.${index}.cities_id`}>
                          {({ field, form }) => {
                            const selectedProvince = provincesOptions.find(
                              (province) =>
                                province.value ===
                                values.peralatans[index]?.provincies_id
                            );
                            const cities = selectedProvince
                              ? selectedProvince.cities
                              : [];
                            const transformedCities = cities.map((city) => ({
                              value: city.cities_id,
                              label: city.cities_name,
                            }));

                            const selectedCity =
                              values.peralatans[index]?.cities_id === ""
                                ? null
                                : transformedCities.find(
                                    (city) =>
                                      city.value ===
                                      values.peralatans[index]?.cities_id
                                  );

                            return (
                              <Dropdown
                                options={transformedCities}
                                value={selectedCity}
                                onSelect={(val) =>
                                  setFieldValue(
                                    `peralatans.${index}.cities_id`,
                                    val.value
                                  )
                                }
                                placeholder="Pilih Kota"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.peralatans?.[index]?.cities_id
                                }
                              />
                            );
                          }}
                        </Field>
                      </td>

                      <td className="px-3 py-6">
                        <button
                          onClick={() => remove(index)}
                          className="text-red-500">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => push()}
              className="text-blue-500 font-medium mt-4">
              Add New
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

const TenagaKerjaForm = ({ values, setFieldValue, hide, provincesOptions }) => {
  return (
    <div
      className={`${
        hide ? "hidden" : ""
      } rounded-[16px] border border-gray-200 overflow-hidden`}>
      <FieldArray name="tenagaKerjas">
        {({ push, remove }) => (
          <div>
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
                  {values.tenagaKerjas.map((_, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-3 py-6">
                        <Field
                          name={`tenagaKerjas.${index}.jenis_tenaga_kerja`}>
                          {({ field, form }) => (
                            <TextInput
                              value={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  `tenagaKerjas.${index}.jenis_tenaga_kerja`,
                                  e.target.value
                                )
                              }
                              placeholder="Jenis Tenaga Kerja"
                              className="input-field"
                              isRequired={true}
                              errorMessage={
                                form.errors?.tenagaKerjas?.[index]
                                  ?.jenis_tenaga_kerja
                              }
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`tenagaKerjas.${index}.satuan`}>
                          {({ field, form }) => (
                            <TextInput
                              value={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  `tenagaKerjas.${index}.satuan`,
                                  e.target.value
                                )
                              }
                              placeholder="Satuan"
                              className="input-field"
                              isRequired={true}
                              errorMessage={
                                form.errors?.tenagaKerjas?.[index]?.satuan
                              }
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`tenagaKerjas.${index}.jumlah_kebutuhan`}>
                          {({ field, form }) => (
                            <TextInput
                              value={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  `tenagaKerjas.${index}.jumlah_kebutuhan`,
                                  e.target.value
                                )
                              }
                              placeholder="Jumlah Kebutuhan"
                              className="input-field"
                              isRequired={true}
                              errorMessage={
                                form.errors?.tenagaKerjas?.[index]
                                  ?.jumlah_kebutuhan
                              }
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`tenagaKerjas.${index}.kodefikasi`}>
                          {({ field, form }) => (
                            <TextInput
                              value={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  `tenagaKerjas.${index}.kodefikasi`,
                                  e.target.value
                                )
                              }
                              placeholder="Kodefikasi"
                              className="input-field"
                              isRequired={true}
                              errorMessage={
                                form.errors?.tenagaKerjas?.[index]?.kodefikasi
                              }
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`tenagaKerjas.${index}.provincies_id`}>
                          {({ field, form }) => (
                            <Dropdown
                              options={provincesOptions}
                              value={() => {
                                const selectedProvince = provincesOptions.find(
                                  (province) => province.value === field.value
                                );
                                return selectedProvince;
                              }}
                              onSelect={(val) => {
                                setFieldValue(
                                  `tenagaKerjas.${index}.provincies_id`,
                                  val.value
                                );
                                setFieldValue(
                                  `tenagaKerjas.${index}.cities_id`,
                                  ""
                                );
                              }}
                              placeholder="Pilih Provinsi"
                              isRequired={true}
                              errorMessage={
                                form.errors?.tenagaKerjas?.[index]
                                  ?.provincies_id
                              }
                              labelPosition="top"
                            />
                          )}
                        </Field>
                      </td>
                      <td className="px-3 py-6">
                        <Field name={`tenagaKerjas.${index}.cities_id`}>
                          {({ field, form }) => {
                            const selectedProvince = provincesOptions.find(
                              (province) =>
                                province.value ===
                                values.tenagaKerjas[index]?.provincies_id
                            );
                            const cities = selectedProvince
                              ? selectedProvince.cities
                              : [];
                            const transformedCities = cities.map((city) => ({
                              value: city.cities_id,
                              label: city.cities_name,
                            }));

                            const selectedCity =
                              values.tenagaKerjas[index]?.cities_id === ""
                                ? null
                                : transformedCities.find(
                                    (city) =>
                                      city.value ===
                                      values.tenagaKerjas[index]?.cities_id
                                  );

                            return (
                              <Dropdown
                                options={transformedCities}
                                value={selectedCity}
                                onSelect={(val) =>
                                  setFieldValue(
                                    `tenagaKerjas.${index}.cities_id`,
                                    val.value
                                  )
                                }
                                placeholder="Pilih Kota"
                                isRequired={true}
                                errorMessage={
                                  form.errors?.tenagaKerjas?.[index]?.cities_id
                                }
                                labelPosition="top"
                              />
                            );
                          }}
                        </Field>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <button
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-700">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => push()}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Add Tenaga Kerja
            </button>
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
