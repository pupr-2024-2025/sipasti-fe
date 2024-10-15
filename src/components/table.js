import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      {" "}
      <table className="table-fixed divide-y divide-gray-200 min-w-max">
        {" "}
        <thead>
          <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
            {columns.map((column, index) => (
              <th
                key={index}
                className="py-3 px-4"
                style={{ width: column.width }}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="py-3 px-4"
                  style={{ width: column.width }}>
                  {row[column.accessor]}
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
