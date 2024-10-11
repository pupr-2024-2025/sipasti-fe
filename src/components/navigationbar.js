// src/components/Navbar.js
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-custom-neutral-100 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <Link
            href="/dashboard"
            className="text-B1 text-emphasis-on_surface-medium">
            Beranda
          </Link>
          <Link
            href="/perencanaan_data"
            className="text-B1 text-emphasis-on_surface-medium">
            Perencanaan Data
          </Link>
          <Link
            href="/input_kuesioner"
            className="text-B1 text-emphasis-on_surface-medium">
            Input Kuesioner
          </Link>
          <Link
            href="/input_kuesioner"
            className="text-B1 text-emphasis-on_surface-medium">
            Vendor
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
