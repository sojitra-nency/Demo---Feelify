"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { Paper } from "@mui/material";
import Cookies from "js-cookie";
import { neonBlue } from "@/styles/theme/colors";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";

interface Book {
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

export default function BookSearch() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm.trim() === "") return;
      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/api/book-search/?q=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );
        const data = await response.data;
        setBooks(data);
      } catch (error) {
        toast.error("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchTerm(inputValue);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 0) {
      setCurrentPage(0);
    } else {
      setCurrentPage(newPage);
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const CurrentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <>
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ color: neonBlue[700], fontStyle: "bold", textAlign: "center" }}
      >
        Search Books
      </Typography>

      <Grid container spacing={1} alignItems="flex-end" justifyContent="center">
        <Grid item xs={6}>
          <TextField
            label="Search Books"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            component={Paper}
            fullWidth
            sx={{ backgroundColor: "#eaebfe" }}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={handleSearchClick}
            variant="contained"
            color="primary"
            sx={{ p: 2 }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ margin: 2 }}
        >
          <img
            src="/assets/book_loader.gif"
            alt="Loading..."
            height="400"
            width="300"
          />
          <Typography variant="h6">Loading Books...</Typography>
        </Box>
      )}

      {!loading && books.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <img
            src="/assets/book_search.gif"
            alt="Loading..."
            height="400"
            width="450"
          />
        </Box>
      )}

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {CurrentBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card sx={{ width: 350 }}>
              {book.thumbnail && (
                <CardMedia
                  component="img"
                  sx={{
                    height: 300,
                    objectFit: "contain",
                    background: neonBlue[200],
                  }}
                  image={book.thumbnail}
                  alt={book.title}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {book.title}
                </Typography>
                {book.subtitle && (
                  <Typography variant="subtitle1" color="text.secondary">
                    {book.subtitle}
                  </Typography>
                )}
                {book.authors && book.authors.length > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    by {book.authors.join(", ")}
                  </Typography>
                )}
                {book.webReaderLink && (
                  <Link
                    href={book.webReaderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="contained" sx={{ mt: 1 }}>
                      Read
                    </Button>
                  </Link>
                )}
                {book.download && (
                  <Link
                    href={book.download}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="contained" sx={{ mt: 1, ml: 1 }}>
                      Download
                    </Button>
                  </Link> 
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 2, borderRadius: "5px", padding: "10px" }}
      >
        <IconButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          sx={{ color: neonBlue[500], "&:hover": { backgroundColor: "#fff" } }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Box display="flex">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              variant={currentPage === index + 1 ? "contained" : "outlined"}
              size="small"
              sx={{
                mx: 0.5,
                minWidth: "auto",
                color: currentPage === index + 1 ? "#fff" : neonBlue[500],
                borderColor: neonBlue[500],
                "&:hover": { backgroundColor: neonBlue[500], color: "#fff" },
              }}
            >
              {index + 1}
            </Button>
          ))}
        </Box>

        <IconButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          size="small"
          sx={{ color: neonBlue[500], "&:hover": { backgroundColor: "#fff" } }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </>
  );
}
