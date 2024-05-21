import FeedBack from "./components/feedback/feedback-form";

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
      about: '/dashboard/about',
      watchlist: '/dashboard/watchlist',
    },
    errors: { notFound: '/errors/not-found' },
    recommendation: {
      books:{
        happy: '/recommendation/books/happy',
        sad: '/recommendation/books/sad',
        surprise: '/recommendation/books/surprise',
        fear: '/recommendation/books/fear',
        neutral: '/recommendation/books/neutral',
      },
      videos:{
        happy: '/recommendation/videos/happy',
        sad: '/recommendation/videos/sad',
        surprise: '/recommendation/videos/surprise',
        fear: '/recommendation/videos/fear',
        neutral: '/recommendation/videos/neutral',
      },
    },
    feedback: '/feedback',
    contact: '/contact',
    upgrade: '/upgrade',
  } as const;
  