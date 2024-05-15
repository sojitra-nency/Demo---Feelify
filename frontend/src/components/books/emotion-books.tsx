"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CardContent, CardMedia, Grid, Link, Modal, Paper, Typography, Button, Box, Divider, AppBar, IconButton, Toolbar } from '@mui/material';
import { toast } from 'react-toastify';

interface BookData {
    id: string;
    title: string;
    subtitle?: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    thumbnail: string;
    categories?: string[];
    preview?: string;
    download?: string;
    pageCount?: number;
    isbn?: any[];
    language?: string;
    publisher?: string;
    webReaderLink?: string;
}

interface BookListProps {
    title: string;
    queries: string[];
}

export default function EmotionBooks({ title, queries }: BookListProps) {
    const [books, setBooks] = useState<Record<string, BookData[]>>({});
    const [hasMore, setHasMore] = useState(true);
    const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        async function fetchBooks() {
            try {
                for (const query of queries) {
                    const response = await axios.get(`http://127.0.0.1:8000/books/book-search/?q=${query}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                        },
                    });
                    setBooks((prev) => ({ ...prev, [query]: response.data }));
                }
            }
            catch {
                toast.error('Failed to fetch books');
            }
        }
        fetchBooks();
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

    const handleOpenModal = (book: BookData) => {
        setSelectedBook(book);
        setOpenModal(true);
    };

    const handleCloseModal = () => setOpenModal(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };


    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                {title}
            </Typography>

            <InfiniteScroll
                dataLength={Object.keys(books).length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                {Object.entries(books).map(([query, booksForQuery]) => (
                    <Box key={query} sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
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
                                        marginRight: 4,
                                    }}
                                    onClick={() => handleOpenModal(book)}
                                >
                                    <img src={book.thumbnail} alt={book.title} width={200} height={300} />
                                    <Typography variant="h6">{book.title}</Typography>
                                    {(book.authors?.length ?? 0) > 0 && (
                                        <Typography variant="body2">
                                            by {book.authors?.join(", ") ?? "Unknown author"}
                                        </Typography>
                                    )}

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
            <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="book-detail-modal">
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    outline: 'none',
                }}>
                    <Paper elevation={3} sx={{ borderRadius: 2 }}>
                        {selectedBook && (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <CardMedia
                                        component="img"
                                        height="350"
                                        image={selectedBook.thumbnail}
                                        alt={selectedBook.title}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {selectedBook.title}
                                        </Typography>
                                        {selectedBook.subtitle && selectedBook.subtitle.length > 0 && (
                                            <Typography variant="subtitle1" gutterBottom>
                                                {selectedBook.subtitle}
                                            </Typography>
                                        )}
                                        {selectedBook.authors && selectedBook.authors.length > 0 && (
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                by {selectedBook.authors?.join(', ')}
                                            </Typography>
                                        )}
                                        {selectedBook.publishedDate && selectedBook.publishedDate.length > 0 && (
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Published: {selectedBook.publishedDate}
                                            </Typography>
                                        )}
                                        {selectedBook.publisher && selectedBook.publisher.length > 0 && (
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Publisher: {selectedBook.publisher}
                                            </Typography>
                                        )}
                                        {selectedBook.isbn && selectedBook.isbn.length > 0 && (
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                ISBN: {selectedBook.isbn.join(', ')}
                                            </Typography>
                                        )}
                                        {selectedBook.description && selectedBook.description.length > 0 && (
                                            <>
                                                <Typography variant="body1" gutterBottom>
                                                    Description:
                                                </Typography>
                                                <Typography variant="body1" paragraph>
                                                    {showFullDescription
                                                        ? selectedBook.description
                                                        : `${selectedBook.description.slice(0, 150)}...`}
                                                    <Link href="#" onClick={toggleDescription}>
                                                    {showFullDescription ? 'View Less' : 'View More'}
                                                    </Link>
                                                </Typography>
                                                
                                            </>
                                        )}
                                        {selectedBook.categories && selectedBook.categories.length > 0 && (
                                            <Typography variant="body2" color="text.secondary">
                                                Categories: {selectedBook.categories.join(', ')}
                                            </Typography>
                                        )}
                                        {selectedBook.pageCount && (
                                            <Typography variant="body2" color="text.secondary">
                                                Pages: {selectedBook.pageCount}
                                            </Typography>
                                        )}
                                        {selectedBook.language && selectedBook.language.length > 0 && (
                                            <Typography variant="body2" color="text.secondary">
                                                Language: {selectedBook.language === 'en' ? 'English' : selectedBook.language}
                                            </Typography>
                                        )}

                                        
                                        
                                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                        <Button variant="contained" color="primary" onClick={() => window.open(selectedBook?.webReaderLink, '_blank')}>
                                            Read
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={() => window.open(selectedBook?.download, '_blank')}>
                                            Download
                                        </Button>
                                        </Box>
                                    </CardContent>
                                    
                                </Grid>
                            </Grid>
                        )}
                    </Paper>
                </Box>
            </Modal>


        </div>
    );
}