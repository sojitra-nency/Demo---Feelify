"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  CardContent,
  CardMedia,
  Grid,
  Link,
  Modal,
  Typography,
  Button,
  Box,
  Divider,
  Card,
  CircularProgress,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { paths } from "@/paths";

interface BookData {
  id: string;
  title: string;
  subtitle?: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  thumbnail: string;
  categories?: string[];
  preview?: string;
  download?: string;
  pageCount?: number;
  isbn?: any[];
  language?: string;
  publisher?: string;
  webReaderLink?: string;
}

interface BookListProps {
  title: string;
  queries: string[];
  subtitle: string[];
}

export default function EmotionBooks({
  title,
  queries,
  subtitle,
}: BookListProps) {
  const router = useRouter();
  const [books, setBooks] = useState<Record<string, BookData[]>>({});
  const [hasMore, setHasMore] = useState(true);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { data: userData, isLoading: isLoadingUser } = useRetrieveUserQuery();
  const [upgradeData, setUpgradeData] = useState<any>(null);
  const [isLoadingUpgrade, setIsLoadingUpgrade] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const fetchUpgradeDetails = async () => {
      try {
        if (!userData?.email) return;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/api/upgrades/${userData?.email}/`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );
        setUpgradeData(response.data);
        console.log("upgradeData", response.data);
      } catch (error) {
        console.error("Error fetching upgrade details:", error);
      } finally {
        setIsLoadingUpgrade(false);
      }
    };

    fetchUpgradeDetails();
  }, [userData?.email]);

  const isAllowed = upgradeData?.access_level === "premium" || upgradeData?.access_level === "basic";

  useEffect(() => {
    if (!isAllowed && !isLoadingUpgrade) {
      setShouldRedirect(true);
    }
  }, [isAllowed, isLoadingUpgrade]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push(paths.upgrade);
    }
  }, [shouldRedirect]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        for (const query of queries) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_HOST}/api/book-search/?q=${query}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("auth_token")}`,
              },
            }
          );
          setBooks((prev) => ({ ...prev, [query]: response.data }));
        }
      } catch {
        console.log("Failed to fetch books");
      }
    }
    fetchBooks();
  }, []);

  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleScroll = (query: string, direction: "left" | "right") => {
    const container = scrollRefs.current[query];
    if (container) {
      const scrollAmount = direction === "left" ? -250 : 250;
      container.scrollLeft += scrollAmount;

      if (
        direction === "right" &&
        container.scrollLeft + container.offsetWidth >= container.scrollWidth
      ) {
        container.scrollLeft = 0;
      } else if (direction === "left" && container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth - container.offsetWidth;
      }
    }
  };

  const fetchMoreData = async () => {
    setHasMore(false);
  };

  const handleOpenModal = (book: BookData) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (isAllowed) {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        {title}
      </Typography>

      <InfiniteScroll
        dataLength={Object.keys(books).length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{ margin: 2 }}
            >
              <CircularProgress />
              <Typography variant="h6">Loading Books...</Typography>
            </Box>
          </>
        }
      >
        {Object.entries(books).map(([query, booksForQuery]) => (
          <Box key={query} sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              {subtitle[queries.indexOf(query)]}
            </Typography>

            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                "&::-webkit-scrollbar": { display: "none" },
              }}
              ref={(ref: HTMLDivElement) => {
                scrollRefs.current[query] = ref;
              }}
            >
              {booksForQuery.map((book) => (
                <Box
                  key={book.id}
                  sx={{
                    minWidth: 250,
                    marginRight: 4,
                  }}
                  onClick={() => handleOpenModal(book)}
                >
                  <Grid item xs={12} sm={3} md={3} key={book.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="300"
                        width="300"
                        image={
                          book.thumbnail
                            ? book.thumbnail
                            : "/assets/book_cover.jpg"
                        }
                        alt={book.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {book.title}
                        </Typography>
                        {book.authors && book.authors.length > 0 && (
                          <Typography variant="body2" color="text.secondary">
                            by {book.authors.join(", ")}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                </Box>
              ))}
            </Box>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Button onClick={() => handleScroll(query, "left")}>
                <ArrowBackIosIcon />
              </Button>
              <Button onClick={() => handleScroll(query, "right")}>
                <ArrowForwardIosIcon />
              </Button>
            </div>

            <Divider sx={{ my: 2 }} />
          </Box>
        ))}
      </InfiniteScroll>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="book-detail-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-35%, -50%)",
            width: 900,
            bgcolor: "#eaebfe",
            boxShadow: 24,
            p: 4,
            outline: "none",
            borderRadius: 2,
          }}
        >
          {selectedBook && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  height="400"
                  image={
                    selectedBook.thumbnail
                      ? selectedBook.thumbnail
                      : "/assets/book_cover.jpg"
                  }
                  alt={selectedBook.title}
                  sx={{ m: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {selectedBook.title}
                  </Typography>
                  {selectedBook.subtitle &&
                    selectedBook.subtitle.length > 0 && (
                      <Typography variant="subtitle1" gutterBottom>
                        {selectedBook.subtitle}
                      </Typography>
                    )}
                  {selectedBook.authors && selectedBook.authors.length > 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      by {selectedBook.authors?.join(", ")}
                    </Typography>
                  )}
                  {selectedBook.publishedDate &&
                    selectedBook.publishedDate.length > 0 && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Published: {selectedBook.publishedDate}
                      </Typography>
                    )}
                  {selectedBook.publisher &&
                    selectedBook.publisher.length > 0 && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Publisher: {selectedBook.publisher}
                      </Typography>
                    )}
                  {selectedBook.isbn &&
                    selectedBook.isbn.length > 0 &&
                    selectedBook.isbn.map((isbnObj, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {Object.entries(isbnObj)
                          .map(([key, value]) => ` ${value}`)
                          .join(": ")}
                      </Typography>
                    ))}
                  {selectedBook.description &&
                    selectedBook.description.length > 0 && (
                      <>
                        <Typography variant="body1" gutterBottom>
                          Description:
                        </Typography>
                        <Typography variant="body1" paragraph>
                          {showFullDescription
                            ? selectedBook.description
                            : `${selectedBook.description.slice(0, 150)}...`}
                          <Link href="#" onClick={toggleDescription}>
                            {showFullDescription ? "View Less" : "View More"}
                          </Link>
                        </Typography>
                      </>
                    )}
                  {selectedBook.categories &&
                    selectedBook.categories.length > 0 && (
                      <Typography variant="body2" color="text.secondary">
                        Categories: {selectedBook.categories.join(", ")}
                      </Typography>
                    )}
                  {selectedBook.pageCount && (
                    <Typography variant="body2" color="text.secondary">
                      Pages: {selectedBook.pageCount}
                    </Typography>
                  )}
                  {selectedBook.language &&
                    selectedBook.language.length > 0 && (
                      <Typography variant="body2" color="text.secondary">
                        Language:{" "}
                        {selectedBook.language === "en"
                          ? "English"
                          : selectedBook.language}
                      </Typography>
                    )}

                  <Box sx={{ "& > :not(style)": { m: 1 } }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        window.open(selectedBook?.webReaderLink, "_blank")
                      }
                    >
                      Read
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        window.open(selectedBook?.download, "_blank")
                      }
                    >
                      Download
                    </Button>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </div>
  );
} else {
  return null;
}
}
