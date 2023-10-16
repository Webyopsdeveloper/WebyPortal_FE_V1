import React, { useEffect, useState } from "react";
import { Flex, Avatar, Button, Tooltip, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ReactComponent as WebyopsLogoWhite } from "../../assets/webyops-logo-white-2.svg";
import { ReactComponent as WebyopsLogoBlack } from "../../assets/webyops-logo.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppBar = ({ onHamburgerMenuClick, loggedInUser }) => {
  const navigate = useNavigate();

  return (
    <Flex
      h={"80px"}
      w={"full"}
      p={5}
      bg={loggedInUser === true ? "gray.700" : "white"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      {/* Assuming WebyopsLogo is a custom component that accepts a 'width' prop */}
      {loggedInUser === true ? (
        <Button
          variant={"link"}
          color="white"
          fontSize={"lg"}
          _hover={{ color: "purple" }}
          onClick={() => navigate("/")}
        >
          <WebyopsLogoWhite width={150} />
        </Button>
      ) : (
        <WebyopsLogoBlack width={150} />
      )}

      {loggedInUser === false && (
        <Flex>
          <Button
            variant={"link"}
            color="black"
            fontSize={"md"}
            _hover={{ color: "purple" }}
            onClick={() => navigate("/about")}
            mr={"5"}
          >
            ABOUT WEBYOPS
          </Button>
          <Button
            variant={"link"}
            color="black"
            fontSize={"md"}
            _hover={{ color: "purple" }}
            onClick={() => navigate("/services")}
            mr={"5"}
          >
            SERVICES
          </Button>
          <Button
            variant={"link"}
            color="black"
            fontSize={"md"}
            _hover={{ color: "purple" }}
            onClick={() => navigate("/explore-jobs")}
            mr={"5"}
          >
            EXPLORE JOBS
          </Button>
          <Button
            variant={"link"}
            color="black"
            fontSize={"md"}
            _hover={{ color: "purple" }}
            onClick={() => {
              //open link https://webyops.com/about/
              window.open("https://webyops.com/careers/", "_self");
            }}
            mr={"5"}
          >
            CAREERS
          </Button>
          <Button
            variant={"link"}
            color="black"
            fontSize={"md"}
            _hover={{ color: "purple" }}
            onClick={() => {
              //open link https://webyops.com/about/
              window.open("https://webyops.com/contact/", "_self");
            }}
            mr={"5"}
          >
            CONTACT
          </Button>
          <Button
            variant="link"
            color="black"
            fontSize={"md"}
            _hover={{ color: "purple" }}
            onClick={() => navigate("/login")}
            mr={2}
          >
            LOGIN
          </Button>
        </Flex>
      )}
      {loggedInUser === true && (
        <Flex alignItems={"center"}>
          {/* Tooltip component wraps the Avatar */}
          <Button
            variant={"link"}
            color="white"
            fontSize={"md"}
            _hover={{ color: "grey" }}
            onClick={() => navigate("/about")}
            mr={"5"}
          >
            ABOUT WEBYOPS
          </Button>
          <Button
            variant={"link"}
            color="white"
            fontSize={"md"}
            _hover={{ color: "grey" }}
            onClick={() => navigate("/services")}
            mr={"5"}
          >
            SERVICES
          </Button>
          <Button
            variant={"link"}
            color="white"
            fontSize={"md"}
            _hover={{ color: "grey" }}
            onClick={() => navigate("/explore-jobs")}
            mr={"5"}
          >
            EXPLORE JOBS
          </Button>
          <Button
            variant={"link"}
            color="white"
            fontSize={"md"}
            _hover={{ color: "grey" }}
            onClick={() => {
              //open link https://webyops.com/about/
              window.open("https://webyops.com/careers/", "_self");
            }}
            mr={"5"}
          >
            CAREERS
          </Button>
          <Button
            variant={"link"}
            color="white"
            fontSize={"md"}
            _hover={{ color: "grey" }}
            onClick={() => {
              //open link https://webyops.com/about/
              window.open("https://webyops.com/contact/", "_self");
            }}
            mr={"5"}
          >
            CONTACT
          </Button>
          <IconButton
            aria-label="Menu"
            icon={<HamburgerIcon />}
            size="lg"
            variant="link"
            color="white"
            onClick={onHamburgerMenuClick}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default AppBar;
