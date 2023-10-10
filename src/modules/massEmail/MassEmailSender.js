import React, { useState, useRef, useEffect } from "react";
import { Field, Formik, FieldArray, Form } from "formik";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Box,
  Text,
  Textarea,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Spinner,
  FormErrorMessage,
  Flex,
  IconButton,
  Icon,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  AiOutlinePlus,
  AiOutlineBold,
  AiOutlineSend,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineClose,
  AiOutlineMinus,
} from "react-icons/ai";
import { VscFileMedia } from "react-icons/vsc";
import Constants from "../../utils/constants";
import ModuleTabBar from "../../utils/components/ModuleTabBar";

const MassEmailSender = () => {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });
  const [isSending, setIsSending] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedAttachments, setUploadedAttachments] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fileInputRef = useRef(null);

  const initialValues = {
    username: "", //vachapatel8765@gmail.com
    password: "", //qkltfmiejhvgseic
    subject: "",
    message: "",
    recipients: [""],
    cc: [""], // Initialize with one empty CC field
    bcc: [""], // Initialize with one empty BCC field
    attachments: [],
  };

  const onSubmit = async (values, { resetForm }) => {
    if (
      values.message.length >= 1 &&
      values.subject.length >= 1 &&
      values.recipients.length >= 1
    ) {
      setIsSending(true);
      // Create a FormData object to send the file
      const formData = new FormData();
      if (uploadedAttachments.length >= 1) {
        uploadedAttachments.forEach((file) => {
          formData.append("attachments", file);
        });
      } else {
        formData.append("attachments", "[]");
      }
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("subject", values.subject);
      formData.append("message", values.message);
      formData.append("recipients", values.recipients);
      formData.append("cc", values.cc);
      formData.append("bcc", values.bcc);

      // Make the API call using Axios
      axios({
        method: "post",
        url: `${Constants.API_URL}/api/send_email/`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          // Handle the response here
          toast.success("Email sent", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error sending email. Please try again later.", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        })
        .finally(() => {
          setIsSending(false); // Set to false when processing is completed
        });
    } else {
      toast.error("Please fill required data.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };
  const handleAddMediaToBody = () => {
    fileInputRef.current.click();
  };
  const handleButtonClick = () => {
    // Trigger the hidden file input when the button is clicked
    fileInputRef.current.click();
  };

  const handleMediaFileChange = (event) => {
    const files = event.target.files;
    if (files.length === 0) return;

    const mediaFiles = Array.from(files).filter((file) =>
      ["image/jpeg", "image/png"].includes(file.type)
    );

    if (mediaFiles.length > 0) {
      setSelectedMedia([...selectedMedia, ...mediaFiles]);
    } else {
      toast.error("Invalid media format. Please upload a JPEG or PNG file.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);

    const files = event.dataTransfer.files;
    if (files.length === 0) return;

    const file = files[0];

    //allowed format - pdf
    const allowedImageFormats = ["application/pdf", "image/jpeg", "image/png"];
    if (allowedImageFormats.includes(file.type)) {
      setSelectedFile(file);
      setUploadedAttachments([...uploadedAttachments, file]);
    } else {
      toast.error(
        "Invalid image format. Please upload a JPEG, JPG, or PNG file.",
        {
          position: toast.POSITION.BOTTOM_LEFT,
        }
      );
    }
  };
  const handleFileChange = (event) => {
    if (event.target.files.length === 0) return;
    const file = event.target.files[0];
    //allowed format - pdf
    const allowedImageFormats = ["application/pdf", "image/jpeg", "image/png"];
    if (allowedImageFormats.includes(file.type)) {
      setSelectedFile(file);
      setUploadedAttachments([...uploadedAttachments, file]);
      console.log(uploadedAttachments);
    } else {
      toast.error(
        "Invalid image format. Please upload a JPEG, JPG or PNG file.",
        {
          position: toast.POSITION.BOTTOM_LEFT,
        }
      );
    }
  };
  const handleRemoveAttachment = (index) => {
    const updatedAttachments = [...uploadedAttachments];
    updatedAttachments.splice(index, 1);
    setUploadedAttachments(updatedAttachments);
    console.log(uploadedAttachments);
  };
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Flex
      w={"full"}
      style={{
        height: "calc(100vh - 80px)",
      }}
      direction="column"
      align={"center"}
    >
      <ModuleTabBar paramIndex={2} />
      <Box
        w={"full"}
        mt={"10"}
        mb={"10"}
        alignSelf={"center"}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ position: "relative" }}
      >
        {isDraggingOver && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
            }}
          >
            <p style={{ color: "#fff" }}>Drop the file here</p>
          </div>
        )}
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                width: "70%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControl
                mb={"5"}
                isInvalid={!!errors.username && touched.username}
              >
                <Flex justifyContent={"space-between"}>
                  <FormLabel w={"20%"}>Email From*</FormLabel>
                  <Flex direction={"column"} w={"full"}>
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      type="text"
                      variant="filled"
                      validate={(value) => {
                        let error;

                        if (value.length === 0) {
                          error = "Username cannot be empty";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </Flex>
                </Flex>
              </FormControl>
              <FormControl
                mb={"5"}
                isInvalid={!!errors.password && touched.password}
              >
                <Flex justifyContent={"space-between"}>
                  <FormLabel w={"20%"}>Password *</FormLabel>
                  <Flex direction={"column"} w={"full"}>
                    <InputGroup>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        variant="filled"
                        validate={(value) => {
                          let error;

                          if (value.length === 0) {
                            error = "Password cannot be empty";
                          }

                          return error;
                        }}
                      />
                      <InputRightElement>
                        <Icon
                          as={showPassword ? ViewOffIcon : ViewIcon}
                          cursor="pointer"
                          onClick={handlePasswordVisibility}
                          color="gray.400"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </Flex>
                </Flex>
              </FormControl>
              <FieldArray
                name="recipients"
                render={(arrayHelpers) => (
                  <>
                    {values.recipients.map((recipient, index) => (
                      <FormControl
                        key={index}
                        mb={"5"}
                        isInvalid={
                          !!errors.recipients &&
                          touched.recipients &&
                          !!errors.recipients[index] &&
                          touched.recipients[index]
                        }
                      >
                        <Flex justifyContent={"space-between"}>
                          <FormLabel w={"20%"}>
                            Recipient {index + 1}*
                          </FormLabel>
                          <Flex w={"full"}>
                            <Field
                              as={Input}
                              name={`recipients.${index}`}
                              variant="filled"
                              type="email"
                              validate={(value) => {
                                let error;

                                if (index === 0) {
                                  if (value.length === 0) {
                                    error = "Recipient cannot be empty";
                                  }
                                  if (!value.includes("@")) {
                                    error = "Invalid email address";
                                  }
                                }

                                return error;
                              }}
                            />
                            {index === values.recipients.length - 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => arrayHelpers.push("")}
                              >
                                <AiOutlinePlus />
                              </Button>
                            )}
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <AiOutlineMinus />
                              </Button>
                            )}
                          </Flex>
                        </Flex>
                        <FormErrorMessage ml={"18%"}>
                          {errors.recipients && errors.recipients[index]}
                        </FormErrorMessage>
                      </FormControl>
                    ))}
                  </>
                )}
              />

              <FieldArray
                name="cc"
                render={(arrayHelpers) => (
                  <>
                    {values.cc.map((ccRecipient, index) => (
                      <FormControl key={index} mb={"5"}>
                        <Flex justifyContent={"space-between"}>
                          <FormLabel w={"20%"}>CC {index + 1}</FormLabel>
                          <Flex w={"full"}>
                            <Field
                              as={Input}
                              name={`cc.${index}`}
                              type="email"
                              variant="filled"
                            />
                            {index === values.cc.length - 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => arrayHelpers.push("")}
                              >
                                <AiOutlinePlus />
                              </Button>
                            )}
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <AiOutlineMinus />
                              </Button>
                            )}
                          </Flex>
                        </Flex>
                      </FormControl>
                    ))}
                  </>
                )}
              />

              <FieldArray
                name="bcc"
                render={(arrayHelpers) => (
                  <>
                    {values.bcc.map((bccRecipient, index) => (
                      <FormControl key={index} mb={"5"}>
                        <Flex justifyContent={"space-between"}>
                          <FormLabel w={"20%"}>BCC {index + 1}</FormLabel>
                          <Flex w={"full"}>
                            <Field
                              as={Input}
                              name={`bcc.${index}`}
                              type="email"
                              variant="filled"
                            />
                            {index === values.bcc.length - 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => arrayHelpers.push("")}
                              >
                                <AiOutlinePlus />
                              </Button>
                            )}
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <AiOutlineMinus />
                              </Button>
                            )}
                          </Flex>
                        </Flex>
                      </FormControl>
                    ))}
                  </>
                )}
              />

              <FormControl
                mb={"5"}
                isInvalid={!!errors.subject && touched.subject}
              >
                <Flex justifyContent={"space-between"}>
                  <FormLabel w={"20%"}>Subject*</FormLabel>
                  <Flex direction={"column"} w={"full"}>
                    <Field
                      as={Input}
                      id="subject"
                      name="subject"
                      type="subject"
                      variant="filled"
                      validate={(value) => {
                        let error;

                        if (value.length === 0) {
                          error = "Subject cannot be empty";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.subject}</FormErrorMessage>
                  </Flex>
                </Flex>
              </FormControl>

              <FormControl
                mb={"5"}
                isInvalid={!!errors.message && touched.message}
              >
                <Flex justifyContent={"space-between"}>
                  <FormLabel w={"20%"}>Email Body*</FormLabel>
                  <Flex direction={"column"} w={"full"}>
                    <Flex mb={"1.5"}>
                      <Button
                        leftIcon={<VscFileMedia />}
                        variant={"outline"}
                        onClick={handleAddMediaToBody}
                        mr={"2"}
                      >
                        <input
                          type="file"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          onChange={handleMediaFileChange}
                          multiple // Allow multiple file selection
                        />
                        Add Media to Body
                      </Button>
                      <IconButton
                        aria-label="Bold"
                        icon={<AiOutlineBold />}
                        size="md"
                        mr={"0.5"}
                      />
                      <IconButton
                        aria-label="Italic"
                        icon={<AiOutlineItalic />}
                        size="md"
                        mr={"0.5"}
                      />
                      <IconButton
                        aria-label="Underline"
                        icon={<AiOutlineUnderline />}
                        size="md"
                      />
                    </Flex>
                    <Flex wrap={"wrap"}>
                      {selectedMedia.map((file, index) => (
                        <Flex
                          key={index}
                          align={"start"}
                          justify={"center"}
                          bg={"gray.100"}
                          borderRadius={"md"}
                          p={"2"}
                          mr={"2"}
                          mt={"2"}
                          w={"30%"}
                          h={"250px"}
                          overflow={"hidden"}
                          position={"relative"}
                        >
                          <IconButton
                            aria-label="Remove attachment"
                            icon={<AiOutlineClose color={"red"} />}
                            size="sm"
                            alignSelf={"flex-end"}
                            onClick={() => handleRemoveAttachment(index)}
                            position={"absolute"}
                            top={"0"}
                            right={"0"}
                          />

                          <Image
                            src={URL.createObjectURL(file)}
                            alignSelf={"center"}
                          />
                        </Flex>
                      ))}
                    </Flex>

                    <Field
                      as={Textarea}
                      id="message"
                      name="message"
                      variant="filled"
                      h={"200px"}
                      validate={(value) => {
                        let error;

                        if (value.length === 0) {
                          error = "Email body cannot be empty";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.message}</FormErrorMessage>
                  </Flex>
                </Flex>
              </FormControl>

              <FormControl mb={"5"} isReadOnly>
                <Flex justifyContent={"space-between"}>
                  <FormLabel w={"20%"}>Attachments</FormLabel>
                  <Flex direction={"column"} w={"full"}>
                    <Button
                      leftIcon={<VscFileMedia />}
                      variant={"outline"}
                      w={"10rem"}
                      onClick={handleButtonClick}
                    >
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                      Upload File
                    </Button>
                    <Flex wrap={"wrap"}>
                      {uploadedAttachments.map((file, index) => (
                        <Flex
                          key={index}
                          align={"start"}
                          justify={"center"}
                          bg={"gray.100"}
                          borderRadius={"md"}
                          p={"2"}
                          mr={"2"}
                          mt={"2"}
                          w={"30%"}
                          h={"250px"}
                          overflow={"hidden"}
                          position={"relative"}
                        >
                          <IconButton
                            aria-label="Remove attachment"
                            icon={<AiOutlineClose color={"red"} />}
                            size="sm"
                            alignSelf={"flex-end"}
                            onClick={() => handleRemoveAttachment(index)}
                            position={"absolute"}
                            top={"0"}
                            right={"0"}
                          />
                          {file.type === "application/pdf" ? (
                            <Document file={file}>
                              <Page
                                pageNumber={1}
                                scale={0.2}
                                renderAnnotationLayer={false}
                              />
                            </Document>
                          ) : (
                            <Image
                              src={URL.createObjectURL(file)}
                              alignSelf={"center"}
                            />
                          )}
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>
                </Flex>
              </FormControl>

              <Button
                isLoading={isSending}
                type="submit"
                rightIcon={<AiOutlineSend />}
                colorScheme="purple"
                borderRadius={"full"}
                size={"lg"}
                my={"10"}
              >
                Send
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default MassEmailSender;
