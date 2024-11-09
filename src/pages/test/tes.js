// App.js
import React from "react";
import Table from "./tabletes";

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
];

const data = [
  { id: 1, name: "John Doe", role: "Developer" },
  { id: 2, name: "Jane Smith", role: "Designer" },
];

const App = () => {
  return (
    <div className="p-4">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default App;
