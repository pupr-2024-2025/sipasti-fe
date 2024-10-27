import React, { useState } from "react";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/Tabs";
import Button from "../../components/Button";
import { Trash } from "iconsax-react";

const Tahap3 = ({ onNext, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [materialData, setMaterialData] = useState([
    {
      id: 1,
      respondenvendor: "Material A",
      pemilikvendor: "John Doe",
      alamat: "Jl. Merdeka No. 1",
      kontak: "08123456789",
    },
    {
      id: 2,
      respondenvendor: "Material B",
      pemilikvendor: "Jane Smith",
      alamat: "Jl. Jendral Sudirman No. 2",
      kontak: "08234567890",
    },
    {
      id: 3,
      respondenvendor: "Material C",
      pemilikvendor: "Mike Johnson",
      alamat: "Jl. Gatot Subroto No. 3",
      kontak: "08345678901",
    },
    {
      id: 4,
      respondenvendor: "Material D",
      pemilikvendor: "Alice Brown",
      alamat: "Jl. Diponegoro No. 4",
      kontak: "08456789012",
    },
    {
      id: 5,
      respondenvendor: "Material E",
      pemilikvendor: "Charlie Black",
      alamat: "Jl. Soekarno Hatta No. 5",
      kontak: "08567890123",
    },
    {
      id: 6,
      respondenvendor: "Material F",
      pemilikvendor: "Daisy White",
      alamat: "Jl. Veteran No. 6",
      kontak: "08678901234",
    },
    {
      id: 7,
      respondenvendor: "Material G",
      pemilikvendor: "Ethan Green",
      alamat: "Jl. Ahmad Yani No. 7",
      kontak: "08789012345",
    },
    {
      id: 8,
      respondenvendor: "Material H",
      pemilikvendor: "Fiona Yellow",
      alamat: "Jl. Pahlawan No. 8",
      kontak: "08890123456",
    },
    {
      id: 9,
      respondenvendor: "Material I",
      pemilikvendor: "George Blue",
      alamat: "Jl. Merah Putih No. 9",
      kontak: "08901234567",
    },
    {
      id: 10,
      respondenvendor: "Material J",
      pemilikvendor: "Hannah Red",
      alamat: "Jl. Kebangkitan No. 10",
      kontak: "09012345678",
    },
    {
      id: 11,
      respondenvendor: "Material K",
      pemilikvendor: "Ian Gray",
      alamat: "Jl. Garuda No. 11",
      kontak: "09123456789",
    },
    {
      id: 12,
      respondenvendor: "Material L",
      pemilikvendor: "Jack Silver",
      alamat: "Jl. Cendrawasih No. 12",
      kontak: "09234567890",
    },
    {
      id: 13,
      respondenvendor: "Material M",
      pemilikvendor: "Lily Gold",
      alamat: "Jl. Melati No. 13",
      kontak: "09345678901",
    },
    {
      id: 14,
      respondenvendor: "Material N",
      pemilikvendor: "Mike Red",
      alamat: "Jl. Kamboja No. 14",
      kontak: "09456789012",
    },
    {
      id: 15,
      respondenvendor: "Material O",
      pemilikvendor: "Nina Brown",
      alamat: "Jl. Mawar No. 15",
      kontak: "09567890123",
    },
    {
      id: 16,
      respondenvendor: "Material P",
      pemilikvendor: "Oscar White",
      alamat: "Jl. Anggrek No. 16",
      kontak: "09678901234",
    },
    {
      id: 17,
      respondenvendor: "Material Q",
      pemilikvendor: "Paul Black",
      alamat: "Jl. Kamboja No. 17",
      kontak: "09789012345",
    },
    {
      id: 18,
      respondenvendor: "Material R",
      pemilikvendor: "Quinn Blue",
      alamat: "Jl. Kenanga No. 18",
      kontak: "09890123456",
    },
    {
      id: 19,
      respondenvendor: "Material S",
      pemilikvendor: "Ray Green",
      alamat: "Jl. Kutilang No. 19",
      kontak: "09901234567",
    },
    {
      id: 20,
      respondenvendor: "Material T",
      pemilikvendor: "Sophia Red",
      alamat: "Jl. Bakung No. 20",
      kontak: "10012345678",
    },
  ]);

  const [equipmentData, setEquipmentData] = useState([
    {
      id: 1,
      respondenvendor: "Equipment A",
      pemilikvendor: "Tom Brown",
      alamat: "Jl. Merdeka No. 1",
      kontak: "08123456789",
    },
    {
      id: 2,
      respondenvendor: "Equipment B",
      pemilikvendor: "Sarah Green",
      alamat: "Jl. Jendral Sudirman No. 2",
      kontak: "08234567890",
    },
    {
      id: 3,
      respondenvendor: "Equipment C",
      pemilikvendor: "Daniel White",
      alamat: "Jl. Gatot Subroto No. 3",
      kontak: "08345678901",
    },
    {
      id: 4,
      respondenvendor: "Equipment D",
      pemilikvendor: "Emily Black",
      alamat: "Jl. Diponegoro No. 4",
      kontak: "08456789012",
    },
    {
      id: 5,
      respondenvendor: "Equipment E",
      pemilikvendor: "James Red",
      alamat: "Jl. Soekarno Hatta No. 5",
      kontak: "08567890123",
    },
    {
      id: 6,
      respondenvendor: "Equipment F",
      pemilikvendor: "Olivia Yellow",
      alamat: "Jl. Veteran No. 6",
      kontak: "08678901234",
    },
    {
      id: 7,
      respondenvendor: "Equipment G",
      pemilikvendor: "Lucas Blue",
      alamat: "Jl. Ahmad Yani No. 7",
      kontak: "08789012345",
    },
    {
      id: 8,
      respondenvendor: "Equipment H",
      pemilikvendor: "Mia Gold",
      alamat: "Jl. Pahlawan No. 8",
      kontak: "08890123456",
    },
    {
      id: 9,
      respondenvendor: "Equipment I",
      pemilikvendor: "Liam Gray",
      alamat: "Jl. Merah Putih No. 9",
      kontak: "08901234567",
    },
    {
      id: 10,
      respondenvendor: "Equipment J",
      pemilikvendor: "Emma Silver",
      alamat: "Jl. Kebangkitan No. 10",
      kontak: "09012345678",
    },
    {
      id: 11,
      respondenvendor: "Equipment K",
      pemilikvendor: "Noah Black",
      alamat: "Jl. Garuda No. 11",
      kontak: "09123456789",
    },
    {
      id: 12,
      respondenvendor: "Equipment L",
      pemilikvendor: "Ava White",
      alamat: "Jl. Cendrawasih No. 12",
      kontak: "09234567890",
    },
    {
      id: 13,
      respondenvendor: "Equipment M",
      pemilikvendor: "Logan Brown",
      alamat: "Jl. Melati No. 13",
      kontak: "09345678901",
    },
    {
      id: 14,
      respondenvendor: "Equipment N",
      pemilikvendor: "Zoe Green",
      alamat: "Jl. Kamboja No. 14",
      kontak: "09456789012",
    },
    {
      id: 15,
      respondenvendor: "Equipment O",
      pemilikvendor: "Jackson Red",
      alamat: "Jl. Mawar No. 15",
      kontak: "09567890123",
    },
    {
      id: 16,
      respondenvendor: "Equipment P",
      pemilikvendor: "Chloe Yellow",
      alamat: "Jl. Anggrek No. 16",
      kontak: "09678901234",
    },
    {
      id: 17,
      respondenvendor: "Equipment Q",
      pemilikvendor: "Lily Black",
      alamat: "Jl. Kamboja No. 17",
      kontak: "09789012345",
    },
    {
      id: 18,
      respondenvendor: "Equipment R",
      pemilikvendor: "Ella Blue",
      alamat: "Jl. Kenanga No. 18",
      kontak: "09890123456",
    },
    {
      id: 19,
      respondenvendor: "Equipment S",
      pemilikvendor: "Mason Green",
      alamat: "Jl. Kutilang No. 19",
      kontak: "09901234567",
    },
    {
      id: 20,
      respondenvendor: "Equipment T",
      pemilikvendor: "Aria Red",
      alamat: "Jl. Bakung No. 20",
      kontak: "10012345678",
    },
  ]);

  const [laborData, setLaborData] = useState([
    {
      id: 1,
      respondenvendor: "Labor A",
      pemilikvendor: "William Brown",
      alamat: "Jl. Merdeka No. 1",
      kontak: "08123456789",
    },
    {
      id: 2,
      respondenvendor: "Labor B",
      pemilikvendor: "Sophia Green",
      alamat: "Jl. Jendral Sudirman No. 2",
      kontak: "08234567890",
    },
    {
      id: 3,
      respondenvendor: "Labor C",
      pemilikvendor: "James White",
      alamat: "Jl. Gatot Subroto No. 3",
      kontak: "08345678901",
    },
    {
      id: 4,
      respondenvendor: "Labor D",
      pemilikvendor: "Liam Black",
      alamat: "Jl. Diponegoro No. 4",
      kontak: "08456789012",
    },
    {
      id: 5,
      respondenvendor: "Labor E",
      pemilikvendor: "Isabella Red",
      alamat: "Jl. Soekarno Hatta No. 5",
      kontak: "08567890123",
    },
    {
      id: 6,
      respondenvendor: "Labor F",
      pemilikvendor: "Elijah Yellow",
      alamat: "Jl. Veteran No. 6",
      kontak: "08678901234",
    },
    {
      id: 7,
      respondenvendor: "Labor G",
      pemilikvendor: "Charlotte Blue",
      alamat: "Jl. Ahmad Yani No. 7",
      kontak: "08789012345",
    },
    {
      id: 8,
      respondenvendor: "Labor H",
      pemilikvendor: "Henry Gold",
      alamat: "Jl. Pahlawan No. 8",
      kontak: "08890123456",
    },
    {
      id: 9,
      respondenvendor: "Labor I",
      pemilikvendor: "Amelia Gray",
      alamat: "Jl. Merah Putih No. 9",
      kontak: "08901234567",
    },
    {
      id: 10,
      respondenvendor: "Labor J",
      pemilikvendor: "Benjamin Silver",
      alamat: "Jl. Kebangkitan No. 10",
      kontak: "09012345678",
    },
    {
      id: 11,
      respondenvendor: "Labor K",
      pemilikvendor: "Sofia Black",
      alamat: "Jl. Garuda No. 11",
      kontak: "09123456789",
    },
    {
      id: 12,
      respondenvendor: "Labor L",
      pemilikvendor: "Mia White",
      alamat: "Jl. Cendrawasih No. 12",
      kontak: "09234567890",
    },
    {
      id: 13,
      respondenvendor: "Labor M",
      pemilikvendor: "David Brown",
      alamat: "Jl. Melati No. 13",
      kontak: "09345678901",
    },
    {
      id: 14,
      respondenvendor: "Labor N",
      pemilikvendor: "Nora Green",
      alamat: "Jl. Kamboja No. 14",
      kontak: "09456789012",
    },
    {
      id: 15,
      respondenvendor: "Labor O",
      pemilikvendor: "Lucas Red",
      alamat: "Jl. Mawar No. 15",
      kontak: "09567890123",
    },
    {
      id: 16,
      respondenvendor: "Labor P",
      pemilikvendor: "Stella Yellow",
      alamat: "Jl. Anggrek No. 16",
      kontak: "09678901234",
    },
    {
      id: 17,
      respondenvendor: "Labor Q",
      pemilikvendor: "Daniel Black",
      alamat: "Jl. Kamboja No. 17",
      kontak: "09789012345",
    },
    {
      id: 18,
      respondenvendor: "Labor R",
      pemilikvendor: "Ella Blue",
      alamat: "Jl. Kenanga No. 18",
      kontak: "09890123456",
    },
    {
      id: 19,
      respondenvendor: "Labor S",
      pemilikvendor: "Matthew Green",
      alamat: "Jl. Kutilang No. 19",
      kontak: "09901234567",
    },
    {
      id: 20,
      respondenvendor: "Labor T",
      pemilikvendor: "Lily Red",
      alamat: "Jl. Bakung No. 20",
      kontak: "10012345678",
    },
  ]);

  // State to manage errors
  const [formErrors, setFormErrors] = useState({});

  // Function to delete a row
  const handleDelete = (row, type) => {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus ${type} ${row.respondenvendor}?`
    );
    if (confirmed) {
      if (type === "Material") {
        setMaterialData((prevData) =>
          prevData.filter((item) => item.id !== row.id)
        );
      } else if (type === "Equipment") {
        setEquipmentData((prevData) =>
          prevData.filter((item) => item.id !== row.id)
        );
      } else {
        setLaborData((prevData) =>
          prevData.filter((item) => item.id !== row.id)
        );
      }
    }
  };

  // Define columns for each type
  const columns = [
    {
      title: "",
      accessor: "select",
      type: "checkbox",
      width: "20px",
    },
    {
      title: "Responden/Vendor",
      accessor: "respondenvendor",
      type: "text",
      width: "408px",
    },
    {
      title: "Pemilik Vendor",
      accessor: "pemilikvendor",
      type: "text",
      width: "260px",
    },
    {
      title: "Alamat",
      accessor: "alamat",
      type: "text",
      placeholder: "Masukkan Spesifikasi",
      width: "340px",
    },
    {
      title: "Kontak",
      accessor: "kontak",
      type: "text",
      placeholder: "Masukkan Spesifikasi",
      width: "200px",
    },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;

  // Validate inputs before proceeding
  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    // Validate material data
    const currentData = materialData.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    currentData.forEach((row) => {
      newErrors[row.id] = {};
      columns.forEach((column) => {
        if (column.required) {
          const value = row[column.accessor];
          if (!value) {
            isValid = false;
            newErrors[row.id][column.accessor] = `${column.title} wajib diisi`; // Set error message
          }
        }
      });
    });

    setFormErrors(newErrors); // Update state with new errors
    return isValid;
  };

  const handleNext = () => {
    if (validateInputs()) {
      onNext(); // Proceed to the next step if valid
    }
  };

  // Tabs configuration
  const tabs = [
    {
      label: "Material",
      content: (
        <div className="mt-3 space-y-8">
          <div className="rounded-[16px] overflow-hidden">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                data={materialData}
                errors={formErrors}
              />{" "}
              {/* Pass errors to Table */}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(materialData.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            totalData={materialData.length}
          />
        </div>
      ),
    },
    {
      label: "Peralatan",
      content: (
        <div className="mt-3 space-y-8">
          <div className="rounded-[16px] overflow-hidden">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                data={equipmentData}
                errors={formErrors}
              />{" "}
              {/* Pass errors to Table */}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(equipmentData.length / itemsPerPage)} // Update total pages
            onPageChange={setCurrentPage} // Update current page state
            totalData={equipmentData.length} // Total data for pagination display
          />
        </div>
      ),
    },
    {
      label: "Tenaga Kerja",
      content: (
        <div className="mt-3 space-y-8">
          <div className="rounded-[16px] overflow-hidden">
            <div className="overflow-x-auto">
              <Table columns={columns} data={laborData} errors={formErrors} />{" "}
              {/* Pass errors to Table */}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(laborData.length / itemsPerPage)} // Update total pages
            onPageChange={setCurrentPage} // Update current page state
            totalData={laborData.length} // Total data for pagination display
          />
          <Button label="Next" onClick={handleNext} /> {/* Validate on next */}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h3 className="text-H3 text-emphasis-on_surface-high">
        Tahap Perencanaan Data
      </h3>
      <Tabs tabs={tabs} />
      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button variant="outlined_yellow" size="Medium" onClick={onBack}>
          Kembali
        </Button>

        <Button
          variant="solid_blue"
          size="Medium"
          onClick={() => {
            console.log("onNext called");
            onNext();
          }}>
          Simpan & Lanjut
        </Button>
      </div>
    </div>
  );
};

export default Tahap3;
