import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  Link as ChakraLink,
  HStack,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const onSubmit = async (data) => {
    console.log(data, "SUBMIT");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    reset();
    navigate("/sign-in");
  };

  return (
    <Grid
      width="full"
      paddingY="40px"
      paddingX="40px"
      gridTemplateColumns={{ base: "1fr", xl: "repeat(2,1fr)" }}
      bgImage="/auth-bg.svg"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPos="center"
    >
      <GridItem paddingX={{ lg: 20 }}>
        <Box
          bgColor="tripl-new.light"
          borderRadius="50px"
          padding="40px"
          textColor="tripl-new.orange"
          border="1px solid"
          borderColor="tripl-new.gray-100"
          boxShadow="xl"
        >
          <Text as="h1" fontSize="3xl" textAlign="center">
            Sign Up
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="25px">
              <FormControl isInvalid={errors.name}>
                <FormLabel color="tripl-new.black" ms="20px">
                  Name
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaUserAlt color="tripl-new.orange" />
                  </InputLeftElement>
                  <Input
                    placeholder="Name"
                    bgColor="tripl-new.cream"
                    borderWidth="2px"
                    focusBorderColor="tripl-new.orange"
                    fontWeight="600"
                    borderRadius="50px"
                    _placeholder={{
                      color: "tripl-new.gray-200",
                      opacity: "0.7",
                    }}
                    {...register("name")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email}>
                <FormLabel color="tripl-new.black" ms="20px">
                  Email
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="tripl-new.orange" />
                  </InputLeftElement>
                  <Input
                    placeholder="Email"
                    bgColor="tripl-new.cream"
                    borderWidth="2px"
                    focusBorderColor="tripl-new.orange"
                    fontWeight="600"
                    borderRadius="50px"
                    _placeholder={{
                      color: "tripl-new.gray-200",
                      opacity: "0.7",
                    }}
                    {...register("email")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel color="tripl-new.black" ms="20px">
                  Password
                </FormLabel>
                <InputGroup size="md">
                  <InputLeftElement>
                    <LockIcon />
                  </InputLeftElement>
                  <Input
                    bgColor="tripl-new.cream"
                    borderWidth="2px"
                    focusBorderColor="tripl-new.orange"
                    fontWeight="600"
                    borderRadius="50px"
                    _placeholder={{
                      color: "tripl-new.gray-200",
                      opacity: "0.7",
                    }}
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password")}
                  />
                  <InputRightElement ml={10}>
                    {show ? (
                      <ViewOffIcon onClick={handleClick} />
                    ) : (
                      <ViewIcon onClick={handleClick} />
                    )}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel color="tripl-new.black" ms="20px">
                  Password Confirmation
                </FormLabel>
                <InputGroup size="md">
                  <InputLeftElement>
                    <LockIcon />
                  </InputLeftElement>
                  <Input
                    bgColor="tripl-new.cream"
                    borderWidth="2px"
                    focusBorderColor="tripl-new.orange"
                    fontWeight="600"
                    borderRadius="50px"
                    _placeholder={{
                      color: "tripl-new.gray-200",
                      opacity: "0.7",
                    }}
                    type={show ? "text" : "password"}
                    placeholder="Confrim password"
                    {...register("confirmPassword")}
                  />
                  <InputRightElement ml={10}>
                    {show ? (
                      <ViewOffIcon onClick={handleClick} />
                    ) : (
                      <ViewIcon onClick={handleClick} />
                    )}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                bgColor="tripl-new.orange"
                color="tripl-new.light"
                boxShadow="lg"
                transitionDuration="0.2s"
                transitionTimingFunction="ease-in-out"
                _hover={{
                  transform: "translateY(10%)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
                borderRadius="50px"
                mt="25px"
                w="full"
                isLoading={isSubmitting}
                type="submit"
              >
                Sign Up
              </Button>
              <Text color="tripl-new.black">
                Already have an account?{" "}
                <ChakraLink as={Link} to="/sign-in" color="tripl-new.orange">
                  Sign In
                </ChakraLink>
              </Text>
              <HStack width="full">
                <Divider border="1px" borderRadius={"2xl"} />
                <Text color="tripl-new.black">or</Text>
                <Divider border="1px" borderRadius={"2xl"} />
              </HStack>
              <ChakraLink
                as={Link}
                to="/google/sign-in"
                color="tripl-new.orange"
                w="full"
              >
                <Button
                  color="tripl-new.orange"
                  bgColor="tripl-new.light"
                  border="1px solid"
                  boxShadow="lg"
                  transitionDuration="0.2s"
                  transitionTimingFunction="ease-in-out"
                  _hover={{
                    transform: "translateY(10%)",
                    transitionDuration: "0.2s",
                    transitionTimingFunction: "ease-in-out",
                  }}
                  borderRadius="50px"
                  w="full"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  <Box as="span" me="10px">
                    <FcGoogle />
                  </Box>
                  Sign Up with Google
                </Button>
              </ChakraLink>
            </VStack>
          </form>
        </Box>
      </GridItem>
      <GridItem display={{ base: "none", xl: "block" }}></GridItem>
    </Grid>
  );
};

export default SignUp;
