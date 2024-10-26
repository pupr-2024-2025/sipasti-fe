import React, { useState } from "react";
import Navbar from "../../components/navigationbar";
import Tabs from "../../components/Tabs";
import TextInput from "../../components/input";
import Button from "../../components/button";
import Stepper from "../../components/stepper";
import Tahap2 from "./tahap2";

const Tahap1 = () => {
  const [koderup, setKodeRUP] = useState("");
  const [namaBalai, setNamaBalai] = useState("");
  const [namaPaket, setNamaPaket] = useState("");
  const [namaPPK, setNamaPPK] = useState("");
  const [jabatanPPK, setJabatanPPK] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [filterCriteria, setFilterCriteria] = useState(""); // State for filter criteria

  const handleCariData = () => {
    console.log("Mencari data di SIPASTI dengan Kode RUP:", koderup);
  };

  const NUMBER_OF_STEPS = 4;
  const stepLabels = [
    "Informasi Umum",
    "Identifikasi Kebutuhan",
    "Penentuan Shortlist Vendor",
    "Perancangan Kuesioner",
  ];

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
              value={koderup}
              errorMessage="Kode RUP tidak boleh kosong"
              onChange={(e) => setKodeRUP(e.target.value)}
            />
            <TextInput
              label="Nama Paket"
              labelPosition="left"
              placeholder="Masukkan Nama Paket"
              size="Medium"
              isRequired="true"
              value={namaPaket}
              errorMessage="Nama paket tidak boleh kosong"
              onChange={(e) => setNamaPaket(e.target.value)}
            />
            <div className="px-[236px]">
              <Button
                variant="solid_blue"
                size="Medium"
                onClick={handleCariData}>
                Cari Data di SIPASTI
              </Button>
            </div>
            <TextInput
              label="Nama PPK"
              labelPosition="left"
              placeholder="Masukkan Nama PPK"
              size="Medium"
              isRequired="true"
              value={namaPPK}
              errorMessage="Nama PPK tidak boleh kosong"
              onChange={(e) => setNamaPPK(e.target.value)}
            />
            <TextInput
              label="Jabatan PPK"
              labelPosition="left"
              placeholder="Masukkan Jabatan PPK"
              size="Medium"
              isRequired="true"
              value={jabatanPPK}
              errorMessage="Jabatan PPK tidak boleh kosong"
              onChange={(e) => setJabatanPPK(e.target.value)}
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
            value={koderup}
            errorMessage="Kode RUP tidak boleh kosong"
            onChange={(e) => setKodeRUP(e.target.value)}
          />
          <TextInput
            label="Nama Balai"
            labelPosition="left"
            placeholder="Masukkan Nama Balai"
            size="Medium"
            isRequired="true"
            value={namaBalai}
            errorMessage="Nama balai tidak boleh kosong"
            onChange={(e) => setNamaBalai(e.target.value)}
          />

          <TextInput
            label="Nama Paket"
            labelPosition="left"
            placeholder="Masukkan Nama Paket"
            size="Medium"
            isRequired="true"
            value={namaPaket}
            errorMessage="Nama paket tidak boleh kosong"
            onChange={(e) => setNamaPaket(e.target.value)}
          />
          <TextInput
            label="Nama PPK"
            labelPosition="left"
            placeholder="Masukkan Nama PPK"
            size="Medium"
            isRequired="true"
            value={namaPPK}
            errorMessage="Nama PPK tidak boleh kosong"
            onChange={(e) => setNamaPPK(e.target.value)}
          />
          <TextInput
            label="Jabatan PPK"
            labelPosition="left"
            placeholder="Masukkan Jabatan PPK"
            size="Medium"
            isRequired="true"
            value={jabatanPPK}
            errorMessage="Jabatan PPK tidak boleh kosong"
            onChange={(e) => setJabatanPPK(e.target.value)}
          />
        </div>
      ),
    },
  ];

  const areFieldsFilled = () => {
    return (
      namaBalai.trim() !== "" &&
      namaPaket.trim() !== "" &&
      namaPPK.trim() !== "" &&
      jabatanPPK.trim() !== ""
    );
  };

  const nextStep = () => {
    if (currentStep < NUMBER_OF_STEPS - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleNextStep = () => {
    if (areFieldsFilled()) {
      console.log("Data disimpan:", {
        koderup,
        namaBalai,
        namaPaket,
        namaPPK,
        jabatanPPK,
      });
      nextStep();
    } else {
      alert("Pastikan semua field telah diisi dengan benar.");
    }
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
                  onChange={(e) => setFilterCriteria(e.target.value)}
                />
              )}
            </>
          )}
          {currentStep === 1 && <Tahap2 />}{" "}
          {/* Render Tahap2 jika currentStep === 2 */}
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
              onClick={handleNextStep}>
              Lanjut
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tahap1;
