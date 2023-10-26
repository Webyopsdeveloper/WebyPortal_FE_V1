import { Flex, Heading, Image, Text, Card } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import AppBar from "../../../utils/components/AppBar";
const ImageRenderPage = () => {
  const location = useLocation();

  const imageFile = location.state && location.state.image;
  return (
    <Flex h={"full"} w={"full"} flexDirection={"column"}>
      <Card variant={"elevated"} w={"50%"}>
        {imageFile && (
          <Image
            src={URL.createObjectURL(imageFile)}
            w={"70%"}
            alignSelf={"center"}
          />
        )}
      </Card>
    </Flex>
  );
};

export default ImageRenderPage;
