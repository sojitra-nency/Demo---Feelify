"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Eye as EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { EyeSlash as EyeSlashIcon } from "@phosphor-icons/react/dist/ssr/EyeSlash";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { paths } from "@/paths";
import { toast } from "react-toastify";
import Spinner from "@/components/common/Spinner";
import GoogleButton from "./google-button";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";
import Cookies from "js-cookie";

const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod
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
  email: "snency16@gmail.com",
  password: "Akshar@24",
} satisfies Values;

export function SignInForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = handleSubmit(async (value: Values) => {
    try {
      const { email, password } = value;
      const loginResult = await login({ email, password });
      const temp = JSON.stringify(loginResult);
      const temp2 = JSON.parse(temp);

      if (temp2.data?.status_code == "200") {
        Cookies.set("auth_token", temp2.data.access);
        dispatch(setAuth());
        toast.success("Logged In Successfully.");
        router.push(paths.home);
      } else {
        toast.error("Failed to login.");
      }
    } catch (error) {
      toast.error("Failed to login.");
    }
  });

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{" "}
          <Link
            component={RouterLink}
            href={paths.auth.signUp}
            underline="hover"
            variant="subtitle2"
          >
            Sign up
          </Link>
        </Typography>
      </Stack>

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
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? "text" : "password"}
                />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <div>
            <Link
              component={RouterLink}
              href={paths.auth.resetPassword}
              variant="subtitle2"
            >
              Forgot password?
            </Link>
          </div>
          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <Button disabled={isLoading} type="submit" variant="contained">
            {isLoading ? <Spinner sm /> : "Sign In"}
          </Button>
        </Stack>
      </form>
      {/* <GoogleButton /> */}
    </Stack>
  );
}
