"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Container,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { neonBlue } from "@/styles/theme/colors";

const BookCategories = [
  {
    title:
      "Escape the ordinary and discover extraordinary moments of happiness.",
    path: paths.recommendation.books.happy,
    image: "/assets/happy/img.avif",
  },
  {
    title: "Turn those goosebumps into laughter. It's book therapy time!",
    path: paths.recommendation.books.fear,
    image: "/assets/fear/img.jpg",
  },
  {
    title: "Turn your blues into hues with these uplifting Books.",
    path: paths.recommendation.books.sad,
    image: "/assets/sad/img.avif",
  },
  {
    title:
      "Get ready to have your expectations delightfully shattered.",
    path: paths.recommendation.books.surprise,
    image: "/assets/surprise/img.jpg",
  },
  {
    title:
      "Open the door to endless possibilities. Click read and let the adventure begin.",
    path: paths.recommendation.books.neutral,
    image: "/assets/neutral/img.jpg",
  },
];

export default function Books() {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{
          color: neonBlue[700],
          fontStyle: "bold",
          textAlign: "center",
          mb: 5,
        }}
      >
       Match Your Mood, Find Your Book...
      </Typography>

      <Grid container direction="column" spacing={10}>
        {BookCategories.map(({ title, path, image }) => (
          <Grid item xs={12} sm={6} md={4} key={title}>
            <Card
              sx={{
                backgroundColor: "#eaebfe",
                elevation: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 6px 30px 0 rgba(0,0,0,0.24)",
                },
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontStyle: "italic",
                      textAlign: "center",
                      fontSize: "1.25rem",
                      mb: 2,
                      color: neonBlue[900],
                    }}
                  >
                    {title}
                  </Typography>
                }
              />
              <CardMedia
                component="img"
                height="350"
                image={image}
                alt={title}
              />
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(path)}
                  >
                    Go to Books
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
