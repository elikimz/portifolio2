import React, { useState } from 'react';
import { useLoginUserMutation } from '../features/loginAPI';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface ErrorResponse {
  detail?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser(credentials).unwrap();
      localStorage.setItem('token', result.access_token);
      navigate('/dashboard'); // Redirect to home or dashboard
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (!error) {
      return 'Invalid credentials. Please try again.';
    }
    if ('data' in error && (error.data as ErrorResponse).detail) {
      return (error.data as ErrorResponse).detail;
    }
    return 'An error occurred. Please try again later.';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 mb-4 rounded-lg border border-gray-300"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded-lg border border-gray-300"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {isError && (
            <p className="text-red-500 mt-4">
              {getErrorMessage(error)}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
