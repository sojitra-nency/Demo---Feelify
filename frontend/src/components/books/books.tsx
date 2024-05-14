"use client"

import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography, Container, Grid } from '@mui/material';

const HappyBooks = React.lazy(() => import('@/components/books/happy-books'));
const SadBooks = React.lazy(() => import('@/components/books/sad-books'));
const FearBooks = React.lazy(() => import('@/components/books/fear-books'));
const NeutralBooks = React.lazy(() => import('@/components/books/neutral-books'));
const SurpriseBooks = React.lazy(() => import('@/components/books/surprise-books'));

const BookCategories = [
  { title: 'Happy: Escape the ordinary and discover extraordinary moments of happiness.', component: HappyBooks, image: '/assets/happy/img.avif'},
  { title: "Fear: Turn those goosebumps into laughter. It's book therapy time!", component: FearBooks, image: '/assets/fear/img.jpg'},
  { title: 'Sad: Turn your blues into hues with these uplifting Books.', component: SadBooks, image: '/assets/sad/img.avif'},
  { title: 'Surprise: Get ready to have your expectations delightfully shattered.', component: SurpriseBooks, image: '/assets/surprise/img.jpg'},
  { title: 'Neutral: Open the door to endless possibilities. Click read and let the adventure begin.', component: NeutralBooks, image: '/assets/neutral/img.jpg'},
  
];


export default function Books() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Book Recommendations
      </Typography>

      <Grid container direction="column" spacing={3}>
        {BookCategories.map(({ title, component: BookComponent, image }) => (
          <Grid item xs={12} sm={6} md={4} key={title}>
            <Card onClick={() => setSelectedCategory(title)}>
              <CardHeader title={title} align="center" />
              <CardMedia component="img" height="400"  image={image} alt={title} />
              <CardContent>
                {selectedCategory === title ? (
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <BookComponent />
                  </React.Suspense>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Click to see books
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
