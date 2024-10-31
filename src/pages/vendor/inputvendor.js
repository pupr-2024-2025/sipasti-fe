import React, { useState } from "react";
import Navbar from "../../components/Navigationbar";
import TextInput from "../../components/input";
import FileInput from "../../components/FileInput";
import Checkbox from "../../components/checkbox";
import Button from "../../components/button";
import Dropdown from "../../components/Dropdown";

const InputVendor = ({ onNext, onBack }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [nama_vendor, setnama_vendor] = useState("");
  const [jenis_vendor_id, setjenis_vendor_id] = useState("");
  const [kategori_vendor_id, setkategori_vendor_id] = useState("");
  const [alamat, setalamat] = useState("");
  const [no_telepon, setno_telepon] = useState("");
  const [no_hp, setno_hp] = useState("");
  const [nama_pic, setnama_pic] = useState("");
  const [provinsi_id, setprovinsi_id] = useState("");
  const [kota_id, setkota_id] = useState("");
  const [koordinat, setkoordinat] = useState("");
  const [logo_url, setlogo_url] = useState("");
  const [dok_pendukung_url, setdok_pendukung_url] = useState("");

  const handleCheckboxChange = (type) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type];

      console.log(updatedTypes);
      return updatedTypes;
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState("default");
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (files) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setUploadState("processing");

      const uploadInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(uploadInterval);
            setUploadState("done");
            return 100;
          }
          return prevProgress + 10;
        });
      }, 500);
    }
  };

  const handleCancel = () => {
    setUploadState("default");
    setSelectedFile(null);
    setProgress(0);
  };

  const getOptions = () => {
    if (selectedTypes.length === 0) return [];
    const options = {
      1: [
        { value: "1-1", label: "Pedagang Grosir" },
        { value: "1-2", label: "Distributor" },
        { value: "1-3", label: "Produsen" },
        { value: "1-4", label: "Pedagang Campuran" },
      ],
      2: [
        { value: "2-1", label: "Produsen" },
        { value: "2-2", label: "Jasa Penyewaan Alat Berat" },
        { value: "2-3", label: "Kontraktor" },
        { value: "2-4", label: "Agen" },
      ],
      3: [
        { value: "3-1", label: "Kontraktor" },
        { value: "3-2", label: "Pemerintah Daerah" },
      ],
    };
    const combinedOptionsMap = new Map();

    selectedTypes
      .flatMap((type) => options[type] || [])
      .forEach((option) => {
        if (combinedOptionsMap.has(option.label)) {
          // Gabungkan value jika label sudah ada
          const existingOption = combinedOptionsMap.get(option.label);
          existingOption.value += `,${option.value}`;
        } else {
          // Jika label belum ada, tambahkan sebagai opsi baru
          combinedOptionsMap.set(option.label, { ...option });
        }
      });

    return Array.from(combinedOptionsMap.values());
  };

  const labelToCategoriesMap = {
    Produsen: ["1-3", "2-1"],
    Kontraktor: ["2-3", "3-1"],
  };

  return (
    <div className="p-8">
      <Navbar />
      <div className="p-6">
        <h3 className="text-H3 text-emphasis-on_surface-high">
          Input Data Vendor
        </h3>

        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex-grow grid grid-cols-1 gap-4 py-8 px-6 rounded-[16px] bg-custom-neutral-100">
            <TextInput
              label="Nama Vendor/Perusahaan"
              placeholder="Masukkan nama vendor/perusahaan"
              state="border"
              isRequired={true}
              errorMessage="Vendor/Perusahaan tidak boleh kosong."
              value={nama_vendor}
              onChange={(e) => setnama_vendor(e.target.value)}
            />
            <div className="space-b-1">
              <p className="text-B2">Jenis Responden/ Vendor</p>
              <div className="flex space-x-8">
                <Checkbox
                  label="Material"
                  checked={selectedTypes.includes("1")}
                  onChange={() => handleCheckboxChange("1")}
                />
                <Checkbox
                  label="Peralatan"
                  checked={selectedTypes.includes("2")}
                  onChange={() => handleCheckboxChange("2")}
                />
                <Checkbox
                  label="Tenaga Kerja"
                  checked={selectedTypes.includes("3")}
                  onChange={() => handleCheckboxChange("3")}
                />
              </div>
            </div>

            <Dropdown
              options={getOptions()}
              label="Kategori Vendor/Perusahaan"
              placeholder="Pilih kategori vendor/perusahaan"
              value={kategori_vendor_id}
              onSelect={(selectedOption) => {
                const associatedValues = labelToCategoriesMap[
                  selectedOption.label
                ] || [selectedOption.value];

                setkategori_vendor_id(associatedValues.join(","));
              }}
              isRequired={true}
            />
            <TextInput
              label="Alamat vendor atau perusahaan"
              placeholder="Masukkan alamat"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Alamat tidak boleh kosong."
              value={alamat}
              onChange={(e) => setalamat(e.target.value)}
            />
            <div className="flex gap-8">
              <TextInput
                label="Nomor Telepon"
                placeholder="Masukkan nomor telepon"
                type="text"
                state="border"
                isRequired={true}
                errorMessage="Nomor telepon tidak boleh kosong."
                name="phone"
                value={no_telepon}
                onChange={(e) => setno_telepon(e.target.value)}
                className="flex-1"
              />
              <TextInput
                label="Nomor HP"
                placeholder="Masukkan nomor HP"
                type="text"
                state="border"
                isRequired={true}
                errorMessage="Nomor HP tidak boleh kosong."
                value={no_hp}
                onChange={(e) => setno_hp(e.target.value)}
                className="flex-1"
              />
            </div>
            <TextInput
              label="Nama PIC"
              placeholder="Masukkan nama PIC"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Nama PIC tidak boleh kosong."
              value={nama_pic}
              onChange={(e) => setnama_pic(e.target.value)}
            />
            <div className="flex gap-8">
              <TextInput
                label="Provinsi"
                placeholder="Masukkan provinsi"
                type="text"
                state="border"
                isRequired={true}
                errorMessage="Provinsi tidak boleh kosong."
                value={provinsi_id}
                onChange={(e) => setprovinsi_id(e.target.value)}
              />
              <TextInput
                label="Kabupaten/Kota"
                placeholder="Masukkan kabupaten/kota"
                type="text"
                state="border"
                isRequired={true}
                errorMessage="Kabupaten/Kota tidak boleh kosong."
                value={kota_id}
                onChange={(e) => setkota_id(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-grow grid grid-cols-1 gap-4 py-8 px-6 rounded-[16px] bg-custom-neutral-100">
            <div className="space-y-6">
              <TextInput
                label="Koordinat"
                placeholder="Masukkan Koordinat"
                type="text"
                state="border"
                value={koordinat}
                onChange={(e) => setkoordinat(e.target.value)}
              />
              <FileInput
                onFileSelect={handleFileSelect}
                buttonText="Pilih File"
                selectedFile={logo_url}
                progress={progress}
                state={uploadState}
                onCancel={handleCancel}
                multiple={false}
                accept=".jpg, .png"
                Label="Logo"
                HelperText="Format .JPG, .PNG dan maksimal 512Kb"
              />
              <FileInput
                onFileSelect={handleFileSelect}
                buttonText="Pilih File"
                selectedFile={dok_pendukung_url}
                progress={progress}
                state={uploadState}
                onCancel={handleCancel}
                multiple={false}
                accept=".jpg, .png"
                Label="Dokumen Pendukung"
                HelperText="Format .JPG, .PNG dan maksimal 512Kb"
              />
            </div>

            <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
              <Button
                label="Kembali"
                variant="secondary"
                size="md"
                onClick={onBack}
              />
              <Button
                label="Simpan & Lanjut"
                variant="primary"
                size="md"
                onClick={onNext}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
          <Button variant="outlined_yellow" size="Medium" onClick={onBack}>
            Kembali
          </Button>
          <Button
            variant="solid_blue"
            size="Medium"
            // onClick={handleSubmit}
          >
            Simpan & Lanjut
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputVendor;
