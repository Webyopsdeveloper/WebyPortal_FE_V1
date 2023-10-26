import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Flex, HStack, VStack } from "@chakra-ui/react";

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
    <Flex
      direction="column"
      w={"full"}
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
      justifyContent={"start"}
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

      <HStack justifyContent="center">
        {/* Excel Card */}
        <VStack
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
        </VStack>
        {/* Image Card */}
        <VStack
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
        </VStack>
        <VStack
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
        </VStack>
        <VStack
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
        </VStack>
      </HStack>
    </Flex>
  );
};
export default Dashboard;

{
  /*  */
}
