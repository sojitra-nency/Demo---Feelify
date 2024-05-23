"use client";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Paper } from "@mui/material";
import Cookies from "js-cookie";
import { neonBlue } from "@/styles/theme/colors";
interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

export default function VideoSearch() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm.trim() === "") return;
      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/api/video-search/?q=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );
        const data = await response.data;
        setVideos(data);
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

  const handleCardClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ color: neonBlue[700], fontStyle: "bold", textAlign: "center" }}
      >
        Search Videos
      </Typography>
      <Grid container spacing={1} alignItems="flex-end" justifyContent="center">
        <Grid item xs={6}>
          <TextField
            label="Search Videos"
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
            src="/assets/video-loader.gif"
            alt="Loading..."
            height="300"
            width="300"
          />
          <Typography variant="h6">Loading Videos...</Typography>
        </Box>
      )}

      {!loading && videos.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ margin: 5 }}
        >
          <img
            src="/assets/search.gif"
            alt="Loading..."
            height="300"
            width="400"
          />
        </Box>
      )}

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {videos.map((video) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={video.id}
            onClick={() => handleCardClick(video)}
          >
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={video.thumbnail}
                alt={video.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {video.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={selectedVideo !== null} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
          }}
        >
          <iframe
            width="100%"
            height="450"
            src={`https://www.youtube.com/embed/${selectedVideo?.id}`}
            title={selectedVideo?.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      </Modal>
    </Box>
  );
}
