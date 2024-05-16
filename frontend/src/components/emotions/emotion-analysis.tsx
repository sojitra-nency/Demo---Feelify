'use client'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';
import Typography from '@mui/material/Typography';
import Spinner from '../common/Spinner';


interface EmotionData {
    [key: string]: number;
}

export default function EmotionAnalysis(): React.JSX.Element {
    const router = useRouter();
    const [emotionData, setEmotionData] = useState<EmotionData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [selectedOption, setSelectedOption] = useState<'books' | 'videos'>('videos');;

    useEffect(() => {
        const fetchEmotionData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/emotions/emotion-analysis/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                    },
                });
                setEmotionData(response.data.emotion_percentages);
            } catch (error) {
                toast.error('Failed to fetch emotion data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmotionData();
    }, []);


    const handleEmotionChange = (event: SelectChangeEvent<string>) => {
        setSelectedEmotion(event.target.value);
    };

    const handleOptionChange = (event: SelectChangeEvent<string>) => {
        setSelectedOption(event.target.value as 'books' | 'videos');
    };

    const handleRecommendation = (emotion: string, option: 'books' | 'videos') => {
        if (!emotion) {
            toast.error('Please select an emotion.');
            return;
        }

        else {
            router.push(`/recommendation/${option}/${emotion}`);
        }
    };


    return (
        <div>
            <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 5 }}>
                EMOTION ANALYSIS
            </Typography>
            {isLoading && <Spinner/>}
            {emotionData && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TableContainer component={Paper} sx={{ maxWidth: 700 }}>
                        <Table sx={{ minWidth: 10 }} aria-label="Emotion Analysis Table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Emotion</TableCell>
                                    <TableCell align="right">Percentage (%)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(emotionData).map(([emotion, percentage]) => (
                                    <TableRow key={emotion}>
                                        <TableCell component="th" scope="row">
                                            {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                                        </TableCell>
                                        <TableCell align="right">{percentage.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container justifyContent="center" spacing={2} sx={{ mt: 4, maxWidth: 400 }}>
                        <Grid item xs={12} component={Paper} sx={{ p: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} justifyContent="center">
                                    <FormControl fullWidth sx={{alignItems: 'center'}}>
                                        <FormLabel>Select Emotion </FormLabel>
                                        <Select value={selectedEmotion} onChange={handleEmotionChange} sx={{ width: 300, borderRadius: 1 }}>
                                            {Object.entries(emotionData)
                                                .filter(([emotion, percentage]) => percentage >= 10)
                                                .map(([emotion, percentage]) => (
                                                    <MenuItem key={emotion} value={emotion} >
                                                        {emotion.charAt(0).toUpperCase() + emotion.slice(1) + ' '}
                                                        ({percentage.toFixed(2)}%)
                                                    </MenuItem>
                                                ))}
                                        </Select>

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth sx={{alignItems: 'center'}}>

                                        <FormLabel>Select Choice </FormLabel>
                                        <Select value={selectedOption} onChange={handleOptionChange} sx={{ width: 300, borderRadius: 1 }}>
                                            <MenuItem value="books">Books</MenuItem>
                                            <MenuItem value="videos">Videos</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleRecommendation(selectedEmotion, selectedOption)}
                                        fullWidth
                                    >
                                        Get Recommendations
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
}
