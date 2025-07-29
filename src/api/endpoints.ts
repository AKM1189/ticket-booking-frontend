export const endpoints = {
  admin: {
    movies: "/admin/movies",
    genres: "/admin/genres",
    me: "/auth/admin/me",
  },
  user: {
    me: "/auth/user/me",
  },

  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    forgotPassword: "/auth/forgot-password",
    otp: "/auth/verifyOtp",
    resetPassword: "/auth/reset-password",
    logout: "/auth/logout",
  },
};
