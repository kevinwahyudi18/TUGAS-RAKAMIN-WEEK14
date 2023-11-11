import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { registerUser } from "../modules/fetch"; // Pastikan ini adalah fungsi yang berkomunikasi dengan API Next.js atau server eksternal

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter(); // Menggunakan useRouter dari Next.js
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const result = await registerUser(
        e.target.name.value,
        e.target.email.value,
        password
      );
      // Pastikan ini adalah respons yang diharapkan dari API Anda
      if (result.success) {
        toast({
          title: "Registered",
          description: "You have successfully registered.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/"); // Navigasi ke homepage atau halaman login
      } else {
        // Handle kasus di mana API tidak mengembalikan kesuksesan
        throw new Error(result.message || "Registration failed");
      }
    } catch (e) {
      setError(e.message || "An error occurred. Please try again.");
      toast({
        title: "An error occurred.",
        description: e.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="full" py={4} px={24} mx="auto" mt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Register
      </Text>
      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <form onSubmit={handleSubmit}>
          {error && (
            <Box color="red.500" mb={4}>
              {error}
            </Box>
          )}
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" placeholder="Enter your name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" placeholder="Enter your email address" />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {password !== confirmPassword && (
              <FormErrorMessage>Passwords do not match.</FormErrorMessage>
            )}
          </FormControl>
          <Button mt={6} colorScheme="teal" type="submit">
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
