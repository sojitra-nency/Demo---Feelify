
'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';

interface ProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
}
export function AccountDetailsForm(): React.JSX.Element {
  const [profileData, setProfileData] = React.useState<ProfileData>({});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('auth_token');
        const userId = localStorage.getItem('id');

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('auth_token');
      const userId = localStorage.getItem('id');
      const formData = new FormData(event.target as HTMLFormElement);

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
    } finally {
      setIsLoading(false);
      window.location.reload();
    }

  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          {isLoading && <p>Loading profile data...</p>}
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                required
                variant="outlined"
                label="First name"
                value={profileData.first_name || ''}
                name="first_name"
                onChange={e => setProfileData({ ...profileData, first_name: e.target.value })}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                required
                variant="outlined"
                label="Last name"
                value={profileData.last_name || ''}
                name="last_name"
                onChange={e => setProfileData({ ...profileData, last_name: e.target.value })}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                required
                variant="outlined"
                label="Email"
                value={profileData.email || ''}
                name="email"
                disabled
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                required
                variant="outlined"
                label="Phone number"
                value={profileData.phone_number || ''}
                name="phone_number"
                onChange={e => setProfileData({ ...profileData, phone_number: e.target.value })}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}