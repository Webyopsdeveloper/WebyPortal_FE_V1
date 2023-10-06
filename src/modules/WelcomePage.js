import React from "react";
import { Flex, Image, Text, Button } from "@chakra-ui/react";
import AppBar from "../utils/components/AppBar";
import WoUnleash from "../assets/wo-unleash.jpg";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <Flex w={"full"} h={"full"} direction="column">
      {/* <Image src={WoUnleash} alt="Wo Unleash" height={"100%"} /> */}
      <Flex
        w={"full"}
        height={"100%"}
        p={"5"}
        justify={"center"}
        direction={"column"}
        bgImage={WoUnleash}
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"no-repeat"}
      >
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
    </Flex>
  );
};

export default WelcomePage;
