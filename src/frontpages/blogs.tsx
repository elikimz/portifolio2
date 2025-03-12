import React from 'react';
import { useGetBlogsQuery } from '../features/blogsAPI'; // Adjust the path as necessary
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// Define the types for Blog and Tag
interface Tag {
  name: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  published_at: string;
  tags: Tag[];
  category: string;
  is_deleted: boolean;
}

const Blog: React.FC = () => {
  const { data: blogs, error, isLoading } = useGetBlogsQuery([]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading blogs</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog: Blog) => (
            <div
              key={blog.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.content}</p>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-500 text-sm">
                  Published: {new Date(blog.published_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag: Tag, index: number) => (
                  <span key={index} className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">
                    {tag.name}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mb-2">
                Category: <span className="font-semibold">{blog.category}</span>
              </p>
              <p className="text-gray-500 text-sm">
                Status: <span className={blog.is_deleted ? 'text-red-500' : 'text-green-500'}>
                  {blog.is_deleted ? 'Deleted' : 'Active'}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
