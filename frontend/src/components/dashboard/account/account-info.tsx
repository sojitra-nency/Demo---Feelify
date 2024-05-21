'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const user = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
} as const;

interface ProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
}

export function AccountInfo(): React.JSX.Element {
  const [profileData, setProfileData] = React.useState<ProfileData>({});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get('auth_token');
        const userId = Cookies.get('id');

        const response = await axios.get(`http://127.0.0.1:8000/login/profile/${userId}/`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setProfileData(response.data);
      } catch (error) {
        toast.error("Unable to fetch profile data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src='/assets/avatar.jpg' sx={{ height: '150px', width: '150px' }} />
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
    </Card>
  );
}