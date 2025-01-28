import React, { useEffect } from "react";
import Navbar from "../../components/navigationbar";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import SearchBox from "../../components/searchbox";
import { More } from "iconsax-react";
import usePengumpulanInformasiStore from "../../store/store";
import { tablelistpengumpulan } from "../../api/pengumpulanApi";

const PerencanaanDataList = () => {
  const {
    allData,
    tableData,
    searchQuery,
    vendorFilters,
    currentPage,
    itemsPerPage,
    setAllData,
    setTableData,
    setSearchQuery,
    setVendorFilters,
    setCurrentPage,
  } = usePengumpulanInformasiStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await tablelistpengumpulan();
        setAllData(data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [setAllData]);

  useEffect(() => {
    let filteredData = [...allData];

    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (vendorFilters.length > 0) {
      filteredData = filteredData.filter((item) =>
        vendorFilters.some((key) =>
          String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    filteredData = filteredData.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    setTableData(filteredData);
  }, [searchQuery, vendorFilters, allData, setTableData]);

  const paginatedData = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const displayedData =
    tableData.length > 0
      ? paginatedData(tableData, currentPage, itemsPerPage)
      : [];

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterClick = (filters) => {
    const selectedFilters = filters
      .filter((filter) => filter.checked)
      .map((filter) => filter.accessor);
    setVendorFilters(selectedFilters);
  };

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
          <h1 className="text-H3 font-bold">
            Informasi Tahap Pengumpulan Data
          </h1>
          <SearchBox
            placeholder="Cari Data..."
            onSearch={handleSearch}
            withFilter={true}
            filterOptions={[
              { label: "Nama Paket", accessor: "nama_paket", checked: false },
              { label: "Nama Balai", accessor: "nama_balai", checked: false },
              { label: "Nama PPK", accessor: "nama_ppk", checked: false },
              { label: "Jabatan PPK", accessor: "jabatan_ppk", checked: false },
              { label: "Kode RUP", accessor: "kode_rup", checked: false },
              { label: "Status", accessor: "status", checked: false },
            ]}
            onFilterClick={handleFilterClick}
          />
        </div>
        <Table
          columns={columnsWithNumbering}
          data={displayedData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        {displayedData.length === 0 && (
          <div className="text-center mt-4 text-B1 text-emphasis-on_surface-medium">
            <span>: (</span>
            <p className="py-6">Tidak ada data tersedia</p>
          </div>
        )}
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
