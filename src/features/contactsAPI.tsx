import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ContactsAPI = createApi({
  reducerPath: 'contactsAPI',
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
    getContacts: builder.query({
      query: () => 'contacts',
    }),
    getContactById: builder.query({
      query: (contactId) => `contacts/${contactId}`,
    }),
    createContact: builder.mutation({
      query: (contactData) => ({
        url: 'contacts',
        method: 'POST',
        body: contactData,
      }),
    }),
    updateContact: builder.mutation({
      query: ({ contactId, contactData }) => ({
        url: `contacts/${contactId}`,
        method: 'PUT',
        body: contactData,
      }),
    }),
    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `contacts/${contactId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = ContactsAPI;

// Let me know if this works for you! 🚀