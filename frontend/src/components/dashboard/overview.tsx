"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import MoodIcon from "@mui/icons-material/Mood";
import SearchIcon from "@mui/icons-material/Search";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { neonBlue } from "@/styles/theme/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import Cookies from "js-cookie";
import {} from "recharts";
import { SentimentDissatisfied, SentimentSatisfied } from "@mui/icons-material";

interface Feedback {
  id: number;
  comment: string;
  sentiment: string;
}

interface EmotionRecord {
  emotion: string;
  percentage: number;
  recorded_at: string;
}

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case "Positive":
      return (
        <SentimentSatisfied style={{ color: "green", fontSize: "2rem" }} />
      );
    case "Negative":
      return (
        <SentimentDissatisfied style={{ color: "red", fontSize: "2rem" }} />
      );
    default:
      return null;
  }
};

const colorMapping: { [key: string]: string } = {
  happy: neonBlue[600],
  sad: neonBlue[500],
  fear: neonBlue[400],
  surprise: neonBlue[300],
  neutral: neonBlue[200],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#ae83eb"];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const { emotion, percentage } = payload[0].payload as Record<
      string,
      number
    >;
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p>{`${emotion} : ${percentage}%`}</p>
      </div>
    );
  }
  return null;
};

export default function Overview(): React.JSX.Element {
  const router = useRouter();
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [sentimentData, setSentimentData] = useState([
    { name: "Positive", value: 0 },
    { name: "Negative", value: 0 },
  ]);
  const [records, setRecords] = useState<EmotionRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const total = sentimentData.reduce((acc, curr) => acc + curr.value, 0);

  const formatTooltipValue = (value: number, name: string) => {
    const percentage = ((value / total) * 100).toFixed(2);
    return `${percentage}%`;
  };

  const CustomLegend = ({ payload }: { payload: any[] }) => {
    console.log(payload);
    return (
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            style={{
              color: entry.color,
              margin: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                backgroundColor: entry.color,
                marginRight: "5px",
              }}
            ></span>
            {entry.value === 0
              ? "Neutral"
              : entry.value === 1
              ? "Happy"
              : entry.value}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = Cookies.get("auth_token");
        const response = await axios.get<Feedback[]>(
          `${process.env.NEXT_PUBLIC_HOST}/api/feedback/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFeedbackData(response.data);
        calculateSentiment(response.data);
      } catch (error) {
        console.error("Error fetching feedback data", error);
      }
    };

    fetchFeedback();
  }, []);

  const calculateSentiment = (data: Feedback[]) => {
    const positiveCount = data.filter(
      (fb) => fb.sentiment === "Positive"
    ).length;
    const negativeCount = data.filter(
      (fb) => fb.sentiment === "Negative"
    ).length;
    setSentimentData([
      { name: "Positive", value: positiveCount },
      { name: "Negative", value: negativeCount },
    ]);
  };

  useEffect(() => {
    const fetchEmotionRecords = async () => {
      try {
        const token = Cookies.get("auth_token");
        const response = await axios.get<EmotionRecord[]>(
          `${process.env.NEXT_PUBLIC_HOST}/api/records`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const aggregatedRecords = response.data.reduce((acc, record) => {
          const existingRecord = acc.find((r) => r.emotion === record.emotion);
          if (existingRecord) {
            existingRecord.percentage += record.percentage;
            existingRecord.count += 1;
          } else {
            acc.push({ ...record, count: 1 });
          }
          return acc;
        }, [] as Array<EmotionRecord & { count: number }>);

        aggregatedRecords.forEach((record) => {
          record.percentage = Number((record.percentage / record.count).toFixed(2));
        });

        setRecords(aggregatedRecords);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmotionRecords();
  }, []);

  return (
    <>
      {/* overview */}

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
                  <CurrencyRupeeIcon sx={{ mr: 1, mb: 1, fontSize: "2rem" }} />{" "}
                  Go Premium!
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
                  Unlock personalized recommendations based on your live
                  emotions.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => router.push(paths.upgrade)}
                >
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ margin: "100px", borderWidth: 2 }}
      />
      {/* Emotion Detection */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "50px",
          marginTop: "100px",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: neonBlue[700], fontStyle: "bold" }}
        >
          Your Emotional Journey So Far
        </Typography>
        <Box sx={{ margin: "20px" }}>
          {loading ? (
            <CircularProgress style={{ margin: "20px auto" }} />
          ) : (
            <Paper
              elevation={3}
              style={{
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.4)",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                align="center"
              >
                Emotion Distribution
              </Typography>
              <BarChart
                width={700}
                height={300}
                data={records}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="emotion"
                  tick={{ fill: "#333" }}
                  label={{
                    value: "Emotions",
                    position: "insideBottomRight",
                    offset: -10,
                  }}
                />
                <YAxis
                  label={{
                    value: "Percentage (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
                <Bar dataKey="percentage">
                  {records.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colorMapping[entry.emotion]}
                    />
                  ))}
                  <LabelList dataKey="percentage" position="top" />
                </Bar>
              </BarChart>
            </Paper>
          )}
        </Box>

        <Box sx={{ margin: "20px" }}>
          {loading ? (
            <CircularProgress style={{ margin: "20px auto" }} />
          ) : (
            <Paper
              elevation={3}
              style={{
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.4)",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                align="center"
              >
                Emotion Distribution
              </Typography>
              <LineChart
                width={700}
                height={300}
                data={records}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="emotion"
                  tick={{ fill: "#333" }}
                  label={{
                    value: "Emotions",
                    position: "insideBottomRight",
                    offset: -10,
                  }}
                />
                <YAxis
                  label={{
                    value: "Percentage (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#ae83eb"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </Paper>
          )}
        </Box>
        <Box sx={{ margin: "20px" }}>
          {loading ? (
            <CircularProgress style={{ margin: "20px auto" }} />
          ) : (
            <Paper
              elevation={3}
              style={{
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.4)",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                align="center"
              >
                Emotion Distribution
              </Typography>
              <ResponsiveContainer width={700} height={300}>
                <PieChart>
                  <Pie
                    data={records}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="percentage"
                    labelLine={false}
                    label={({ emotion, percentage }) =>
                      `${emotion}: ${percentage.toFixed(2)}%`
                    }
                  >
                    {records.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.emotion}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          )}
        </Box>
      </Box>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ margin: "100px", borderWidth: 2 }}
      />
      {/* feedback */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: neonBlue[700], fontStyle: "bold" }}
        >
          What Our Customers Are Saying?
        </Typography>
        <Box
          sx={{
            margin: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <PieChart width={400} height={400}>
            <Pie
              data={sentimentData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {sentimentData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ddd",
              }}
              formatter={formatTooltipValue}
            />
          </PieChart>

          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
            }}
          >
            <List>
              {feedbackData.slice(-3).map((feedback) => (
                <ListItem
                  key={feedback.id}
                  alignItems="flex-start"
                  sx={{ marginBottom: "10px" }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "white",
                      display: "flex",
                      mr: "10px",
                    }}
                  >
                    {getSentimentIcon(feedback.sentiment)}
                  </Avatar>

                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", color: neonBlue[800] }}
                      >
                        {feedback.comment}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", color: neonBlue[400] }}
                      >
                        {feedback.sentiment.charAt(0).toUpperCase() +
                          feedback.sentiment.slice(1)}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ margin: "100px", borderWidth: 2 }}
      />
      {/* How Feelify Works? */}
      <Container maxWidth="md">
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
                style={{
                  width: 380,
                  height: 320,
                  marginRight: "20px",
                  marginTop: "10px",
                }}
                src="/assets/emo_book_video.jpg"
                alt="Step 1"
              />
            </Grid>
            <Grid item xs={12} md={8} container spacing={3}>
              <Grid
                item
                xs={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: "20px",
                    marginLeft: "100px",
                  }}
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
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: "20px",
                    marginLeft: "100px",
                  }}
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
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: "20px",
                    marginLeft: "100px",
                  }}
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
    </>
  );
}
