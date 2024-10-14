import React, { useState } from "react";
import Navbar from "../components/navigationbar";
import Tabs from "../components/Tabs";
import TextInput from "../components/input"; // Import the TextInput component

const Dashboard = () => {
  // Declare the username state using useState
  const [username, setUsername] = useState("");

  const tabs = [
    {
      label: "Sinkron data dari HPS",
      content: (
        <div>
          <h3 className="text-H3 text-emphasis-on_surface-high">
            Statistik Pengguna
          </h3>
          <p className="text-B2 text-emphasis-on_surface-medium">
            Informasi dan statistik mengenai pengguna terdaftar.
          </p>
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

        {/* TextInput Component */}
        <div className="mt-4">
          <TextInput
            label="Kode RUP"
            labelPosition="left" // Set label position to the left
            placeholder="Masukkan Kode RUP"
            size="Medium"
            isRequired="true"
            value={username} // Bind the username state
            onChange={(e) => setUsername(e.target.value)} // Update the state
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
