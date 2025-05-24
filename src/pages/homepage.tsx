// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/navbar';
// import Footer from '../components/footer';

// const HomePage: React.FC = () => {
//   const [isArrowVisible, setIsArrowVisible] = useState(false);

//   const handleAdminLogin = () => {
//     window.location.href = '/login'; // Redirect to the login page
//   };

//   useEffect(() => {
//     const handleKeyPress = (event: KeyboardEvent) => {
//       if (event.ctrlKey && event.key === 'a') {
//         setIsArrowVisible(true);
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);

//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//     };
//   }, []);

//   return (
//     <div className="bg-gray-900 text-white">
//       <Navbar />

//       <main className="flex flex-col items-center justify-center min-h-screen">
//         {/* Hero Section */}
//         <section className="text-center mt-20 px-4">
//           <div className="flex flex-col items-center mb-12">
//             <img
//               src="https://i.postimg.cc/K84d5wsg/kim.jpg" // Replace with your logo path
//               alt="Logo"
//               className="w-48 h-48 md:w-64 md:h-64 rounded-full mb-8 animate-slide-in-left"
//             />
//             <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-500 animate-slide-in-left">
//               I'm a Fullstack Software Developer
//             </h1>
//             <p className="text-lg text-green-300 animate-slide-in-right">
//               I'm a passionate developer with a keen interest in creating innovative solutions and contributing to the open-source community.
//             </p>
//           </div>
//         </section>

//         {/* About Me Section */}
//         <section id="about-me" className="py-16 px-6 bg-gray-700 w-full flex flex-col md:flex-row items-center justify-center">
//           <div className="md:w-1/2 p-4 text-center md:text-left order-2 md:order-1">
//             <h2 className="text-3xl font-bold mb-4 text-green-500">About Me</h2>
//             <p className="text-lg text-green-300">
//               I'm Wairimu Elijah Kimani, a Full-Stack Developer passionate about crafting modern, scalable web apps with React, FastAPI, PostgreSQL, and more.
//             </p>
//           </div>
//           <div className="md:w-1/2 p-4 flex justify-center order-1 md:order-2 mb-8 md:mb-0">
//             <img
//               src="https://via.placeholder.com/300" // Replace with your image path
//               alt="Profile"
//               className="w-48 h-48 md:w-64 md:h-64 rounded-full"
//             />
//           </div>
//         </section>

//         {/* Download CV Section */}
//         <section id="download-cv" className="py-16 px-6 bg-gray-800 w-full">
//           <h2 className="text-3xl font-bold mb-6 text-center text-green-500">Download My CV</h2>
//           <p className="max-w-3xl mx-auto text-center text-lg text-green-300">
//             Get a comprehensive overview of my skills, experience, and qualifications. Download my CV to learn more about my professional journey.
//           </p>
//           <div className="mt-8 text-center">
//             <a href="https://drive.google.com/file/d/1J2xtzb_shLyzwSEIKZBx3uTAoPgDbDgf/view?usp=drive_link" className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600" download>
//               Download CV
//             </a>
//           </div>
//         </section>
//       </main>

//       <Footer />

//       {/* Secret Admin Login Arrow */}
//       {isArrowVisible && (
//         <button
//           onClick={handleAdminLogin}
//           className="fixed bottom-4 right-4 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
//           title="Admin Login"
//         >
//           ➜
//         </button>
//       )}

//       {/* Inline Styles for Animations */}
//       <style>
//         {`
//           @keyframes slideInLeft {
//             from {
//               opacity: 0;
//               transform: translateX(-100%);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }

//           @keyframes slideInRight {
//             from {
//               opacity: 0;
//               transform: translateX(100%);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }

//           .animate-slide-in-left {
//             animation: slideInLeft 0.8s ease-out forwards;
//           }

//           .animate-slide-in-right {
//             animation: slideInRight 0.8s ease-out forwards;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default HomePage;




