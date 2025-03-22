import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UsersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://portifolio-dme8dnhdeqh3c2c6.southafricanorth-01.azurewebsites.net/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'users/register',
        method: 'POST',
        body: userData,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (userUpdate) => ({
        url: 'users',
        method: 'PUT',
        body: userUpdate,
      }),
    }),
    getAllUsers: builder.query({
      query: () => 'users',
    }),
  }),
});

// Export hooks
// eslint-disable-next-line react-refresh/only-export-components
export const {
  useRegisterUserMutation,
  useUpdateUserProfileMutation,
  useGetAllUsersQuery,
} = UsersAPI;

// Let me know if you want me to add anything else! 🚀