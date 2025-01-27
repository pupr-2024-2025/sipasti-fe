import React, { useState, useEffect } from "react";
import Navbar from "../../components/navigationbar";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import SearchBox from "../../components/searchbox";
import { More } from "iconsax-react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [url]);

  return { data, error };
};

const PerencanaanDataList = () => {
  const { data: allData, error } = useFetchData(
    "https://api-ecatalogue-staging.online/api/perencanaan-data/table-list-prencanaan-data"
  );

  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [vendorFilters, setVendorFilters] = useState([]);

  const filterOptions = [
    { label: "Nama Paket", accessor: "nama_paket", checked: false },
    { label: "Nama Balai", accessor: "nama_balai", checked: false },
    { label: "Nama PPK", accessor: "nama_ppk", checked: false },
    { label: "Jabatan PPK", accessor: "jabatan_ppk", checked: false },
    { label: "Kode RUP", accessor: "kode_rup", checked: false },
    { label: "Status", accessor: "status", checked: false },
  ];

  useEffect(() => {
    let filteredData = [...allData];

    // Apply search
    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply filters
    if (vendorFilters.length > 0) {
      filteredData = filteredData.filter((item) =>
        vendorFilters.some((key) =>
          String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Ensure unique IDs (if necessary)
    filteredData = filteredData.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    setTableData(filteredData);
  }, [searchQuery, vendorFilters, allData]);

  const paginatedData = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const displayedData =
    tableData.length > 0
      ? paginatedData(tableData, currentPage, itemsPerPage)
      : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when new search is made
  };

  const handleFilterClick = (filters) => {
    const selectedFilters = filters
      .filter((filter) => filter.checked)
      .map((filter) => filter.accessor);
    setVendorFilters(selectedFilters);
  };

  if (error) return <div>Error: {error}</div>;

  // Add a column for numbering
  const columnsWithNumbering = [
    {
      title: "Nama Paket",
      accessor: "nama_paket",
      type: "text",
      width: "280px",
    },
    {
      title: "Nama Balai",
      accessor: "nama_balai",
      type: "text",
      width: "280px",
    },
    {
      title: "Nama PPK",
      accessor: "nama_ppk",
      type: "text",
      width: "200px",
    },
    {
      title: "Jabatan PPK",
      accessor: "jabatan_ppk",
      type: "text",
      width: "200px",
    },
    {
      title: "Kode RUP",
      accessor: "kode_rup",
      type: "text",
      width: "140px",
    },
    {
      title: "Status",
      accessor: "status",
      type: "text",
      width: "280px",
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: More,
      width: "52px",
      onClick: (row) => alert(`Hapus baris ID: ${row.id}`),
    },
  ];

  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-3">
        <div className="flex flex-row justify-between items-center mt-8 mb-7">
          <h1 className="text-H3 font-bold">Informasi Perencanaan Data</h1>
          <SearchBox
            placeholder="Cari Data..."
            onSearch={handleSearch}
            withFilter={true}
            filterOptions={filterOptions}
            onFilterClick={handleFilterClick}
          />
        </div>
        <Table columns={columnsWithNumbering} data={displayedData} />
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalData={tableData.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PerencanaanDataList;
