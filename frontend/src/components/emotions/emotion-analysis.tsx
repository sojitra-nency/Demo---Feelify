"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import { neonBlue } from "@/styles/theme/colors";

interface EmotionData {
  [key: string]: number;
}

export default function EmotionAnalysis(): React.JSX.Element {
  const router = useRouter();
  const [emotionData, setEmotionData] = useState<EmotionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [selectedOption, setSelectedOption] = useState<"books" | "videos">(
    "videos"
  );

  useEffect(() => {
    const fetchEmotionData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/api/emotion-analysis/`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );
        setEmotionData(response.data.emotion_percentages);
      } catch (error) {
        toast.error("Failed to fetch emotion data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmotionData();
  }, []);

  const handleEmotionChange = (event: SelectChangeEvent<string>) => {
    setSelectedEmotion(event.target.value);
  };

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value as "books" | "videos");
  };

  const handleRecommendation = (
    emotion: string,
    option: "books" | "videos"
  ) => {
    if (!emotion) {
      toast.error("Please select an emotion.");
      return;
    } else {
      router.push(`/recommendation/${option}/${emotion}`);
    }
  };

  return (
    <div>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ color: neonBlue[700], fontStyle: "bold", textAlign: "center" }}
      >
        Emotion Analysis
      </Typography>
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ margin: 2 }}
        >
          <img
            src="/assets/emotion-loader.gif"
            alt="Loading..."
            height="300"
            width="300"
          />
          <Typography variant="h6" sx={{ my: 3, color: neonBlue[700] }}>
            Analysing your Emotions...
          </Typography>
        </Box>
      )}
      {emotionData && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ maxWidth: 700, backgroundColor: "#eaebfe" }}
          >
            <Table sx={{ minWidth: 10 }} aria-label="Emotion Analysis Table">
              <TableHead>
                <TableRow>
                  <TableCell>Emotion</TableCell>
                  <TableCell align="right">Percentage (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(emotionData).map(([emotion, percentage]) => (
                  <TableRow key={emotion}>
                    <TableCell component="th" scope="row">
                      {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                    </TableCell>
                    <TableCell align="right">{percentage.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{
              color: neonBlue[700],
              fontStyle: "italic",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Choose your vibe...
          </Typography>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            sx={{ mt: 2, maxWidth: 400 }}
          >
            <Grid
              item
              xs={12}
              component={Paper}
              sx={{ p: 2, backgroundColor: "#eaebfe" }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} justifyContent="center">
                  <FormControl fullWidth sx={{ alignItems: "center" }}>
                    <FormLabel>Select Emotion </FormLabel>
                    <Select
                      value={selectedEmotion}
                      onChange={handleEmotionChange}
                      sx={{ width: 300, borderRadius: 1 }}
                    >
                      {Object.entries(emotionData)
                        .filter(([emotion, percentage]) => percentage >= 10)
                        .map(([emotion, percentage]) => (
                          <MenuItem key={emotion} value={emotion}>
                            {emotion.charAt(0).toUpperCase() +
                              emotion.slice(1) +
                              " "}
                            ({percentage.toFixed(2)}%)
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ alignItems: "center" }}>
                    <FormLabel>Select Choice </FormLabel>
                    <Select
                      value={selectedOption}
                      onChange={handleOptionChange}
                      sx={{ width: 300, borderRadius: 1 }}
                    >
                      <MenuItem value="books">Books</MenuItem>
                      <MenuItem value="videos">Videos</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleRecommendation(selectedEmotion, selectedOption)
                    }
                    fullWidth
                  >
                    Get Recommendations
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
