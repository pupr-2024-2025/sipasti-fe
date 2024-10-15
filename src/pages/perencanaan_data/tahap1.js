import React, { useState } from "react";
import Navbar from "../../components/navigationbar";
import Tabs from "../../components/Tabs";
import TextInput from "../../components/input";
import Button from "../../components/button";
import ProgressBar from "../../components/progressbar";
import HorizontalLinearAlternativeLabelStepper from "../../components/progressbar";
import Tahap2 from "./Tahap2";

const Tahap1 = () => {
  const [koderup, setKodeRUP] = useState("");
  const [namaBalai, setNamaBalai] = useState("");
  const [namaPaket, setNamaPaket] = useState("");
  const [namaPPK, setNamaPPK] = useState("");
  const [jabatanPPK, setJabatanPPK] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleCariData = () => {
    console.log("Mencari data di SIPASTI dengan Kode RUP:", koderup);
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

  // Check if all required fields are filled
  const areFieldsFilled = () => {
    return (
      namaBalai.trim() !== "" && // Check namaBalai
      namaPaket.trim() !== "" &&
      namaPPK.trim() !== "" &&
      jabatanPPK.trim() !== ""
    );
  };

  // Function to save data and move to the next step
  const handleNextStep = () => {
    if (areFieldsFilled()) {
      // Simpan data di sini jika perlu, lalu masuk ke tahap 2
      console.log("Data disimpan:", {
        koderup,
        namaBalai,
        namaPaket,
        namaPPK,
        jabatanPPK,
      });
      setCurrentStep(2); // Pindah ke Tahap2
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
          <div className="container mx-auto">
            <HorizontalLinearAlternativeLabelStepper
              currentStep={currentStep}
            />
          </div>
          {currentStep === 1 && (
            <>
              <h4 className="text-H4 text-emphasis-on_surface-high">
                Informasi Umum
              </h4>
              <div className="mt-6">
                <Tabs tabs={tabs} />
              </div>
            </>
          )}
          {currentStep === 2 && <Tahap2 />}{" "}
          {/* Render Tahap2 jika currentStep === 2 */}
        </div>

        {currentStep === 1 && (
          <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
            <Button
              variant="outlined_yellow"
              size="Medium"
              disabled={currentStep === 1} // Disable the button if on the first step
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))} // Go back to the previous step
            >
              Kembali
            </Button>

            <Button
              variant="solid_blue"
              size="Medium"
              disabled={!areFieldsFilled()} // Disable the button based on field validation
              onClick={handleNextStep} // Simpan data dan lanjut ke Tahap2
            >
              Lanjut
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tahap1;
