'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { useRegisterMutation } from '@/redux/features/authApiSlice';
import { toast } from "react-toastify";
import Spinner from '@/components/common/Spinner';
import GoogleButton from './google-button';


const schema = zod.object({
  first_name: zod.string().min(1, { message: 'First name is required' }),
  last_name: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(8, { message: 'Password should be at least 8 characters' }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)'}),
  re_password: zod.string().min(8, { message: 'Password should be at least 8 characters' }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)'}),
  terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions')
});


type Values = zod.infer<typeof schema>;

const defaultValues = { first_name: 'Nency', last_name: 'Sojitra', email: 'snency16@gmail.com', password: 'Akshar@24', re_password: 'Akshar@24', terms: false } satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const [register, {isLoading}] = useRegisterMutation();

  const onSubmit = handleSubmit(async (value: Values) => {
    
    try {
      const { first_name, last_name, email, password, re_password } = value
      if (password !== re_password) {
        toast.error("Passwords don't match.");
        return; 
      }
      const registerResult = await register({ first_name, last_name, email, password, re_password });;
      const temp = JSON.stringify(registerResult);
      const temp2 = JSON.parse(temp)
      if(temp2.error?.status == '400') {
        toast.error('Failed to register the account.');
        toast.error('Email already exist or Invalid Email');
      }else{
        toast.success('Please check email to verify account.');
        router.push(paths.auth.signIn);
      }  
    } catch (error) {
      toast.error('Failed to register the account.');
    }
  });
 
  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="first_name"
            render={({ field }) => (
              <FormControl error={Boolean(errors.first_name)}>
                <InputLabel>First name</InputLabel>
                <OutlinedInput {...field} label="First name" />
                {errors.first_name ? <FormHelperText>{errors.first_name.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="last_name"
            render={({ field }) => (
              <FormControl error={Boolean(errors.last_name)}>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput {...field} label="Last name" />
                {errors.last_name ? <FormHelperText>{errors.last_name.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput {...field} label="Password" type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="re_password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.re_password)}>
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput {...field} label="Confirm Password" type="password" />
                {errors.re_password ? <FormHelperText>{errors.re_password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      I have read the <Link href="/auth/terms/">terms and conditions</Link>
                      
                    </React.Fragment>
                  }
                />
                {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
              </div>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isLoading} type="submit" variant="contained">
            {isLoading ? <Spinner sm />: 'Sign Up'}
          </Button>
        </Stack>
      </form>
      <GoogleButton/>
    </Stack>
  );
}
