import React, { useEffect, useState } from 'react';
import { useGetAllUsersQuery, useRegisterUserMutation, useUpdateUserProfileMutation } from '../features/usersAPI';

interface User {
  id: string;
  username: string;
  email: string;
  password_hash?: string;
  full_name: string;
  bio: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  full_name: string;
  bio: string;
  profile_picture: string;
}

const Users: React.FC = () => {
  const { data: users = [], error: fetchError, isLoading, refetch } = useGetAllUsersQuery(undefined);
  const [registerUser, { error: registerError, isLoading: isRegistering }] = useRegisterUserMutation();
  const [updateUserProfile, { error: updateError, isLoading: isUpdating }] = useUpdateUserProfileMutation();

  const [newUser, setNewUser] = useState<RegistrationData>({
    username: '',
    email: '',
    password: '',
    full_name: '',
    bio: '',
    profile_picture: '',
  });

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching users...');
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (fetchError) {
      console.error('Fetch error:', fetchError);
    }
    if (registerError) {
      console.error('Register error:', registerError);
      setMessage('Failed to register user.');
    }
    if (updateError) {
      console.error('Update error:', updateError);
      setMessage('Failed to update user profile.');
    }
  }, [fetchError, registerError, updateError]);

  const handleRegisterUser = async () => {
    console.log('Registering user:', newUser);
    try {
      await registerUser(newUser).unwrap();
      setNewUser({
        username: '',
        email: '',
        password: '',
        full_name: '',
        bio: '',
        profile_picture: '',
      });
      setMessage('User registered successfully.');
      refetch();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleUpdateUserProfile = async () => {
    if (editingUser) {
      console.log('Updating user profile with ID:', editingUser.id);
      try {
        await updateUserProfile({
          userId: editingUser.id,
          userData: {
            full_name: editingUser.full_name,
            bio: editingUser.bio,
            profile_picture: editingUser.profile_picture,
          },
        }).unwrap();
        setEditingUser(null);
        setMessage('User profile updated successfully.');
        refetch();
      } catch (error) {
        console.error('Error updating user profile:', error);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any)?.name === 'FetchError') {
          setMessage('Network error occurred. Please check your internet connection and try again.');
        } else {
          setMessage('Failed to update user profile. Please try again later.');
        }
      }
    } else {
      console.error('No user profile is being edited.');
    }
  };

  const handleEditUserProfile = (user: User) => {
    console.log('Editing user profile:', user.username);
    setEditingUser({ ...user });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">Users Dashboard</h1>

      {isLoading && <p>Loading users...</p>}
      {fetchError && <p>Error loading users.</p>}
      {message && <p className="mb-4 text-green-500">{message}</p>}

      {/* Register User Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Register New User</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Enter Full Name"
          value={newUser.full_name}
          onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <textarea
          placeholder="Enter Bio"
          value={newUser.bio}
          onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Enter Profile Picture URL"
          value={newUser.profile_picture}
          onChange={(e) => setNewUser({ ...newUser, profile_picture: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <button
          onClick={handleRegisterUser}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          disabled={isRegistering}
        >
          {isRegistering ? 'Registering...' : 'Register User'}
        </button>
      </div>

      {/* Users List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Users List</h2>
        <ul>
          {users.map((user: User) => (
            <li key={user.id} className="mb-4 p-4 bg-gray-800 rounded border border-gray-700 relative">
              {editingUser?.id === user.id ? (
                <div>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    value={editingUser?.full_name ?? ''}
                    onChange={(e) => setEditingUser({
                      ...editingUser!,
                      full_name: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <textarea
                    placeholder="Enter Bio"
                    value={editingUser?.bio ?? ''}
                    onChange={(e) => setEditingUser({
                      ...editingUser!,
                      bio: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Enter Profile Picture URL"
                    value={editingUser?.profile_picture ?? ''}
                    onChange={(e) => setEditingUser({
                      ...editingUser!,
                      profile_picture: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <button
                    onClick={handleUpdateUserProfile}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Save Profile'}
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">{user.username}</h3>
                  <p>{user.email}</p>
                  <p><strong>Full Name:</strong> {user.full_name}</p>
                  <p><strong>Bio:</strong> {user.bio}</p>
                  <p><strong>Profile Picture:</strong> <img src={user.profile_picture} alt="Profile" className="w-16 h-16 rounded-full" /></p>
                  <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(user.updated_at).toLocaleString()}</p>
                  <button
                    onClick={() => handleEditUserProfile(user)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                </div>
              )}
              {isUpdating && <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"><div className="loader"></div></div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
