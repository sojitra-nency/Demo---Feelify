"use client"

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Paper } from '@mui/material';

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

export default function VideoSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      if (searchTerm.trim() === '') return;
      setLoading(true);

      try {
        const response = await axios.get(`http://127.0.0.1:8000/videos/video-search/?q=${searchTerm}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        });
        const data = await response.data;
        setVideos(data);
      } catch (error) {
        toast.error('Failed to fetch videos.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };``

  const handleCardClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 6 }}>
        SEARCH VIDEOS
      </Typography>
      <TextField
        label="Search Videos"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        component={Paper}
      />

      {loading && <CircularProgress sx={{ margin: 2 }} />}

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id} onClick={() => handleCardClick(video)}>
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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800 }}>
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