import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const HomePage: React.FC = () => {
  const [isArrowVisible, setIsArrowVisible] = useState(false);

  const handleAdminLogin = () => {
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "a") {
        setIsArrowVisible(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen">
        {/* Hero Section */}
        <section className="text-center mt-20 px-4">
          <div className="flex flex-col items-center mb-12">
            <img
              src="https://i.postimg.cc/K84d5wsg/kim.jpg"
              alt="Logo"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full mb-8 animate-slide-in-left"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-500 animate-slide-in-left">
              I'm a Fullstack Software Developer
            </h1>
            <p className="text-lg text-green-300 animate-slide-in-right">
              I'm a passionate developer with a keen interest in creating
              innovative solutions and contributing to the open-source
              community.
            </p>
          </div>
        </section>

        {/* About Me Section */}
        <section
          id="about-me"
          className="py-16 px-6 bg-gray-700 w-full flex flex-col md:flex-row items-center justify-center"
        >
          <div className="md:w-1/2 p-4 text-center md:text-left order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4 text-green-500">About Me</h2>
            <p className="text-lg text-green-300">
              I'm Wairimu Elijah Kimani, a Full-Stack Developer passionate about
              crafting modern, scalable web apps with React, FastAPI,
              PostgreSQL, and more.
            </p>
          </div>
          <div className="md:w-1/2 p-4 flex justify-center order-1 md:order-2 mb-8 md:mb-0">
            <img
              src="https://via.placeholder.com/300"
              alt="Profile"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full"
            />
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-6 bg-gray-900 w-full text-center">
          <h2 className="text-3xl font-bold text-green-500 mb-10">
            What I Offer
          </h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {/* Service Card */}
            {[
              {
                title: "Full-Stack Web Development",
                description:
                  "Build complete applications using React, FastAPI, PostgreSQL, Tailwind, and more.",
                icon: "💻",
              },
              {
                title: "Custom APIs & Backends",
                description:
                  "Design secure and scalable RESTful APIs with Python, FastAPI, and PostgreSQL.",
                icon: "🔧",
              },
              {
                title: "Responsive UI/UX Design",
                description:
                  "Create elegant, mobile-friendly interfaces with React, Tailwind CSS, and Figma-based design.",
                icon: "🎨",
              },
              {
                title: "Payment Integrations",
                description:
                  "Integrate payment systems like M-Pesa and Stripe into modern web platforms.",
                icon: "💳",
              },
              {
                title: "SaaS & Micro-SaaS Solutions",
                description:
                  "Develop lightweight SaaS tools for businesses or creators, with monetization features.",
                icon: "🚀",
              },
              {
                title: "Deployment & DevOps",
                description:
                  "Deploy and manage apps on platforms like Render, Vercel, Railway, or Azure with CI/CD.",
                icon: "☁️",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl shadow-lg border border-green-500 hover:scale-105 transform transition duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-green-400">
                  {service.title}
                </h3>
                <p className="text-green-200">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Download CV Section */}
        <section id="download-cv" className="py-16 px-6 bg-gray-800 w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-500">
            Download My CV
          </h2>
          <p className="max-w-3xl mx-auto text-center text-lg text-green-300">
            Get a comprehensive overview of my skills, experience, and
            qualifications. Download my CV to learn more about my professional
            journey.
          </p>
          <div className="mt-8 text-center">
            <a
              href="https://drive.google.com/file/d/1J2xtzb_shLyzwSEIKZBx3uTAoPgDbDgf/view?usp=drive_link"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              download
            >
              Download CV
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Secret Admin Login Arrow */}
      {isArrowVisible && (
        <button
          onClick={handleAdminLogin}
          className="fixed bottom-4 right-4 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
          title="Admin Login"
        >
          ➜
        </button>
      )}

      {/* Inline Styles for Animations */}
      <style>
        {`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-slide-in-left {
            animation: slideInLeft 0.8s ease-out forwards;
          }

          .animate-slide-in-right {
            animation: slideInRight 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
