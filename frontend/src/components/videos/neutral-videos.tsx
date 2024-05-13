"use client"

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';

interface VideoData {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnail: string;
  }

export default function NeutralVideos() {
    const [videos, setVideos] = useState<Record<string, VideoData[]>>({});
  const [hasMore, setHasMore] = useState(true); 

  useEffect(() => {
    const queries = ['ambience', 'satisfying', 'educational' , 'travelvlog', 'howto', 'podcastclips', 'storytime' , 'slowtv', 'behindthescenes', 'animalvideos']; 

    async function fetchVideos() {
      for (const query of queries) {
        const response = await axios.get(`http://127.0.0.1:8000/videos/video-search/?q=${query}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
        });
        setVideos((prev) => ({ ...prev, [query]: response.data }));
      }
    }
    fetchVideos();
  }, []);

  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({}); 

  const handleScroll = (query: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[query];
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300; 
      container.scrollLeft += scrollAmount;
    }
  };

  const fetchMoreData = async () => {
    // Implement logic to fetch more videos if your API supports it
    // You might need to add pagination parameters to your API calls
    // setHasMore(false);  
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Neutral Videos
      </Typography>

      <InfiniteScroll
        dataLength={Object.keys(videos).length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {Object.entries(videos).map(([query, videosForQuery]) => (
          <div key={query}>
            <Typography variant="h6" gutterBottom>
              {query.charAt(0).toUpperCase() + query.slice(1)}
            </Typography>
            <Box 
                sx={{
                    display: 'flex',
                    overflowX: 'auto', 
                    '&::-webkit-scrollbar': { display: 'none' }, 
                }}
                ref={(ref: HTMLDivElement | null) => {scrollRefs.current[query] = ref;}}
            >
                {[...videosForQuery, ...videosForQuery].map((video) => (
                    <a href={video.url} target="_blank" key={video.id} rel="noreferrer" style={{ marginRight: 16 }}>
                        <img src={video.thumbnail} alt={video.title} width={250} height={200} />
                        <Typography variant="caption">{video.title}</Typography>
                    </a>
                ))}
            </Box>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <Button onClick={() => handleScroll(query, 'left')}><ArrowBackIosIcon /></Button>
              <Button onClick={() => handleScroll(query, 'right')}><ArrowForwardIosIcon /></Button>
            </div>
            <Divider sx={{ my: 2 }} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
)}