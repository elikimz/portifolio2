import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SkillsAPI = createApi({
  reducerPath: 'skillsAPI',
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
    getSkills: builder.query({
      query: () => 'skill',
    }),
    getSkillById: builder.query({
      query: (skillId) => `skill/${skillId}`,
    }),
    createSkill: builder.mutation({
      query: (skillData) => ({
        url: 'skill',
        method: 'POST',
        body: skillData,
      }),
    }),
    updateSkill: builder.mutation({
      query: ({ skillId, skillData }) => ({
        url: `skill/${skillId}`,
        method: 'PUT',
        body: skillData,
      }),
    }),
    deleteSkill: builder.mutation({
      query: (skillId) => ({
        url: `skill/${skillId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in components
// eslint-disable-next-line react-refresh/only-export-components
export const {
  useGetSkillsQuery,
  useGetSkillByIdQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = SkillsAPI;

// Let me know if you want any tweaks or more features! 🚀
