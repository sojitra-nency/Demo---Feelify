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

const videoCategories = [
  {
    title:
      "Escape the ordinary and discover extraordinary moments of happiness.",
    path: paths.recommendation.videos.happy,
    image: "/assets/happy/image.jpg",
  },
  {
    title: "Turn those goosebumps into laughter. It's video therapy time!",
    path: paths.recommendation.videos.fear,
    image: "/assets/fear/image.jpg",
  },
  {
    title: "Turn your blues into hues with these uplifting videos.",
    path: paths.recommendation.videos.sad,
    image: "/assets/sad/image.jpg",
  },
  {
    title: "Get ready to have your expectations delightfully shattered.",
    path: paths.recommendation.videos.surprise,
    image: "/assets/surprise/image.jpg",
  },
  {
    title:
      "Open the door to endless possibilities. Click play and let the adventure begin.",
    path: paths.recommendation.videos.neutral,
    image: "/assets/neutral/image.jpg",
  },
];

export default function Videos() {
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
        Match Your Mood, Discover New Videos...
      </Typography>

      <Grid container direction="column" spacing={10}>
        {videoCategories.map(({ title, path, image }) => (
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
                    Go to videos
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
