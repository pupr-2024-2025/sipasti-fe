import React, { useState } from "react";
import TextInput from "../components/input"; // Pastikan jalurnya benar
import Dropdown from "../components/dropdown"; // Pastikan jalurnya benar

const Table = ({ columns, data }) => {
  // Initialize state to hold input values for each row
  const [inputValues, setInputValues] = useState(
    data.reduce((acc, row) => {
      acc[row.id] = {}; // Create an empty object for each row
      return acc;
    }, {})
  );

  // Function to handle changes in inputs and dropdowns
  const handleInputChange = (rowId, columnAccessor, value) => {
    setInputValues((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [columnAccessor]: value, // Update the specific value
      },
    }));
  };

  return (
    <div className="">
      <div className="rounded-[16px] border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-max">
            <thead>
              <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`p-6 text-base font-normal ${
                      index !== columns.length - 1 ? "pr-6" : ""
                    }`}
                    style={{ width: column.width }}>
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className="p-6 text-base font-normal">
                      {column.type === "textInput" ? (
                        <TextInput
                          label="" // Kosongkan label untuk menghilangkan label
                          placeholder={column.placeholder}
                          value={inputValues[row.id]?.[column.accessor] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              row.id,
                              column.accessor,
                              e.target.value
                            )
                          }
                        />
                      ) : column.type === "dropdown" ? (
                        <Dropdown
                          options={column.options} // Opsi dropdown
                          value={inputValues[row.id]?.[column.accessor] || ""}
                          onSelect={(selectedValue) =>
                            handleInputChange(
                              row.id,
                              column.accessor,
                              selectedValue
                            )
                          }
                        />
                      ) : (
                        row[column.accessor] // Untuk "text", tampilkan nilai langsung
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
