import {
  Flex,
  Box,
  Heading,
  Text,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import AboutCover from "../../assets/wo-2.jpg";
import Footer from "../../utils/components/Footer";
import DotsBg from "../../assets/wo-dots.svg";

const AboutUs = () => {
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
        bgImage={AboutCover}
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
            About Webyops
          </Text>
        </Box>
      </Box>
      <Box w={"full"} px={40} py={10}>
        <Text mb={"5"} fontWeight={"bold"} fontSize={"3xl"}>
          Your technology partner in digital transformation
        </Text>
        <Flex justifyContent={"space-between"}>
          <Box flex={1.2} mr={"10"}>
            <Text fontSize={"medium"} mb={"6"}>
              WEBYOPS delivers cross-industry technology solutions and talent
              services to maximize your returns on your investment in technology
              and be a guiding partner in the digital journey.
            </Text>
            <Text fontSize={"2xl"} mb={"6"}>
              The investment in technology, a company makes today will define
              which doors open to them tomorrow.
            </Text>
            <Text fontSize={"medium"} mb={"6"}>
              AI, blockchain, IOT and other emerging digital technologies are
              driving the next wave of the digital transformation, presenting
              exciting opportunities and along with significant challenges. A
              digital transformation strategy executed well will radically
              streamline and enhance existing processes, create entirely new
              business models, and develop innovative products and services for
              a new generation of consumers.
            </Text>
            <Text fontSize={"medium"} mb={"6"}>
              At WEBYOPS, we are committed to delivering value to our customers
              and help them achieve their business goals on their digital
              transformation journey.
            </Text>
            <Text>
              Get in touch with us here today to know more about our service
              offering.
            </Text>
          </Box>
          <Flex
            flex={1}
            justifyContent={"center"}
            alignItems={"start"}
            direction={"column"}
            border={"1px solid gray"}
            borderRadius={"md"}
            py={10}
            px={5}
          >
            <Text mb={"5"} fontWeight={"bold"} fontSize={"3xl"}>
              Our Values
            </Text>
            <UnorderedList spacing={3} mb={"5"}>
              <ListItem>
                <b>Client Value</b> - Create value for our customers by
                exceeding their expectations, constantly.
              </ListItem>
              <ListItem>
                <b>Honesty</b> - Respect for our customers, employees, partners,
                and stakeholders.
              </ListItem>
              <ListItem>
                <b>Excellence</b> - To relentlessly improve ourselves, our
                services and never give up.
              </ListItem>
            </UnorderedList>
            <Text mb={"5"} fontWeight={"bold"} fontSize={"3xl"}>
              Our Values
            </Text>
            <UnorderedList spacing={3}>
              <ListItem>Cross-industry expertise in technology</ListItem>
              <ListItem>
                Culture of innovation, curiosity and always learning
              </ListItem>
              <ListItem>
                Collaboration and partnership with leading technology players
              </ListItem>
              <ListItem>
                Large talent pool of highly motivated and experienced software
                engineers
              </ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </Flex>
  );
};

export default AboutUs;
