import React, { useState } from "react";
import TextInput from "../components/input";
import Dropdown from "../components/dropdown";

const Table = ({ columns, data }) => {
  const [inputValues, setInputValues] = useState(
    data.reduce((acc, row) => {
      acc[row.id] = {};
      return acc;
    }, {})
  );

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
                    className="p-6 text-base font-normal"
                    style={{ width: column.width || 'auto' }} 
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((row, rowIndex) => (
                <tr key={row.id} className={rowIndex % 2 === 0 ? "bg-custom-neutral-0" : "bg-custom-neutral-100"}> 
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className="p-6 text-base font-normal"
                      style={{ width: column.width || 'auto' }} // Apply column width here
                    >
                      {column.type === "textInput" ? (
                        <TextInput
                          label=""
                          placeholder={column.placeholder}
                          value={inputValues[row.id]?.[column.accessor] || ""}
                          onChange={(e) =>
                            handleInputChange(row.id, column.accessor, e.target.value)
                          }
                        />
                      ) : column.type === "dropdown" ? (
                        <Dropdown
                          options={column.options}
                          value={inputValues[row.id]?.[column.accessor] || ""}
                          onSelect={(selectedValue) =>
                            handleInputChange(row.id, column.accessor, selectedValue)
                          }
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
      </div>
    </div>
  );
};

export default Table;
