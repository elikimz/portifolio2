import React, { useEffect, useState } from 'react';
import {
  useGetBlogsQuery,
 
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from '../features/blogsAPI';
import { v4 as uuidv4 } from 'uuid';

interface Blog {
  id: string;
  title: string;
  content: string;
  author_id: string;
  published_at: string;
  tags: string[];
  category: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

const Blogs: React.FC = () => {
  const { data: blogs = [], error: fetchError, isLoading, refetch } = useGetBlogsQuery([]);
  const [createBlog, { error: createError, isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { error: updateError, isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { error: deleteError, isLoading: isDeleting }] = useDeleteBlogMutation();

  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [newBlog, setNewBlog] = useState<Blog>({
    id: uuidv4(),
    title: '',
    content: '',
    author_id: uuidv4(),
    published_at: new Date().toISOString(),
    tags: [],
    category: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_deleted: false,
  });

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching blogs...');
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (fetchError) {
      console.error('Fetch error:', fetchError);
    }
    if (createError) {
      console.error('Create error:', createError);
      setMessage('Failed to create blog.');
    }
    if (updateError) {
      console.error('Update error:', updateError);
      setMessage('Failed to update blog.');
    }
    if (deleteError) {
      console.error('Delete error:', deleteError);
      setMessage('Failed to delete blog.');
    }
  }, [fetchError, createError, updateError, deleteError]);

  const handleCreateBlog = async () => {
    console.log('Creating blog:', newBlog);
    try {
      await createBlog(newBlog);
      setNewBlog({
        id: uuidv4(),
        title: '',
        content: '',
        author_id: uuidv4(),
        published_at: new Date().toISOString(),
        tags: [],
        category: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false,
      });
      setMessage('Blog created successfully.');
      refetch();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleUpdateBlog = async () => {
    if (editingBlog) {
      console.log('Updating blog with ID:', editingBlog.id);
      try {
        await updateBlog({ blogId: editingBlog.id, blogData: editingBlog });
        setEditingBlog(null);
        setMessage('Blog updated successfully.');
        refetch();
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    } else {
      console.error('No blog is being edited.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    console.log('Deleting blog with ID:', id);
    try {
      await deleteBlog(id);
      setMessage('Blog deleted successfully.');
      refetch();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    console.log('Editing blog:', blog.title);
    setEditingBlog({ ...blog }); // Ensure a new object is created to avoid mutating the original blog
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">Blogs Dashboard</h1>

      {isLoading && <p>Loading blogs...</p>}
      {fetchError && <p>Error loading blogs.</p>}
      {message && <p className="mb-4 text-green-500">{message}</p>}

      {/* Create Blog Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Blog</h2>
        <input
          type="text"
          placeholder="Enter Blog Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <textarea
          placeholder="Enter Blog Content"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Enter Tags (comma separated)"
          value={newBlog.tags.join(', ')}
          onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value.split(',').map(item => item.trim()) })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Enter Category"
          value={newBlog.category}
          onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <button
          onClick={handleCreateBlog}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          disabled={isCreating}
        >
          {isCreating ? 'Creating...' : 'Create Blog'}
        </button>
      </div>

      {/* Blogs List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Blogs List</h2>
        <ul>
          {blogs.map((blog: Blog) => (
            <li key={blog.id} className="mb-4 p-4 bg-gray-800 rounded border border-gray-700 relative">
              {editingBlog?.id === blog.id ? (
                <div>
                  <input
                    type="text"
                    placeholder="Enter Blog Title"
                    value={editingBlog?.title ?? ''}
                    onChange={(e) => setEditingBlog({
                      ...editingBlog!,
                      title: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <textarea
                    placeholder="Enter Blog Content"
                    value={editingBlog?.content ?? ''}
                    onChange={(e) => setEditingBlog({
                      ...editingBlog!,
                      content: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Enter Tags (comma separated)"
                    value={editingBlog?.tags.join(', ') ?? ''}
                    onChange={(e) => setEditingBlog({
                      ...editingBlog!,
                      tags: e.target.value.split(',').map(item => item.trim()),
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Enter Category"
                    value={editingBlog?.category ?? ''}
                    onChange={(e) => setEditingBlog({
                      ...editingBlog!,
                      category: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <button
                    onClick={handleUpdateBlog}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Save'}
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p>{blog.content}</p>
                  <p><strong>Tags:</strong> {blog.tags.join(', ')}</p>
                  <p><strong>Category:</strong> {blog.category}</p>
                  <p><strong>Published At:</strong> {new Date(blog.published_at).toLocaleString()}</p>
                  <p><strong>Created At:</strong> {new Date(blog.created_at).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(blog.updated_at).toLocaleString()}</p>
                  <button
                    onClick={() => handleEditBlog(blog)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog.id)}
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

export default Blogs;
