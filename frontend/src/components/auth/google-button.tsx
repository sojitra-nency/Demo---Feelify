import React from "react";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { google } from "@/utils";
export default function GoogleButton() {
  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<GoogleIcon />}
      onClick={google}
    >
      Sign in with Google
    </Button>
  );
}
