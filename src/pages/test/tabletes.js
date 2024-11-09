// Table.js
import React from "react";
import Dropdown from "./dropdown";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-auto rounded-lg border">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-gray-700"
                style={{ width: column.width }}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="bg-white even:bg-gray-50">
              {columns.map((column) => (
                <td key={column.accessor} className="py-2 px-4 border-b">
                  {column.type === "dropdown" ? (
                    <Dropdown
                      options={column.options}
                      placeholder="Pilih Opsi"
                      onSelect={(value) => console.log("Selected:", value)}
                    />
                  ) : (
                    row[column.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
