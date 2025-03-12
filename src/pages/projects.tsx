// import React, { useEffect, useState } from 'react';
// import {
//   useGetProjectsQuery,
//   useCreateProjectMutation,
//   useUpdateProjectMutation,
//   useDeleteProjectMutation,
// } from '../features/projectsAPI';
// import { v4 as uuidv4 } from 'uuid';

// interface Project {
//   id: string;
//   title: string;
//   description: string;
//   tech_stack: string[];
//   github_link?: string;
//   live_link?: string;
//   image_url?: string;
//   category?: string;
//   tags: string[];
//   is_featured: boolean;
//   start_date?: string | null;
//   end_date?: string | null;
//   created_at: string;
//   updated_at: string;
//   user_id: string;
// }

// const Projects: React.FC = () => {
//   const { data: projects = [], error: fetchError, isLoading, refetch } = useGetProjectsQuery([]);
//   const [createProject, { error: createError, isLoading: isCreating }] = useCreateProjectMutation();
//   const [updateProject, { error: updateError, isLoading: isUpdating }] = useUpdateProjectMutation();
//   const [deleteProject, { error: deleteError, isLoading: isDeleting }] = useDeleteProjectMutation();

//   const [editingProject, setEditingProject] = useState<Project | null>(null);
//   const [newProject, setNewProject] = useState<Project>({
//     id: uuidv4(),
//     title: '',
//     description: '',
//     tech_stack: [],
//     github_link: '',
//     live_link: '',
//     image_url: '',
//     category: '',
//     tags: [],
//     is_featured: false,
//     start_date: null,
//     end_date: null,
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//     user_id: uuidv4(),
//   });

//   const [message, setMessage] = useState<string | null>(null);

//   useEffect(() => {
//     console.log('Fetching projects...');
//     refetch();
//   }, [refetch]);

//   useEffect(() => {
//     if (fetchError) {
//       console.error('Fetch error:', fetchError);
//     }
//     if (createError) {
//       console.error('Create error:', createError);
//       setMessage('Failed to create project.');
//     }
//     if (updateError) {
//       console.error('Update error:', updateError);
//       setMessage('Failed to update project.');
//     }
//     if (deleteError) {
//       console.error('Delete error:', deleteError);
//       setMessage('Failed to delete project.');
//     }
//   }, [fetchError, createError, updateError, deleteError]);

//   const handleCreateProject = async () => {
//     console.log('Creating project:', newProject);
//     try {
//       await createProject(newProject);
//       setNewProject({
//         id: uuidv4(),
//         title: '',
//         description: '',
//         tech_stack: [],
//         github_link: '',
//         live_link: '',
//         image_url: '',
//         category: '',
//         tags: [],
//         is_featured: false,
//         start_date: null,
//         end_date: null,
//         created_at: new Date().toISOString(),
//         updated_at: new Date().toISOString(),
//         user_id: uuidv4(),
//       });
//       setMessage('Project created successfully.');
//       refetch();
//     } catch (error) {
//       console.error('Error creating project:', error);
//     }
//   };

//   const handleUpdateProject = async () => {
//     if (editingProject) {
//       console.log('Updating project with ID:', editingProject.id);
//       try {
//         await updateProject({ projectId: editingProject.id, projectData: editingProject });
//         setEditingProject(null);
//         setMessage('Project updated successfully.');
//         refetch();
//       } catch (error) {
//         console.error('Error updating project:', error);
//       }
//     } else {
//       console.error('No project is being edited.');
//     }
//   };

//   const handleDeleteProject = async (id: string) => {
//     console.log('Deleting project with ID:', id);
//     try {
//       await deleteProject(id);
//       setMessage('Project deleted successfully.');
//       refetch();
//     } catch (error) {
//       console.error('Error deleting project:', error);
//     }
//   };

//   const handleEditProject = (project: Project) => {
//     console.log('Editing project:', project.title);
//     setEditingProject({ ...project }); // Ensure a new object is created to avoid mutating the original project
//   };

//   return (
//     <div className="p-6 bg-gray-900 text-white min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-purple-500">Projects Dashboard</h1>

//       {isLoading && <p>Loading projects...</p>}
//       {fetchError && <p>Error loading projects.</p>}
//       {message && <p className="mb-4 text-green-500">{message}</p>}

