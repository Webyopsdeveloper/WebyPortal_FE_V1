import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Flex } from "@chakra-ui/react";

import AppBar from "../utils/components/AppBar";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaMoneyBill } from "react-icons/fa";
import { MdAttachEmail, MdSpaceDashboard } from "react-icons/md";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [extractedData, setExtractedData] = useState(null);

  useEffect(() => {
    // Do whatever you need to do with the logged-in user data
    //disable back button
    window.history.pushState("", "", window.location.href);
    window.onpopstate = function (event) {
      window.history.go(1);
    };
    window.onbeforeunload = function () {
      return false;
    };
  }, []);

  return (
    <Flex direction="column" w={"full"} h={"full"} overflowX={"hidden"}>
      <Flex direction={"row"} align={"center"} mb={"5"}>
        <Flex
          direction="column"
          w={"full"}
          h={"full"}
          justifyContent={"center"}
        >
          <Text
            fontSize={"4xl"}
            fontWeight={"bold"}
            alignSelf={"center"}
            mb={"20"}
            mt={"10"}
          >
            Welcome to Tool Automations Dashboard
          </Text>

          <Flex justifyContent="center">
            {/* Excel Card */}
            <Flex
              flexDirection="column"
              align="center"
              justify="center"
              mx={4}
              p={50}
              border={"1px solid black"}
              borderRadius="md"
              cursor="pointer"
              onClick={() => navigate("/excel-mining")}
            >
              {/* <Avatar size="xl" src="/path/to/excel-image.png" mb={3} /> */}
              <SiMicrosoftexcel
                style={{
                  width: "4rem",
                  height: "4rem",
                }}
              />
              <Text fontWeight="bold" mt={"4"}>
                EXCEL MAGIC MINING
              </Text>
            </Flex>
            {/* Image Card */}
            <Flex
              flexDirection="column"
              align="center"
              justify="center"
              mx={4}
              p={50}
              border={"1px solid black"}
              borderRadius="md"
              cursor="pointer"
              onClick={() => {
                navigate("/personal-expense-tracker");
              }}
            >
              {/* <Avatar size="xl" src="/path/to/image-image.png" mb={3} /> */}
              <FaMoneyBill
                style={{
                  width: "4rem",
                  height: "4rem",
                }}
              />
              <Text fontWeight="bold" mt={"4"}>
                PERSONAL EXPENSE TRACKER
              </Text>
            </Flex>
            <Flex
              flexDirection="column"
              align="center"
              justify="center"
              mx={4}
              p={50}
              border={"1px solid black"}
              borderRadius="md"
              cursor="pointer"
              onClick={() => {
                navigate("/mass-email-sender");
              }}
            >
              {/* <Avatar size="xl" src="/path/to/image-image.png" mb={3} /> */}
              <MdAttachEmail
                style={{
                  width: "4rem",
                  height: "4rem",
                }}
              />
              <Text fontWeight="bold" mt={"4"}>
                MASS EMAIL MARKETING
              </Text>
            </Flex>
            <Flex
              flexDirection="column"
              align="center"
              justify="center"
              mx={4}
              p={50}
              border={"1px solid black"}
              borderRadius="md"
              cursor="pointer"
              onClick={() => {
                navigate("/personal-dashboard");
              }}
            >
              {/* <Avatar size="xl" src="/path/to/image-image.png" mb={3} /> */}
              <MdSpaceDashboard
                style={{
                  width: "4rem",
                  height: "4rem",
                }}
              />
              <Text fontWeight="bold" mt={"4"}>
                PERSONAL DASHBOARD
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Dashboard;

{
  /* <Sidebar
          // onMouseEnter={(e) => {
          //   //remove collapsed
          //   e.currentTarget.classList.remove("ps-collapsed");
          // }}
          // onMouseLeave={(e) => {
          //   //add collapsed
          //   e.currentTarget.classList.add("ps-collapsed");
          // }}
          >
            <SidebarMenu>
              <SubMenu label="History">
                <SidebarMenuItem> Pie charts </SidebarMenuItem>
                <SidebarMenuItem> Line charts </SidebarMenuItem>
              </SubMenu>
              <SidebarMenuItem> Settings </SidebarMenuItem>
              <SidebarMenuItem> Dashboard </SidebarMenuItem>
            </SidebarMenu>
          </Sidebar> */
}
