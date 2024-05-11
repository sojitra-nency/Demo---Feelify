'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { toast } from 'react-toastify';

const user = {
  first_name: '',
  last_name: '',
  avatar: '/assets/avatar.png',
  email: '',
  phone_number: '',
} as const;

interface ProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  avatar?: string,
}

export function AccountInfo(): React.JSX.Element {
  const [profileData, setProfileData] = React.useState<ProfileData>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('auth_token');
        const userId = 2

        const response = await axios.get(`http://127.0.0.1:8000/login/profile/${userId}/`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setProfileData(response.data);
      } catch (error) {
        // setError(error); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('auth_token');
      const userId = 2;
      const formData = new FormData(event.target as HTMLFormElement);
      if (selectedFile) {
        formData.append('avatar', selectedFile); 
        console.log(selectedFile)
      }
      const response = await axios.patch(
        `http://127.0.0.1:8000/login/profile/${userId}/`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setProfileData(response.data);
      toast.success("Profile updated");

    } catch (error) {
      toast.error("Unable to update your profile.");
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }

  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <p>{profileData.avatar}</p>
            <Avatar src={profileData.avatar} sx={{ height: '150px', width: '150px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{profileData.first_name}{' '}{profileData.last_name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {profileData.email}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {profileData.phone_number}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
      <form onSubmit={handleSubmit}>
          <Button fullWidth variant="text" component="label">
            Upload picture
            <input
              type="file"
              accept="image/*" 
              onChange={handleFileChange}
            /> 
          </Button> 
          <Button variant="contained" type="submit">
            Upload
          </Button>
        </form>
      </CardActions>
    </Card>
  );
}