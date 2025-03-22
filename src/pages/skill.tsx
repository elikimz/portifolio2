


import React, { useEffect, useState } from 'react';
import {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from '../features/skillsAPI';
import { v4 as uuidv4 } from 'uuid';


interface Skill {
  id: string;
  name: string;
  proficiency_level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
  icon_url: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  user_id: string;
}

const Skills: React.FC = () => {
  const { data: skills = [], error: fetchError, isLoading, refetch } = useGetSkillsQuery([]);
  const [createSkill, { error: createError, isLoading: isCreating }] = useCreateSkillMutation();
  const [updateSkill, { error: updateError, isLoading: isUpdating }] = useUpdateSkillMutation();
  const [deleteSkill, { error: deleteError, isLoading: isDeleting }] = useDeleteSkillMutation();

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState<Skill>({
    id: uuidv4(),
    name: '',
    proficiency_level: 'Beginner',
    category: '',
    icon_url: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_deleted: false,
    user_id: uuidv4(),
  });

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching skills...');
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (fetchError) {
      console.error('Fetch error:', fetchError);
    }
    if (createError) {
      console.error('Create error:', createError);
      setMessage('Failed to create skill.');
    }
    if (updateError) {
      console.error('Update error:', updateError);
      setMessage('Failed to update skill.');
    }
    if (deleteError) {
      console.error('Delete error:', deleteError);
      setMessage('Failed to delete skill.');
    }
  }, [fetchError, createError, updateError, deleteError]);

  const handleCreateSkill = async () => {
    console.log('Creating skill:', newSkill);
    try {
      await createSkill(newSkill);
      setNewSkill({
        id: uuidv4(),
        name: '',
        proficiency_level: 'Beginner',
        category: '',
        icon_url: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false,
        user_id: uuidv4(),
      });
      setMessage('Skill created successfully.');
      refetch();
    } catch (error) {
      console.error('Error creating skill:', error);
    }
  };

  const handleUpdateSkill = async () => {
    if (editingSkill) {
      console.log('Updating skill with ID:', editingSkill.id);
      try {
        await updateSkill({ skillId: editingSkill.id, skillData: editingSkill });
        setEditingSkill(null);
        setMessage('Skill updated successfully.');
        refetch();
      } catch (error) {
        console.error('Error updating skill:', error);
      }
    } else {
      console.error('No skill is being edited.');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    console.log('Deleting skill with ID:', id);
    try {
      await deleteSkill(id);
      setMessage('Skill deleted successfully.');
      refetch();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const handleEditSkill = (skill: Skill) => {
    console.log('Editing skill:', skill.name);
    setEditingSkill({ ...skill }); // Ensure a new object is created to avoid mutating the original skill
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      
      <div className="p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-purple-500">Skills Dashboard</h1>

        {isLoading && <p>Loading skills...</p>}
        {fetchError && <p>Error loading skills.</p>}
        {message && <p className="mb-4 text-green-500">{message}</p>}

        {/* Create Skill Form */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Create New Skill</h2>
          <input
            type="text"
            placeholder="Enter Skill Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
          />
          <select
            value={newSkill.proficiency_level}
            onChange={(e) => setNewSkill({ ...newSkill, proficiency_level: e.target.value as Skill['proficiency_level'] })}
            className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
          <input
            type="text"
            placeholder="Enter Category"
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
          />
          <input
            type="text"
            placeholder="Enter Icon URL"
            value={newSkill.icon_url}
            onChange={(e) => setNewSkill({ ...newSkill, icon_url: e.target.value })}
            className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
          />
          <button
            onClick={handleCreateSkill}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Skill'}
          </button>
        </div>

        {/* Skills List */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Skills List</h2>
          <ul>
            {skills.map((skill: Skill) => (
              <li key={skill.id} className="mb-4 p-4 bg-gray-800 rounded border border-gray-700 relative">
                {editingSkill?.id === skill.id ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Skill Name"
                      value={editingSkill?.name ?? ''}
                      onChange={(e) => setEditingSkill({
                        ...editingSkill!,
                        name: e.target.value,
                      })}
                      className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                    />
                    <select
                      value={editingSkill?.proficiency_level}
                      onChange={(e) => setEditingSkill({
                        ...editingSkill!,
                        proficiency_level: e.target.value as Skill['proficiency_level'],
                      })}
                      className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Enter Category"
                      value={editingSkill?.category ?? ''}
                      onChange={(e) => setEditingSkill({
                        ...editingSkill!,
                        category: e.target.value,
                      })}
                      className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Enter Icon URL"
                      value={editingSkill?.icon_url ?? ''}
                      onChange={(e) => setEditingSkill({
                        ...editingSkill!,
                        icon_url: e.target.value,
                      })}
                      className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                    />
                    <button
                      onClick={handleUpdateSkill}
                      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Updating...' : 'Save'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center mb-4">
                      {skill.icon_url && (
                        <img src={skill.icon_url} alt={skill.name} className="w-12 h-12 mr-4 rounded-full" />
                      )}
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                    </div>
                    <p><strong>Proficiency Level:</strong> {skill.proficiency_level}</p>
                    <p><strong>Category:</strong> {skill.category}</p>
                    <p><strong>Created At:</strong> {new Date(skill.created_at).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(skill.updated_at).toLocaleString()}</p>
                    <button
                      onClick={() => handleEditSkill(skill)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
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
     
    </div>
  );
};

export default Skills;
