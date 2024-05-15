"use client";

import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, Grid, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';

export function AboutUs(): React.JSX.Element {
    const router = useRouter();
    return (
        <Box sx={{ padding: '50px 0' }}>
            <Container maxWidth="md">

                <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>
                    Welcome to Feelify
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    An Emotion Based Book and Video Recommendation System.
                </Typography>


                <Card sx={{ display: 'flex', marginBottom: '30px', borderRadius: 3 }}>
                    <img
                        style={{ width: 200 }}
                        src="/assets/avatar.jpg"
                        alt="Founder - Nency Sojitra"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="h5" component="div">
                                Meet Nency Sojitra
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Founder of Feelify
                            </Typography>
                            <Typography variant="body1" paragraph align="justify">
                                Nency is a passionate full stack developer and a books and videos lover.
                                She believes in the power of media to heal, inspire, and connect us.
                                She founded Feelify to help people discover content that resonates with their emotions.
                                She is a graduate student at Parul University, Vadodara.
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                        </Box>
                    </Box>
                </Card>
                <Box sx={{ textAlign: 'center', marginBottom: '50px' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }} >
                        Our Mission
                    </Typography>
                    <Typography variant="body1" paragraph align="justify">
                        We're on a quest to transform the way you experience books and videos.
                        Our intelligent recommendation engine understands your emotions by detecting and recognizing your facial emotions and guides you
                        to content that lifts your spirits, soothes your soul, or takes you on a thrilling adventure.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ borderRadius: 3 }}>

                            <img
                                style={{ width: 200 }}
                                src="/assets/avatar.jpg"
                                alt="Step 1"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div" >
                                    1. Emotion Detection
                                </Typography>
                                <Typography variant="body2" align="justify">
                                    Capture your live photo or upload a photo to detect your emotions.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ borderRadius: 3 }}>

                            <img
                                style={{ width: 200 }}
                                src="/assets/avatar.jpg"
                                alt="Step 1"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    2. Pick your Mood
                                </Typography>
                                <Typography variant="body2" align="justify">
                                    Choose your mood and get personalized book and video recommendations.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ borderRadius: 3 }}>

                            <img
                                style={{ width: 200 }}
                                src="/assets/avatar.jpg"
                                alt="Step 1"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    3. Book and Video Recommendations
                                </Typography>
                                <Typography variant="body2">
                                    After analyzing your emotions, we recommend books and videos that match your mood.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
                    <Button variant="contained" size="large" sx={{ borderRadius: 2 }} onClick={() => router.push(paths.dashboard.overview)}>
                        Start Your Emotional Journey
                    </Button>
                </Box>

            </Container>
        </Box>
    );
}
