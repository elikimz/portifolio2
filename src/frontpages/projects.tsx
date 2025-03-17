import React from 'react';
import { useGetProjectsQuery } from '../features/projectsAPI';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// Define the types for Project and Tech
interface Tech {
  name: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  tech_stack: Tech[];
  start_date: string;
  end_date: string;
  github_link: string;
  live_link: string;
}

const ProjectsPage: React.FC = () => {
  const { data, error, isLoading } = useGetProjectsQuery(undefined, {
    pollingInterval: 3000, // Refetch every 3 seconds
  });

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading projects</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="container mx-auto py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((project: Project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
              ) : (
                <div className="w-full h-48 bg-gray-300 rounded-md mb-4 flex items-center justify-center">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}
              <h2 className="text-xl font-semibold text-green-500">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech_stack.map((tech: Tech, index: number) => (
                  <span key={index} className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">{tech.name}</span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Start Date: {new Date(project.start_date).toLocaleDateString()}</p>
                  <p className="text-gray-500 text-sm">End Date: {new Date(project.end_date).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>
                  <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Live</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
