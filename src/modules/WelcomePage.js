import React from "react";
import { Flex, Image, Text, Button } from "@chakra-ui/react";
import AppBar from "../utils/components/AppBar";
import WoUnleash from "../assets/wo-unleash.jpg";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <Flex
      w={"full"}
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
      direction="column"
      p={5}
      justify="center"
      bgImage={WoUnleash}
      bgSize={"cover"}
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
    >
      {/* <Image src={WoUnleash} alt="Wo Unleash" height={"100%"} /> */}
      <Text color={"white"} fontSize={"5xl"} fontWeight={"bold"}>
        Unleash Your Technical <br /> Expertise
      </Text>
      <Button
        variant={"solid"}
        colorScheme={"purple"}
        w={"fit-content"}
        borderRadius={"full"}
        mt={2}
        onClick={() => navigate("/login")}
      >
        Explore Opportunities
      </Button>
    </Flex>
  );
};

export default WelcomePage;
