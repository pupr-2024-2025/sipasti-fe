import React, { useState } from "react";
import Navbar from "../../components/navigationbar";
import Tabs from "../../components/Tabs";
import TextInput from "../../components/input";
import Button from "../../components/button";
import Stepper from "../../components/stepper";
import Tahap2 from "./tahap2";
import Tahap3 from "./tahap3";
import Tahap4 from "./tahap4";
import CustomAlert from "../../components/alert";
import axios from "axios";

const Tahap1 = () => {
  const [koderupSipasti, setKodeRUPSipasti] = useState("");
  const [namaPaketSipasti, setNamaPaketSipasti] = useState("");
  const [namaPPKSipasti, setNamaPPKSipasti] = useState("");
  const [jabatanPPKSipasti, setJabatanPPKSipasti] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  // State for Input Manual tab
  const [koderupManual, setKodeRUPManual] = useState("");
  const [namaBalaiManual, setNamaBalaiManual] = useState("");
  const [namaPaketManual, setNamaPaketManual] = useState("");
  const [namaPPKManual, setNamaPPKManual] = useState("");
  const [jabatanPPKManual, setJabatanPPKManual] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [filterCriteria, setFilterCriteria] = useState("");

  const handleCariData = () => {
    console.log("Mencari data di SIPASTI dengan Kode RUP:", koderupSipasti);
  };

  const NUMBER_OF_STEPS = 4;
  const stepLabels = [
    "Informasi Umum",
    "Identifikasi Kebutuhan",
    "Penentuan Shortlist Vendor",
    "Perancangan Kuesioner",
  ];
  const handleSubmit = async (type) => {
    const url =
      "http://api-ecatalogue-staging.online/api/perencanaan-data/store-informasi-umum";
    const data =
      type === "sipasti"
        ? {
            tipe_informasi_umum: "sipasti",
            kode_rup: koderupSipasti,
            nama_paket: namaPaketSipasti,
            nama_ppk: namaPPKSipasti,
            jabatan_ppk: jabatanPPKSipasti,
            nama_balai: "",
          }
        : {
            tipe_informasi_umum: "manual",
            kode_rup: koderupManual,
            nama_paket: namaPaketManual,
            nama_ppk: namaPPKManual,
            jabatan_ppk: jabatanPPKManual,
            nama_balai: namaBalaiManual,
          };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        console.log("Data berhasil dikirim:", result);
        setAlertMessage("Data berhasil dikirim ke API.");
        setAlertSeverity("success");
        setAlertOpen(true);
        localStorage.setItem("informasi_umum_id", result.data.id);
        return true;
      } else {
        // Menampilkan pesan error dari API
        const errorMessage = result.message || "Gagal mengirim data ke API.";
        console.error("Gagal mengirim data ke API:", errorMessage);
        setAlertMessage(errorMessage);
        setAlertSeverity("error");
        setAlertOpen(true);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("Terjadi kesalahan saat menghubungkan ke API.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return false;
    }
  };
  const tabs = [
    {
      label: "Sinkron data dari SIPASTI",
      content: (
        <div className="">
          <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
            <TextInput
              label="Kode RUP"
              labelPosition="left"
              placeholder="Masukkan Kode RUP"
              size="Medium"
              value={koderupSipasti}
              errorMessage="Kode RUP tidak boleh kosong"
              onChange={(e) => setKodeRUPSipasti(e)}
            />
            <TextInput
              label="Nama Paket"
              labelPosition="left"
              placeholder="Masukkan Nama Paket"
              size="Medium"
              isRequired="true"
              value={namaPaketSipasti}
              errorMessage="Nama paket tidak boleh kosong"
              onChange={(e) => setNamaPaketSipasti(e)}
            />
            <div className="px-[236px]">
              <Button variant="disabled" size="Medium" onClick={handleCariData}>
                Cari Data di SIPASTI
              </Button>
            </div>
            <TextInput
              label="Nama PPK"
              labelPosition="left"
              placeholder="Masukkan Nama PPK"
              size="Medium"
              isRequired="true"
              value={namaPPKSipasti}
              errorMessage="Nama PPK tidak boleh kosong"
              onChange={(e) => setNamaPPKSipasti(e)}
            />
            <TextInput
              label="Jabatan PPK"
              labelPosition="left"
              placeholder="Masukkan Jabatan PPK"
              size="Medium"
              isRequired="true"
              value={jabatanPPKSipasti}
              errorMessage="Jabatan PPK tidak boleh kosong"
              onChange={(e) => setJabatanPPKSipasti(e)}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Input Manual",
      content: (
        <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
          <TextInput
            label="Kode RUP"
            labelPosition="left"
            placeholder="Masukkan Kode RUP"
            size="Medium"
            value={koderupManual}
            errorMessage="Kode RUP tidak boleh kosong"
            onChange={(e) => setKodeRUPManual(e)}
          />
          <TextInput
            label="Nama Balai"
            labelPosition="left"
            placeholder="Masukkan Nama Balai"
            size="Medium"
            isRequired="true"
            value={namaBalaiManual}
            errorMessage="Nama balai tidak boleh kosong"
            onChange={(e) => setNamaBalaiManual(e)}
          />

          <TextInput
            label="Nama Paket"
            labelPosition="left"
            placeholder="Masukkan Nama Paket"
            size="Medium"
            isRequired="true"
            value={namaPaketManual}
            errorMessage="Nama paket tidak boleh kosong"
            onChange={(e) => setNamaPaketManual(e)}
          />
          <TextInput
            label="Nama PPK"
            labelPosition="left"
            placeholder="Masukkan Nama PPK"
            size="Medium"
            isRequired="true"
            value={namaPPKManual}
            errorMessage="Nama PPK tidak boleh kosong"
            onChange={(e) => setNamaPPKManual(e)}
          />
          <TextInput
            label="Jabatan PPK"
            labelPosition="left"
            placeholder="Masukkan Jabatan PPK"
            size="Medium"
            isRequired="true"
            value={jabatanPPKManual}
            errorMessage="Jabatan PPK tidak boleh kosong"
            onChange={(e) => setJabatanPPKManual(e)}
          />
        </div>
      ),
    },
  ];

  const areFieldsFilled = () => {
    return (
      namaBalaiManual.trim() !== "" &&
      namaPaketManual.trim() !== "" &&
      namaPPKManual.trim() !== "" &&
      jabatanPPKManual.trim() !== ""
    );
  };

  const nextStep = () => {
    if (currentStep < NUMBER_OF_STEPS - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextStep = async (type) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (areFieldsFilled()) {
      const isSubmitSuccessful = await handleSubmit(type);
      if (isSubmitSuccessful) {
        // if (true) {
        nextStep();
      }
    } else {
      setAlertMessage("Pastikan semua field telah diisi dengan benar.");
      setAlertSeverity("warning");
      setAlertOpen(true);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-8">
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
            <br />
          </div>
          {currentStep === 0 && (
            <>
              <h4 className="text-H4 text-emphasis-on_surface-high">
                Informasi Umum
              </h4>
              <div className="mt-6">
                <Tabs tabs={tabs} />
              </div>
              {/* Conditionally render filter input */}
              {filterCriteria && (
                <TextInput
                  label="Filter"
                  labelPosition="left"
                  placeholder="Masukkan kriteria filter"
                  size="Medium"
                  value={filterCriteria}
                  onChange={(e) => setFilterCriteria(e)}
                />
              )}
            </>
          )}
          {currentStep === 1 && (
            <Tahap2
              onNext={handleNextStep}
              onBack={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            />
          )}
          {currentStep === 2 && (
            <Tahap3
              onNext={handleNextStep}
              onBack={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            />
          )}
          {currentStep === 3 && (
            <Tahap4
              onNext={handleNextStep}
              onBack={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            />
          )}
        </div>
        {currentStep === 0 && (
          <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
            <Button
              variant="outlined_yellow"
              size="Medium"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}>
              Kembali
            </Button>
            <Button
              variant="solid_blue"
              size="Medium"
              disabled={!areFieldsFilled()}
              onClick={() => handleNextStep("manual")}>
              Lanjut
            </Button>
          </div>
        )}
      </div>
      <CustomAlert
        message={alertMessage}
        severity={alertSeverity}
        openInitially={alertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default Tahap1;
