import { OutTable } from "./ExcelRenderer";
import { useLocation } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import AppBar from "../../../utils/components/AppBar";
import { Button } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
const ExcelRenderPage = () => {
  const location = useLocation();
  const excelData = location.state;
  return (
    <Flex direction="column" w={"full"} h={"full"}>
      <Flex w={"fit-content"} h={"full"} px={"10"} pt={"10"}>
        <Button
          onClick={() => {
            window.history.back();
          }}
        >
          <AiOutlineArrowLeft />
        </Button>
      </Flex>
      <Flex w={"fit-content"} h={"full"} p={"10"} justifyContent={"center"}>
        {excelData && (
          <OutTable
            columns={excelData.cols}
            data={excelData.rows}
            // tableHeight="200px"
            tableWidth="100%"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default ExcelRenderPage;