//       {/* Create Project Form */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Create New Project</h2>
//         <input
//           type="text"
//           placeholder="Enter Project Title"
//           value={newProject.title}
//           onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
//           className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
//         />
//         <textarea
//           placeholder="Enter Project Description"
//           value={newProject.description}
//           onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
//           className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Enter Tech Stack (comma separated)"
//           value={newProject.tech_stack.join(', ')}
//           onChange={(e) => setNewProject({ ...newProject, tech_stack: e.target.value.split(',').map(item => item.trim()) })}
//           className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Enter GitHub Link"
//           value={newProject.github_link ?? ''}
//           onChange={(e) => setNewProject({ ...newProject, github_link: e.target.value })}
//           className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Enter Live Link"
//           value={newProject.live_link ?? ''}
//           onChange={(e) => setNewProject({ ...newProject, live_link: e.target.value })}
//           className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Enter Image URL"
//           value={newProject.image_url ?? ''}
//           onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
//           className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Enter Category"
//           value={newProject.category ?? ''}
//           onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
//           className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Enter Tags (comma separated)"
//           value={newProject.tags.join(', ')}
//           onChange={(e) => setNewProject({ ...newProject, tags: e.target.value.split(',').map(item => item.trim()) })}
//           className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
//         />
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             checked={newProject.is_featured}
//             onChange={(e) => setNewProject({ ...newProject, is_featured: e.target.checked })}
//             className="form-checkbox"
//           />
//           <span>Featured</span>
//         </label>
//         <button
//           onClick={handleCreateProject}
//           className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
//           disabled={isCreating}
//         >
//           {isCreating ? 'Creating...' : 'Create Project'}
//         </button>
//       </div>

//       {/* Projects List */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Projects List</h2>
//         <ul>
//           {projects.map((project: Project) => (
//             <li key={project.id} className="mb-4 p-4 bg-gray-800 rounded border border-gray-700 relative">
//               {editingProject?.id === project.id ? (
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Enter Project Title"
//                     value={editingProject?.title ?? ''}
//                     onChange={(e) => setEditingProject({
//                       ...editingProject!,
//                       title: e.target.value,
//                     })}
//                     className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
//                   />
//                   <textarea
//                     placeholder="Enter Project Description"
//                     value={editingProject?.description ?? ''}
//                     onChange={(e) => setEditingProject({
//                       ...editingProject!,
//                       description: e.target.value,
//                     })}
//                     className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Enter Tech Stack (comma separated)"
//                     value={editingProject?.tech_stack.join(', ') ?? ''}
//                     onChange={(e) => setEditingProject({
//                       ...editingProject!,
//                       tech_stack: e.target.value.split(',').map(item => item.trim()),
//                     })}
//                     className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Enter GitHub Link"
//                     value={editingProject?.github_link ?? ''}
//                     onChange={(e) => setEditingProject({
//                       ...editingProject!,
//                       github_link: e.target.value,
//                     })}
//                     className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Enter Live Link"
//                     value={editingProject?.live_link ?? ''}
//                     onChange={(e) => setEditingProject({
//                       ...editingProject!,
//                       live_link: e.target.value,
//                     })}
//                     className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Enter Image URL"
//                     value={editingProject?.image_url ?? ''}
//                     onChange={(e) => setEditingProject({
//                       ...editingProject!,
//                       image_url: e.target.value,
//                     })}
//                     className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Enter Category"
//                     value={editingProject?.category ?? ''}
//                     onChange={(e) => setEditingProject({
//                       ...editingProject!,
//                       category: e.target.value,
//                     })}
//                     className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Enter Tags (comma separated)"
//                     value={editingProject?.tags.join(', ') ?? ''}
//                     onChange={(e) => setEditingProject({
//                       ...editingProject!,
//                       tags: e.target.value.split(',').map(item => item.trim()),
//                     })}
//                     className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
//                   />
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={editingProject?.is_featured ?? false}
//                       onChange={(e) => setEditingProject({
//                         ...editingProject!,
//                         is_featured: e.target.checked,
//                       })}
//                       className="form-checkbox"
//                     />
//                     <span>Featured</span>
//                   </label>
//                   <button
//                     onClick={handleUpdateProject}
//                     className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
//                     disabled={isUpdating}
//                   >
//                     {isUpdating ? 'Updating...' : 'Save'}
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <h3 className="text-lg font-semibold">{project.title}</h3>
//                   <p>{project.description}</p>
//                   <p><strong>Tech Stack:</strong> {project.tech_stack.join(', ')}</p>
//                   <p><strong>Category:</strong> {project.category}</p>
//                   <p><strong>Tags:</strong> {project.tags.join(', ')}</p>
//                   <p><strong>Featured:</strong> {project.is_featured ? 'Yes' : 'No'}</p>
//                   <p><strong>Start Date:</strong> {project.start_date ? new Date(project.start_date).toLocaleString() : 'N/A'}</p>
//                   <p><strong>End Date:</strong> {project.end_date ? new Date(project.end_date).toLocaleString() : 'N/A'}</p>
//                   <p><strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}</p>
//                   <p><strong>Updated At:</strong> {new Date(project.updated_at).toLocaleString()}</p>
//                   <p><strong>GitHub Link:</strong> <a href={project.github_link} target="_blank" rel="noopener noreferrer">{project.github_link}</a></p>
//                   <p><strong>Live Link:</strong> <a href={project.live_link} target="_blank" rel="noopener noreferrer">{project.live_link}</a></p>
//                   <p><strong>Image URL:</strong> <a href={project.image_url} target="_blank" rel="noopener noreferrer">{project.image_url}</a></p>
//                   <button
//                     onClick={() => handleEditProject(project)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteProject(project.id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                     disabled={isDeleting}
//                   >
//                     {isDeleting ? 'Deleting...' : 'Delete'}
//                   </button>
//                 </div>
//               )}
//               {(isUpdating || isDeleting) && <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"><div className="loader"></div></div>}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Projects;


