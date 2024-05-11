export const paths = {
    home: '/dashboard',
    auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
    dashboard: {
      overview: '/dashboard',
      emotions: '/dashboard/emotions',
      analysis: '/dashboard/analysis',
      vsearch: '/dashboard/vsearch',
      bsearch: '/dashboard/bsearch',
      vrecom: '/dashboard/vrecom',
      brecom: '/dashboard/brecom',
      account: '/dashboard/account',
    },
    errors: { notFound: '/errors/not-found' },
  } as const;
  