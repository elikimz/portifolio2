import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, User, Briefcase, Phone, Brain, BookOpen, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or states
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-20 bg-gray-800 text-white p-6 w-64 md:w-64 h-full transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-purple-500">
            Portfolio Dashboard
          </h1>
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard/users"
                className="flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/projects"
                className="flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Briefcase size={20} />
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/contacts"
                className="flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone size={20} />
                <span>Contacts</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/skills"
                className="flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Brain size={20} />
                <span>Skills</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/blogs"
                className="flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen size={20} />
                <span>Blogs</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between md:hidden">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-900">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-purple-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
