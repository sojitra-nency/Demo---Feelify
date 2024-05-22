"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { MobileNav } from "./mobile-nav";
import { usePopover } from "@/hooks/use-popover";
import { UserPopover } from "./user-popover";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Contact from "@/components/contact/contact-form";
import Feedback from "@/components/feedback/feedback-form";

export function MainNav(): React.JSX.Element {
  const router = useRouter();

  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const userPopover = usePopover<HTMLDivElement>();
  const [openContact, setOpenContact] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);

  const handleOpenContact = () => setOpenContact(true);
  const handleCloseContact = () => setOpenContact(false);

  const handleOpenFeedback = () => setOpenFeedback(true);
  const handleCloseFeedback = () => setOpenFeedback(false);


  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid var(--mui-palette-divider)",
          backgroundColor: "var(--mui-palette-background-paper)",
          position: "sticky",
          top: 0,
          zIndex: "var(--mui-zIndex-appBar)",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "64px",
            px: 2,
          }}
        >
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
            <MenuIcon
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: "none" } }}
            />
          </Stack>
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
          <Tooltip title="Contact US">
        <IconButton onClick={handleOpenContact}>
          <ContactSupportIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={openContact}
        onClose={handleCloseContact}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 600,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Contact />
              </Box>
            </Modal>
            <Tooltip title="Feedback, Review & Ratings">
        <IconButton onClick={handleOpenFeedback}>
          <FeedbackIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={openFeedback}
        onClose={handleCloseFeedback}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 600,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Feedback />
              </Box>
            </Modal>
            <Tooltip title="About Us">
              <IconButton onClick={() => router.push(paths.dashboard.about)}>
                <PeopleIcon />
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              src="/assets/avatar.jpg"
              sx={{ cursor: "pointer" }}
            />
          </Stack>
        </Stack>
      </Box>
      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        onClose={userPopover.handleClose}
        open={userPopover.open}
      />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
