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
import { neonBlue } from "@/styles/theme/colors";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Cookies from "js-cookie";

interface Feedback {
  id: number;
  content: string;
  sentiment: string;
}

const COLORS = ['#0088FE', '#FF8042'];

export default function Overview(): React.JSX.Element {
  const router = useRouter();
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [sentimentData, setSentimentData] = useState([
    { name: 'Positive', value: 0 },
    { name: 'Negative', value: 0 },
  ]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = Cookies.get("auth_token");
        const response = await axios.get<Feedback[]>(`${process.env.NEXT_PUBLIC_HOST}/api/feedback/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        setFeedbackData(response.data);
        calculateSentiment(response.data);
      } catch (error) {
        console.error('Error fetching feedback data', error);
      }
    };

    fetchFeedback();
  }, []);

  const calculateSentiment = (data: Feedback[]) => {
    const positiveCount = data.filter(fb => fb.sentiment === 'Positive').length;
    const negativeCount = data.filter(fb => fb.sentiment === 'Negative').length;
    setSentimentData([
      { name: 'Positive', value: positiveCount },
      { name: 'Negative', value: negativeCount },
    ]);
  };


  return (
    <>
    <div>
      <h1>Feedback Sentiment Dashboard</h1>
      <PieChart width={400} height={400}>
        <Pie
          data={sentimentData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent = 10 }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {sentimentData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
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

      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 400,
              minHeight: 300,
              margin: "auto",
              padding: 2,
              transition: "0.3s",
              backgroundColor: "#eaebfe",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 30px 0 rgba(0,0,0,0.24)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  display: "flex",
                  fontWeight: "bold",
                  color: neonBlue[700],
                  fontSize: "1.35rem",
                }}
              >
                <MoodIcon sx={{ mr: 1, mb: 1, fontSize: "2rem" }} />
                Feel, Watch, Read
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  lineHeight: "1.6",
                  mb: 2,
                  color: neonBlue[900],
                }}
              >
                Discover books and videos that match your mood across 5
                emotions.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                }}
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
              backgroundColor: "#eaebfe",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 30px 0 rgba(0,0,0,0.24)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  display: "flex",
                  fontWeight: "bold",
                  color: neonBlue[700],
                  fontSize: "1.35rem",
                }}
              >
                <SearchIcon sx={{ mr: 1, mb: 1, fontSize: "2rem" }} /> Search
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  lineHeight: "1.6",
                  mb: 2,
                  color: neonBlue[900],
                }}
              >
                Find the perfect book or video to match your interests.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 6 }}>
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
              backgroundColor: "#eaebfe",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 30px 0 rgba(0,0,0,0.24)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  display: "flex",
                  fontWeight: "bold",
                  color: neonBlue[700],
                  fontSize: "1.35rem",
                }}
              >
                <CurrencyRupeeIcon sx={{ mr: 1, mb: 1, fontSize: "2rem" }} /> Go
                Premium!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  lineHeight: "1.6",
                  mb: 2,
                  color: neonBlue[900],
                }}
              >
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
              backgroundColor: "#eaebfe",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 30px 0 rgba(0,0,0,0.24)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  display: "flex",
                  fontWeight: "bold",
                  color: neonBlue[700],
                  fontSize: "1.35rem",
                }}
              >
                <RateReviewIcon sx={{ mr: 1, mb: 1, fontSize: "2rem" }} /> Rate
                & Review
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  lineHeight: "1.6",
                  mb: 2,
                  color: neonBlue[900],
                }}
              >
                Loved a book or video? Let the world know! Your ratings and
                reviews help others find their next emotional journey.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push(paths.dashboard.overview)}
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
              backgroundColor: "#eaebfe",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 30px 0 rgba(0,0,0,0.24)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  display: "flex",
                  fontWeight: "bold",
                  color: neonBlue[700],
                  fontSize: "1.35rem",
                }}
              >
                <InfoIcon sx={{ mr: 1, mb: 1, fontSize: "2rem" }} /> About Us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  lineHeight: "1.6",
                  mb: 2,
                  color: neonBlue[900],
                }}
              >
                Learn more about our mission and the team behind Feelify.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => router.push(paths.dashboard.about)}
              >
                Our Story
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
              backgroundColor: "#eaebfe",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 30px 0 rgba(0,0,0,0.24)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  display: "flex",
                  fontWeight: "bold",
                  color: neonBlue[700],
                  fontSize: "1.35rem",
                }}
              >
                <FeedbackIcon sx={{ mr: 1, mb: 1, fontSize: "2rem" }} /> Contact
                Us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: "1.6",
                  mb: 2,
                  color: neonBlue[900],
                  fontWeight: 600,
                }}
              >
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
      </Grid>
    </Box>
    </>
  );
}
