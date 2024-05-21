"use client";

import * as React from "react";
import { Layout } from "@/components/auth/layout";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { useResetPasswordConfirmMutation } from "@/redux/features/authApiSlice";
import { paths } from "@/paths";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Spinner from "@/components/common/Spinner";

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

const schema = zod.object({
  new_password: zod
    .string()
    .min(8, { message: "Password should be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)",
      }
    ),
  re_new_password: zod
    .string()
    .min(8, { message: "Password should be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)",
      }
    ),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  new_password: "",
  re_new_password: "",
} satisfies Values;

export default function Page({ params }: Props): React.JSX.Element {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordConfirmMutation();

  const { uid, token } = params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async (value: Values) => {
    const { new_password, re_new_password } = value;

    if (new_password !== re_new_password) {
      toast.error("Passwords don't match.");
      return;
    }

    resetPassword({ uid, token, new_password, re_new_password })
      .unwrap()
      .then(() => {
        toast.success("Password reset completed.");
      })
      .catch(() => {
        toast.error("Failed to reset new password.");
      })
      .finally(() => {
        router.push(paths.auth.signIn);
      });
  });

  return (
    <Layout>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h4">Reset Password</Typography>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="new_password"
              render={({ field }) => (
                <FormControl error={Boolean(errors.new_password)}>
                  <InputLabel>new_Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    label="new_Password"
                    type="password"
                  />
                  {errors.new_password ? (
                    <FormHelperText>
                      {errors.new_password.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="re_new_password"
              render={({ field }) => (
                <FormControl error={Boolean(errors.re_new_password)}>
                  <InputLabel>Confirm Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    label="Confirm Password"
                    type="password"
                  />
                  {errors.re_new_password ? (
                    <FormHelperText>
                      {errors.re_new_password.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            <Button disabled={isLoading} type="submit" variant="contained">
              {isLoading ? <Spinner sm /> : "Reset Password"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Layout>
  );
}
