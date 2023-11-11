import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteBook, getBookDetailById } from "../modules/fetch";
import Link from 'next/link';

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAuthorized, setAuthorized] = useState(false);
  const router = useRouter();
  const { id } = router.query; // Use router.query to get the URL parameter in Next.js
  const toast = useToast();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
        toast({ status: "error", title: "Error loading book details" });
      }
    };

    // Check for authorization (token) client-side
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setAuthorized(!!token);

    if (id) fetchBook();
  }, [id, toast]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      router.push("/"); // Use router.push to navigate in Next.js
    } catch (e) {
      console.log(e);
      toast({ status: "error", title: "Error deleting book" });
    }
  };

  if (isLoading) {
    return <Skeleton height="300px" my="6" />;
  }

  return (
    <Box>
      <Flex my="6">
        <Box w="300px">
          <Image
            src={`http://localhost:8000/${book.image}`}
            alt={book.title}
            layout="fill" // Next.js Image component uses layout prop for responsive images
          />
        </Box>
        <Box ml="8">
          <Heading as="h1" size="lg">{book.title}</Heading>
          {/* ... additional book details ... */}
        </Box>
      </Flex>
      {isAuthorized && (
        <HStack>
          <Popover>
            {/* ... Popover content ... */}
            <Button onClick={handleDeleteBook} colorScheme="red">
              Delete
            </Button>
          </Popover>
          <Link href={`/editbook/${id}`} passHref>
            <Button as="a">Edit</Button>
          </Link>
        </HStack>
      )}
    </Box>
  );
}
