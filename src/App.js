import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  Button,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

import Dashboard from "./modules/Dashboard";
import Login from "./modules/LoginPage";
import ExcelRenderPage from "./modules/excelMining/utils/ExcelRenderPage";
import WelcomePage from "./modules/WelcomePage";
import ExcelMiningPage from "./modules/excelMining/ExcelMiningPage";
import MassEmailSender from "./modules/massEmail/MassEmailSender";
import PersonalExpenseTrackerPage from "./modules/personalExpenseTracker/PersonalExpenseTrackerPage";
import AppBar from "./utils/components/AppBar";
import PersonalDashboard from "./modules/personalDashboard/PersonalDashboard";
import ModuleTabBar from "./utils/components/ModuleTabBar";
import SignUp from "./modules/SignupPage";
import ExploreJobs from "./modules/webyopsPages/ExploreJobs";
import AboutUs from "./modules/webyopsPages/AboutUs";
import Services from "./modules/webyopsPages/Services";
import CandidateView from "./modules/candidateView/CandidateView";

function App() {
  const navigate = useNavigate();
  const [userInformationExists, setUserInformationExists] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState({});
  useEffect(() => {
    // Retrieve the logged-in user from localStorage
    if (
      localStorage.getItem("loggedInUser") === null ||
      localStorage.getItem("loggedInUser") === undefined ||
      localStorage.getItem("loggedInUser") === "false"
    ) {
      setUserInformationExists(false);
    } else {
      setUserInformationExists(true);
      setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
    }
  }, []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };
  const onLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast.success("Logout Successfully", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    setUserInformationExists(false);
    closeDrawer();
    navigate("/welcome");
  };

  return (
    <ChakraProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <AppBar
            onHamburgerMenuClick={openDrawer}
            onUserIconClick={openUserModal}
            loggedInUser={userInformationExists}
          />

          <Modal isOpen={isUserModalOpen} onClose={closeUserModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>User Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Table with user information */}
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Full Name</Td>
                      <Td>
                        {loggedInUser.first_name} {loggedInUser.last_name}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Email</Td>
                      <Td>{loggedInUser.email}</Td>
                    </Tr>
                    <Tr>
                      <Td>Address</Td>
                      <Td>{loggedInUser.address}</Td>
                    </Tr>
                    <Tr>
                      <Td>Mobile No.</Td>
                      <Td>{loggedInUser.phone_number}</Td>
                    </Tr>

                    <Tr>
                      <Td>Reset Question</Td>
                      <Td>{loggedInUser.reset_question}</Td>
                    </Tr>
                    <Tr>
                      <Td>Reset Answer</Td>
                      <Td>{loggedInUser.reset_answer}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Drawer isOpen={isDrawerOpen} placement="right" onClose={closeDrawer}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Options</DrawerHeader>
              <DrawerBody>
                <VStack direction={"column"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      navigate("/candidate-view");
                      closeDrawer();
                    }}
                  >
                    <Text>Candidate View</Text>
                  </Button>
                  <Button variant={"ghost"} onClick={openUserModal}>
                    <Text>Profile</Text>
                  </Button>
                  <Button variant={"ghost"}>
                    <Text>History</Text>
                  </Button>
                  <Button variant={"ghost"}>
                    <Text>Settings</Text>
                  </Button>
                  <Button variant={"ghost"}>
                    <Text>Dashboard</Text>
                  </Button>
                </VStack>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  my={"5"}
                  w={"100%"}
                  borderRadius={"full"}
                  variant="solid"
                  colorScheme="purple"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <Routes>
            <Route
              exact
              path="/"
              element={userInformationExists ? <Dashboard /> : <WelcomePage />}
            />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route
              path="/login"
              element={
                <Login
                  setUserInformationExists={setUserInformationExists}
                  setLoggedInUser={setLoggedInUser}
                  userInformationExists={userInformationExists}
                />
              }
            />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/excel-render" element={<ExcelRenderPage />} />
            <Route path="/excel-mining" element={<ExcelMiningPage />} />
            <Route path="/mass-email-sender" element={<MassEmailSender />} />
            <Route
              path="/personal-expense-tracker"
              element={<PersonalExpenseTrackerPage />}
            />
            <Route path="/personal-dashboard" element={<PersonalDashboard />} />
            <Route path="/explore-jobs" element={<ExploreJobs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/candidate-view" element={<CandidateView />} />
            <Route
              path="*"
              element={
                <Flex
                  direction={"column"}
                  h={"calc(100vh - 80px)"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Heading>
                    <Text fontSize={"9xl"}>404</Text>
                  </Heading>
                  <Heading>Oops! That page can’t be found.</Heading>
                  <Text fontSize={"large"}>
                    It looks like nothing was found at this location.
                  </Text>
                  <Button
                    variant="solid"
                    colorScheme="purple"
                    onClick={() => navigate("/")}
                    mt={"5"}
                  >
                    Go to Home
                  </Button>
                </Flex>
              }
            />
          </Routes>
        </div>
      </DndProvider>
    </ChakraProvider>
  );
}

export default App;
