"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { paths } from "@/paths";

interface VideoData {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

interface VideoListProps {
  title: string;
  queries: string[];
  subtitle: string[];
}

export default function EmotionVideos({
  title,
  queries,
  subtitle,
}: VideoListProps) {
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [videos, setVideos] = useState<Record<string, VideoData[]>>({});
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const handleOpen = (video: VideoData) => setSelectedVideo(video);
  const handleClose = () => setSelectedVideo(null);

  const { data: userData, isLoading: isLoadingUser } = useRetrieveUserQuery();
  const [upgradeData, setUpgradeData] = useState<any>(null);
  const [isLoadingUpgrade, setIsLoadingUpgrade] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const fetchUpgradeDetails = async () => {
      try {
        if (!userData?.email) return;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/api/upgrades/${userData?.email}/`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );
        setUpgradeData(response.data);
        console.log("upgradeData", response.data);
      } catch (error) {
        console.error("Error fetching upgrade details:", error);
      } finally {
        setIsLoadingUpgrade(false);
      }
    };

    fetchUpgradeDetails();
  }, [userData?.email]);

  const isAllowed = upgradeData?.access_level === "premium" || upgradeData?.access_level === "basic";

  useEffect(() => {
    if (!isAllowed && !isLoadingUpgrade) {
      setShouldRedirect(true);
    }
  }, [isAllowed, isLoadingUpgrade]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push(paths.upgrade);
    }
  }, [shouldRedirect]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        for (const query of queries) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_HOST}/api/video-search/?q=${query}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("auth_token")}`,
              },
            }
          );
          setVideos((prev) => ({ ...prev, [query]: response.data }));
        }
      } catch (error) {
        console.log("error");
      }
    }
    fetchVideos();
  }, []);

  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleScroll = (query: string, direction: "left" | "right") => {
    const container = scrollRefs.current[query];
    if (container) {
      const scrollAmount = direction === "left" ? -250 : 250;
      container.scrollLeft += scrollAmount;

      if (
        direction === "right" &&
        container.scrollLeft + container.offsetWidth >= container.scrollWidth
      ) {
        container.scrollLeft = 0;
      } else if (direction === "left" && container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth - container.offsetWidth;
      }
    }
  };

  const fetchMoreData = async () => {
    setHasMore(false);
  };
  if (isAllowed) {
    return (
      <div style={{ padding: 20 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          {title}
        </Typography>

        <InfiniteScroll
          dataLength={Object.keys(videos).length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ margin: 2 }}
              >
                <CircularProgress />
                <Typography variant="h6">Loading Videos...</Typography>
              </Box>
            </>
          }
        >
          {Object.entries(videos).map(([query, videosForQuery]) => (
            <div key={query}>
              <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                {subtitle[queries.indexOf(query)]}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
                ref={(ref: HTMLDivElement | null) => {
                  scrollRefs.current[query] = ref;
                }}
              >
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  {[...videosForQuery, ...videosForQuery].map((video) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={video.id}
                      onClick={() => handleOpen(video)}
                    >
                      <Card>
                        <CardMedia
                          component="img"
                          height="300"
                          image={
                            video.thumbnail
                              ? video.thumbnail
                              : "/assets/video_cover.jpg"
                          }
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
              </Box>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Button onClick={() => handleScroll(query, "left")}>
                  <ArrowBackIosIcon />
                </Button>
                <Button onClick={() => handleScroll(query, "right")}>
                  <ArrowForwardIosIcon />
                </Button>
              </div>
              <Divider sx={{ my: 2 }} />
            </div>
          ))}
        </InfiniteScroll>

        <Modal open={selectedVideo !== null} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
            }}
          >
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
      </div>
    );
  } else {
    return null;
  }
}
