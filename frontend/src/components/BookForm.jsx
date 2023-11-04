import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  VStack,
  Box,
  Center
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
      <Box
      boxShadow="md"
      p={4}
      borderRadius="md"
      bgGradient={[
    'linear(to-tr, teal.300, yellow.400)',
    'linear(to-t, blue.200, teal.500)',
    'linear(to-b, orange.100, purple.300)',
  ]}
      >
        <FormControl>
          <FormLabel textAlign="center">Title</FormLabel>
          <Input border="1px solid black" name="title" required defaultValue={bookData?.title} />
        </FormControl>
        <FormControl>
          <FormLabel textAlign="center">Author</FormLabel>
          <Input border="1px solid black" name="author" required defaultValue={bookData?.author} />
        </FormControl>
        <FormControl>
          <FormLabel textAlign="center">Publisher</FormLabel>
          <Input border="1px solid black" name="publisher" required defaultValue={bookData?.publisher} />
        </FormControl>
        <FormControl>
          <FormLabel textAlign="center">Year</FormLabel>
          <Input border="1px solid black" name="year" type="number" required defaultValue={bookData?.year} />
        </FormControl>
        <FormControl>
          <FormLabel textAlign="center">Pages</FormLabel>
          <Input border="1px solid black" name="pages" type="number" required defaultValue={bookData?.pages}
          />
        </FormControl>
        <Center>
          {selectedImage && (
          <Image w={64} src={selectedImage} alt="Selected Image" mx="auto" my={4}/>
          )}
          </Center>
        {!bookData?.image && (
          <FormControl>
            <FormLabel textAlign="center">Image</FormLabel>
            <Input border="1px solid black"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedImage(URL.createObjectURL(file));
              }}
            />
          </FormControl>
        )}
        </Box>
        <Button type="submit">{bookData ? "Edit Book" : "Create Book"}</Button>
      </VStack>
    </form>
  );
}
