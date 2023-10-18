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
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import Constants from "../../utils/constants";

const CandidateView = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [trainingData, setTrainingData] = useState([]);
  const [documentsData, setDocumentsData] = useState([]);
  const [scheduleMeetingData, setscheduleMeetingData] = useState([]);
  const [personalData, setPersonalData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(false);
  const [isScheduleMeetingLoading, setIsScheduleMeetingLoading] =
    useState(false);
  const [isPersonalDataLoading, setIsPersonalDataLoading] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const fetchDocumentsData = async () => {
    setIsLoading(true);
    await axios
      .get(`${Constants.API_URL}/api/documents`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setDocumentsData(res.data);
        setIsDocumentsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsDocumentsLoading(false);
      });
  };
  const fetchScheduleMeetingData = async () => {
    setIsLoading(true);
    await axios
      .get(`${Constants.API_URL}/api/scheduleMeeting`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setscheduleMeetingData(res.data);
        setIsScheduleMeetingLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsScheduleMeetingLoading(false);
      });
  };
  const fetchTrainingData = async () => {
    setIsLoading(true);
    await axios
      .get(`${Constants.API_URL}/api/candidateTraining`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setTrainingData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const fetchPersonalData = async () => {
    setIsLoading(true);
    await axios
      .get(`${Constants.API_URL}/api/personal-data`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setPersonalData(res.data);
        setIsPersonalDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPersonalDataLoading(false);
      });
  };

  useEffect(() => {
    fetchTrainingData();
    fetchDocumentsData();
    fetchScheduleMeetingData();
    fetchPersonalData();
  }, []);

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
          h={"full"}
          direction={"column"}
          justifyContent={"space-between"}
          alignItems={"start"}
          mt={"5"}
          p={"10"}
        >
          <Box w={"full"} h={"fit-content"} mb={"5"}>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              bg={"green"}
              color={"white"}
            >
              Training to be completed
            </Text>
            {isLoading ? (
              <Text my={"10"}>Loading...</Text>
            ) : (
              <Table variant="simple" colorScheme="teal">
                <Tbody>
                  {trainingData.map((training) => (
                    <Tr>
                      <Td>{training.id}</Td>
                      <Td>{training.name}</Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            window.open(training.link, "_blank");
                          }}
                        >
                          Start Here
                        </Button>
                      </Td>
                      <Td>{training.status}</Td>
                      <Td>{training.comment}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
            {isLoading === false && trainingData.length === 0 ? (
              <Text my={"10"} alignSelf={"center"}>
                Data not found
              </Text>
            ) : null}
          </Box>
          <Box w={"full"} h={"fit-content"}>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              bg={"green"}
              color={"white"}
            >
              Documentations and Links
            </Text>
            {isDocumentsLoading ? (
              <Text my={"10"}>Loading...</Text>
            ) : (
              <Table variant="simple" colorScheme="teal">
                <Tbody>
                  {documentsData.map((document) => (
                    <Tr>
                      <Td>{document.id}</Td>
                      <Td>{document.title}</Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            window.open(document.link, "_blank");
                          }}
                        >
                          Start Here
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
            {isDocumentsLoading === false && documentsData.length === 0 ? (
              <Text my={"10"} alignSelf={"center"}>
                Data not found
              </Text>
            ) : null}
          </Box>
        </Flex>
        <Flex
          h={"full"}
          direction={"column"}
          justifyContent={"space-between"}
          alignItems={"start"}
          mt={"5"}
          p={"10"}
        >
          <Box w={"full"} h={"fit-content"} mb={"5"}>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              bg={"green"}
              color={"white"}
            >
              Personal Data
            </Text>
            {isPersonalDataLoading ? (
              <Text my={"10"}>Loading...</Text>
            ) : (
              <Table variant="simple" colorScheme="teal">
                <Tbody>
                  {personalData.map((data) => (
                    <Tr key={data.id}>
                      <Td>{data.title}</Td>
                      <Td>{data.template_view}</Td>
                      <Td>
                        <Button colorScheme="teal" variant="outline" size="sm">
                          Upload
                        </Button>
                      </Td>
                      <Td>{data.action_type}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
            {isPersonalDataLoading === false && personalData.length === 0 ? (
              <Text my={"10"} alignSelf={"center"}>
                Data not found
              </Text>
            ) : null}
          </Box>
          <Box w={"full"} h={"fit-content"}>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              bg={"green"}
              color={"white"}
            >
              Schedule meeting with us
            </Text>
            {isScheduleMeetingLoading ? (
              <Text my={"10"}>Loading...</Text>
            ) : (
              <Table variant="simple" colorScheme="teal">
                <Tbody>
                  {scheduleMeetingData.map((meeting) => (
                    <Tr>
                      <Td>{meeting.id}</Td>
                      <Td>{meeting.title}</Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            window.open(meeting.link, "_blank");
                          }}
                        >
                          Start Here
                        </Button>
                      </Td>
                      <Td>{meeting.contact}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
            {isScheduleMeetingLoading === false &&
            scheduleMeetingData.length === 0 ? (
              <Text my={"10"} alignSelf={"center"}>
                Data not found
              </Text>
            ) : null}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CandidateView;
