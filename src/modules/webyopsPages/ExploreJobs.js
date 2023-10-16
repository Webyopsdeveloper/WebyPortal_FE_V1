import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Heading,
  ListItem,
  Select,
  Spinner,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import EJCover from "../../assets/wo-1.jpg";
import { Formik, Form, Field } from "formik";
import { ReactComponent as WebyopsLogoWhite } from "../../assets/webyops-logo-white-2.svg";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  VStack,
  Link,
} from "@chakra-ui/react";
import Footer from "../../utils/components/Footer";
import axios from "axios";
import Constants from "../../utils/constants";
import { VscRefresh } from "react-icons/vsc";

const ExploreJobs = () => {
  const isSmallScreen = window.innerWidth < 1000;
  const [searchResults, setSearchResults] = useState([]); // Initialize searchResults state
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [sortOption, setSortOption] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5); // Number of jobs to display per page
  const [apiData, setApiData] = useState([]);

  // const exampleJobs = [
  //   {
  //     jobName: "Software Engineer",
  //     city: "New York",
  //     datePosted: "2023-10-09",
  //   },
  //   {
  //     jobName: "Web Designer",
  //     city: "San Francisco",
  //     datePosted: "2023-10-08",
  //   },
  //   {
  //     jobName: "UX Designer",
  //     city: "San Francisco",
  //     datePosted: "2023-10-07",
  //   },
  //   {
  //     jobName: "Data Scientist",
  //     city: "Los Angeles",
  //     datePosted: "2023-10-06",
  //   },
  //   {
  //     jobName: "Product Manager",
  //     city: "Seattle",
  //     datePosted: "2023-10-05",
  //   },
  //   {
  //     jobName: "Front-End Developer",
  //     city: "Chicago",
  //     datePosted: "2023-10-04",
  //   },
  //   {
  //     jobName: "Marketing Manager",
  //     city: "Boston",
  //     datePosted: "2023-10-03",
  //   },
  //   {
  //     jobName: "Graphic Designer",
  //     city: "Austin",
  //     datePosted: "2023-10-02",
  //   },
  //   {
  //     jobName: "Data Analyst",
  //     city: "Denver",
  //     datePosted: "2023-10-01",
  //   },
  //   {
  //     jobName: "Content Writer",
  //     city: "San Diego",
  //     datePosted: "2023-09-30",
  //   },
  //   {
  //     jobName: "Sales Representative",
  //     city: "Dallas",
  //     datePosted: "2023-09-29",
  //   },
  //   {
  //     jobName: "HR Specialist",
  //     city: "Houston",
  //     datePosted: "2023-09-28",
  //   },
  //   {
  //     jobName: "Financial Analyst",
  //     city: "Miami",
  //     datePosted: "2023-09-27",
  //   },
  //   {
  //     jobName: "Nurse Practitioner",
  //     city: "Phoenix",
  //     datePosted: "2023-09-26",
  //   },
  //   {
  //     jobName: "Electrician",
  //     city: "Philadelphia",
  //     datePosted: "2023-09-25",
  //   },
  //   {
  //     jobName: "Mechanical Engineer",
  //     city: "Detroit",
  //     datePosted: "2023-09-24",
  //   },
  //   {
  //     jobName: "Chef",
  //     city: "Las Vegas",
  //     datePosted: "2023-09-23",
  //   },
  //   {
  //     jobName: "Social Media Manager",
  //     city: "Orlando",
  //     datePosted: "2023-09-22",
  //   },
  //   {
  //     jobName: "Architect",
  //     city: "Portland",
  //     datePosted: "2023-09-21",
  //   },
  //   {
  //     jobName: "Customer Service Representative",
  //     city: "Minneapolis",
  //     datePosted: "2023-09-20",
  //   },
  // ];
  useEffect(() => {
    fetchData();

    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 2 * 60 * 60 * 1000);

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, []);

  async function fetchData() {
    setIsSearching(true);
    try {
      const response = await axios.post(
        `${Constants.API_URL}/api/explore-jobs`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = response.data;
      console.log(data);

      if (data.length === 0) {
        setNoResults(true);
        setSearchResults([]);
        setApiData([]);
      } else {
        setNoResults(false);
        setSearchResults(data);
        setApiData(data);
        setCurrentPage(1);
      }
      setIsSearching(false);
    } catch (error) {
      console.error("Error fetching data from the API:", error);
      setIsSearching(false);
    }
  }

  const handleSubmit = (values) => {
    setIsSearching(true);

    // Assuming you have a function to fetch job data here (replace with your actual API call)
    // Example data format:

    const { keywords, location } = values;

    // Filter jobs based on keywords and/or location

    //empty search
    if (!keywords && !location) {
      setSearchResults(apiData);
      setNoResults(false);
      setIsSearching(false);
      return;
    }

    const filteredJobs = searchResults.filter((job) => {
      const keywordMatch = keywords
        ? job.jobName.toLowerCase().includes(keywords.toLowerCase())
        : true;

      const locationMatch = location
        ? job.city.toLowerCase().includes(location.toLowerCase())
        : true;

      return keywordMatch && locationMatch;
    });

    if (filteredJobs.length === 0) {
      setNoResults(true);
      setSearchResults([]);
    } else {
      setNoResults(false);
      setSearchResults(filteredJobs);
      setCurrentPage(1);
    }
    setIsSearching(false);
  };

  const handleSort = (option) => {
    setSortOption(option);

    const sortedResults = [...searchResults];

    if (option === "az") {
      sortedResults.sort((a, b) => a.jobName.localeCompare(b.jobName));
    } else if (option === "za") {
      sortedResults.sort((a, b) => b.jobName.localeCompare(a.jobName));
    } else if (option === "date-asc") {
      sortedResults.sort(
        (a, b) => new Date(a.datePosted) - new Date(b.datePosted)
      );
    } else if (option === "date-desc") {
      sortedResults.sort(
        (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
      );
    }

    setSearchResults(sortedResults);
  };
  const handleJobsPerPageChange = (value) => {
    setJobsPerPage(value);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = searchResults.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
        bgImage={EJCover}
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
            Explore Jobs
          </Text>
        </Box>
      </Box>
      <Box w={"full"} px={40} py={10}>
        <Text mb={"5"} fontWeight={"bold"} fontSize={"3xl"}>
          Create / Build / Code / Design
        </Text>
        <Text mb={"5"}>
          At WEBYOPS, we strive on giving you the right opportunity to apply
          your technical knowledge, expertise and experience.
        </Text>
        <Text mb={"5"}>
          We also give you the right tools and the team to navigate towards your
          career path.
        </Text>
        <Formik
          initialValues={{ keywords: "", location: "" }}
          onSubmit={handleSubmit}
          mb={"5"}
        >
          {() => (
            <Form>
              <Flex justifyContent={"space-between"}>
                <FormControl flex={"1.5"}>
                  <Field
                    as={Input}
                    type="text"
                    id="keywords"
                    name="keywords"
                    placeholder="Keywords"
                    focusBorderColor="none"
                    //border radius full
                    borderRadius={"full"}
                    size={"lg"}
                    boxShadow={"md"}
                  />
                </FormControl>

                <FormControl flex={"1.5"} ml={"4"}>
                  <Field
                    as={Input}
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Location"
                    focusBorderColor="none"
                    borderRadius={"full"}
                    size={"lg"}
                    boxShadow={"md"}
                  />
                </FormControl>

                <Button
                  isLoading={isSearching}
                  flex={"1"}
                  type="submit"
                  variant={"solid"}
                  size={"lg"}
                  _hover={{ bg: "purple", color: "white" }}
                  color={"white"}
                  bgColor={"black"}
                  borderRadius={"full"}
                  ml={"4"}
                >
                  Search
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
        {searchResults.length > 0 && isSearching === false && (
          <>
            <Flex justify={"space-between"} align={"center"} mt={"5"}>
              <HStack align="center" flex={"5"}>
                <Text fontWeight="bold" mb={2}>
                  Sort By:
                </Text>
                <Button
                  onClick={() => handleSort("az")}
                  isActive={sortOption === "az"}
                  variant={"solid"}
                  _active={{ bg: "purple", color: "white" }}
                  _hover={{ bg: "purple", color: "white" }}
                  color={"white"}
                  bgColor={"black"}
                >
                  A-Z
                </Button>
                <Button
                  onClick={() => handleSort("za")}
                  isActive={sortOption === "za"}
                  variant={"solid"}
                  _active={{ bg: "purple", color: "white" }}
                  _hover={{ bg: "purple", color: "white" }}
                  color={"white"}
                  bgColor={"black"}
                >
                  Z-A
                </Button>
                <Button
                  onClick={() => handleSort("date-asc")}
                  isActive={sortOption === "date-asc"}
                  variant={"solid"}
                  _active={{ bg: "purple", color: "white" }}
                  _hover={{ bg: "purple", color: "white" }}
                  color={"white"}
                  bgColor={"black"}
                >
                  Date Asc
                </Button>
                <Button
                  onClick={() => handleSort("date-desc")}
                  isActive={sortOption === "date-desc"}
                  variant={"solid"}
                  _active={{ bg: "purple", color: "white" }}
                  _hover={{ bg: "purple", color: "white" }}
                  color={"white"}
                  bgColor={"black"}
                >
                  Date Desc
                </Button>
              </HStack>
              <HStack>
                <Select
                  flex={"1.2"}
                  value={jobsPerPage}
                  onChange={(e) => handleJobsPerPageChange(e.target.value)}
                  placeholder="Results per page"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </Select>
              </HStack>
            </Flex>
            <JobList jobs={currentJobs} />
            <Pagination
              jobsPerPage={jobsPerPage}
              totalJobs={searchResults.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
        )}
        {noResults && isSearching === false && (
          <Text color="red">
            No results found for the given search criteria.
          </Text>
        )}
        {isSearching && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple"
            size="xl"
            mt={"5"}
          />
        )}
      </Box>

      <Footer />
    </Flex>
  );
};
const Pagination = ({ jobsPerPage, totalJobs, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <HStack mt={4} justify="center">
      {pageNumbers.map((number) => (
        <Button
          onClick={() => paginate(number)}
          variant={"solid"}
          isActive={currentPage === number}
          _active={{ bg: "purple", color: "white" }}
          size={"md"}
          _hover={{ bg: "purple", color: "white" }}
          color={"white"}
          bgColor={"black"}
        >
          {number}
        </Button>
      ))}
    </HStack>
  );
};

const JobList = ({ jobs }) => {
  // Function to format the date difference as "Posted x days/weeks/months ago"
  const formatPostedDate = (datePosted) => {
    const currentDate = new Date();
    const postedDate = new Date(datePosted);
    const timeDiff = currentDate - postedDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 1) {
      return "Posted today";
    } else if (daysDiff < 7) {
      return `Posted ${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago`;
    } else {
      const monthsDiff = Math.floor(daysDiff / 30);
      if (monthsDiff < 1) {
        return `Posted ${Math.floor(daysDiff / 7)} ${
          Math.floor(daysDiff / 7) === 1 ? "week" : "weeks"
        } ago`;
      } else {
        return `Posted ${monthsDiff} ${
          monthsDiff === 1 ? "month" : "months"
        } ago`;
      }
    }
  };

  return (
    <Flex mt={8} direction={"column"}>
      {jobs.map((job, index) => (
        <Flex key={index} p={2} mb={"2"} justify={"space-between"}>
          <Text fontWeight="bold" color={"purple"} flex={"2"}>
            {job.jobName}
          </Text>
          <Text color={"gray"} flex={"1"}>
            {job.city}
          </Text>
          <Text color={"gray"} flex={"1"}>
            {" "}
            {formatPostedDate(job.datePosted)}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default ExploreJobs;
