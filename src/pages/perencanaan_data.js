import React, { useState } from "react";
import Navbar from "../components/navigationbar";
import Tabs from "../components/Tabs";
import TextInput from "../components/input";
import Button from "../components/button";

const Dashboard = () => {
  const [username, setUsername] = useState("");

  const tabs = [
    {
      label: "Sinkron data dari HPS",
      content: (
        <div>
          {/* TextInput Component */}
          <div className="mt-4 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
            <TextInput
              label="Kode RUP"
              labelPosition="left"
              placeholder="Masukkan Kode RUP"
              size="Medium"
              isRequired=""
              value={username}
              errorMessage="Kode RUP tidak boleh kosong"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
              label="Nama Paket"
              labelPosition="left"
              placeholder="Masukkan Nama Paket"
              size="Medium"
              isRequired="true"
              value={username}
              errorMessage="Nama paket tidak boleh kosong"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="px-[236px]">
              <Button variant="solid_blue" size="Medium">
                Cari data di SIPASTI
              </Button>
            </div>
            <TextInput
              label="Nama PPK"
              labelPosition="left"
              placeholder="Masukkan Nama PPK"
              size="Medium"
              isRequired="true"
              value={username}
              errorMessage="Nama PPK tidak boleh kosong"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
              label="Jabatan PPK"
              labelPosition="left"
              placeholder="Masukkan Jabatan PPK"
              size="Medium"
              isRequired="true"
              value={username}
              errorMessage="Jabatan PPK tidak boleh kosong"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Sinkron data dari Topologi",
      content: (
        <div>
          <h3 className="text-H3 text-emphasis-on_surface-high">
            Aktivitas Terbaru
          </h3>
          <p className="text-B2 text-emphasis-on_surface-medium">
            Melihat aktivitas terbaru yang dilakukan di sistem.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <Navbar />
      <div className="p-6">
        <h3 className="text-H3 text-emphasis-on_surface-high">
          Tahap Perencanaan Data
        </h3>
        <h4 className="text-H4 text-emphasis-on_surface-high">
          Informasi Umum
        </h4>

        <div className="mt-6">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
