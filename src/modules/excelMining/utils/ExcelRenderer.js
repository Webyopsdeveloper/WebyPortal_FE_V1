import React, { Component } from "react";
import * as XLSX from "xlsx"; // Import all exports from 'xlsx'

export const OutTable = (props) => {
  const {
    className,
    tableClassName,
    tableHeaderRowClass,
    withZeroColumn,
    withoutRowNum,
    data,
    renderRowNum,
  } = props;

  return (
    <div className={className}>
      <table style={tableStyles} className={tableClassName}>
        <thead>
          <tr>
            {withZeroColumn && !withoutRowNum && (
              <th
                style={headerCellStyle}
                className={tableHeaderRowClass || ""}
              ></th>
            )}
            {data[0].map((_, colIndex) => (
              <th key={colIndex} style={headerCellStyle}>
                {props.columns[colIndex].name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {!withoutRowNum && (
                <td style={cellStyle} className={tableHeaderRowClass}>
                  {renderRowNum ? renderRowNum(row, rowIndex) : rowIndex}
                </td>
              )}
              {row.map((cell, colIndex) => (
                <td key={colIndex} style={cellStyle}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Inline CSS variables for different table components
const tableStyles = {
  borderCollapse: "collapse",
  width: "100%",
  marginTop: "20px",
};

const headerCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#f2f2f2",
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "white",
};

export function ExcelRenderer(file, callback) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    var rABS = !!reader.readAsBinaryString;
    reader.onload = function (e) {
      /* Parse data */
      var bstr = e.target.result;
      var wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

      /* Get first worksheet */
      var wsname = wb.SheetNames[0];
      var ws = wb.Sheets[wsname];

      /* Convert array of arrays */
      var json = XLSX.utils.sheet_to_json(ws, { header: 1 });
      var cols = make_cols(ws["!ref"]);

      var data = { rows: json, cols: cols };

      resolve(data);

      // Check if the callback is a function before calling it
      if (typeof callback === "function") {
        callback(null, data);
      }
    };

    reader.onerror = function (error) {
      // Reject the Promise if there's an error with FileReader
      reject(error);
      // Check if the callback is a function before calling it with the error
      if (typeof callback === "function") {
        callback(error, null);
      }
    };

    if (file && rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  });
}

function make_cols(refstr) {
  var o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) {
    o[i] = { name: XLSX.utils.encode_col(i), key: i };
  }
  return o;
}
