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

interface BookData {
    id: string;
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    thumbnail: string;
    categories?: string[];
    preview?: string;
    download?: string;
    pageCount?: number;
    isbn?: any[];
  }

export default function FearBooks() {
    const [books, setBooks] = useState<Record<string, BookData[]>>({});
  const [hasMore, setHasMore] = useState(true); 

  useEffect(() => {
    const queries = ['socialanxiety', 'anxietyrelief', 'phobia' , 'selfhelp', 'fearoffailure', 'stressmanagement', 'panicattacks' , 'mentalhealth', 'mindfulness', 'healthanxiety']; 

    async function fetchBooks() {
      for (const query of queries) {
        const response = await axios.get(`http://127.0.0.1:8000/books/book-search/?q=${query}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
        });
        setBooks((prev) => ({ ...prev, [query]: response.data }));
      }
    }
    fetchBooks();
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
    // Implement logic to fetch more books if your API supports it
    // You might need to add pagination parameters to your API calls
    // setHasMore(false);  
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Fear Books
      </Typography>

      <InfiniteScroll 
        dataLength={Object.keys(books).length} 
        next={fetchMoreData} 
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {Object.entries(books).map(([query, booksForQuery]) => (
          <Box key={query} sx={{ mb: 4 }}> 
            <Typography variant="h5" gutterBottom>
              {query.charAt(0).toUpperCase() + query.slice(1)}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
                ref={(ref: HTMLDivElement) => {
                    scrollRefs.current[query] = ref;
                  }}
            >
            {booksForQuery.map((book) => (
                <Box 
                    key={book.id} 
                    sx={{
                        minWidth: 250,  
                        marginRight: 16,
                    }}
                >
                    <a href={book.preview} target="_blank" rel="noreferrer"> 
                        <img src={book.thumbnail} alt={book.title} width={250} height={350} /> 
                        <Typography variant="h6">{book.title}</Typography> 
                        {(book.authors?.length ?? 0) > 0 && ( 
                            <Typography variant="body2">
                                by {book.authors?.join(", ") ?? "Unknown author"}
                            </Typography>
                        )}
                    </a>
                </Box>
            ))}
            </Box>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <Button onClick={() => handleScroll(query, "left")}>
                <ArrowBackIosIcon />
              </Button>
              <Button onClick={() => handleScroll(query, "right")}>
                <ArrowForwardIosIcon />
              </Button>
            </div>
            
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}
      </InfiniteScroll>
    </div>
  );
}