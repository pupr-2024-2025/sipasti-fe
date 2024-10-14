import React from "react";
import Navbar from "../components/navigationbar";
import Tabs from "../components/Tabs";

const Dashboard = () => {
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
          {/* You can add more content or components related to user statistics here */}
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
          {/* You can add more content or components related to recent activities here */}
        </div>
      ),
    },
    {
      label: "Laporan",
      content: (
        <div>
          <h3 className="text-H3 text-emphasis-on_surface-high">Laporan</h3>
          <p className="text-B2 text-emphasis-on_surface-medium">
            Melihat dan mengunduh laporan pengguna dan aktivitas.
          </p>
          {/* You can add more content or components related to reports here */}
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

        {/* Tabs Component Integration */}
        <div className="mt-6">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
