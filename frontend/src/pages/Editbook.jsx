import { Box } from "@chakra-ui/react";
import BookForm from "../components/BookForm";
import { getBookDetailById } from "../modules/fetch";

export default function EditBookPage({ book }) {
  return (
    <Box>
      <BookForm bookData={book} />
    </Box>
  );
}

// This function gets called at request time on server-side.
// It will fetch the book data and pass it to the page component via props.
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const response = await getBookDetailById(id);
    return { props: { book: response.book } };
  } catch (e) {
    // If we catch an error, we could return an error page or pass an error through props
    console.log(e);
    return { props: { error: 'Failed to fetch book data.' } };
  }
}
