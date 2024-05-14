"use client"

import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography, Container, Grid } from '@mui/material';

// Dynamic imports for component lazy loading
const HappyVideos = React.lazy(() => import('@/components/videos/happy-videos'));
const SadVideos = React.lazy(() => import('@/components/videos/sad-videos'));
const FearVideos = React.lazy(() => import('@/components/videos/fear-videos'));
const NeutralVideos = React.lazy(() => import('@/components/videos/neutral-videos'));
const SurpriseVideos = React.lazy(() => import('@/components/videos/surprise-videos'));

const videoCategories = [
  { title: 'Happy: Escape the ordinary and discover extraordinary moments of happiness.', component: HappyVideos, image: '/assets/happy/image.jpg'},
  { title: "Fear: Turn those goosebumps into laughter. It's video therapy time!", component: FearVideos, image: '/assets/fear/image.jpg'},
  { title: 'Sad: Turn your blues into hues with these uplifting videos.', component: SadVideos, image: '/assets/sad/image.jpg'},
  { title: 'Surprise: Get ready to have your expectations delightfully shattered.', component: SurpriseVideos, image: '/assets/surprise/image.jpg'},
  { title: 'Neutral: Open the door to endless possibilities. Click play and let the adventure begin.', component: NeutralVideos, image: '/assets/neutral/image.jpg'},
];


export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Video Recommendations
      </Typography>

      <Grid container direction="column" spacing={3}>
        {videoCategories.map(({ title, component: VideoComponent, image }) => (
          <Grid item xs={12} sm={6} md={4} key={title}>
            <Card onClick={() => setSelectedCategory(title)}>
              <CardHeader title={title} align="center" />
              <CardMedia component="img" height="300"  image={image} alt={title} />
              <CardContent>
                {selectedCategory === title ? (
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <VideoComponent />
                  </React.Suspense>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Click to see videos
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
