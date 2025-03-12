import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ProjectsAPI = createApi({
  reducerPath: 'projectsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://portfolioapi-5zh8.onrender.com/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => 'projects',
    }),
    getProjectById: builder.query({
      query: (projectId) => `projects/${projectId}`,
    }),
    createProject: builder.mutation({
      query: (projectData) => ({
        url: 'projects',
        method: 'POST',
        body: projectData,
      }),
    }),
    updateProject: builder.mutation({
      query: ({ projectId, projectData }) => ({
        url: `projects/${projectId}`,
        method: 'PUT',
        body: projectData,
      }),
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `projects/${projectId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = ProjectsAPI;

// Let me know if you want any adjustments! 🚀