import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-[#0186da] text-shadow-md  text-xl font-semibold ">
              URL Shortifier
            </h2>
            <p className="mt-2 text-sm text-gray-500">
  Simplify your links. Share smarter, track better.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-2">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-blue-600">
                Landing
                </a>
              </li>
              <li>
                <a href="/auth" className="hover:text-blue-600">
                Auth
                </a>
              </li>
              <li>
                <a href="/link/:id" className="hover:text-blue-600">
                URL
                </a>
              </li>
              <li>
                <a href="/:id" className="hover:text-blue-600">
                RedirectURL
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-2">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/contact" className="hover:text-blue-600">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-blue-600">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-blue-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-2">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/hieu.trandinh0110"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/trandinhhieu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://github.com/dinhhieu110"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Tran Dinh Hieu (Wilson Tran). All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;