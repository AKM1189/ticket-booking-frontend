export const endpoints = {
  admin: {
    //booking
    showingMovies: "/admin/movies/showing/list",

    movies: "/admin/movies",
    genres: "/admin/genres",
    casts: "/admin/casts",
    theatres: "/admin/theatres",
    screens: "/admin/screens",
    seatTypes: "/admin/seat-types",
    schedules: "/admin/schedules",
    theatresByShow: "/admin/movie/schedules/theatres",
    screensByShow: "/admin/screens/showing",
    showDates: "/admin/schedules/showDate",
    showTimes: "/admin/schedules/showTime",
    schedulesByShow: "/admin/schedules/show-details",

    cardInfo: "/admin/dashboard/info",
    upcomingSchedules: "/admin/dashboard/upcoming-schedule",

    notifications: "/admin/notifications",

    booking: "/admin/bookings",

    profile: "/admin/profile",

    users: "/admin/users",
    me: "/auth/admin/me",
  },
  user: {
    me: "/auth/user/me",
    movies: "/user/movies",
    theatres: "/user/theatres",
    schedules: "/user/schedules",
    movieFilter: "/user/movies/filter-list",
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
