import React, { useState } from "react";
import Navbar from "../../components/navigationbar";
import TextInput from "../../components/input";
import FileInput from "../../components/FileInput"; // Import komponen FileInput

const Inputvendor = () => {
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

  // State tambahan untuk file upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState("default");
  const [progress, setProgress] = useState(0);

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
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setUploadState("processing");

      // Simulasi upload dengan progres
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

  return (
    <div className="p-8">
      <Navbar />
      <div className="p-6">
        <h3 className="text-H3 text-emphasis-on_surface-high">
          Input Data Vendor
        </h3>
        
        {/* Wrapper utama dengan flex-grow untuk fill layout */}
        <div className="flex flex-wrap gap-4 mt-3">
          {/* Setiap div akan menggunakan lebar penuh secara fleksibel */}
          <div className="flex-grow grid grid-cols-1 gap-4 py-8 px-6 rounded-[16px] bg-custom-neutral-100">
            <TextInput
              label="Nama Vendor/Perusahaan"
              placeholder="Masukkan nama vendor/perusahaan"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Vendor/Perusahaan tidak boleh kosong."
              name="vendorName"
              value={formValues.vendorName}
              onChange={handleChange}
            />
            <TextInput
              label="Kategori Vendor/Perusahaan"
              placeholder="Masukkan kategori vendor/perusahaan"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Kategori Vendor/Perusahaan tidak boleh kosong."
              name="category"
              value={formValues.category}
              onChange={handleChange}
            />
            <TextInput
              label="Sumber daya yang disediakan"
              placeholder="Masukkan sumber daya, contoh: Scaffolding, excavator, semen"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Sumber daya tidak boleh kosong."
              name="resources"
              value={formValues.resources}
              onChange={handleChange}
            />
            <TextInput
              label="Alamat vendor atau perusahaan"
              placeholder="Masukkan alamat"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Alamat tidak boleh kosong."
              name="address"
              value={formValues.address}
              onChange={handleChange}
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
                value={formValues.phone}
                onChange={handleChange}
                className="flex-1"
              />
              <TextInput
                label="Nomor HP"
                placeholder="Masukkan nomor HP"
                type="text"
                state="border"
                isRequired={true}
                errorMessage="Nomor HP tidak boleh kosong."
                name="mobile"
                value={formValues.mobile}
                onChange={handleChange}
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
              name="picName"
              value={formValues.picName}
              onChange={handleChange}
            />
            <div className="flex gap-8">
              <TextInput
                label="Provinsi"
                placeholder="Masukkan provinsi"
                type="text"
                state="border"
                isRequired={true}
                errorMessage="Provinsi tidak boleh kosong."
                name="province"
                value={formValues.province}
                onChange={handleChange}
              />
              <TextInput
                label="Kabupaten/Kota"
                placeholder="Masukkan kabupaten/kota"
                type="text"
                state="border"
                isRequired={true}
                errorMessage="Kabupaten/Kota tidak boleh kosong."
                name="city"
                value={formValues.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex-grow grid grid-cols-1 gap-4 py-8 px-6 rounded-[16px] bg-custom-neutral-100">
            <TextInput
              label="Nomor Telepon"
              placeholder="Masukkan nomor telepon"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Nomor telepon tidak boleh kosong."
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
            />
            <TextInput
              label="Nomor HP"
              placeholder="Masukkan nomor HP"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Nomor HP tidak boleh kosong."
              name="mobile"
              value={formValues.mobile}
              onChange={handleChange}
            />
            <TextInput
              label="Nama PIC"
              placeholder="Masukkan nama PIC"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Nama PIC tidak boleh kosong."
              name="picName"
              value={formValues.picName}
              onChange={handleChange}
            />
            <TextInput
              label="Provinsi"
              placeholder="Masukkan provinsi"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Provinsi tidak boleh kosong."
              name="province"
              value={formValues.province}
              onChange={handleChange}
            />
            <TextInput
              label="Kabupaten/Kota"
              placeholder="Masukkan kabupaten/kota"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Kabupaten/Kota tidak boleh kosong."
              name="city"
              value={formValues.city}
              onChange={handleChange}
            />
            <FileInput
              onFileSelect={handleFileSelect}
              buttonText="Pilih File"
              selectedFile={selectedFile}
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
              selectedFile={selectedFile}
              progress={progress}
              state={uploadState}
              onCancel={handleCancel}
              multiple={false}
              accept=".jpg, .png"
              Label="Dokumen pendukung"
              HelperText="Format .JPG, .PNG dan maksimal 512Kb"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inputvendor;