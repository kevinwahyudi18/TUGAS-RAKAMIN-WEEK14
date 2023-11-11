import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    // Ini memastikan bahwa kode hanya berjalan di sisi klien
    const handleTokenCheck = () => {
      const token = localStorage.getItem("token");
      setIsLogin(!!token);
    };

    if (typeof window !== "undefined") {
      handleTokenCheck();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    router.push("/");
  };

  const handleLogin = async (email, password) => {
    try {
      const token = await loginUser(email, password);
      localStorage.setItem("token", token.token);
      setIsLogin(true);
      router.push("/");
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bgGradient={[
        'linear(to-tr, teal.300, yellow.400)',
        'linear(to-t, blue.200, teal.500)',
        'linear(to-b, orange.100, purple.300)',
      ]}
      color="white"
      w="full"
    >
      <Link href="/" passHref>
        <Flex align="center" mr={5} as="a" cursor="pointer">
          <Text fontSize="2xl" fontWeight="bold">
            My Website
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLogin && (
          <Link href="/newbook" passHref>
            <Button as="a" colorScheme="blackAlpha">Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="blue">
            Login
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack as="form" id="login-form" onSubmit={(e) => {
              e.preventDefault();
              handleLogin(e.target.email.value, e.target.password.value);
            }}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </FormControl>
              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Login
                </Button>
                <Link href="/register" passHref>
                  <Button variant="ghost" onClick={onClose} as="a">
                    Doesn't Have Account? Click here
                  </Button>
                </Link>
              </ModalFooter>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;
