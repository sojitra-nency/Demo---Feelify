'use client';

import React, { useState, useRef, FormEvent } from 'react';
import axios from "axios"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { paths } from '@/paths';

export default function Recording(): React.JSX.Element { 
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleCapturePhoto = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => chunksRef.current.push(event.data);
      mediaRecorder.onstop = handleStop;
      mediaRecorder.start();

      setTimeout(() => {
        if (mediaRecorder) {
          mediaRecorder.stop();
          stream.getTracks().forEach((track) => track.stop());
        }
      }, 10000); 

    } catch (error) {
        console.error('Error accessing media devices:', error);
      toast.error("Failed to capture photo");
    } finally {
      setIsRecording(false);
    }
  };

  const handleStop = () => {
    setIsRecording(false);
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });

    sendVideoToBackend(blob);
  };

  const sendVideoToBackend = async (videoBlob: Blob) => {
    const formData = new FormData();
    formData.append("video_file", videoBlob, "recording.webm");

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/emotions/recording/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success("Video uploaded successfully");
      router.push(paths.dashboard.analysis);
      console.log("Video upload response:", response);
    } catch (error) {
      toast.error("Failed to upload video");
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div>
     <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 5 }}>
       CAPTURE YOUR EMOTIONS
     </Typography>
     <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
       <video
         ref={videoRef}
         autoPlay
         style={{
           width: 700,
           height: 370,
           borderRadius: 50,
           boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.5)',
           backgroundColor: 'white',
         }}
       />
     </Box>
     <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 8 }}>
       <Button
         variant="contained"
         onClick={handleCapturePhoto}
         disabled={isRecording}
       >
         Capture Photo
       </Button>
     </Box>
    </div>
  );
}

