export const endpoints = {
  admin: {
    movies: "/admin/movies",
    genres: "/admin/genres",
  },
  user: {},

  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    refresh: "/auth/refresh",
    forgotPassword: "/auth/forgot-password",
    otp: "/auth/verifyOtp",
    resetPassword: "/auth/reset-password",
  },
};
