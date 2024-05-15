"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';

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

export default function EmotionVideos({ title, queries, subtitle }: VideoListProps) {
    const [hasMore, setHasMore] = useState(true);
    const [videos, setVideos] = useState<Record<string, VideoData[]>>({});
    const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
    const handleOpen = (video: VideoData) => setSelectedVideo(video);
    const handleClose = () => setSelectedVideo(null);

    useEffect(() => {

        async function fetchVideos() {
            try{
                for (const query of queries) {
                    const response = await axios.get(`http://127.0.0.1:8000/videos/video-search/?q=${query}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                        },
                    });
                    setVideos((prev) => ({ ...prev, [query]: response.data }));
                }
            }
            catch(error){
                toast.error('Failed to fetch videos');
            }
        }
        fetchVideos();
    }, []);

    const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleScroll = (query: string, direction: 'left' | 'right') => {
        const container = scrollRefs.current[query];
        if (container) {
            const scrollAmount = direction === 'left' ? -250 : 250;
            container.scrollLeft += scrollAmount;


            if (direction === 'right' && container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
                container.scrollLeft = 0;
            } else if (direction === 'left' && container.scrollLeft <= 0) {
                container.scrollLeft = container.scrollWidth - container.offsetWidth;
            }
        }
    };

    const fetchMoreData = async () => {
       setHasMore(false);  
    };

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb:4 }}>
                {title}
            </Typography>

            <InfiniteScroll
                dataLength={Object.keys(videos).length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                {Object.entries(videos).map(([query, videosForQuery]) => (
                    <div key={query}>
                        <Typography variant="h5" gutterBottom sx={{ mb:4 }}>
                            {subtitle[queries.indexOf(query)]}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                                '&::-webkit-scrollbar': { display: 'none' },
                            }}
                            ref={(ref: HTMLDivElement | null) => { scrollRefs.current[query] = ref; }}
                        >
                            {[...videosForQuery, ...videosForQuery].map((video) => (
                                
                                <div 
                                key={video.id} 
                                style={{ marginRight: 16, cursor: 'pointer' }} 
                                onClick={() => handleOpen(video)}
                            >
                                <div 
                            key={video.id} 
                            style={{ marginRight: 16, cursor: 'pointer' }} 
                            onClick={() => handleOpen(video)} 
                        >
                            <img src={video.thumbnail} alt={video.title} width={250} height={200} />
                            <Typography variant="caption">{video.title}</Typography>
                        </div>
                                </div>
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
            <Modal open={!!selectedVideo} onClose={handleClose}>
                <Box sx={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    bgcolor: '#eaebfe',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {selectedVideo && (
                        <>
                            <Typography variant="h6" component="h2">{selectedVideo.title}</Typography>
                            <iframe 
                                width="100%" 
                                height="450" 
                                src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                                title={selectedVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    )
}
