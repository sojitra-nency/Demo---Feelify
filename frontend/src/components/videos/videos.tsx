"use client"

import * as React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography, Container, Grid, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';

const videoCategories = [
  { title: 'Happy: Escape the ordinary and discover extraordinary moments of happiness.', path: paths.recommendation.videos.happy, image: '/assets/happy/image.jpg'},
  { title: "Fear: Turn those goosebumps into laughter. It's video therapy time!", path: paths.recommendation.videos.fear, image: '/assets/fear/image.jpg'},
  { title: 'Sad: Turn your blues into hues with these uplifting videos.', path: paths.recommendation.videos.sad, image: '/assets/sad/image.jpg'},
  { title: 'Surprise: Get ready to have your expectations delightfully shattered.', path: paths.recommendation.videos.surprise, image: '/assets/surprise/image.jpg'},
  { title: 'Neutral: Open the door to endless possibilities. Click play and let the adventure begin.', path: paths.recommendation.videos.neutral, image: '/assets/neutral/image.jpg'},
];

export default function Videos() {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Video recommendation
      </Typography>

      <Grid container direction="column" spacing={3}>
        {videoCategories.map(({ title, path, image }) => (
          <Grid item xs={12} sm={6} md={4} key={title}>
            <Card>
              <CardHeader title={title} align="center" />
              <CardMedia component="img" height="350"  image={image} alt={title} />
              <CardContent>
                <Button variant="contained" color="primary" onClick={() => router.push(path)}>
                  Go to videos
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}