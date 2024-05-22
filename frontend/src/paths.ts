export const paths = {
  home: "/dashboard",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    resetPassword: "/auth/reset-password",
  },
  contact: "/contact",
  dashboard: {
    overview: "/dashboard",
    emotions: "/dashboard/emotions",
    analysis: "/dashboard/analysis",
    vsearch: "/dashboard/vsearch",
    bsearch: "/dashboard/bsearch",
    vrecom: "/dashboard/vrecom",
    brecom: "/dashboard/brecom",
    account: "/dashboard/account",
    about: "/dashboard/about",
  },
  errors: { notFound: "/errors/not-found" },
  recommendation: {
    books: {
      happy: "/recommendation/books/happy",
      sad: "/recommendation/books/sad",
      surprise: "/recommendation/books/surprise",
      fear: "/recommendation/books/fear",
      neutral: "/recommendation/books/neutral",
    },
    videos: {
      happy: "/recommendation/videos/happy",
      sad: "/recommendation/videos/sad",
      surprise: "/recommendation/videos/surprise",
      fear: "/recommendation/videos/fear",
      neutral: "/recommendation/videos/neutral",
    },
  },
  upgrade: "/upgrade",
} as const;

export const protectedRoutes = [
  paths.dashboard.overview,
  paths.dashboard.emotions,
  paths.dashboard.analysis,
  paths.dashboard.vsearch,
  paths.dashboard.bsearch,
  paths.dashboard.vrecom,
  paths.dashboard.brecom,
  paths.dashboard.account,
  paths.dashboard.about,
  paths.recommendation.books.happy,
  paths.recommendation.books.sad,
  paths.recommendation.books.surprise,
  paths.recommendation.books.fear,
  paths.recommendation.books.neutral,
  paths.recommendation.videos.happy,
  paths.recommendation.videos.sad,
  paths.recommendation.videos.surprise,
  paths.recommendation.videos.fear,
  paths.recommendation.videos.neutral,
  paths.upgrade,
];
