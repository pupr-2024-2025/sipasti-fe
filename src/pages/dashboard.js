import React from "react";
import Navbar from "../components/navigationbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-H2 text-emphasis-on_surface-high">
          Selamat Datang di Dashboard
        </h2>
        <p className="text-B1 text-emphasis-on_surface-medium">
          Ini adalah area dashboard Anda. Silakan pilih opsi di navbar untuk
          melanjutkan.
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contoh Card atau Widget */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-H3 text-emphasis-on_surface-high">
              Statistik Pengguna
            </h3>
            <p className="text-B2 text-emphasis-on_surface-medium">
              Informasi dan statistik mengenai pengguna terdaftar.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-H3 text-emphasis-on_surface-high">
              Aktivitas Terbaru
            </h3>
            <p className="text-B2 text-emphasis-on_surface-medium">
              Melihat aktivitas terbaru yang dilakukan di sistem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
