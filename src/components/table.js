import React, { useState } from "react";
import TextInput from "../components/input";
import Dropdown from "../components/Dropdown";
import Button from "../components/button";
import Checkbox from "../components/checkbox";
import Image from "next/image";
import QuestionMark from "../../public/images/question_mark.svg";
import Tooltip from "./tooltip";

const Table = ({ columns, data, setParentState }) => {
  const [inputValues, setInputValues] = useState(
    data.reduce((acc, row) => {
      acc[row.id] = {};
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState(
    data.reduce((acc, row) => {
      acc[row.id] = {};
      return acc;
    }, {})
  );
  const [selectedRows, setSelectedRows] = useState([]);

  const handleInputChange = (rowId, columnAccessor, value) => {
    const dropdownFields = [
      "kelompok_material",
      "kelompok_peralatan",
      "provincies_id",
      "kabupaten_kota",
      "cities_id",
    ];
    console.log(value, columnAccessor);

    setInputValues((prev) => {
      const updatedRow = prev[rowId] || {};
      const updatedInputValues = {
        ...prev,
        [rowId]: {
          ...updatedRow,
          [columnAccessor]: dropdownFields.includes(columnAccessor)
            ? value?.value
            : value,
        },
      };
      console.log(inputValues);

      // Update the parent state after inputValues is updated
      setParentState(updatedInputValues);
      return updatedInputValues;
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [rowId]: {
        ...prevErrors[rowId],
        [columnAccessor]: "",
      },
    }));
  };

  // setParentState(inputValues);
  // setErrors((prevErrors) => ({
  //   ...prevErrors,
  //   [rowId]: {
  //     ...prevErrors[rowId],
  //     [columnAccessor]: "",
  //   },
  // }));
  // setParentState((prevState) => ({
  //   ...prevState,
  //   [rowId]: {
  //     ...prevState[rowId],
  //     [columnAccessor]: value?.value,
  //   },
  // }));
  // };

  const handleCheckboxChange = (rowId, checked) => {
    handleInputChange(rowId, "checkbox", checked);
    setSelectedRows((prevSelected) =>
      checked
        ? [...prevSelected, rowId]
        : prevSelected.filter((id) => id !== rowId)
    );
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { ...errors };

    columns.forEach((column) => {
      if (column.required) {
        data.forEach((row) => {
          const value = inputValues[row.id]?.[column.accessor];
          if (!value) {
            isValid = false;
            newErrors[row.id][column.accessor] = `${column.title} wajib diisi`;
          }
        });
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <div className="rounded-[16px] border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-max">
            <thead>
              <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-3 py-6 text-base font-normal ${
                      index !== columns.length - 1 ? "pr-6" : ""
                    }`}
                    style={{ width: column.width }}>
                    <div className="flex items-center">
                      {column.title}
                      {column.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                      {column.tooltipText && (
                        <Tooltip text={column.tooltipText}>
                          <div className="ml-2 cursor-pointer text-emphasis-on_surface-medium">
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
            <tbody className="bg-surface-light-background">
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${
                    selectedRows.includes(row.id)
                      ? "bg-custom-blue-200"
                      : index % 2 === 0
                      ? "bg-custom-neutral-0"
                      : "bg-custom-neutral-100"
                  }`}>
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className={`px-3 py-6 text-base font-normal ${
                        column.type === "button" ? "text-center" : "text-left"
                      }`}>
                      {column.type === "textInput" ? (
                        <>
                          <TextInput
                            label=""
                            placeholder={column.placeholder}
                            value={inputValues[row.id]?.[column.accessor] || ""}
                            onChange={(e) =>
                              handleInputChange(row.id, column.accessor, e)
                            }
                            isRequired={column.required}
                            errorMessage={errors[row.id]?.[column.accessor]}
                          />
                          {errors[row.id] &&
                            errors[row.id][column.accessor] && (
                              <span className="text-custom-red-500 text-sm">
                                {errors[row.id][column.accessor]}
                              </span>
                            )}
                        </>
                      ) : column.type === "dropdown" ? (
                        <>
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
                            isRequired={column.required}
                            errorMessage={errors[row.id]?.[column.accessor]}
                          />
                          {errors[row.id] &&
                            errors[row.id][column.accessor] && (
                              <span className="text-custom-red-500 text-sm">
                                {errors[row.id][column.accessor]}
                              </span>
                            )}
                        </>
                      ) : column.type === "dropdown API" ? (
                        <>
                          <Dropdown
                            options={column.options.map((option) => ({
                              value: option.value,
                              label: option.label,
                            }))}
                            placeholder="Pilih Opsi"
                            value={inputValues[row.id]?.[column.accessor] || ""}
                            onSelect={(value) => {
                              handleInputChange(row.id, column.accessor, value);
                              column.onChange(value);
                              console.log(row.id);
                            }}
                            isRequired={column.required}
                            errorMessage={errors[row.id]?.[column.accessor]}
                          />
                          {errors[row.id] &&
                            errors[row.id][column.accessor] && (
                              <span className="text-custom-red-500 text-sm">
                                {errors[row.id][column.accessor]}
                              </span>
                            )}
                        </>
                      ) : column.type === "iconButton" ? (
                        <Button
                          size="Small"
                          variant="outlined_icon"
                          iconLeft={<column.icon />}
                          onClick={() =>
                            column.onClick
                              ? column.onClick(row)
                              : console.log(
                                  `Clicked icon button on row ${row.id}`
                                )
                          }
                        />
                      ) : column.type === "checkbox" ? (
                        <Checkbox
                          label=""
                          checked={
                            inputValues[row.id]?.[column.accessor] || false
                          }
                          onChange={(checked) => {
                            column.onChange(row, checked);
                            handleCheckboxChange(row.id, checked);
                          }}
                        />
                      ) : column.type === "button" ? (
                        <div className="flex justify-center">
                          <Button
                            size="Small"
                            variant="solid_blue"
                            onClick={() => column.onClick(row)}>
                            {column.buttonLabel}
                          </Button>
                        </div>
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
