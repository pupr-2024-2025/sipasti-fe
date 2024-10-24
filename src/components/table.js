import React, { useState } from "react";
import TextInput from "../components/input";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import Image from "next/image";
import QuestionMark from "../../public/images/question_mark.svg";
import Tooltip from "./tooltip";

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
                    className={`p-6 text-base font-normal ${
                      index !== columns.length - 1 ? "pr-6" : ""
                    }`}
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center">
                      {column.title}
                      {column.questionMark && (
                        <Tooltip text="More information about this column."> {/* Add tooltip text here */}
                          <div
                            className="ml-2 cursor-pointer text-emphasis-on_surface-medium"
                            title="More info"
                          >
                            <Image
                              src={QuestionMark}
                              alt="Info"
                              width={16}
                              height={16}
                            />
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.accessor} className="p-6 text-base font-normal">
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
                          options={column.options.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          placeholder="Pilih Opsi"
                          value={inputValues[row.id]?.[column.accessor] || ""}
                          onSelect={(value) =>
                            handleInputChange(row.id, column.accessor, value)
                          }
                        />
                      ) : column.type === "iconButton" ? (
                        <Button
                          size="Small"
                          variant="outlined_icon"
                          iconLeft={<column.icon />}
                          onClick={() =>
                            column.onClick
                              ? column.onClick(row)
                              : console.log(`Clicked icon button on row ${row.id}`)
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
