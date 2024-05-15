"use client"

import * as React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography, Container, Grid, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';



const BookCategories = [
  { title: 'Happy: Escape the ordinary and discover extraordinary moments of happiness.', path: paths.recommendation.books.happy, image: '/assets/happy/img.avif'},
  { title: "Fear: Turn those goosebumps into laughter. It's book therapy time!", path: paths.recommendation.books.fear, image: '/assets/fear/img.jpg'},
  { title: 'Sad: Turn your blues into hues with these uplifting Books.', path: paths.recommendation.books.sad, image: '/assets/sad/img.avif'},
  { title: 'Surprise: Get ready to have your expectations delightfully shattered.', path: paths.recommendation.books.surprise, image: '/assets/surprise/img.jpg'},
  { title: 'Neutral: Open the door to endless possibilities. Click read and let the adventure begin.', path: paths.recommendation.books.neutral, image: '/assets/neutral/img.jpg'},
  
];


export default function Books() {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{mb:6}}>
        EMOTION BASED BOOK RECOMMENDATION
      </Typography>

      <Grid container direction="column" spacing={3}>
        {BookCategories.map(({ title, path, image }) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <Card>
                <CardHeader title={title} align="center" />
                <CardMedia component="img" height="350"  image={image} alt={title} />
                <CardContent>
                  <Button variant="contained" color="primary" onClick={() => router.push(path)}>
                    Go to Books
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
