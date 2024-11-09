import React, { useState, useEffect } from "react";
import Table from "./tabletes";
import Select from "react-select";

// Function to fetch provinces and cities data from the API
const fetchProvincesAndCities = async () => {
  try {
    const response = await fetch(
      "https://api-ecatalogue-staging.online/api/provinces-and-cities"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch provinces and cities");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching provinces and cities:", error);
    return { provinces: [], cities: [] }; // Return empty arrays on error
  }
};

const App = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch provinces and cities data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProvincesAndCities();
      console.log("Fetched data:", data); // Log the raw response

      if (data && Array.isArray(data.provinces)) {
        setProvinces(data.provinces);
      }

      if (data && Array.isArray(data.cities)) {
        setCities(data.cities);
      }

      setLoading(false); // Stop loading after data is fetched
    };
    fetchData();
  }, []);

  // If still loading, display a loading message
  if (loading) {
    return <div>Loading provinces and cities...</div>;
  }

  // Define columns for the table including the province and city dropdowns
  const columns = [
    { title: "Name", accessor: "name", width: "30%" },
    { title: "Role", accessor: "role", width: "30%" },
    {
      title: "Status",
      accessor: "status",
      type: "dropdown",
      options: ["Active", "Inactive"],
      width: "40%",
    },
    {
      title: "Provinsi",
      accessor: "provinsi_id",
      type: "dropdown",
      options:
        provinces.length > 0
          ? provinces.map((province) => ({
              value: province.id,
              label: province.name,
            }))
          : [],
      width: "40%",
    },
    {
      title: "Kabupaten/Kota",
      accessor: "city_id",
      type: "dropdown",
      options:
        cities.length > 0
          ? cities.map((city) => ({
              value: city.id,
              label: city.name,
            }))
          : [],
      width: "40%",
    },
  ];

  // Sample data for the table
  const data = [
    { id: 1, name: "John Doe", role: "Developer", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Designer", status: "Inactive" },
  ];

  return (
    <div className="p-4">
      {/* Render the Table component, passing columns and data */}
      <Table columns={columns} data={data} />
    </div>
  );
};

export default App;
