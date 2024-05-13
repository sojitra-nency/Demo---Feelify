'use client'

import Button from "@mui/material/Button";
import axios from "axios"
import React, { useState, useRef, useEffect } from 'react';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

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
      console.error("Error accessing camera:", error);
    } finally {
      setIsRecording(false);
    }
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
            'Content-Type': 'video/webm',
          },
        }
      );
      console.log("Video upload response:", response);

    } catch (error) {

      console.error("Error uploading video:", JSON.stringify(error));

    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        style={{
          width: 500,
          height: 300,
          borderRadius: 2,
          boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.5)',
        }}
      />
      <br />
      <br />
      <Button
        variant="contained"
        onClick={handleCapturePhoto}
        disabled={isRecording}
      >
        Capture Photo
      </Button>
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="video/webm"
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          type="submit"
        >
          Upload
        </Button>
        <p>{uploadStatus}</p>
      </form>
    </div>
  )
}