import React, { useEffect, useState } from 'react';
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from '../features/projectsAPI';
import { v4 as uuidv4 } from 'uuid';

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_link?: string;
  live_link?: string;
  image_url?: string;
  category?: string;
  tags: string[];
  is_featured: boolean;
  start_date?: string | null;
  end_date?: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const Projects: React.FC = () => {
  const { data: projects = [], error: fetchError, isLoading, refetch } = useGetProjectsQuery([]);
  const [createProject, { error: createError, isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { error: updateError, isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { error: deleteError, isLoading: isDeleting }] = useDeleteProjectMutation();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Project>({
    id: uuidv4(),
    title: '',
    description: '',
    tech_stack: [],
    github_link: '',
    live_link: '',
    image_url: '',
    category: '',
    tags: [],
    is_featured: false,
    start_date: null,
    end_date: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: uuidv4(),
  });

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching projects...');
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (fetchError) {
      console.error('Fetch error:', fetchError);
    }
    if (createError) {
      console.error('Create error:', createError);
      setMessage('Failed to create project.');
    }
    if (updateError) {
      console.error('Update error:', updateError);
      setMessage('Failed to update project.');
    }
    if (deleteError) {
      console.error('Delete error:', deleteError);
      setMessage('Failed to delete project.');
    }
  }, [fetchError, createError, updateError, deleteError]);

  const handleCreateProject = async () => {
    console.log('Creating project:', newProject);
    try {
      await createProject(newProject);
      setNewProject({
        id: uuidv4(),
        title: '',
        description: '',
        tech_stack: [],
        github_link: '',
        live_link: '',
        image_url: '',
        category: '',
        tags: [],
        is_featured: false,
        start_date: null,
        end_date: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: uuidv4(),
      });
      setMessage('Project created successfully.');
      refetch();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleUpdateProject = async () => {
    if (editingProject) {
      console.log('Updating project with ID:', editingProject.id);
      try {
        await updateProject({ projectId: editingProject.id, projectData: editingProject });
        setEditingProject(null);
        setMessage('Project updated successfully.');
        refetch();
      } catch (error) {
        console.error('Error updating project:', error);
      }
    } else {
      console.error('No project is being edited.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    console.log('Deleting project with ID:', id);
    try {
      await deleteProject(id);
      setMessage('Project deleted successfully.');
      refetch();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEditProject = (project: Project) => {
    console.log('Editing project:', project.title);
    setEditingProject({ ...project }); // Ensure a new object is created to avoid mutating the original project
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">Projects Dashboard</h1>

      {isLoading && <p>Loading projects...</p>}
      {fetchError && <p>Error loading projects.</p>}
      {message && <p className="mb-4 text-green-500">{message}</p>}

      {/* Create Project Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Project</h2>
        <input
          type="text"
          placeholder="Enter Project Title"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <textarea
          placeholder="Enter Project Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Enter Tech Stack (comma separated)"
          value={newProject.tech_stack.join(', ')}
          onChange={(e) => setNewProject({ ...newProject, tech_stack: e.target.value.split(',').map(item => item.trim()) })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Enter GitHub Link"
          value={newProject.github_link ?? ''}
          onChange={(e) => setNewProject({ ...newProject, github_link: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Enter Live Link"
          value={newProject.live_link ?? ''}
          onChange={(e) => setNewProject({ ...newProject, live_link: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Enter Image URL"
          value={newProject.image_url ?? ''}
          onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Enter Category"
          value={newProject.category ?? ''}
          onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Enter Tags (comma separated)"
          value={newProject.tags.join(', ')}
          onChange={(e) => setNewProject({ ...newProject, tags: e.target.value.split(',').map(item => item.trim()) })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newProject.is_featured}
            onChange={(e) => setNewProject({ ...newProject, is_featured: e.target.checked })}
            className="form-checkbox"
          />
          <span>Featured</span>
        </label>
        <button
          onClick={handleCreateProject}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          disabled={isCreating}
        >
          {isCreating ? 'Creating...' : 'Create Project'}
        </button>
      </div>

      {/* Projects List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Projects List</h2>
        <ul>
          {projects.map((project: Project) => (
            <li key={project.id} className="mb-4 p-4 bg-gray-800 rounded border border-gray-700 relative">
              {editingProject?.id === project.id ? (
                <div>
                  <input
                    type="text"
                    placeholder="Enter Project Title"
                    value={editingProject?.title ?? ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject!,
                      title: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <textarea
                    placeholder="Enter Project Description"
                    value={editingProject?.description ?? ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject!,
                      description: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Enter Tech Stack (comma separated)"
                    value={editingProject?.tech_stack.join(', ') ?? ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject!,
                      tech_stack: e.target.value.split(',').map(item => item.trim()),
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Enter GitHub Link"
                    value={editingProject?.github_link ?? ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject!,
                      github_link: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Enter Live Link"
                    value={editingProject?.live_link ?? ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject!,
                      live_link: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Enter Image URL"
                    value={editingProject?.image_url ?? ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject!,
                      image_url: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Enter Category"
                    value={editingProject?.category ?? ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject!,
                      category: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Enter Tags (comma separated)"
                    value={editingProject?.tags.join(', ') ?? ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject!,
                      tags: e.target.value.split(',').map(item => item.trim()),
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingProject?.is_featured ?? false}
                      onChange={(e) => setEditingProject({
                        ...editingProject!,
                        is_featured: e.target.checked,
                      })}
                      className="form-checkbox"
                    />
                    <span>Featured</span>
                  </label>
                  <button
                    onClick={handleUpdateProject}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Save'}
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p>{project.description}</p>
                  <p><strong>Tech Stack:</strong> {project.tech_stack.join(', ')}</p>
                  <p><strong>Category:</strong> {project.category}</p>
                  <p><strong>Tags:</strong> {project.tags.join(', ')}</p>
                  <p><strong>Featured:</strong> {project.is_featured ? 'Yes' : 'No'}</p>
                  <p><strong>Start Date:</strong> {project.start_date ? new Date(project.start_date).toLocaleString() : 'N/A'}</p>
                  <p><strong>End Date:</strong> {project.end_date ? new Date(project.end_date).toLocaleString() : 'N/A'}</p>
                  <p><strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(project.updated_at).toLocaleString()}</p>
                  <p><strong>GitHub Link:</strong> <a href={project.github_link} target="_blank" rel="noopener noreferrer">{project.github_link}</a></p>
                  <p><strong>Live Link:</strong> <a href={project.live_link} target="_blank" rel="noopener noreferrer">{project.live_link}</a></p>
                  {project.image_url ? (
                    <div>
                      <p><strong>Image URL:</strong></p>
                      <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
                    </div>
                  ) : (
                    <p><strong>Image URL:</strong> No Image Available</p>
                  )}
                  <button
                    onClick={() => handleEditProject(project)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
              {(isUpdating || isDeleting) && <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"><div className="loader"></div></div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
