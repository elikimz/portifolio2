import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/homepage';
import Login from './pages/login';
import Dashboard from './components/dashboard';
import Projects from './pages/projects';
import Contacts from './pages/contacts';
import Skills from './pages/skill';
import Blogs from './pages/blogs';
import Users from './pages/users';
import ProjectsPage from './frontpages/projects';
import Contact from './frontpages/contacts';
import Skill from './frontpages/skills';
import Blog from './frontpages/blogs';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/projects',
    element: <ProjectsPage />,
  },
  {
    path: '/contacts',
    element: <Contact />,
  },
  {
    path: '/skill',
    element: <Skill />,
  },
  {
    path: '/blogs',
    element: <Blog />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { path: 'users', element: <Users/> },
      { path: 'projects', element: <Projects /> }, 
      { path: 'contacts', element: <Contacts/> },
      { path: 'skills', element: <Skills/> },
      { path: 'blogs', element: <Blogs/> },
      { path: '', element: <h2>Welcome to the Dashboard</h2> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
