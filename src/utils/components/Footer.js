import React from "react";
import { Box, Flex, Text, VStack, Link } from "@chakra-ui/react";
import { ReactComponent as WebyopsLogoWhite } from "../../assets/webyops-logo-white-2.svg";
const Footer = () => {
  return (
    <Flex
      bgColor="gray.800"
      color={"white"}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      p={8}
    >
      <Flex
        maxW="full"
        mb={10}
        justify="space-between"
        align="flex-start"
        flexWrap="wrap"
      >
        {/* Column 1 */}
        <Box flex="1" p={4}>
          <Text fontWeight="bold" mb={4}>
            ABOUT
          </Text>
          <VStack align="flex-start" spacing={2}>
            <Link>WEBYOPS Overview</Link>
            <Link>Partner with Us</Link>
            <Link>Contact Us</Link>
            <Link>Privacy Policy</Link>
          </VStack>
        </Box>

        {/* Column 2 */}
        <Box flex="1" p={4}>
          <Text fontWeight="bold" mb={4}>
            SERVICES
          </Text>
          <VStack align="flex-start" spacing={2}>
            <Text>Application Services and Transformation</Text>
            <Text>Business Process Optimization</Text>
            <Text>Data Analytics & AI</Text>
            <Text>UI / UX Design and Development</Text>
            <Text>Quality Assurance & Engineering</Text>
            <Text>Tech Talent Services</Text>
          </VStack>
        </Box>

        {/* Column 3 */}
        <Box flex="1" p={4}>
          <Text fontWeight="bold" mb={4}>
            TECH JOBS of 2022
          </Text>
          <VStack align="flex-start" spacing={2}>
            <Link>Java Full Stack Developer</Link>
            <Link>Python Full Stack Developer</Link>
            <Link>Data Science Engineer</Link>
            <Link>Machine Learning Consultant</Link>
            <Link>Big Data Engineer</Link>
            <Link>Java Developer</Link>
            <Link>Python Developer</Link>
            <Link>Cybersecurity Specialist</Link>
            <Link>Cloud Engineer / Architect</Link>
            <Link>UX Designer</Link>
            <Link>DevOps Engineer</Link>
          </VStack>
        </Box>

        {/* Column 4 */}
        <Box flex="1" p={4}>
          <WebyopsLogoWhite
            max-width={350}
            style={{
              marginBottom: "1rem",
            }}
          />
          <VStack align="flex-start" spacing={2} alignItems={"end"}>
            <Text textAlign={"end"}>405 State Highway 121 Byp Ste A250,</Text>
            <Text>Lewisville,</Text>
            <Text>TX 75067-4183,</Text>
            <Text>United States</Text>
          </VStack>
        </Box>
      </Flex>
      <Text>© 2023 WEBYOPS. All rights reserved.</Text>
    </Flex>
  );
};

export default Footer;
