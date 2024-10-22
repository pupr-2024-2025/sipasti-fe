import React, { useState } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

const Pagination = ({ currentPage, totalPages, onPageChange, totalData }) => {
  const [hoveredPage, setHoveredPage] = useState(null);
  const [pressedPage, setPressedPage] = useState(null);

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
      setPressedPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className="mx-1 cursor-pointer">
          <button
            onClick={() => handlePageClick(i)}
            onMouseEnter={() => setHoveredPage(i)}
            onMouseLeave={() => {
              setHoveredPage(null);
              setPressedPage(null);
            }}
            className={`rounded-full transition-transform duration-200 ease-in-out ${
              i === currentPage
                ? "w-[50px] h-[50px] bg-custom-blue-500 text-emphasis-on_color-high border-8 border-custom-blue-50 scale-110"
                : `w-[40px] h-[40px] ${
                    pressedPage === i
                      ? "bg-custom-blue-400"
                      : hoveredPage === i
                      ? "bg-custom-blue-300"
                      : "bg-custom-neutral-0"
                  } text-emphasis-on_surface-high border-2 border-transparent scale-100`
            }`}
          >
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  const startIndex = currentPage * 10 - 9; // Calculate starting index for display

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-emphasis-on_surface-high">
        Menampilkan {startIndex} sampai {Math.min(currentPage * 10, totalData)} dari {totalData} data.
      </div>
      <div className="border rounded-full p-3 bg-custom-neutral-0">
        <ul className="flex items-center">
          <li>
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              onMouseEnter={() => currentPage > 1 && setHoveredPage("prev")}
              onMouseLeave={() => {
                currentPage > 1 && setHoveredPage(null);
                setPressedPage(null);
              }}
              className={`w-[40px] h-[40px] flex items-center justify-center rounded-full ${
                currentPage === 1
                  ? "bg-custom-neutral-0 text-emphasis-on_surface-high cursor-not-allowed opacity-60"
                  : `bg-custom-neutral-0 text-emphasis-on_surface-high cursor-pointer transition-transform duration-200 ease-in-out ${
                      pressedPage === "prev"
                        ? "bg-custom-blue-400"
                        : hoveredPage === "prev"
                        ? "bg-custom-blue-300"
                        : ""
                    }`
              }`}
            >
              <ArrowLeft2 size="20" />
            </button>
          </li>
          {renderPageNumbers()}
          <li>
            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              onMouseEnter={() =>
                currentPage < totalPages && setHoveredPage("next")
              }
              onMouseLeave={() => {
                currentPage < totalPages && setHoveredPage(null);
                setPressedPage(null);
              }}
              className={`w-[40px] h-[40px] flex items-center justify-center rounded-full ${
                currentPage === totalPages
                  ? "text-emphasis-on_surface-high cursor-not-allowed opacity-60"
                  : `bg-custom-neutral-0 text-emphasis-on_surface-high cursor-pointer transition-transform duration-200 ease-in-out ${
                      pressedPage === "next"
                        ? "bg-custom-blue-400"
                        : hoveredPage === "next"
                        ? "bg-custom-blue-300"
                        : ""
                    }`
              }`}
            >
              <ArrowRight2 size="20" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
