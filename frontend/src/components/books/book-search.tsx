"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { Paper } from "@mui/material";

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

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm.trim() === "") return;
      setLoading(true);

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/books/book-search/?q=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ mb: 6 }}
      >
        SEARCH BOOKS
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
          <CircularProgress />
          <Typography variant="h6">Loading Books...</Typography>
        </Box>
      )}

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              {book.thumbnail && (
                <CardMedia
                  component="img"
                  height="500"
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
  );
}
