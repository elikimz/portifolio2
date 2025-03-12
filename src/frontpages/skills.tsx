// import React from 'react';
// import { useGetSkillsQuery } from '../features/skillsAPI'; // Adjust the path as necessary
// import Navbar from '../components/navbar';
// import Footer from '../components/footer';

// const Skill: React.FC = () => {
//   const { data: skills, error, isLoading } = useGetSkillsQuery([]);

//   if (isLoading) {
//     return <div className="text-center text-gray-500">Loading skills...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">Error loading skills</div>;
//   }

//   const getProficiencyPercentage = (level: string) => {
//     switch (level.toLowerCase()) {
//       case 'beginner':
//         return 25;
//       case 'intermediate':
//         return 50;
//       case 'advanced':
//         return 75;
//       case 'expert':
//         return 100;
//       default:
//         return 0;
//     }
//   };

//   const getCategoryColor = (category: string) => {
//     switch (category.toLowerCase()) {
//       case 'programming':
//         return 'bg-blue-200 text-blue-800';
//       case 'design':
//         return 'bg-green-200 text-green-800';
//       case 'management':
//         return 'bg-yellow-200 text-yellow-800';
//       case 'marketing':
//         return 'bg-red-200 text-red-800';
//       default:
//         return 'bg-gray-200 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Skills</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {skills?.map((skill) => (
//             <div
//               key={skill.id}
//               className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
//             >
//               <div className="flex items-center mb-4">
//                 {skill.icon_url && (
//                   <img src={skill.icon_url} alt={skill.name} className="w-12 h-12 mr-4 rounded-full" />
//                 )}
//                 <h2 className="text-xl font-semibold text-gray-800">{skill.name}</h2>
//               </div>
//               <p className={`text-gray-600 mb-2 ${getCategoryColor(skill.category)} p-1 rounded`}>
//                 Category: {skill.category}
//               </p>
//               <div className="mb-4">
//                 <p className="text-gray-700 mb-1">Proficiency Level:</p>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
//                   <div
//                     className="bg-blue-600 h-2.5 rounded-full"
//                     style={{ width: `${getProficiencyPercentage(skill.proficiency_level)}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <p className="text-gray-600 mb-4">
//                 Status: <span className={`font-bold ${skill.is_deleted ? 'text-red-500' : 'text-green-500'}`}>
//                   {skill.is_deleted ? 'Deleted' : 'Active'}
//                 </span>
//               </p>
//               <p className="text-gray-500 text-sm">
//                 Created At: {new Date(skill.created_at).toLocaleDateString()}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 Updated At: {new Date(skill.updated_at).toLocaleDateString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Skill;


import React from 'react';
import { useGetSkillsQuery } from '../features/skillsAPI'; // Adjust the path as necessary
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// Define the Skill interface
interface Skill {
  id: number;
  name: string;
  icon_url?: string;
  category: string;
  proficiency_level: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

const Skill: React.FC = () => {
  const { data: skills, error, isLoading } = useGetSkillsQuery([]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading skills...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading skills</div>;
  }

  const getProficiencyPercentage = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 25;
      case 'intermediate':
        return 50;
      case 'advanced':
        return 75;
      case 'expert':
        return 100;
      default:
        return 0;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming':
        return 'bg-blue-200 text-blue-800';
      case 'design':
        return 'bg-green-200 text-green-800';
      case 'management':
        return 'bg-yellow-200 text-yellow-800';
      case 'marketing':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Skills</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills?.map((skill: Skill) => (
            <div
              key={skill.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {skill.icon_url && (
                  <img src={skill.icon_url} alt={skill.name} className="w-12 h-12 mr-4 rounded-full" />
                )}
                <h2 className="text-xl font-semibold text-gray-800">{skill.name}</h2>
              </div>
              <p className={`text-gray-600 mb-2 ${getCategoryColor(skill.category)} p-1 rounded`}>
                Category: {skill.category}
              </p>
              <div className="mb-4">
                <p className="text-gray-700 mb-1">Proficiency Level:</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${getProficiencyPercentage(skill.proficiency_level)}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Status: <span className={`font-bold ${skill.is_deleted ? 'text-red-500' : 'text-green-500'}`}>
                  {skill.is_deleted ? 'Deleted' : 'Active'}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                Created At: {new Date(skill.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm">
                Updated At: {new Date(skill.updated_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Skill;
