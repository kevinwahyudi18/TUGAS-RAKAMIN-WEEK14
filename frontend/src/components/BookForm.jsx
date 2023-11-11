import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
  Box,
  Center
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { createBook, editBook } from "../modules/fetch";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('title', event.target.title.value);
    formData.append('author', event.target.author.value);
    formData.append('publisher', event.target.publisher.value);
    formData.append('year', parseInt(event.target.year.value));
    formData.append('pages', parseInt(event.target.pages.value));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Determine if we're creating or editing a book
    const action = bookData ? editBook : createBook;

    try {
      await action(bookData?.id, formData);
      event.target.reset();
      setSelectedImage(null);
      setImageFile(null);
      toast({
        title: "Success",
        description: `Book ${bookData ? 'edited' : 'created'} successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data.message || "Something went wrong",
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

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file); // Store the file to send on submit
    }
  }

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
          {/* ... all your FormControls ... */}
          <Center>
            {selectedImage && (
              <Box w={64} mx="auto" my={4} pos="relative" height="150px">
                <Image
                  src={selectedImage}
                  alt="Selected Image"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            )}
          </Center>
          {!bookData?.image && (
            <FormControl>
              <FormLabel textAlign="center">Image</FormLabel>
              <Input
                border="1px solid black"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>
          )}
        </Box>
        <Button type="submit">{bookData ? "Edit Book" : "Create Book"}</Button>
      </VStack>
    </form>
  );
}
