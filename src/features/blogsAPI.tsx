import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BlogsAPI = createApi({
  reducerPath: 'blogsAPI',
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
    getBlogs: builder.query({
      query: () => 'blogs',
    }),
    getBlogById: builder.query({
      query: (blogId) => `blogs/${blogId}`,
    }),
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: 'blogs',
        method: 'POST',
        body: blogData,
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ blogId, blogData }) => ({
        url: `blogs/${blogId}`,
        method: 'PUT',
        body: blogData,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `blogs/${blogId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for using in components
// eslint-disable-next-line react-refresh/only-export-components
export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = BlogsAPI;

// Let me know if anything needs tweaking! 🚀
