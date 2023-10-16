import {
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { FaList, FaRegHeart } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

const CandidateView = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <Flex
      w={"full"}
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
      justifyContent={"start"}
      alignItems={"center"}
    >
      <Sidebar
        collapsed={menuCollapse}
        style={{
          minHeight: "calc(100vh - 80px)",
          backgroundColor: "white",
        }}
      >
        <Flex
          className="closemenu"
          onClick={menuIconClick}
          justifyContent={"center"}
          alignItems={"center"}
          mt={"5"}
        >
          {/* changing menu collapse icon on click */}

          {menuCollapse ? (
            <FiArrowRightCircle size={"30px"} />
          ) : (
            <FiArrowLeftCircle size={"30px"} />
          )}
        </Flex>

        <Menu
          iconShape="square"
          color="white"
          style={{
            marginTop: "20px",
          }}
        >
          <MenuItem active={true} icon={<FiHome />}>
            Home
          </MenuItem>
          <MenuItem icon={<FaList />}>Person Data</MenuItem>
          <MenuItem icon={<FaRegHeart />}>Training Data</MenuItem>
          <MenuItem icon={<RiPencilLine />}>Interview Mocking</MenuItem>
          <MenuItem icon={<BiCog />}>Assessments</MenuItem>
          <MenuItem icon={<BiCog />}>Job Posting</MenuItem>
          <MenuItem icon={<BiCog />}>Recents</MenuItem>
        </Menu>
      </Sidebar>

      <Flex
        style={{
          minHeight: "calc(100vh - 80px)",
        }}
        justifyContent={"start"}
        alignItems={"start"}
      >
        <Flex
          flex={"1"}
          h={"full"}
          direction={"column"}
          justifyContent={"space-between"}
          alignItems={"start"}
          mt={"5"}
          p={"10"}
        >
          <Box>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              bg={"green"}
              color={"white"}
            >
              Training to be completed
            </Text>
            <Table variant="simple" colorScheme="teal">
              <Tbody>
                <Tr>
                  <Td>LIN001</Td>
                  <Td>LInux Basic Training</Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Start Here
                    </Button>
                  </Td>
                  <Td>candidate enter status</Td>
                  <Td>Comments</Td>
                </Tr>
                <Tr>
                  <Td>LIN001</Td>
                  <Td>LInux Basic Training</Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Start Here
                    </Button>
                  </Td>
                  <Td>candidate enter status</Td>
                  <Td>Comments</Td>
                </Tr>
                <Tr>
                  <Td>LIN001</Td>
                  <Td>LInux Basic Training</Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Start Here
                    </Button>
                  </Td>
                  <Td>candidate enter status</Td>
                  <Td>Comments</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
          <Box w={"full"}>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              bg={"green"}
              color={"white"}
            >
              Documentations and Links
            </Text>
            <Table variant="simple" colorScheme="teal">
              <Tbody>
                <Tr>
                  <Td>Pythong e books </Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Start Here
                    </Button>
                  </Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Mocking Interview for Python </Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Start Here
                    </Button>
                  </Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Mocking Interview for SQL </Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Start Here
                    </Button>
                  </Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Mocking Interview for Linux </Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Start Here
                    </Button>
                  </Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Flex>
        <Flex
          flex={"1"}
          h={"full"}
          direction={"column"}
          justifyContent={"space-between"}
          alignItems={"start"}
          mt={"5"}
          p={"10"}
        >
          <Box>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              bg={"green"}
              color={"white"}
            >
              Personal Data
            </Text>
            <Table variant="simple" colorScheme="teal">
              <Tbody>
                <Tr>
                  <Td>Personal Details</Td>
                  <Td>Template View</Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Upload
                    </Button>
                  </Td>
                  <Td>ActionType</Td>
                </Tr>
                <Tr>
                  <Td>Resume</Td>
                  <Td>Template View</Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Upload
                    </Button>
                  </Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Visa Staus</Td>
                  <Td></Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Upload
                    </Button>
                  </Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>DL Copy</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Other Docs</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
          <Box>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              bg={"green"}
              color={"white"}
            >
              Schedule meeting with us
            </Text>
            <Table variant="simple" colorScheme="teal">
              <Tbody>
                <Tr>
                  <Td>Office Hours</Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Zoom Link
                    </Button>
                  </Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Schedule meeting with us</Td>
                  <Td>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      Click Here
                    </Button>
                  </Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Marketing Team</Td>
                  <Td>
                    <Button colorScheme="teal" variant="link" size="sm">
                      mtailor2002@gmail.com
                    </Button>
                  </Td>
                  <Td>
                    <Button colorScheme="teal" variant="link" size="sm">
                      +19999999999
                    </Button>
                  </Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>HR Team</Td>
                  <Td>
                    <Button colorScheme="teal" variant="link" size="sm">
                      mtailor@gmail.com
                    </Button>
                  </Td>
                  <Td>
                    <Button colorScheme="teal" variant="link" size="sm">
                      +19999999999
                    </Button>
                  </Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CandidateView;
