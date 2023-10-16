import React, { useContext, useState } from "react";
import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { Link } from "react-router-dom";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { UserContext } from "../utils/provider/UserProvider";
import WoUnleash from "../assets/wo-unleash.jpg";
import axios from "axios";
import Constants from "../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  // User provider
  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    reset_question: "",
    reset_answer: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values) => {
    console.table(values);
    axios
      .post(`${Constants.API_URL}/api/register/`, values)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // if (res.status === 200) {
        //   if (res.data["response"] === "created") {
        //     console.log(res.data);
        if (res.data["message"] === "already exist") {
          toast.error(`User already exists.`, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }

        if (res.data["message"] === "created") {
          toast.success("User registered successfully!", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          navigate("/login");
        }
        // } else {
        //   toast.error(`There was an error registering the user.`, {
        //     position: toast.POSITION.BOTTOM_LEFT,
        //   });
        // }
        // }
      })
      .catch((error) => {
        console.log(error);
        toast.error(`There was an error registering the user. ${error}`, {
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
        align="center"
        justify="center"
        bg="white"
        py={"12"}
        px={"12"}
        rounded="md"
        boxShadow="lg"
        my={12}
        overflow={"hidden"}
      >
        <Heading alignSelf="flex-start">Sign Up</Heading>
        <Text mb={6} color="gray" alignSelf="flex-start">
          Create an account to get started
        </Text>
        <Box bg="white" rounded="md" w="43vw">
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

                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color={"white"}>
                        <Icon as={EmailIcon} bgSize={"cover"} color="black" />
                      </InputLeftElement>
                      <Input
                        id="first_name"
                        name="first_name"
                        type="text"
                        variant="filled"
                        placeholder="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color={"white"}>
                        <Icon as={EmailIcon} bgSize={"cover"} color="black" />
                      </InputLeftElement>
                      <Input
                        id="last_name"
                        name="last_name"
                        type="text"
                        variant="filled"
                        placeholder="Last Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color={"white"}>
                        <Icon as={EmailIcon} bgSize={"cover"} color="black" />
                      </InputLeftElement>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        variant="filled"
                        placeholder="Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color={"white"}>
                        <Icon as={EmailIcon} bgSize={"cover"} color="black" />
                      </InputLeftElement>
                      <Input
                        id="phone_number"
                        name="phone_number"
                        type="text"
                        variant="filled"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color={"white"}>
                        <Icon as={EmailIcon} bgSize={"cover"} color="black" />
                      </InputLeftElement>
                      <Input
                        id="reset_question"
                        name="reset_question"
                        type="text"
                        variant="filled"
                        placeholder="Reset Question"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color={"white"}>
                        <Icon as={EmailIcon} bgSize={"cover"} color="black" />
                      </InputLeftElement>
                      <Input
                        id="reset_answer"
                        name="reset_answer"
                        type="text"
                        variant="filled"
                        placeholder="Reset Answer"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </InputGroup>
                  </FormControl>
                  <Button type="submit" colorScheme="purple" w="full">
                    Sign Up
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
        <Divider my={4} mt={10} />
        <Flex align="center" justify="center" w="full" mt={5}>
          <Text color="gray" mr={2}>
            Already have an account?
          </Text>
          <Link
            to="/login"
            style={{
              color: "blue",
            }}
          >
            Log In
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
