import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaMoneyBill } from "react-icons/fa";
import { MdAttachEmail, MdSpaceDashboard } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModuleTabBar = ({ paramIndex }) => {
  const navigate = useNavigate();
  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="green"
      align={"center"}
      mt={"5"}
      index={paramIndex}
      onChange={(index) => {
        switch (index) {
          case 0:
            navigate("/excel-mining");
            break;
          case 1:
            navigate("/personal-expense-tracker");
            break;
          case 2:
            navigate("/mass-email-sender");
            break;
          case 3:
            navigate("/personal-dashboard");
            break;
          default:
            break;
        }
      }}
    >
      <TabList>
        <Tab>
          <SiMicrosoftexcel
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />
          {paramIndex === 0 && (
            <Text ml={"2"}>
              <b>Excel Mining</b>
            </Text>
          )}
        </Tab>
        <Tab>
          <FaMoneyBill
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />
          {paramIndex === 1 && (
            <Text ml={"2"}>
              <b>Personal Expense Tracker</b>
            </Text>
          )}
        </Tab>
        <Tab>
          <MdAttachEmail
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />
          {paramIndex === 2 && (
            <Text ml={"2"}>
              <b>Mass Email Marketing</b>
            </Text>
          )}
        </Tab>
        <Tab>
          <MdSpaceDashboard
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />
          {paramIndex === 3 && (
            <Text ml={"2"}>
              <b>Personal Dashboard</b>
            </Text>
          )}
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default ModuleTabBar;
