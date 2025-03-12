const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">About Me</h3>
            <p className="text-gray-400">
              I'm Wairimu Elijah Kimani, a Full-Stack Developer passionate about crafting modern, scalable web apps with React, FastAPI, PostgreSQL, and more.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/projects" className="hover:text-blue-400">Projects</a></li>
              <li><a href="/skill" className="hover:text-blue-400">Skills</a></li>
              <li><a href="/blogs" className="hover:text-blue-400">Blogs</a></li>
              <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
  
          {/* Contact & Socials */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Me</h3>
            <p className="text-gray-400 mb-4">Feel free to reach out for collaborations or just to say hi!</p>
            <p className="text-gray-400"><span className="font-bold">Email:</span> elijahkimani1293@gmail.com</p>
            <p className="text-gray-400"><span className="font-bold">Location:</span> Kenya</p>
  
            {/* Social Media Links */}
            <div className="mt-6 flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>
  
        </div>
  
        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-10">
          &copy; {new Date().getFullYear()} Wairimu Elijah Kimani. All Rights Reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  