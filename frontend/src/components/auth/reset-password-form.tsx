"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { paths } from "@/paths";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";
import Spinner from "@/components/common/Spinner";

const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: "" } satisfies Values;

export function ResetPasswordForm(): React.JSX.Element {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push(paths.auth.signIn);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = handleSubmit(async (value: Values) => {
    try {
      const { email } = value;
      const resetResult = await resetPassword(email);
      const temp = JSON.stringify(resetResult);
      const temp2 = JSON.parse(temp);
      if (temp2.data == null) {
        toast.success("Please check email to Reset Password.");
        router.push(paths.auth.signIn);
      } else {
        toast.error("Failed to send Reset Password email.");
      }
    } catch (error) {
      toast.error("Failed to send Reset Password email.");
    }
  });

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Reset password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <Button disabled={isLoading} type="submit" variant="contained">
            {isLoading ? <Spinner sm /> : "Send recovery link"}
          </Button>
          <Button variant="contained" onClick={handleSignInClick}>
            Sign In
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
