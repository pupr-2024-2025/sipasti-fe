import React, { useState } from "react";
import TextInput from "../components/input"; // Ensure this path matches your TextInput location

const Table = ({ columns, data }) => {
  const [inputValues, setInputValues] = useState(
    data.reduce((acc, row) => {
      acc[row.id] = {}; // Initialize for each row by unique id
      return acc;
    }, {})
  );

  // Function to handle input changes
  const handleInputChange = (rowId, columnAccessor, value) => {
    setInputValues((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [columnAccessor]: value,
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
                          label="" // Set to empty string to hide the label
                          placeholder={column.placeholder} // Pass the custom placeholder here
                          value={inputValues[row.id]?.[column.accessor] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              row.id,
                              column.accessor,
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        row[column.accessor] // Display plain text for non-textInput columns
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