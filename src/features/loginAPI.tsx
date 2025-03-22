// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const loginAPI = createApi({
//   reducerPath: "loginAPI",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://portfolioapi-5zh8.onrender.com/" }),
//   endpoints: (builder) => ({
//     loginUser: builder.mutation({
//       query: (credentials) => ({
//         url: "token",
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: credentials,
//       }),
//     }),
//   }),
// });

// export const { useLoginUserMutation } = loginAPI;

// // This keeps only the login functionality — ready to use in your app! 🚀

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://portifolio-dme8dnhdeqh3c2c6.southafricanorth-01.azurewebsites.net/" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "users/token", // Matches your backend route
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "password",
          username: credentials.username,
          password: credentials.password,
          scope: "",
          client_id: "string",
          client_secret: "string",
        }).toString(),
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginAPI;
