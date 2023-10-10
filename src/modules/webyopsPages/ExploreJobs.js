import { Flex, Text } from "@chakra-ui/react";
import EJCover from "../../assets/wo-1.jpg";

const ExploreJobs = () => {
  return (
    <Flex
      w={"full"}
      h={"full"}
      bgImage={EJCover}
      bgRepeat={"no-repeat"}
      bgPosition={"center"}
      bgAttachment={"fixed"}
      bgSize={"cover"}
    >
      <Text>Hello World</Text>
    </Flex>
  );
};

export default ExploreJobs;
