// import React from 'react';
// import Navbar from '../components/navbar';
// import Footer from '../components/footer';

// const HomePage: React.FC = () => {
//   const handleAdminLogin = () => {
//     window.location.href = '/login'; // Redirect to the login page
//   };

//   return (
//     <div className="bg-gray-100 text-gray-900">
//       <Navbar />

//       <main>
//         {/* Hero Section */}
//         <section className="h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: 'url(https://i.postimg.cc/K84d5wsg/kim.jpg)' }}>
//           <div className="absolute inset-0 bg-black opacity-50"></div> {/* Background overlay */}
//           <div className="text-center relative z-10">
//             <h1 className="text-5xl font-bold mb-4 text-white">Welcome to My Portfolio</h1>
//             <p className="text-xl mb-6 text-white">Showcasing my work, skills, and passion for development</p>
//           </div>
//         </section>

//         {/* Profile Section */}
//         <section id="profile" className="py-16 px-6">
//           <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
//           <div className="max-w-3xl mx-auto text-center">
//             <p className="text-lg mb-4">
//               Hi, I'm [Your Name], a full-stack software developer with a passion for building web applications using the latest technologies. I specialize in FastAPI, React, and PostgreSQL.
//             </p>
//             <p className="text-lg">
//               With a strong foundation in both front-end and back-end development, I strive to create efficient, scalable, and user-friendly applications.
//             </p>
//           </div>
//         </section>

//         {/* Projects Section */}
//         <section id="projects" className="py-16 bg-gray-200 px-6">
//           <h2 className="text-3xl font-bold mb-6 text-center">View My Projects</h2>
//           <p className="max-w-3xl mx-auto text-center text-lg">
//             Explore some of the projects I've worked on. Each project is a testament to my skills and dedication to delivering high-quality solutions.
//           </p>
//           <div className="mt-8 text-center">
//             <a href="/projects" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//               Explore Projects
//             </a>
//           </div>
//         </section>

//         {/* Download CV Section */}
//         <section id="download-cv" className="py-16 px-6">
//           <h2 className="text-3xl font-bold mb-6 text-center">Download My CV</h2>
//           <p className="max-w-3xl mx-auto text-center text-lg">
//             Get a comprehensive overview of my skills, experience, and qualifications. Download my CV to learn more about my professional journey.
//           </p>
//           <div className="mt-8 text-center">
//             <a href="/path-to-your-cv.pdf" className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600" download>
//               Download CV
//             </a>
//           </div>
//         </section>
//       </main>

//       <Footer />

//       {/* Secret Admin Login Arrow */}
//       <button
//         onClick={handleAdminLogin}
//         className="fixed bottom-4 right-4 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
//         title="Admin Login"
//       >
//         ➜
//       </button>
//     </div>
//   );
// };

// export default HomePage;


import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const HomePage: React.FC = () => {
  const handleAdminLogin = () => {
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <div className="bg-gray-100 text-gray-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: 'url(https://i.postimg.cc/K84d5wsg/kim.jpg)' }}>
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Background overlay */}
          <div className="text-center relative z-10">
            <h1 className="text-5xl font-bold mb-4 text-white">Welcome to My Portfolio</h1>
            <p className="text-xl mb-6 text-white">Showcasing my work, skills, and passion for development</p>
          </div>
        </section>

        {/* Profile Section */}
        <section id="profile" className="py-16 px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-4">
              Hi, I'm Wairimu Elijah Kimani, a full-stack software developer with a passion for building web applications using the latest technologies. I specialize in FastAPI, React, and PostgreSQL.
            </p>
            <p className="text-lg">
              With a strong foundation in both front-end and back-end development, I strive to create efficient, scalable, and user-friendly applications.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 bg-gray-200 px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">View My Projects</h2>
          <p className="max-w-3xl mx-auto text-center text-lg">
            Explore some of the projects I've worked on. Each project is a testament to my skills and dedication to delivering high-quality solutions.
          </p>
          <div className="mt-8 text-center">
            <a href="/projects" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Explore Projects
            </a>
          </div>
        </section>

        {/* Download CV Section */}
        <section id="download-cv" className="py-16 px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Download My CV</h2>
          <p className="max-w-3xl mx-auto text-center text-lg">
            Get a comprehensive overview of my skills, experience, and qualifications. Download my CV to learn more about my professional journey.
          </p>
          <div className="mt-8 text-center">
            <a href="/path-to-your-cv.pdf" className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600" download>
              Download CV
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Secret Admin Login Arrow */}
      <button
        onClick={handleAdminLogin}
        className="fixed bottom-4 right-4 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
        title="Admin Login"
      >
        ➜
      </button>
    </div>
  );
};

export default HomePage;
