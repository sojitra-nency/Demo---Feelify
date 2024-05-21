"use client";

import * as React from "react";

import { Layout } from "@/components/auth/layout";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useActivationMutation } from "@/redux/features/authApiSlice";
import { paths } from "@/paths";

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

export default function Page({ params }: Props): React.JSX.Element {
  const router = useRouter();
  const [activation] = useActivationMutation();

  React.useEffect(() => {
    const { uid, token } = params;

    activation({ uid, token })
      .unwrap()
      .then(() => {
        toast.success("Account activated.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to activate account.");
      })
      .finally(() => {
        router.push(paths.auth.signIn);
      });
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <CircularProgress />
        <Typography variant="h5" component="h2" mt={2}>
          Activating your account...
        </Typography>
      </Box>
    </Layout>
  );
}
