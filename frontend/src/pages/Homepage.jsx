import { Grid } from "@chakra-ui/react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";

// The component receives the books as a prop from getStaticProps below
export default function Homepage({ books }) {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {books?.map((book) => (
        <Books key={book.id} {...book} />
      ))}
    </Grid>
  );
}

// This function gets called at build time on server-side
export async function getStaticProps() {
  try {
    const books = await getAllBooks();
    return { props: { books: books.books } }; // Assuming the API returns an object with a books array
  } catch (error) {
    console.error(error);
    return { props: { books: [] } };
  }
}
