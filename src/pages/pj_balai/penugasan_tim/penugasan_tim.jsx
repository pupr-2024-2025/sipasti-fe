import { Field, FieldArray, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/navigationbar";
import Tabs from "../../../components/Tabs";
import Dropdown from "../../../components/dropdown";
import TextInput from "../../../components/input";
import Button from "../../../components/button";
import FileInput from "../../../components/FileInput";
import { Trash, Add } from "iconsax-react";
import colors from "../../../styles/colors";
import usePenugasanTimStore from "./penugasan_tim/penugasan_tim";

export default function PenugasanTim() {
  const { userOptions, fetchUserOptions } = usePenugasanTimStore();
  const [skPenugasan, setSkPenugasan] = useState(null);
  const [suratPenugasanPengawas, setSuratPenugasanPengawas] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [suratPenugasanPengawasState, setSuratPenugasanPengawasState] =
    useState("default");

  const handleCancelSuratPenugasanPengawas = () => {
    console.log("Cancelling file upload...");

    setSuratPenugasanPengawas(null);
    setSkPenugasan(null);

    setProgress(0);
    setSuratPenugasanPengawasState("default");

    setError("");
  };

  const handleSuratPenugasanPengawas = (files) => {
    if (files.length === 0) {
      setError("File wajib dipilih.");
      return;
    }

    const file = files[0];
    setSkPenugasan(file);
    setSuratPenugasanPengawasState("processing");
    setError("");
    try {
      setSkPenugasan(file);
      setSuratPenugasanPengawasState("done");
    } catch (error) {
      console.error("Error processing logo file:", error);
      setSuratPenugasanPengawasState("default");
    }
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSuratPenugasanPengawasState("done");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  useEffect(() => {
    fetchUserOptions();
  }, [fetchUserOptions]);

  const tabs = [
    {
      label: "Tim Teknis Balai",
      index: 0,
      content: (
        <div className="">
          <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
            <TextInput
              label="Nama Tim"
              labelPosition="left"
              placeholder="Masukkan Nama Tim"
              isRequired="true"
              size="Medium"
              //   value={koderupSipasti}
              errorMessage="Nama tim tidak boleh kosong"
              onChange={(e) => setKodeRUPSipasti(e.target.value)}
            />
            <div className="px-[236px]">
              <Button
                variant="solid_blue"
                size="Medium"
                //   onClick={handleCariData}
              >
                Cari Data di SIPASTI
              </Button>
            </div>
            <TextInput
              label="Ketua"
              labelPosition="left"
              placeholder="Masukkan Nama Ketua"
              size="Medium"
              isRequired="true"
              //   value={namaPaketSipasti}
              errorMessage="Nama ketua tidak boleh kosong"
              onChange={(e) => setNamaPaketSipasti(e.target.value)}
            />
            <TextInput
              label="Sekretaris"
              labelPosition="left"
              placeholder="Masukkan Nama Sekretaris"
              size="Medium"
              isRequired="true"
              //   value={namaPPKSipasti}
              errorMessage="Nama sekretaris tidak boleh kosong"
              //   onChange={(e) => setNamaPPKSipasti(e.target.value)}
            />
            <TextInput
              label="Nama Anggota"
              labelPosition="left"
              placeholder="Masukkan Nama Anggota"
              size="Medium"
              isRequired="true"
              //   value={jabatanPPKSipasti}
              errorMessage="Nama anggota tidak boleh kosong"
              //   onChange={(e) => setJabatanPPKSipasti(e.target.value)}
            />
            <FileInput
              //   onFileSelect={handleLogoFileSelect}
              //   setSelectedFile={setLogoUrl}
              buttonText="Pilih Berkas"
              multiple={false}
              accept=".pdf"
              Label="Unggah SK/Surat Penugasan"
              HelperText="Format .PDF dan maksimal 2MB"
              //   state={logoUploadState}
              //   onCancel={handleLogoCancel}
              //   selectedFile={logo_url}
              maxSizeMB={2}
            />
          </div>
          <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
            <Button variant="solid_blue" size="Medium">
              Simpan
            </Button>
          </div>
        </div>
      ),
    },
    {
      label: "Pengawas",
      index: 1,
      content: (
        <Formik
          initialValues={{
            pengawas: [""],
          }}
          onSubmit={(values) => {
            console.log("Data pengawas:", values.pengawas);
            usePenugasanTimStore.getState().savePengawasData(values.pengawas);
          }}>
          {({ values, submitForm }) => (
            <Form className="h-full flex flex-col">
              <div className="mt-3 bg-neutral-100 px-6 py-8 min-h-[596px] rounded-[16px] space-y-8">
                <FieldArray
                  name="pengawas"
                  render={(arrayHelpers) => (
                    <div className="space-y-4">
                      {values.pengawas.map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4">
                          <Field
                            as={Dropdown}
                            name={`pengawas.${index}`}
                            label={`Nama Pengawas ${index + 1}`}
                            labelPosition="left"
                            placeholder="Masukkan Pengawas"
                            isRequired={true}
                            options={userOptions}
                            size="Medium"
                            errorMessage="Nama Pengawas tidak boleh kosong"
                          />
                          <div className="flex space-x-2 items-center">
                            <div
                              className={`w-12 h-12 flex items-center justify-center rounded-full ${
                                values.pengawas.length > 1
                                  ? "bg-custom-red-100 hover:bg-custom-red-200 cursor-pointer"
                                  : "bg-custom-gray-200 cursor-not-allowed"
                              }`}
                              onClick={() => {
                                if (values.pengawas.length > 1) {
                                  arrayHelpers.remove(index);
                                }
                              }}>
                              <Trash
                                size="24"
                                color={
                                  values.pengawas.length > 1
                                    ? colors.Solid.Basic.Red[500]
                                    : colors.Emphasis.Light.On_Surface.Small
                                }
                              />
                            </div>
                            <div
                              className="w-12 h-12 flex items-center justify-center rounded-full bg-custom-blue-100 hover:bg-custom-blue-200 cursor-pointer"
                              onClick={() => arrayHelpers.push("")}>
                              <Add
                                size="24"
                                color={colors.Solid.Basic.Blue[500]}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                />
                <FileInput
                  onFileSelect={handleSuratPenugasanPengawas}
                  setSelectedFile={setSuratPenugasanPengawas}
                  buttonText="Pilih Berkas"
                  multiple={false}
                  accept=".pdf"
                  Label="Unggah SK/Surat Penugasan"
                  HelperText="Format .PDF dan maksimal 2MB"
                  state={suratPenugasanPengawasState}
                  onCancel={handleCancelSuratPenugasanPengawas}
                  selectedFile={skPenugasan}
                  maxSizeMB={2}
                />
              </div>
              <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
                <Button
                  variant="solid_blue"
                  size="Medium"
                  onClick={submitForm} // Trigger Formik submit
                >
                  Simpan
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      ),
    },
    {
      label: "Petugas Lapangan",
      index: 2,
      content: (
        <div className="h-full flex flex-col">
          <div className="mt-3 bg-neutral-100 px-6 py-8 h-[596px] rounded-[16px] space-y-8">
            <Dropdown
              label="Nama Petugas Lapangan"
              labelPosition="left"
              placeholder="Masukkan Petugas Lapangan"
              isRequired="true"
              size="Medium"
              options={[
                { value: "1", label: "Opsi 1" },
                { value: "2", label: "Opsi 2" },
                { value: "3", label: "Opsi 3" },
              ]}
              //   value={koderupSipasti}
              errorMessage="Nama Petugas Lapangan tidak boleh kosong"
              //   onChange={(e) => setKodeRUPSipasti(e.target.value)}
            />
            <FileInput
              //   onFileSelect={handleLogoFileSelect}
              //   setSelectedFile={setLogoUrl}
              buttonText="Pilih Berkas"
              multiple={false}
              accept=".pdf"
              Label="Unggah SK/Surat Penugasan"
              HelperText="Format .PDF dan maksimal 2MB"
              //   state={logoUploadState}
              //   onCancel={handleLogoCancel}
              //   selectedFile={logo_url}
              maxSizeMB={2}
            />
          </div>
          <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
            <Button variant="solid_blue" size="Medium">
              Simpan
            </Button>
          </div>
        </div>
      ),
    },
    {
      label: "Pengolah Data",
      index: 3,
      content: (
        <div className="h-full flex flex-col">
          <div className="mt-3 bg-neutral-100 px-6 py-8 h-[596px] rounded-[16px] space-y-8">
            <Dropdown
              label="Nama Pengolah Data"
              labelPosition="left"
              placeholder="Masukkan nama pengolah data"
              isRequired="true"
              size="Medium"
              options={[
                { value: "1", label: "Opsi 1" },
                { value: "2", label: "Opsi 2" },
                { value: "3", label: "Opsi 3" },
              ]}
              //   value={koderupSipasti}
              errorMessage="Nama Pengolah Data tidak boleh kosong"
              //   onChange={(e) => setKodeRUPSipasti(e.target.value)}
            />
            <FileInput
              //   onFileSelect={handleLogoFileSelect}
              //   setSelectedFile={setLogoUrl}
              buttonText="Pilih Berkas"
              multiple={false}
              accept=".pdf"
              Label="Unggah SK/Surat Penugasan"
              HelperText="Format .PDF dan maksimal 2MB"
              //   state={logoUploadState}
              //   onCancel={handleLogoCancel}
              //   selectedFile={logo_url}
              maxSizeMB={2}
            />
          </div>
          <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
            <Button variant="solid_blue" size="Medium">
              Simpan
            </Button>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-3 pt-8">
        <h4 className="text-H4 text-emphasis-on_surface-high">
          Penugasan Tim Pelaksana
        </h4>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
