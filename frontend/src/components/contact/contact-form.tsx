"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Card,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

export default function Contact(): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/contact/`, {
        name,
        email,
        message,
      });
      if (response.status === 201) {
        toast.success("Your message has been sent!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
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
        CONTACT FEELIFY
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
        <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
          <Box textAlign="center" mb={2}>
            <Typography variant="h5" gutterBottom>
              Having trouble? Let us know!
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Message"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </FormControl>

            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </>
  );
}
