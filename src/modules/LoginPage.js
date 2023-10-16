import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  Heading,
  Text,
  Divider,
  Icon,
  Stack,
  Image,
  Container,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { Link } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { UserContext } from "../utils/provider/UserProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AppBar from "../utils/components/AppBar";
import WoUnleash from "../assets/wo-unleash.jpg";
import axios from "axios";
import Constants from "../utils/constants";

function Login({
  userInformationExists,
  setUserInformationExists,
  setLoggedInUser,
}) {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function (event) {
      window.history.go(1);
    };
    window.onbeforeunload = function () {
      return false;
    };
    return () => {
      // Clean up and re-enable the forward button when the component is unmounted
      window.onpopstate = null;
      window.onbeforeunload = null;
    };
  }, []);
  //user provider
  const initialValues = {
    email: "",
    password: "",
  };
  const { users } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values) => {
    console.table(values);
    axios
      .post(`${Constants.API_URL}/api/login/`, values, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        // If the user is authenticated, set the loggedInUser in localStorage
        if (response.data["message"] === "password incorrect") {
          toast.error("Password incorrect", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          return;
        }

        if (response.data["message"] === "user does not exist") {
          toast.error("User does not exist", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          return;
        }

        if (response.data["message"] === "all correct") {
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(response.data["user_data"])
          );
          setUserInformationExists(true);
          setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
          toast.success("You have successfully logged in.", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(`There was an error logging you in. ${error}`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };
  return (
    <Flex
      w={"full"}
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
      direction="column"
      align={"center"}
      justify={"center"}
      bgImage={WoUnleash}
      bgSize={"cover"}
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg="white"
        py={12}
        px={"12"}
        rounded="md"
        boxShadow="lg"
      >
        <Heading alignSelf="flex-start">Welcome</Heading>
        <Text mb={6} color="grey" alignSelf="flex-start">
          Please login to continue
        </Text>
        <Box bg="white" rounded="md" w={"35vw"}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
            }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color={"white"}>
                        <Icon as={EmailIcon} bgSize={"cover"} color="black" />
                      </InputLeftElement>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color={"white"}>
                        <Icon
                          as={LockIcon}
                          bgSize={"cover"}
                          size
                          color="black"
                        />
                      </InputLeftElement>
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        variant="filled"
                        placeholder="Enter your password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <InputRightElement>
                        <Icon
                          as={showPassword ? ViewOffIcon : ViewIcon}
                          cursor="pointer"
                          onClick={handlePasswordVisibility}
                          color="gray.400"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <Button type="submit" colorScheme="purple" w="full">
                    Login
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
        <Divider my={4} mt={10} />
        <Text
          as="span"
          fontSize="md"
          fontWeight="bold"
          color="gray.500"
          position="relative"
          top="-30px"
          bg="white"
          px="4"
        >
          or
        </Text>
        <Button
          onClick={() => {
            console.log("clicked");
          }}
          colorScheme="grey"
          w="36"
          variant="outline"
          leftIcon={<BsGoogle />}
        >
          Google
        </Button>
        <Flex align="center" justify="center" w="full" mt={5}>
          <Text color="grey" mr={2}>
            Don't have an account?
          </Text>
          <Link
            to="/sign-up"
            style={{
              color: "blue",
            }}
          >
            Sign Up
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Login;
