import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  Button,
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  Image,
  Card,
  Spinner,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Constants from "../../utils/constants";
import ModuleTabBar from "../../utils/components/ModuleTabBar";

const PersonalExpenseTrackerPage = () => {
  const navigate = useNavigate();
  const initialFields = [
    { id: "merchant-name", name: "Merchant name", value: "" },
    { id: "merchant-address", name: "Merchant Add.", value: "" },
    { id: "receipt-number", name: "Receipt No.", value: "" },
    { id: "items-purchased", name: "Items purchased", value: "" },
    { id: "total-amount", name: "Total Amount", value: "" },
  ];
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const [fields, setFields] = useState(initialFields);
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(
    JSON.parse(localStorage.getItem("uploadedImages")) || []
  );

  useEffect(() => {
    if (
      localStorage.getItem("previousTaskData") === null ||
      localStorage.getItem("previousTaskData") === undefined
    ) {
      localStorage.setItem(
        "previousTaskData",
        JSON.stringify({ uploadedImages: [], extractedData: {} })
      );
    } else {
      setUploadedImages(
        JSON.parse(localStorage.getItem("previousTaskData"))["uploadedImages"]
      );
    }
  }, []);

  const handleDrag = (event) => {
    event.dataTransfer.setData("text", event.target.textContent);
  };

  const handleDropEnd = (event, index) => {
    event.preventDefault();
    const extractedText = event.dataTransfer.getData("text");
    const updatedFields = [...fields];
    updatedFields[index].value = [...updatedFields[index].value, extractedText];
    setFields(updatedFields);
  };

  const handleButtonClick = () => {
    // Trigger the hidden file input when the button is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files.length === 0) return;
    const file = event.target.files[0];
    const allowedImageFormats = ["image/jpeg", "image/png", "image/gif"];
    if (allowedImageFormats.includes(file.type)) {
      setSelectedFile(file);
      console.log("Selected file:", file);
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages([...uploadedImages, imageUrl]);
      const newData = {
        uploadedImages: [...uploadedImages, imageUrl],
        extractedData: extractedData,
      };
      localStorage.setItem("previousTaskData", JSON.stringify(newData));
    } else {
      toast.error(
        "Invalid image format. Please upload a JPEG, JPG or PNG file.",
        {
          position: toast.POSITION.BOTTOM_LEFT,
        }
      );
    }
  };

  const handleProcessImage = () => {
    if (selectedFile) {
      setIsProcessing(true);
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Make the API call using Axios
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/extract/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          // Handle the response here
          // Display the extracted_text using toast notification
          // const { extracted_text } = response.data;
          // console.log(extracted_text);
          // setExtractedText(extracted_text);
          console.log(response.data);
          setExtractedData(response.data);
          toast.success("Done!", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error processing the image. Please try again later.", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        })
        .finally(() => {
          setIsProcessing(false); // Set to false when processing is completed
        });
    } else {
      toast.error("Please upload an image file before processing.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const handleSaveData = () => {
    // Make the API call using Axios
    axios({
      method: "post",
      url: `${Constants.API_URL}/api/receipts/`,
      headers: { "Content-Type": "application/json" },
      data: {
        merchant_name: fields[0].value.toString(),
        merchant_address: fields[1].value.toString(),
        receipt_number: fields[2].value.toString(),
        items_purchased: fields[3].value.toString(),
        total_amount: fields[4].value.toString(),
      },
    }).then((response) => {
      if (response.status === 201 || response.status === 200) {
        if (response.data) {
          console.log(response);
          toast.success("Data saved!", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("Error saving data!", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      } else {
        toast.error("Network error!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };

  const handleMenuItemClick = (index) => {
    navigate("/previousTask");
  };

  return (
    <Flex
      direction={"column"}
      w={"full"}
      style={{
        height: "calc(100vh - 80px)",
      }}
    >
      <ModuleTabBar paramIndex={1} />
      <Flex justifyContent={"center"} mt={"20"}>
        <Button
          mx={"10"}
          colorScheme="purple"
          borderRadius={"full"}
          onClick={handleButtonClick}
        >
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          Upload File
        </Button>
        <Button
          mx={"10"}
          borderRadius={"full"}
          colorScheme={selectedFile ? "purple" : "gray"}
          onClick={handleProcessImage}
          isLoading={isProcessing}
        >
          Process Image
        </Button>
      </Flex>

      <Flex justifyContent={"center"} mt={"20"}>
        {selectedFile && (
          <Card
            variant={"elevated"}
            h={"-webkit-fit-content"}
            w={"20%"}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
            mx={"10"}
          >
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                w={"70%"}
                alignSelf={"center"}
              />
            )}
          </Card>
        )}
        {extractedData && (
          <Card
            variant={"elevated"}
            w={"40%"}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
            p={"10"}
            whiteSpace="pre-line"
            mx={"10"}
            style={{ cursor: "pointer" }}
            onClick={handleMenuItemClick}
          >
            {extractedData["extracted_text"].split("\n").map((line, index) => (
              <span
                key={index}
                draggable
                onDragStart={(e) => handleDrag(e, line)}
                style={{ cursor: "grab", whiteSpace: "pre-wrap" }}
              >
                {line}
              </span>
            ))}
          </Card>
        )}
        {extractedData && (
          <Flex direction={"column"} alignItems={"start"} w={"35%"} mx={"10"}>
            {Object.entries(extractedData).map(
              ([key, value], index) =>
                key !== "extracted_text" && (
                  <Text key={index} mb={2}>
                    <b>{key}:</b>{" "}
                    {
                      <span
                        draggable
                        onDragStart={(e) => handleDrag(e, 1)}
                        style={{ cursor: "grab", whiteSpace: "pre-wrap" }}
                      >
                        {value}
                      </span>
                    }
                  </Text>
                )
            )}
            <Table
              variant="simple"
              borderWidth="thin"
              borderColor="gray.300"
              colorScheme="black"
              h={"20%"}
            >
              <Tbody>
                {fields.map((field, index) => (
                  <Tr key={field.name}>
                    <Td borderTopWidth="1px" borderRightWidth="1px">
                      {field.name}
                    </Td>
                    <Td
                      onDrop={(e) => handleDropEnd(e, index)}
                      onDragOver={(e) => e.preventDefault()}
                      borderTopWidth="1px"
                    >
                      {field.value}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Button
              my={"10"}
              w={"full"}
              borderRadius={"full"}
              colorScheme={"purple"}
              onClick={handleSaveData}
            >
              Save Data
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default PersonalExpenseTrackerPage;
