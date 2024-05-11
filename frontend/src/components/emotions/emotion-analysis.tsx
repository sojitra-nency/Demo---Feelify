'use client'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import { Chart } from 'chart.js'; // Assuming you want to use Chart.js
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


interface EmotionData {
    [key: string]: number; // e.g., { happy: 35, sad: 10, ... } 
}

export default function EmotionAnalysis(): React.JSX.Element {
    const [emotionData, setEmotionData] = useState<EmotionData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [selectedOption, setSelectedOption] = useState<'books' | 'videos'>('books');;

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
                console.error('Error fetching emotion data:', error);
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

    return (
        <div>
            {isLoading && <p>Analyzing emotions...</p>}
            {emotionData && (
                <TableContainer component={Paper}>
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
            )}
            {emotionData && (
                <>
                    <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}> 
                    <Grid item spacing={2} xs={12} sx={{ border: '1px solid lightgray', borderRadius: 2, p: 2 , marginTop: 10}}>
                        <Grid item spacing={2} xs={12} sm={8} >
                            <FormControl sx={{ width: 300, marginLeft: 20 }}> 
                                <FormLabel>Select Emotion </FormLabel>
                                    <Select value={selectedEmotion} onChange={handleEmotionChange} sx={{ width: 300, marginRight: 2,  borderRadius: 1 }}>
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
                        <Grid item spacing={2} xs={12} sm={8} sx={{ marginTop: 3}}>
                            <FormControl sx={{ width: 200, marginLeft: 20  }}> 
                                <FormLabel>Select Choice </FormLabel>
                                <Select value={selectedOption} onChange={handleOptionChange} sx={{ width: 300, marginRight: 2,  borderRadius: 1 }}>
                                    <MenuItem value="books">Books</MenuItem>
                                    <MenuItem value="videos">Videos</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item spacing={2} xs={12} sx={{ marginTop: 3}}> 
                                <Button 
                                    variant="contained" 
                                    onClick={() => handleRecommendation(selectedEmotion, selectedOption)} 
                                    sx={{ width: '20%', py: 1.5,  marginLeft: 20  }} 
                                >
                                    Recommendations
                                </Button>
                        </Grid>
                    </Grid>
                    </Grid>
                </>
            )}
            
        </div>
    );
}

const handleRecommendation = (emotion: string, option: 'books' | 'videos') => {
    console.log("Selected Emotion:", emotion);
    console.log("Selected Option:", option);
};