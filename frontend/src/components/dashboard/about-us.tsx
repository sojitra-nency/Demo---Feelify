"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { neonBlue } from "@/styles/theme/colors";

export function AboutUs(): React.JSX.Element {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ color: neonBlue[700], fontStyle: "bold" }}
      >
        Welcome to Feelify
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ mb: 6, color: neonBlue[900] }}
      >
        Your emotion-based book and video recommendation system
      </Typography>

      <Container maxWidth="md">
        <Card sx={{ display: "flex", marginBottom: "30px", borderRadius: 3 }}>
          <img
            style={{ width: 350 }}
            src="/assets/profile.jpg"
            alt="Founder - Nency Sojitra"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: neonBlue[100],
            }}
          >
            <CardContent sx={{ flex: "1 0 auto", p: 5 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: neonBlue[800],
                }}
              >
                Meet Nency Sojitra
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  marginBottom: "10px",
                  fontSize: "0.90rem",
                  color: neonBlue[700],
                }}
              >
                Founder of Feelify
              </Typography>
              <Typography
                variant="body1"
                paragraph
                align="justify"
                sx={{ fontSize: "1rem", color: neonBlue[900] }}
              >
                Nency is a passionate full stack developer and a books and
                videos lover. She believes in the power of media to heal,
                inspire, and connect us. She founded Feelify to help people
                discover content that resonates with their emotions. She is a
                graduate student at Parul University, Vadodara.
              </Typography>
            </CardContent>
            <Box
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            ></Box>
          </Box>
        </Card>
        <Box sx={{ textAlign: "center", marginBottom: "50px" }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ color: neonBlue[700], fontStyle: "bold", p: 4 }}
          >
            Our Mission
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: "10px",
                  backgroundColor: "#eaebfe",
                  minHeight: 220,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#3f51b5", fontWeight: "bold" }}
                  >
                    Emotion Recognition
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#616161" }}>
                    Our technology harnesses the power of AI to accurately
                    detect and recognize your facial expressions, unlocking the
                    gateway to personalized content experiences.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: "10px",
                  backgroundColor: "#eaebfe",
                  minHeight: 220,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#3f51b5", fontWeight: "bold" }}
                  >
                    Personalized Recommendations
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#616161" }}>
                    Based on your emotional state, our intelligent engine
                    curates a unique selection of books and videos tailored to
                    uplift, calm, or excite you.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: "10px",
                  backgroundColor: "#eaebfe",
                  minHeight: 220,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#3f51b5", fontWeight: "bold" }}
                  >
                    Content Exploration
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#616161" }}>
                    Embark on a journey of discovery through our vast library of
                    books and videos, guided by your emotions and our tailored
                    recommendations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ textAlign: "center", marginBottom: "50px" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: neonBlue[700], fontStyle: "bold", p: 4 }}
          >
            How Feelify Works?
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <img
                style={{ width: 300, height: 300, marginRight: "20px" }}
                src="/assets/emo_book_video.jpg"
                alt="Step 1"
              />
            </Grid>
            <Grid item xs={12} md={8} container spacing={3} >
            <Grid
              item
              xs={12}
              style={{ display: "flex", alignItems: "center", }}
            >
              <img
                style={{ width: 100, height: 100, marginRight: "20px" }}
                src="/assets/emotion_detection.avif"
                alt="Step 1"
              />
              <div>
                <Typography
                  variant="h6"
                  component="div"
                  align="justify"
                  sx={{
                    color: neonBlue[900],
                    lineHeight: "1",
                    fontWeight: "bold",
                    fontSize: "1.2em",
                    margin: "10px 0",
                  }}
                >
                  Emotion Detection
                </Typography>
                <Typography
                  variant="body2"
                  align="justify"
                  paragraph
                  sx={{
                    color: neonBlue[700],
                    lineHeight: "1.2",
                    fontSize: "1em",
                    margin: "10px 0",
                    textAlign: "justify",
                  }}
                >
                  Capture your live photo <br />
                  to detect your emotions.
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                style={{ width: 100, height: 100, marginRight: "20px" }}
                src="/assets/pick_emotion.png"
                alt="Step 1"
              />
              <div>
                <Typography
                  variant="h6"
                  component="div"
                  align="justify"
                  sx={{
                    color: neonBlue[900],
                    lineHeight: "1",
                    fontWeight: "bold",
                    fontSize: "1.2em",
                    margin: "10px 0",
                  }}
                >
                  Pick your Mood
                </Typography>
                <Typography
                  variant="body2"
                  align="justify"
                  paragraph
                  sx={{
                    color: neonBlue[700],
                    lineHeight: "1.2",
                    fontSize: "1em",
                    margin: "10px 0",
                    textAlign: "justify",
                  }}
                >
                  Choose your mood and <br />
                  get personalized book and <br />
                  video recommendations.
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                style={{ width: 100, height: 100, marginRight: "20px" }}
                src="/assets/recommendation.webp"
                alt="Step 1"
              />
              <div>
                <Typography
                  variant="h6"
                  component="div"
                  align="justify"
                  sx={{
                    color: neonBlue[900],
                    lineHeight: "1",
                    fontWeight: "bold",
                    fontSize: "1.2em",
                    margin: "10px 0",
                  }}
                >
                  Recommendations
                </Typography>
                <Typography
                  variant="body2"
                  align="justify"
                  paragraph
                  sx={{
                    color: neonBlue[700],
                    lineHeight: "1.2",
                    fontSize: "1em",
                    margin: "10px 0",
                    textAlign: "justify",
                  }}
                >
                  After analyzing your emotions,
                  <br />
                  we recommend books and videos
                  <br />
                  that match your mood.
                </Typography>
              </div>
            </Grid>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", marginTop: "50px" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ borderRadius: 2 }}
              onClick={() => router.push(paths.dashboard.overview)}
            >
              Start Your Emotional Journey
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
