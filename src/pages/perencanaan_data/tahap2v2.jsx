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

export default function Tahap2V2() {
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

  const tabs = [
    { label: "Material", index: 0 },
    { label: "Peralatan", index: 1 },
    { label: "Tenaga Kerja", index: 2 },
  ];

  const fetchIdentifikasiKebutuhan = async (id) => {
    console.log("Isi balaiOptions:", id);
    try {
      const response = await axios.get(
        `https://api-ecatalogue-staging.online/api/perencanaan-data/get-identifikasi-kebutuhan/${id}`
      );
      const result = response.data.data.material;
      console.log("Material from API", result);
      setInitialValues({ materials: result });
      // setInitialValues((prev) => {
      //   console.log('prev', prev);
      // })
      // setInitialValues((prev) => ({
      //   ...prev,
      //   materials: result.map((material) => ({
      //     nama_material: material.nama_material,
      //     satuan: material.satuan,
      //     spesifikasi: material.spesifikasi,
      //     ukuran: material.ukuran,
      //     kodefikasi: material.kodefikasi,
      //     kelompok_material: material.kelompok_material,
      //     jumlah_kebutuhan: material.jumlah_kebutuhan,
      //     merk: material.merk,
      //     provincies_id: material.provincies_id,
      //     cities_id: material.cities_id,
      //   })),
      // }));
    } catch (error) {
      console.error("Gagal memuat data Informasi Umum:", error);
    }
  };

  console.log("initialValues", initialValues);

  const items = ["Material", "Peralatan", "Tenaga Kerja"];

  const handleSubmit = (values) => {
    console.log(values);
  };

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
      </div>
      <div className="mt-6">
        {/* <Tabs tabs={tabs} /> */}
        <Tabs
          items={items}
          onChange={(index) => setSelectedValue(index)}
          selectedValue={selectedValue}
        />
      </div>
      {/* <Tabs
        items={items}
        onChange={(index) => setSelectedValue(index)}
        selectedValue={selectedValue}
      /> */}

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
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalData={MaterialForm.length}
              onPageChange={setCurrentPage}
            />
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
                // onClick={onsubmit}
              >
                Simpan & Lanjut
              </Button>
            </div>
          </Form>
        )}
      </Formik>
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
  console.log("MaterialForm", values);
  console.log("provincesOptions", provincesOptions);
  return (
    <div
      className={`${
        hide ? "hidden" : ""
      } rounded-[16px] border border-gray-200 overflow-hidden`}>
      <FieldArray name="materials">
        {({ push, remove }) => (
          <div>
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
                    <th className="px-3 py-6 text-base font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-surface-light-background">
                  {values.materials.map((_, index) => (
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
                              // label="Kelompok Material"
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
                      {/* <td className="px-3 py-6">
                        <Field
                          as="select"
                          name={`materials.${index}.provincies_id`}
                          className="select-field">
                          <option value="">Pilih Provinsi</option>
                          {provincesOptions.map((province) => (
                            <option
                              key={province.id_province}
                              value={province.id_province}>
                              {province.province_name}
                            </option>
                          ))}
                        </Field>
                      </td> */}
                      <td className="px-3 py-6">
                        <Field name={`materials.${index}.provinsi`}>
                          {({ field, form }) => (
                            <Dropdown
                              options={provincesOptions}
                              value={() => {
                                const selectedProvince = provincesOptions.find(
                                  (province) =>
                                    province.value ===
                                    values.materials[index]?.provincies_id
                                );
                                return selectedProvince;
                              }}
                              onSelect={(val) =>
                                setFieldValue(`materials.${index}`, val)
                              }
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
                      {/* <td className="px-3 py-6">
                        <Field name={`materials.${index}.kota`}>
                          {({ field, form }) => (
                            <Dropdown
                              options={citiesOptions}
                              value={() => {
                                const selectedProvince = citiesOptions.find(
                                  (province) =>
                                    province.value ===
                                    values.materials[index]?.cities_id
                                );
                                return selectedProvince;
                              }}
                              onSelect={(val) =>
                                setFieldValue(`materials.${index}`, val)
                              }
                              placeholder="Pilih Kota"
                              isRequired={true}
                              errorMessage={
                                form.errors?.materials?.[index]?.cities
                              }
                              labelPosition="top"
                            />
                          )}
                        </Field>
                      </td> */}
                      <td className="px-3 py-6">
                        <Field
                          as="select"
                          name={`materials.${index}.cities_id`}
                          className="select-field">
                          <option value="">Pilih Kota</option>
                          {provincesOptions
                            .filter(
                              (province) =>
                                province.id_province ===
                                values.materials[index]?.provincies_id
                            )
                            .map((province) =>
                              province.cities.map((city) => (
                                <option
                                  key={city.cities_id}
                                  value={city.cities_id}>
                                  {city.cities_name}
                                </option>
                              ))
                            )}
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
              Add Material
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

const PeralatanForm = ({ values, setFieldValue, hide, provincesOptions }) => {
  return (
    <div className={`${hide ? "hidden" : ""}`}>
      <h1>Peralatan</h1>
      <FieldArray name="peralatans">
        {({ push, remove }) => (
          <div>
            {values.peralatans.map((_, index) => (
              <div key={index}>
                <Field
                  name={`peralatans.${index}.nama_peralatan`}
                  placeholder="Nama Peralatan"
                />
                <Field
                  name={`peralatans.${index}.satuan`}
                  placeholder="Satuan"
                />
                <Field
                  name={`peralatans.${index}.spesifikasi`}
                  placeholder="Spesifikasi"
                />
                <Field
                  name={`peralatans.${index}.kapasitas`}
                  placeholder="Kapasitas"
                />
                <Field
                  name={`peralatans.${index}.kodefikasi`}
                  placeholder="Kodefikasi"
                />
                <Field
                  as="select"
                  name={`materials.${index}.kelompok_peralatan`}
                  placeholder="Kelompok Perlatan">
                  <option value="">Pilih Kelompok Peralatan</option>
                  <option value="Mekanis">Mekanis</option>
                  <option value="Semi Mekanis">Semi Mekanis</option>
                </Field>
                <Field
                  name={`peralatans.${index}.jumlah_kebutuhan`}
                  placeholder="Jumlah Kebutuhan"
                />
                <Field name={`peralatans.${index}.merk`} placeholder="Merk" />
                <Field as="select" name={`peralatans.${index}.provincies_id`}>
                  <option value="">Pilih Provinsi</option>
                  {provincesOptions.map((province) => (
                    <option
                      key={province.id_province}
                      value={province.id_province}>
                      {province.province_name}
                    </option>
                  ))}
                </Field>
                <Field as="select" name={`peralatans.${index}.cities_id`}>
                  <option value="">Pilih Kota</option>
                  {/* after province set it should only filter the cities based on the selected province */}
                  {provincesOptions.map(
                    (province) =>
                      province.id_province ===
                        (values.peralatans[index]?.provincies_id ?? 0) &&
                      province.cities.map((city) => (
                        <option key={city.cities_id} value={city.cities_id}>
                          {city.cities_name}
                        </option>
                      ))
                  )}
                </Field>
                <button onClick={() => remove(index)} className="text-black">
                  Remove
                </button>
              </div>
            ))}
            <button onClick={() => push()} className="text-black">
              Add
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

const TenagaKerjaForm = ({ values, setFieldValue, hide, provincesOptions }) => {
  return (
    <div className={`${hide ? "hidden" : ""}`}>
      <h1>Tenaga Kerja</h1>
      <FieldArray name="tenagaKerjas">
        {({ push, remove }) => (
          <div>
            {values.tenagaKerjas.map((_, index) => (
              <div key={index}>
                <Field
                  name={`tenagaKerjas.${index}.jenis_tenaga_kerja`}
                  placeholder="Jenis Tenaga Kerja"
                />
                <Field
                  name={`tenagaKerjas.${index}.satuan`}
                  placeholder="Satuan"
                />
                <Field
                  name={`tenagaKerjas.${index}.jumlah_kebutuhan`}
                  placeholder="Jumlah Kebutuhan"
                />
                <Field
                  name={`tenagaKerjas.${index}.kodefikasi`}
                  placeholder="Kodefikasi"
                />
                <Field as="select" name={`tenagaKerjas.${index}.provincies_id`}>
                  <option value="">Pilih Provinsi</option>
                  {provincesOptions.map((province) => (
                    <option
                      key={province.id_province}
                      value={province.id_province}>
                      {province.province_name}
                    </option>
                  ))}
                </Field>
                <Field as="select" name={`tenagaKerjas.${index}.cities_id`}>
                  <option value="">Pilih Kota</option>
                  {/* after province set it should only filter the cities based on the selected province */}
                  {provincesOptions.map(
                    (province) =>
                      province.id_province ===
                        (values.tenagaKerjas[index]?.provincies_id ?? 0) &&
                      province.cities.map((city) => (
                        <option key={city.cities_id} value={city.cities_id}>
                          {city.cities_name}
                        </option>
                      ))
                  )}
                </Field>
                <button onClick={() => remove(index)} className="text-black">
                  Remove
                </button>
              </div>
            ))}
            <button onClick={() => push()} className="text-black">
              Add
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};
// const tabs = [
//   {
//     label: "Material",
//     content: <MaterialForm />, // Properly render the MaterialForm component
//   },
//   {
//     label: "Peralatan",
//     content: (
//       // Isi konten tab Peralatan
//     ),
//   },
//   {
//     label: "Tenaga Kerja",
//     content: (
//       // Isi konten tab Tenaga Kerja
//     ),
//   },
// ];

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
