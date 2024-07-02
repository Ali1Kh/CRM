const config = {
  api_url: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
  storage_url: process.env.STORAGE_URL || process.env.NEXT_PUBLIC_STORAGE_URL,
  login: {
    url: '/auth/login',
    method: 'POST',
  },
  signup: {
    url: '/auth/signup',
    method: 'POST',
  },
  reset_password: {
    url: '/auth/reset-password/',
    method: 'POST',
  },
  forget_password: {
    url: '/auth/forget-password',
    method: 'POST',
  },
  posts: {
    url: '/posts',
  },
};

export default config;
