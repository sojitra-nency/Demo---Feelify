"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import MoodIcon from "@mui/icons-material/Mood";
import SearchIcon from "@mui/icons-material/Search";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FeedbackIcon from "@mui/icons-material/Feedback";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export default function Overview(): React.JSX.Element {
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
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Feelify
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 6 }}>
        Your emotion-based book and video recommendation system
      </Typography>

      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 400,
              minHeight: 300,
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
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <MoodIcon sx={{ mr: 1 }} /> Feel, Watch, Read
              </Typography>
              <Typography variant="body2">
                Discover books and videos that match your mood across 5
                emotions.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => router.push(paths.dashboard.emotions)}
              >
                Explore Now
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 400,
              minHeight: 300,
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
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <SearchIcon sx={{ mr: 1 }} /> Search
              </Typography>
              <Typography variant="body2">
                Find the perfect book or video to match your interests.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push(paths.dashboard.vsearch)}
                >
                  <LiveTvIcon sx={{ mr: 1 }} /> Videos
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => router.push(paths.dashboard.bsearch)}
                >
                  <MenuBookIcon sx={{ mr: 1 }} /> Books
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 400,
              minHeight: 300,
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
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <CurrencyRupeeIcon sx={{ mr: 1 }} /> Go Premium!
              </Typography>
              <Typography variant="body2">
                Unlock personalized recommendations based on your live emotions.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => router.push(paths.home)}
              >
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 400,
              minHeight: 300,
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
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <RateReviewIcon sx={{ mr: 1 }} /> Rate & Review
              </Typography>
              <Typography variant="body2">
                Loved a book or video? Let the world know! Your ratings and
                reviews help others find their next emotional journey.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push(paths.feedback)}
                >
                  <FeedbackIcon sx={{ mr: 1 }} /> Feedback
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 400,
              minHeight: 300,
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
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <FeedbackIcon sx={{ mr: 1 }} /> Contact Us
              </Typography>
              <Typography variant="body2">
                We're here to help! Contact us for support, partnership
                inquiries, or just to chat.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push(paths.contact)}
                >
                  <ContactSupportIcon sx={{ mr: 1 }} /> Contact
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* About Us */}
        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 400,
              minHeight: 300,
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
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <InfoIcon sx={{ mr: 1 }} /> About Us
              </Typography>
              <Typography variant="body2">
                Learn more about our mission and the team behind Feelify.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => router.push(paths.dashboard.about)}
              >
                Our Story
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
