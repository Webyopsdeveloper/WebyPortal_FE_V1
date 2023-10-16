import React, { useState } from "react";
import { Field, Formik } from "formik";
import {
  Alert,
  Box,
  Flex,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
  Input,
  SimpleGrid,
  Button,
  FormControl,
  InputGroup,
  InputRightElement,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import ServiceCover from "../../assets/wo-services.jpg";
import Footer from "../../utils/components/Footer";
import MobileIcon from "../../assets/icons/icons8-coding-64.png";
import BrainIcon from "../../assets/icons/icons8-capability-64.png";
import UiIcon from "../../assets/icons/icons8-wireframe-64.png";
import QualityIcon from "../../assets/icons/icons8-security-64.png";
import AnalyticsIcon from "../../assets/icons/icons8-process-64.png";
import TalentIcon from "../../assets/icons/icons8-skills-64.png";
import DataMonitoring from "../../assets/Data-Monitoring.jpg";
import CCPA from "../../assets/CCPA.jpg";
import Dashboard from "../../assets/Dashboard.jpg";
import WoAi from "../../assets/wo-ai.jpg";
import { FaFlagUsa } from "react-icons/fa";

const Services = () => {
  const isSmallScreen = window.innerWidth < 1000;
  const [searchResults, setSearchResults] = useState([]); // Initialize searchResults state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      // Print the form values to the console
      console.log("Form Values:", values);
    }, 2000);
  };
  return (
    <Flex
      w={"full"}
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
      direction={"column"}
      justify={"space-between"}
    >
      <Box
        w={"full"}
        h={"55vh"}
        bgImage={ServiceCover}
        bgRepeat={"no-repeat"}
        bgPosition={"center"}
        bgAttachment={"fixed"}
        bgSize={"cover"}
        position={"relative"}
      >
        <Box
          bg="rgba(0, 0, 0, 0.4)" // Adjust the opacity as needed
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
        >
          <Text
            color={"white"}
            fontSize={"5xl"}
            fontWeight={"bold"}
            position={"absolute"}
            top={"50%"}
            left={"15%"}
            transform={"translate(-50%, -50%)"}
          >
            Services
          </Text>
        </Box>
      </Box>
      <Box w={"full"} px={40} py={10} mb={"5"}>
        <Text mb={"5"} fontWeight={"bold"} fontSize={"3xl"}>
          Innovative IT Solutions and Services
        </Text>
        <Text mb={"5"}>
          WEBYOPS has been helping businesses adopt and fast-track innovation,
          accelerate time-to-market, drive automation and reduce cost with it’s
          expert IT Solutions and Services.
        </Text>
        <Alert
          status="info"
          bgColor={"gray.800"}
          color={"white"}
          variant={"left-accent"}
          mb={"5"}
          padding={"7"}
        >
          <Flex direction={"column"} justifyContent={"space-around"}>
            <Text mb={"5"} fontSize={"xl"}>
              "There is no alternative to digital transformation. Visionary
              companies will carve out new strategic options for themselves —
              those that don’t adapt, will fail.”{" "}
            </Text>
            <Text fontWeight={"extrabold"} fontSize={"xl"} mt={"5"}>
              Jeff Bezos, Amazon.
            </Text>
          </Flex>
        </Alert>
        <Text mb={"5"} fontWeight={"bold"} fontSize={"3xl"}>
          Our Offerings
        </Text>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={7}>
          <GridItemCard
            icon={MobileIcon}
            title={"Application Services and"}
            title2={"Transformation"}
            description={
              "Stay ahead of the digital transformation curve as we help you deliver digital experiences with our full stack application development service offering that delivers pixel-perfect mobile and web applications with world-class user experience."
            }
          />

          <GridItemCard
            icon={BrainIcon}
            title={"Business Process"}
            title2={"Optimization"}
            description={
              "We focus on process transformation, optimization and automation to help organizations strategize, design, implement and improve their business process resulting in improved efficiency and reduced costs with measurable outcomes."
            }
          />
          <GridItemCard
            icon={UiIcon}
            title={"UI / UX"}
            title2={"Design and Development"}
            description={
              "Our UI/UX professionals combine design and functionality to deliver frictionless and intuitive user interface based on design guidelines and following industry standards. We help achieve improved customer acquisition, retention and engagement."
            }
          />

          <GridItemCard
            icon={QualityIcon}
            title={"Quality Assurance and"}
            title2={"Engineering"}
            description={
              "We employ an end-to-end ecosystem approach with intelligent and automated QA processes to ensure there are no surprises when applications get into the hands of users. We cover Business Process Testing, User Acceptance Testing, Performance Testing, Security Testing and Accessibility Testing."
            }
          />

          <GridItemCard
            icon={AnalyticsIcon}
            title={"Data Analytics and"}
            title2={"AI"}
            description={
              "We help you gain actionable insight about your customers, operations, and products with AI and Data Analytics. Our specialist implement, manage and optimize statistical AI and ML algorithms for predictive and prescriptive analytics."
            }
          />

          <GridItemCard
            icon={TalentIcon}
            title={"Tech Talent"}
            title2={"Services"}
            description={
              "Engage our highly skilled and experienced software professionals for all your project needs to unlock business opportunities and accelerate growth. Our vast talent pool of people in technology include Java / Python Full Stack Developers, Software Engineers, UI/UX Designers and Developers, Business Analysts, QA Engineers, Data Science Engineers, AI and ML Engineers, DBAs…"
            }
          />
        </SimpleGrid>
      </Box>

      <Box w={"full"} px={40} py={10} bg={"indigo"} color={"white"} mb={"5"}>
        <Text mb={"5"} fontWeight={"bold"} fontSize={"3xl"}>
          Success Stories
        </Text>
        <Text mb={"5"} fontSize={"2xl"}>
          Find out how we are enabling companies to meet new demands by adapting
          to changing technology, business and customer landscape.
        </Text>
        <SimpleGrid columns={[1, 1, 4]} spacing={7} mb={"5"} color={"black"}>
          <Box rounded={"md"} border={"1px solid gray"} bg={"white"}>
            <Image
              src={DataMonitoring}
              fit={"cover"}
              w={"full"}
              rounded={"md"}
            />
            <Text p={"5"}>
              Built a real-time metrics monitoring dashboard by integrating data
              from multiple lines of businesses.
            </Text>
          </Box>
          <Box rounded={"md"} border={"1px solid gray"} bg={"white"}>
            <Image src={WoAi} fit={"cover"} w={"full"} rounded={"md"} />
            <Text p={"5"}>
              Built a forecasting machine learning model and data analysis
              platform for data scientists.
            </Text>
          </Box>
          <Box rounded={"md"} border={"1px solid gray"} bg={"white"}>
            <Image src={Dashboard} fit={"cover"} w={"full"} rounded={"md"} />
            <Text p={"5"}>
              Delivered a dashboard for the senior management to forecast
              revenue and growth.
            </Text>
          </Box>
          <Box rounded={"md"} border={"1px solid gray"} bg={"white"}>
            <Image src={CCPA} fit={"cover"} w={"full"} rounded={"md"} />
            <Text p={"5"}>
              Built a data pipeline across all lines of businesses to connect
              disparate unstructured and structured data.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
      <Flex w={"full"} px={40} justifyContent={"space-between"} mb={"5"}>
        <Box flex={"1"} mr={"5"}>
          <Text mb={"5"} fontWeight={"bold"} fontSize={"3xl"}>
            Request for Services
          </Text>
          <Text mb={"5"}>
            Find out more about how we can help your company navigate change,
            stay relevant and be future ready. Let us know your areas of
            interest so that we can serve you better.
          </Text>
        </Box>
        <Box flex={"1.3"}>
          <Formik
            initialValues={{
              firstname: "", // Initial values for the form fields
              lastname: "",
              company: "",
              email: "",
              phone: "",
              message: "",
              terms: false, // Initial value for the checkbox
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Flex direction={"row"} w={"full"} mb={"5"}>
                  <Field
                    as={Input}
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                    mr={"5"}
                  />
                  <Field
                    as={Input}
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                </Flex>

                <Field
                  as={Input}
                  type="text"
                  name="company"
                  placeholder="Company"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company}
                  mb={"5"}
                />

                <Flex direction={"row"} w={"full"} mb={"5"}>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    mr={"5"}
                  />
                  <InputGroup>
                    <InputRightElement
                      pointerEvents="none"
                      color={"black"}
                      rounded={"md"}
                      bg={"white"}
                      border={"1px solid gray"}
                    >
                      <FaFlagUsa />
                    </InputRightElement>
                    <Field
                      as={Input}
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                  </InputGroup>
                </Flex>
                <Textarea
                  type="text"
                  name="message"
                  placeholder="Message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  mb={"5"}
                />
                <Checkbox
                  colorScheme="green"
                  mb={"5"}
                  mr={"10"}
                  name="terms" // Name attribute for the checkbox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isChecked={values.terms}
                >
                  <Text fontSize={"md"}>
                    I have read and agree with WEBYOPS, inc.'s Terms of Use,
                    Privacy Policy and Cookies Policy.
                  </Text>
                </Checkbox>
                <Text mb={"5"} fontSize={"smaller"}>
                  I understand and acknowledge that, among other important
                  disclosures, the General Privacy Policy sets forth that
                  WEBYOPS, inc. may share my data with organization focused on
                  providing human resource services and solutions.
                </Text>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  rounded={"full"}
                  bg={"indigo"}
                  _hover={{ bg: "black" }}
                  color={"white"}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

const GridItemCard = ({ icon, title, title2, description }) => {
  return (
    <Box px={6} py={"16"} rounded={"md"} mb={"5"} border={"1px solid gray"}>
      <Image src={icon} mb={"5"} />
      <Text fontSize={"2xl"} mb={"5"} fontWeight={"bold"}>
        {title}
        <br />
        {title2}
      </Text>
      <Text>{description}</Text>
    </Box>
  );
};

export default Services;
