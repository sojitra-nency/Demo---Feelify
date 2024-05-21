// pages/feedback.tsx
"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Cookies from 'js-cookie';

export default function FeedBack(): React.JSX.Element {
  const [emotion, setEmotion] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user_id = Cookies.get("id");
      const token = Cookies.get('auth_token');
      const response = await axios.post(
        "http://127.0.0.1:8000/api/feedback/",
        { user: user_id, emotion, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Feedback submitted!");
        setEmotion("");
        setRating(null);
        setComment("");
      } else {
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      toast.error("Error submitting feedback");
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ mb: 5 }}
      >
        FEEDBACK, REVIEWS AND RATINGS
      </Typography>

      <Card
        sx={{
          maxWidth: 400,
          margin: "auto",
          padding: 2,
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 6px 30px 0 rgba(0,0,0,0.24)",
          },
        }}
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" gutterBottom>
            Your Feedback Matters :)
          </Typography>
        </Box>
        <Paper component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ my: 3 }}>
            <InputLabel id="emotion-label">Emotion</InputLabel>
            <Select
              labelId="emotion-label"
              value={emotion}
              label="Emotion"
              onChange={(e) => setEmotion(e.target.value)}
            >
              <MenuItem value="happy">Happy</MenuItem>
              <MenuItem value="sad">Sad</MenuItem>
              <MenuItem value="neutral">Neutral</MenuItem>
              <MenuItem value="fear">Fear</MenuItem>
              <MenuItem value="surprise">Surprise</MenuItem>
            </Select>
          </FormControl>

          <Box textAlign="center">
            <Typography component="legend" variant="h6">
              Rate your experience:
            </Typography>
            <Rating
              name="rating"
              value={rating}
              size="large"
              onChange={(event, newValue) => setRating(newValue)}
            />
          </Box>
          <TextField
            label="Share your thoughts"
            multiline
            rows={4}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ my: 3 }}
          />

          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Submit Feedback
            </Button>
          </Box>
        </Paper>
      </Card>
    </>
  );
}
