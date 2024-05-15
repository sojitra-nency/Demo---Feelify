'use client'

import Button from "@mui/material/Button";
import axios from "axios"
import React, { useState, useRef, useEffect } from 'react';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface MediaRecorderType extends EventTarget {
  start(): void;
  stop(): void;
  ondataavailable?: (event: BlobEvent) => void;
}

export default function Recording(): React.JSX.Element {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  let mediaRecorder: MediaRecorderType | any;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('video_file', selectedFile!);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/emotions/recording/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      );
      setUploadStatus('Success!');
      toast.success("Photo captured")
      router.push(paths.dashboard.analysis);
    } catch (error) {
      setUploadStatus('Upload Failed.');
    }
  };



  const handleCapturePhoto = async () => {
    setIsRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current!.srcObject = stream;

      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start();

      setTimeout(() => {
        if (mediaRecorder) {
          mediaRecorder?.stop();
          stream.getTracks().forEach((track) => track.stop());
        }
      }, 1000); // 1-second timeout

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (mediaRecorder && mediaRecorder.ondataavailable) {
          const videoBlob = event.data;
          sendVideoToBackend(videoBlob);
        }
      };

    } catch (error) {
      toast.error("Failed to capture photo");
    } finally {
      setIsRecording(false);
    }
  };

  const sendVideoToBackend = async (videoBlob: Blob) => {
    const formData = new FormData();
    formData.append("video_file", videoBlob, "recording.mp4");

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/emotions/recording/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'video/mp4',
          },
        }
      );
      toast.success("Video uploaded successfully");
      console.log("Video upload response:", response);

    } catch (error) {
      toast.error("Failed to upload video");
      console.error("Error uploading video:", JSON.stringify(error));

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
            width: 500,
            height: 270,
            borderRadius: 2,
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

      <Typography variant="h4" component="h1" align="center" gutterBottom >
        UPLOAD YOUR RECORDING
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" >
        <form onSubmit={handleSubmit}>
          <Box>
            <input
              type="file"
              accept="video/mp4"
              onChange={handleFileChange}
              style={{
                border: '1px solid white',
                padding: '20px',
                borderRadius: '5px',
                boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.5)',
                backgroundColor: 'white',
                margin: '30px',
              }}
            />
            <Button
              variant="contained"
              type="submit"
            >
              Upload
            </Button>
          </Box>
          
        </form>
      </Box>
    </div>
  )
}


