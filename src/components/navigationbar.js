import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import { User, Logout } from "iconsax-react";
import colors from "../styles/colors";
import CustomAlert from "./alert";

const Navbar = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const links = [
    { href: "/dashboard", label: "Beranda" },
    { href: "/perencanaan_data/tahap1", label: "Perencanaan Data" },
    { href: "/vendor/inputvendor", label: "Vendor" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://api-ecatalogue-staging.online/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        localStorage.removeItem("token");

        router.push("/login");
      } else {
        setAlertMessage("Logout gagal: " + response.statusText);
        setAlertOpen(true);
      }
    } catch (error) {
      setAlertMessage("Error saat logout: " + error.message);
      setAlertOpen(true);
    }
  };

  return (
    <>
      {/* CustomAlert for logout errors */}
      <CustomAlert
        message={alertMessage}
        severity="error"
        openInitially={alertOpen}
        onClose={() => setAlertOpen(false)}
      />

      <nav
        className={`flex justify-between items-center px-4 ${
          isSticky ? "sticky" : "relative"
        }`}>
        {/* Logo Container with clickable logo */}
        <Link
          href="/dashboard"
          className="bg-custom-blue-500 flex items-center rounded-full py-6 px-7 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95">
          <Image
            src={logo}
            alt="SIPASTI Logo"
            className={`max-h-[54.37px] max-w-[156px] transition-transform duration-300 ease-in-out
              ${
                links.some((link) => router.pathname === link.href)
                  ? "scale-110"
                  : "scale-100"
              }
            `}
          />
        </Link>

        {/* Navbar Links Container */}
        <div className="flex items-center rounded-full bg-custom-neutral-100 mx-auto">
          <ul className="inline-flex flex-row items-center gap-x-3 px-2 h-[66px]">
            {links.map((link, index) => {
              const isActive = router.pathname === link.href;
              const isHovered = hovered === index;

              return (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`py-4 px-4
                      ${
                        isActive
                          ? "text-emphasis-on_color-high text-H6"
                          : "text-emphasis-on_surface-medium text-B1"
                      } 
                      leading-none rounded-full transition-all duration-300 ease-in-out transform 
                      ${isActive ? "bg-custom-blue-500" : ""} 
                      ${
                        isActive
                          ? isHovered
                            ? "hover:bg-custom-blue-600 active:bg-custom-blue-700"
                            : ""
                          : isHovered
                          ? "hover:bg-custom-neutral-200 active:bg-custom-neutral-300"
                          : ""
                      }
                      ${isHovered ? "scale-105" : "scale-100"}
                    `}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    aria-disabled={false}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Profile Container with Hoverable Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}>
          {/* Profile Container */}
          <div className="bg-custom-neutral-100 flex items-center rounded-full px-3 pe-6 h-[66px] space-x-3 cursor-pointer">
            <div className="p-2 bg-custom-neutral-0 rounded-full">
              <User
                color={colors.Emphasis.Light.On_Surface.High}
                variant="Linear"
                size={24}
              />
            </div>
            <div className="space-y-1 flex flex-col">
              <span className="text-emphasis-on_surface-high text-ExtraSmall">
                Role
              </span>
              <span className="text-emphasis-on_surface-high text-H6">
                Username
              </span>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isProfileHovered && (
            <div
              className="absolute right-0 mt-[12px] w-60 bg-white rounded-[12px] p-2 transition-opacity duration-300 ease-in-out"
              style={{
                boxShadow: "0px 4px 16px 0px rgba(165, 163, 174, 0.45)",
                zIndex: 50,
              }}>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-emphasis-on_surface-high hover:bg-custom-blue-50 rounded-[12px]">
                Pengaturan Akun
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-custom-red-500 hover:bg-custom-red-50 rounded-[12px]">
                Keluar
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
