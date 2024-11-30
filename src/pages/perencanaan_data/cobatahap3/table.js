import React, { useState, useEffect } from "react";
import TextInput from "../../../components/input";
import Dropdown from "../../../components/dropdown";
import Button from "../../../components/button";
import Checkbox from "../../../components/checkbox";
import Image from "next/image";
import Tooltip from "../../../components/tooltip";
import useStore from "./store";

const Table = ({ columns, data, setParentState }) => {
  const store = useStore ? useStore() : {};
  const { checkedValue = [] } = store;

  const [inputValues, setInputValues] = useState(
    data.reduce((acc, row) => {
      acc[row.id] = { checkbox: checkedValue.includes(row.id) };
      return acc;
    }, {})
  );
  console.log("store is called", checkedValue);
  const [errors, setErrors] = useState(
    data.reduce((acc, row) => {
      acc[row.id] = {};
      return acc;
    }, {})
  );
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setInputValues((prev) => {
      const updatedValues = { ...prev };
      checkedValue.forEach((id) => {
        updatedValues[id] = {
          ...updatedValues[id],
          checkbox: true,
        };
      });
      return updatedValues;
    });
  }, [checkedValue]);

  const handleInputChange = (rowId, columnAccessor, value) => {
    const dropdownFields = [
      "kelompok_material",
      "kelompok_peralatan",
      "provincies_id",
      "kabupaten_kota",
      "cities_id",
    ];

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

  // Consolidate checkbox logic into one function
  const handleCheckboxChange = (rowId, checked) => {
    const updatedInputValues = {
      ...inputValues,
      [rowId]: { checkbox: checked },
    };
    setInputValues(updatedInputValues);
    setParentState(updatedInputValues); // Propagate to parent state

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

  console.log("input terpanggil cuy", inputValues);

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
                              src={`/images/question_mark.svg`}
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
                              handleInputChange(
                                row.id,
                                column.accessor,
                                e.target.value
                              )
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
                      ) : column.type === "checkbox" ? (
                        <Checkbox
                          label=""
                          checked={inputValues[row.id]?.checkedValue || false}
                          onChange={(checked) => {
                            column.onChange(row, checked);
                            handleCheckboxChange(row.id, checked);
                          }}
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