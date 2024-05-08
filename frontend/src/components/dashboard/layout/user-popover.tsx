import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from "react-toastify";
import { paths } from '@/paths';
import { useLogoutMutation } from '@/redux/features/authApiSlice';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  // const router = useRouter();
  // const [logout, { error, isLoading }] = useLogoutMutation(); 

  // const handleSignOut = React.useCallback(async (): Promise<void> => {
  //   try {
  //     await logout().unwrap(); 
  //     toast.success("Signed out successfully.");
  //     router.push(paths.auth.signIn); 
  //  } catch (err: any) {
  //     console.error('Sign out error:', err);
  //     toast.error("Failed to sign out. Please try again.");
  //   }
  // }, [logout, router]);
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">Name</Typography>
        <Typography color="text.secondary" variant="body2">
          Email
        </Typography>
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem component={RouterLink} href={paths.dashboard.account} onClick={onClose}>
          <ListItemIcon>
            <AccountCircleIcon/>
          </ListItemIcon>
          Profile
        </MenuItem>
        {/* <MenuItem onClick={handleSignOut}> */}
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon/>
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
