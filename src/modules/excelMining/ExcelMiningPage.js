import Dropzone from "react-dropzone";
import { ExcelRenderer } from "./utils/ExcelRenderer";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import ModuleTabBar from "../../utils/components/ModuleTabBar";

const ExcelMiningPage = () => {
  const navigate = useNavigate();

  const [excelData, setExcelData] = useState(null);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const allowedExcelFormats = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (allowedExcelFormats.includes(file.type)) {
      ExcelRenderer(file)
        .then((data) => {
          setExcelData(data);
          navigate("/excel-render", {
            state: data,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            "Error processing Excel file. Please make sure you uploaded the correct format.",
            {
              position: toast.POSITION.BOTTOM_LEFT,
            }
          );
        });
    } else {
      toast.error("Invalid Excel format. Please upload a .xlsx or .xls file.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  return (
    <Flex
      direction={"column"}
      w={"full"}
      style={{
        height: "calc(100vh - 80px)",
      }}
    >
      <ModuleTabBar paramIndex={0} />

      <Dropzone onDrop={handleDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag &amp; drop or click to upload an Excel file (.xlsx)</p>
          </div>
        )}
      </Dropzone>
    </Flex>
  );
};

export default ExcelMiningPage;
