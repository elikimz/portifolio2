import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/projects" className="hover:text-blue-400">Projects</a></li>
            <li><a href="/skill" className="hover:text-blue-400">Skills</a></li>
            <li><a href="/blogs" className="hover:text-blue-400">Blogs</a></li>
            <li><a href="/contacts" className="hover:text-blue-400">Contact</a></li>
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
            <a href="https://github.com/elikimz" target="_blank" rel="noopener noreferrer" className="hover:text-white text-2xl">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white text-2xl">
              <FaLinkedin />
            </a>
            <a href="https://x.com/kimzz254" target="_blank" rel="noopener noreferrer" className="hover:text-white text-2xl">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/eli_kimzz/" target="_blank" rel="noopener noreferrer" className="hover:text-white text-2xl">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@kimkimani254" target="_blank" rel="noopener noreferrer" className="hover:text-white text-2xl">
              <FaYoutube />
            </a>
            <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white text-2xl">
              <FaFacebook />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright and Powered By */}
      <div className="text-center text-gray-500 text-sm mt-10">
        &copy; {new Date().getFullYear()} Wairimu Elijah Kimani. All Rights Reserved.
        <span className="block mt-2">Powered by <a href="https://kimtech.site" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Kimtech.site</a></span>
      </div>
    </footer>
  );
};

export default Footer;
