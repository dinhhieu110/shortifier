import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              URL Shortifier
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Empowering careers. Connecting talents with top companies.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-2">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/jobs" className="hover:text-blue-600">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="/companies" className="hover:text-blue-600">
                  Companies
                </a>
              </li>
              <li>
                <a href="/apply" className="hover:text-blue-600">
                  Apply Now
                </a>
              </li>
              <li>
                <a href="/post-job" className="hover:text-blue-600">
                  Post a Job
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