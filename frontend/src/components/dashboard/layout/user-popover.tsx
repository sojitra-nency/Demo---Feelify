import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { paths } from "@/paths";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { logout as setLogout } from "@/redux/features/authSlice";
import axios from "axios";
import Cookies from "js-cookie";
export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

interface ProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
}


export function UserPopover({
  anchorEl,
  onClose,
  open,
}: UserPopoverProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(setLogout());
      router.push(paths.auth.signIn);
      toast.success("You have been logged out.");
    } catch (error) {
      toast.error("An error occurred during logout.");
    }
  };

  const [profileData, setProfileData] = React.useState<ProfileData>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const token = Cookies.get("auth_token");
  const userId = localStorage.getItem("id");

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/login/profile/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: "240px" } } }}
    >
      <Box sx={{ p: "16px 20px " }}>
        <Typography variant="subtitle1">{profileData.first_name} {profileData.last_name}</Typography>
        <Typography color="text.secondary" variant="body2">
        {profileData.email}
        </Typography>
      </Box>
      <Divider /> 
      <MenuList
        disablePadding
        sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
      >
        <MenuItem
          component={RouterLink}
          href={paths.dashboard.account}
          onClick={onClose}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem
          component={RouterLink}
          href={paths.auth.resetPassword}
          onClick={onClose}
        >
          <ListItemIcon>
            <LockResetIcon />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {/* <MenuItem> */}
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
