'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';
import MoodIcon from '@mui/icons-material/Mood';
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RateReviewIcon from '@mui/icons-material/RateReview';
import FeedbackIcon from '@mui/icons-material/Feedback';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';



export default function Overview(): React.JSX.Element {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3, // Add padding to the main container
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Feelify
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 6 }}>
        Your emotion-based book and video recommendation system
      </Typography>

      {/* Cards in a Single Row */}
      <Grid container spacing={2} justifyContent={'center'}>
        {/* Emotion-Based Recommendations */}
        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 280,
              boxShadow: 3, // Add shadow
              transition: 'transform 0.2s', // Add hover effect
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random" // Replace with emotion-related image
              alt="Emotion-Based Recommendations"
            />
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <MoodIcon sx={{mr:1}}/> Feel, Watch, Read
              </Typography>
              <Typography variant="body2">
                Discover books and videos that match your mood across 5 emotions:
                happy, sad, neutral, fear, and surprise.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => router.push(paths.dashboard.emotions)}
              >
                Explore Now
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Search Books and Videos */}
        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 280,
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random" // Replace with search-related image
              alt="Search Books and Videos"
            />
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <SearchIcon sx={{mr:1}}/> Search
              </Typography>
              <Typography variant="body2">
                Find the perfect book or video to match your interests.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push(paths.dashboard.vsearch)}
                >
                  <LiveTvIcon sx={{mr:1}}/> Videos
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => router.push(paths.dashboard.bsearch)}
                >
                  <MenuBookIcon sx={{mr:1}}/> Books
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Rate and Review */}
        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 280,
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
           <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <RateReviewIcon sx={{mr:1}}/> Rate & Review
              </Typography>
              <Typography variant="body2">
                Share your thoughts and help others discover amazing content.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() =>
                  router.push(paths.home) 
                }
              >
                Leave a Review
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Feedback and Contact */}
        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 280,
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <FeedbackIcon sx={{mr:1}}/> Feedback & Contact
              </Typography>
              <Typography variant="body2">
                We value your feedback. Get in touch with us!
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push(paths.home)}
                >
                  <FeedbackIcon sx={{mr:1}}/> Feedback
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => router.push(paths.home)}
                >
                  <ContactSupportIcon sx={{mr:1}}/> Contact
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* About Us */}
        <Grid item xs={12} sm={6} md={3} sx={{ mt: 5, ml: 2 }}>
          <Card
            sx={{
              maxWidth: 280,
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
           <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <InfoIcon sx={{mr:1}}/> About Us
              </Typography>
              <Typography variant="body2">
                Learn more about our mission and the team behind Feelify.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => router.push(paths.dashboard.about)}
              >
                Our Story
              </Button>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}
