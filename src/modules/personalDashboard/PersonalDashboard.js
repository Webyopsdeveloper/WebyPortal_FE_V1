import React, { useState, useEffect } from "react";
import { Flex, Text, Button, VStack, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { SiGooglesheets } from "react-icons/si";
import { PiHardDrivesFill } from "react-icons/pi";
import {
  AiFillFolder,
  AiFillFolderOpen,
  AiFillFileExcel,
} from "react-icons/ai";
import { VscRefresh } from "react-icons/vsc";
import * as XLSX from "xlsx";
import Constants from "../../utils/constants";
import ModuleTabBar from "../../utils/components/ModuleTabBar";
import { toast } from "react-toastify";

const PersonalDashboard = () => {
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [isRootFolderOpen, setIsRootFolderOpen] = useState(false);

  const downloadExcel = (sheetData, sheetName) => {
    console.log("Sheet data:", sheetData); // Log the sheetData
    console.log("Sheet name:", sheetName); // Log the sheetName

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);
  };

  const fetchSheetsData = () => {
    axios
      .get(`${Constants.API_URL}/api/get_google_drive_info/`)
      .then((response) => {
        console.log("Response:", response.data);
        setSheets(response.data.sheet_info);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("There was an error fetching the data.");
        setLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    fetchSheetsData(); // Fetch data if not available
  }, []);

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleRefresh = () => {
    // Force a new API request to refresh the data
    setLoading(true);
    setIsError(false);
    setIsRootFolderOpen(false);
    setOpenSubmenus({});
    fetchSheetsData();
  };

  return (
    <Flex
      direction="column"
      w="100%"
      style={{
        height: "calc(100vh - 80px)",
      }}
    >
      <ModuleTabBar paramIndex={3} />
      <VStack
        spacing={4}
        align="stretch"
        style={{
          height: "calc(100vh - 80px)",
        }}
        w={"full"}
      >
        {loading ? (
          <Spinner size="xl" alignSelf="center" mt="10" />
        ) : isError ? (
          <Text alignSelf="center" mt="10">
            There was an error fetching the data.
          </Text>
        ) : (
          <Flex w="100%" h="100%" mt="10" justify="flex-start">
            <Sidebar
              breakPoint="md"
              style={{
                marginRight: "2rem",
                height: "100vh",
              }}
            >
              <Menu>
                <SubMenu label="My Sheets Options" icon={<SiGooglesheets />}>
                  <MenuItem> Candidate Info </MenuItem>
                  <MenuItem> TODO </MenuItem>
                  <MenuItem> Schedule </MenuItem>
                </SubMenu>
                <MenuItem icon={<PiHardDrivesFill />}> My Drives </MenuItem>
              </Menu>
            </Sidebar>

            <Flex direction="column" w="100%" h="100%">
              <Flex justifyContent={"center"} w={"50%"}>
                <VscRefresh
                  size="2em"
                  onClick={handleRefresh}
                  cursor="pointer"
                />
              </Flex>
              <Menu
                style={{
                  width: "50%",
                }}
              >
                <SubMenu
                  label="Root Folder"
                  icon={
                    isRootFolderOpen ? <AiFillFolderOpen /> : <AiFillFolder />
                  }
                  onOpenChange={() => setIsRootFolderOpen(!isRootFolderOpen)}
                >
                  {sheets.map((sheet, index) => {
                    if (sheet["Folder Names"].length === 0) {
                      return (
                        <MenuItem icon={<AiFillFileExcel />} key={index}>
                          <Flex direction="row" justify="space-between">
                            {sheet["Sheet Name"]}
                            <Flex>
                              <Button
                                colorScheme="purple"
                                size="sm"
                                borderRadius="full"
                                mr="2"
                                onClick={() => {
                                  window.open(
                                    sheet["Sheet Info"][0]["sheet_url"],
                                    "_blank",
                                    "noopener,noreferrer"
                                  );
                                }}
                              >
                                {"View " + sheet["Sheet Info"][0]["sheet_name"]}
                              </Button>
                              <Button
                                colorScheme="telegram"
                                size="sm"
                                borderRadius="full"
                                mr="2"
                                onClick={() => {
                                  downloadExcel(
                                    sheet["Sheet Info"][0]["sheet_data"],
                                    `${sheet["Sheet Name"]}_${sheet["Sheet Info"][0]["sheet_name"]}`
                                  );
                                }}
                              >
                                {"Download " +
                                  sheet["Sheet Info"][0]["sheet_name"]}
                              </Button>
                            </Flex>
                          </Flex>
                        </MenuItem>
                      );
                    }
                  })}
                </SubMenu>
              </Menu>

              <Menu
                style={{
                  width: "50%",
                }}
              >
                {sheets.map((sheet, index) => {
                  if (sheet["Folder Names"].length !== 0) {
                    return (
                      <SubMenu
                        label={
                          sheet["Folder Names"][0] === ""
                            ? "/root folder"
                            : sheet["Folder Names"][0]
                        }
                        key={index}
                        icon={
                          openSubmenus[index] ? (
                            <AiFillFolderOpen />
                          ) : (
                            <AiFillFolder />
                          )
                        }
                        onOpenChange={() => toggleSubmenu(index)}
                      >
                        {sheet["Sheet Info"].map((info, infoIndex) => (
                          <MenuItem icon={<AiFillFileExcel />} key={infoIndex}>
                            <Flex direction="row" justify="space-between">
                              {sheet["Sheet Name"]}
                              <Flex>
                                <Button
                                  colorScheme="purple"
                                  size="sm"
                                  borderRadius="full"
                                  mr="2"
                                  onClick={() => {
                                    window.open(
                                      info["sheet_url"],
                                      "_blank",
                                      "noopener,noreferrer"
                                    );
                                  }}
                                >
                                  {"View " + info["sheet_name"]}
                                </Button>
                                <Button
                                  colorScheme="telegram"
                                  size="sm"
                                  borderRadius="full"
                                  mr="2"
                                  onClick={() => {
                                    downloadExcel(
                                      info["sheet_data"],
                                      `${sheet["Sheet Name"]}_${info["sheet_name"]}`
                                    );
                                  }}
                                >
                                  {"Download " + info["sheet_name"]}
                                </Button>
                              </Flex>
                            </Flex>
                          </MenuItem>
                        ))}
                      </SubMenu>
                    );
                  }
                })}
              </Menu>
            </Flex>
          </Flex>
        )}
      </VStack>
    </Flex>
  );
};

export default PersonalDashboard;
