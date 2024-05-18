'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { MobileNav } from './mobile-nav';
import { usePopover } from '@/hooks/use-popover';
import { UserPopover } from './user-popover';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';


export function MainNav(): React.JSX.Element {
  const router = useRouter();

  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const userPopover = usePopover<HTMLDivElement>();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <MenuIcon onClick={(): void => {
              setOpenNav(true);
            }}
              sx={{ display: { lg: 'none' } }} />
            <Typography variant="h3" >
              FEELIFY
            </Typography>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
          <Tooltip title="Contact US">
            <IconButton onClick={() => router.push(paths.contact)}>
              <ContactSupportIcon />
            </IconButton>
            </Tooltip>
          <Tooltip title="Feedback, Review & Ratings">
            <IconButton onClick={() => router.push(paths.feedback)}>
              <FeedbackIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="About Us">
            <IconButton onClick={() => router.push(paths.dashboard.about)}>
              <PeopleIcon />
            </IconButton>
            </Tooltip>
            {/* <Tooltip title="Notifications">
              <Badge badgeContent={4} color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </Tooltip> */}
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              src="/assets/avatar.jpg"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </Box>
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
