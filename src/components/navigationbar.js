import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import { User, Logout } from "iconsax-react";
import colors from "../styles/colors";

const Navbar = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState(null);
  const [isSticky, setIsSticky] = useState(false); // Track sticky state

  const links = [
    { href: "/dashboard", label: "Beranda" },
    { href: "/perencanaan_data/tahap1", label: "Perencanaan Data" },
    { href: "/schedule", label: "Input Kuesioner" },
    { href: "/vendor/inputvendor", label: "Vendor" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0); // Toggle sticky state
    };

    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    router.push("/login"); // Redirect ke halaman login
  };

  return (
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

      {/* Profile Container */}
      <div className="bg-custom-neutral-100 flex items-center rounded-full ps-3 pe-6 h-[66px] space-x-3">
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
        <button
          onClick={handleLogout}
          className="p-2 bg-custom-neutral-0 rounded-full hover:bg-custom-red-500 transition-colors duration-300"
          title="Logout">
          <Logout color={colors.Emphasis.Light.On_Surface.High} size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
