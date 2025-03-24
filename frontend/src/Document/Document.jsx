import { createContext, useContext, useState } from 'react';
import { ChevronDown, ChevronUp, Search, Github, Menu, X, Moon, Sun } from 'lucide-react';
import { ThemeContext } from "../context/ThemeContext";

export default function Document() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState("introduction");

  const sidebarSections = [
    { id: "introduction", name: "Introduction" },
    { id: "project-overview", name: "Project Overview" },
    { id: "technology-stack", name: "Technology Stack" },
    { id: "installation-setup", name: "Installation & Setup" },
    { id: "how-it-works", name: "How DesignDeck Works" },
    { id: "react-libraries", name: "React Libraries & Components" },
    { id: "api-documentation", name: "API Documentation" },
    { id: "database-schema", name: "Database Schema" },
    { id: "realtime-features", name: "Real-time Features" },
    { id: "security-authentication", name: "Security & Authentication" },
    { id: "deployment-guide", name: "Deployment Guide" },
    { id: "future-enhancements", name: "Future Enhancements" },
    { id: "conclusion", name: "Conclusion" }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  // Dynamic styles based on theme
  const styles = {
    background: theme === 'dark' ? 'bg-black' : 'bg-gray-50',
    text: theme === 'dark' ? 'text-gray-200' : 'text-gray-900',
    secondaryText: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
    card: theme === 'dark' ? 'bg-black border-gray-700' : 'bg-white border-gray-200',
    header: theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    input: theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500' : 'bg-white border-gray-300 focus:ring-blue-500',
    activeSection: theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-700',
    hoverSection: theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
    footer: theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    button: theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700',
    highlightBox: theme === 'dark' ? 'bg-blue-900 border-blue-700 text-blue-300' : 'bg-blue-50 border-blue-500 text-blue-700',
    list: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
    badge: theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
  };

  return (
    <div className={`flex flex-col min-h-screen w-full ${styles.background}`}>
      {/* Header */}
      <header className={`${styles.header} sticky top-0 z-10`}>
        <div
          className={`w-full fixed ${theme === "dark" ? "bg-[#000000f3] text-white" : "bg-[#ffffffc3] text-black"
            }`}
        >
          <div className="flex justify-between items-center p-4 ">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold">
                  DD
                </div>
              </div>
              <div className="ml-3">
                <h1 className={`text-xl font-bold ${styles.text}`}>DesignDeck</h1>
                <p className={`text-sm ${styles.secondaryText}`}>Documentation v1.0</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">

              <button
                onClick={toggleTheme}
                className={styles.secondaryText + " hover:text-gray-700"}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={styles.secondaryText + " hover:text-gray-700"}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.secondaryText}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-20 ${styles.card} p-4 md:hidden`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold ${styles.text}`}>DesignDeck Docs</h2>
            <button onClick={() => setIsMenuOpen(false)} className={styles.secondaryText}>
              <X size={24} />
            </button>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search documentation..."
              className={`w-full px-4 py-2 rounded-lg border ${styles.input}`}
            />
            <div className="absolute right-3 top-2.5 text-gray-400">
              <Search size={18} />
            </div>
          </div>

          <nav>
            <ul className="space-y-2">
              {sidebarSections.map(section => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => {
                      toggleSection(section.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block py-2 px-3 rounded-md ${expandedSection === section.id
                      ? styles.activeSection
                      : `${styles.text} ${styles.hoverSection}`
                      }`}
                  >
                    {section.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-10">
        <div className="flex flex-col md:flex-row w-full">
          {/* Sidebar*/}
          <aside className="hidden md:block w-[20%] mr-8 flex-shrink-0">
            <div className="sticky top-24">

              <nav>
                <ul className="space-y-1">
                  {sidebarSections.map(section => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={`block px-3 py-2 rounded-md ${expandedSection === section.id
                          ? styles.activeSection
                          : `${styles.text} ${styles.hoverSection}`
                          }`}
                        onClick={() => toggleSection(section.id)}
                      >
                        {section.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Documentation Content */}
          <main className={`flex-1 rounded-lg shadow-sm border w-[70%] ${styles.card} p-6 md:p-8 mt-5`}>
            <div id="introduction" className="mb-10 ">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>Introduction</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  DesignDeck is a cutting-edge platform designed for developers, designers, and creative professionals to showcase their work, share code, and engage with a community of like-minded individuals. Similar to Behance but with a developer-centric approach, DesignDeck enables users to create professional profiles, upload and showcase HTML, CSS, and JavaScript code with live previews, share images and videos of their work, and interact with others' projects.
                </p>
                <p className={`${styles.list} mb-4`}>
                  The platform addresses a critical gap in the market: while there are numerous portfolio platforms for designers, few offer the ability to share and preview actual code alongside visual content. DesignDeck bridges this gap by creating a space where both the visual aspects of a project and its underlying code can be appreciated and understood.
                </p>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Purpose and Target Audience</h3>
                <p className={`${styles.list} mb-3`}>DesignDeck aims to:</p>
                <ul className={`list-disc pl-6 mb-4 ${styles.list}`}>
                  <li>Provide an intuitive platform for showcasing both design and development skills</li>
                  <li>Foster a community where designers and developers can learn from each other</li>
                  <li>Enable real-time collaboration and feedback on creative projects</li>
                  <li>Serve as a professional portfolio for job applications and freelance opportunities</li>
                </ul>

                <p className={`${styles.list} mb-3`}>The primary target audience includes:</p>
                <ul className={`list-disc pl-6 mb-4 ${styles.list}`}>
                  <li>Front-end developers showcasing UI/UX implementations</li>
                  <li>Web designers demonstrating responsive designs</li>
                  <li>Creative coders experimenting with JavaScript animations</li>
                  <li>Design agencies looking to hire talent</li>
                  <li>Students and educators sharing learning projects</li>
                </ul>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Unique Features</h3>
                <p className={`${styles.list} mb-3`}>DesignDeck distinguishes itself through several unique features:</p>
                <ul className={`list-disc pl-6 mb-4 ${styles.list}`}>
                  <li><strong>Real-time Code Previews:</strong> Users can see live previews of HTML, CSS, and JavaScript code without leaving the platform</li>
                  <li><strong>Segmented Code Uploads:</strong> Separate sections for HTML, CSS, and JavaScript code enable organized presentation</li>
                  <li><strong>Interactive Content Sharing:</strong> Support for images, videos, and code in a single project</li>
                  <li><strong>Comprehensive Profile Management:</strong> Customizable profiles that showcase skills, experience, and portfolio projects</li>
                  <li><strong>Community Engagement:</strong> Like, comment, and follow functionality for community building</li>
                  <li><strong>Responsive Design:</strong> Optimized viewing experience across devices</li>
                </ul>
              </div>
            </div>

            <div id="project-overview" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>Project Overview</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  DesignDeck reimagines how developers and designers share their work online. The platform operates on a simple premise: create, upload, share, and engage. Here's a high-level overview of how users interact with the platform:
                </p>

                <div className={`${styles.highlightBox} border-l-4 p-4 mb-6`}>
                  <h3 className="text-lg font-medium mb-2">Core Concept</h3>
                  <p>
                    DesignDeck allows creative professionals to showcase their projects with both visual elements and the underlying code, creating a comprehensive presentation of their work.
                  </p>
                </div>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>User Journey</h3>
                <ol className={`list-decimal pl-6 mb-4 ${styles.list} space-y-2`}>
                  <li><strong>Sign Up/Login:</strong> Users create an account using email or Google Authentication</li>
                  <li><strong>Profile Creation:</strong> Users build their professional profile with bio, skills, social links, and profile picture</li>
                  <li><strong>Project Creation:</strong> Users create projects with titles, descriptions, and tags</li>
                  <li><strong>Content Upload:</strong> For each project, users can upload HTML, CSS, and JavaScript code in separate editors, images, and videos</li>
                  <li><strong>Project Sharing:</strong> Published projects become visible to the community</li>
                  <li><strong>Community Interaction:</strong> Other users can view, like, comment, and provide feedback</li>
                </ol>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
                  <div className={`border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4`}>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>For Creators</h4>
                    <ul className={`list-disc pl-5 ${styles.list} text-sm`}>
                      <li>Build professional portfolio</li>
                      <li>Showcase code and visual elements</li>
                      <li>Receive feedback from peers</li>
                      <li>Track project engagement</li>
                      <li>Establish professional presence</li>
                    </ul>
                  </div>
                  <div className={`border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4`}>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>For Viewers</h4>
                    <ul className={`list-disc pl-5 ${styles.list} text-sm`}>
                      <li>Discover inspiring projects</li>
                      <li>Learn from others' code</li>
                      <li>Provide feedback and suggestions</li>
                      <li>Connect with like-minded professionals</li>
                      <li>Find talent for projects or employment</li>
                    </ul>
                  </div>
                </div>

                <p className={styles.list}>
                  The simplicity of DesignDeck's flow makes it accessible to both technical and non-technical users, while its depth provides value to experienced professionals looking to share complex projects.
                </p>
              </div>
            </div>

            {/* Technology Stack section preview */}
            <div id="technology-stack" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>Technology Stack</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  DesignDeck leverages a modern technology stack to provide a seamless, responsive, and feature-rich experience:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className={`${styles.card} shadow-sm rounded-lg border p-4`}>
                    <h3 className={`font-semibold ${styles.text} mb-3`}>Frontend</h3>
                    <ul className={`space-y-2 ${styles.list}`}>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>React.js</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>Tailwind CSS</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>CodeMirror</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>Framer Motion</span>
                      </li>
                    </ul>
                  </div>

                  <div className={`${styles.card} shadow-sm rounded-lg border p-4`}>
                    <h3 className={`font-semibold ${styles.text} mb-3`}>Backend</h3>
                    <ul className={`space-y-2 ${styles.list}`}>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Node.js</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Express.js</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>MongoDB</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Mongoose</span>
                      </li>
                    </ul>
                  </div>

                  <div className={`${styles.card} shadow-sm rounded-lg border p-4`}>
                    <h3 className={`font-semibold ${styles.text} mb-3`}>Authentication & Realtime</h3>
                    <ul className={`space-y-2 ${styles.list}`}>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        <span>JWT</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        <span>Google OAuth 2.0</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        <span>Socket.io</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        <span>Cloudinary</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Deployment Infrastructure</h3>
                <div className="flex flex-wrap mb-6">
                  <span className={`${styles.badge} rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2`}>Vercel (Frontend)</span>
                  <span className={`${styles.badge} rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2`}>Render (Backend)</span>
                  <span className={`${styles.badge} rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2`}>MongoDB Atlas (Database)</span>
                  <span className={`${styles.badge} rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2`}>Cloudinary (Media Storage)</span>
                </div>

                <p className={styles.list}>
                  This technology stack provides DesignDeck with a robust foundation for scalability, performance, and developer experience. Each technology was carefully selected to address specific requirements of the platform.
                </p>
              </div>
            </div>

            {/* Installation & Setup section */}
            <div id="installation-setup" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>Installation & Setup</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  Getting started with DesignDeck is straightforward. Follow these steps to set up the project locally:
                </p>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Prerequisites</h3>
                <ul className={`list-disc pl-6 mb-4 ${styles.list}`}>
                  <li>Node.js (v14.0.0 or higher)</li>
                  <li>npm or yarn</li>
                  <li>MongoDB (local or Atlas)</li>
                  <li>Git</li>
                </ul>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Clone and Install</h3>
                <p className={`${styles.list} mb-4`}>
                  Steps to clone and set up the repository:
                </p>
                <ol className={`list-decimal pl-6 mb-4 ${styles.list} space-y-2`}>
                  <li>Clone the repository</li>
                  <li>Install dependencies for both frontend and backend</li>
                  <li>Configure environment variables</li>
                  <li>Start development servers</li>
                </ol>

                <div className={`${styles.card} p-4 rounded-lg my-4`}>
                  <p className={`${styles.text} mb-2 font-semibold`}>Quick Start Commands:</p>
                  <pre className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded overflow-x-auto text-sm`}>
                    <code className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
                      # Clone repository
                      git clone https://github.com/your-username/designdeck.git
                      cd designdeck

                      # Install dependencies
                      npm install

                      # Set up environment variables
                      cp .env.example .env

                      # Start development server
                      npm run dev
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* How DesignDeck Works */}
            <div id="how-it-works" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>How DesignDeck Works</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  DesignDeck operates through an intuitive workflow designed to make sharing and viewing code projects simple and engaging.
                </p>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Core Architecture</h3>
                <p className={`${styles.list} mb-4`}>
                  DesignDeck follows a modern architectural pattern with distinct layers:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className={`${styles.card} p-4 rounded-lg`}>
                    <h4 className={`font-semibold mb-2 ${styles.text}`}>Presentation Layer</h4>
                    <p className={`text-sm ${styles.list}`}>
                      React components and UI logic that handle user interactions and display data.
                    </p>
                  </div>
                  <div className={`${styles.card} p-4 rounded-lg`}>
                    <h4 className={`font-semibold mb-2 ${styles.text}`}>Application Layer</h4>
                    <p className={`text-sm ${styles.list}`}>
                      Services and business logic that process data and manage application state.
                    </p>
                  </div>
                  <div className={`${styles.card} p-4 rounded-lg`}>
                    <h4 className={`font-semibold mb-2 ${styles.text}`}>Data Layer</h4>
                    <p className={`text-sm ${styles.list}`}>
                      API calls, data models, and database interactions that handle persistence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional sections continue for all sidebar items */}
            <div id="react-libraries" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>React Libraries & Components</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  DesignDeck leverages several React libraries and custom components to enhance functionality and user experience.
                </p>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Key Libraries</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className={`${styles.card} p-3 rounded-lg`}>
                    <h4 className={`font-semibold mb-1 ${styles.text}`}>React Router</h4>
                    <p className={`text-sm ${styles.list}`}>
                      Handles application routing and navigation
                    </p>
                  </div>
                  <div className={`${styles.card} p-3 rounded-lg`}>
                    <h4 className={`font-semibold mb-1 ${styles.text}`}>CodeMirror</h4>
                    <p className={`text-sm ${styles.list}`}>
                      Code editor with syntax highlighting
                    </p>
                  </div>
                  <div className={`${styles.card} p-3 rounded-lg`}>
                    <h4 className={`font-semibold mb-1 ${styles.text}`}>React Query</h4>
                    <p className={`text-sm ${styles.list}`}>
                      Data fetching and state management
                    </p>
                  </div>
                  <div className={`${styles.card} p-3 rounded-lg`}>
                    <h4 className={`font-semibold mb-1 ${styles.text}`}>Framer Motion</h4>
                    <p className={`text-sm ${styles.list}`}>
                      Animations and transitions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="api-documentation" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>API Documentation</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  The DesignDeck API provides programmatic access to projects, users, and interaction data.
                </p>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>API Endpoints</h3>
                <div className={`${styles.card} p-4 rounded-lg mb-4`}>
                  <h4 className={`font-semibold mb-2 ${styles.text}`}>Authentication</h4>
                  <ul className={`space-y-2 ${styles.list}`}>
                    <li><code className={theme === 'dark' ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'}>POST /api/auth/register</code> - Register a new user</li>
                    <li><code className={theme === 'dark' ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'}>POST /api/auth/login</code> - Login user</li>
                    <li><code className={theme === 'dark' ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'}>GET /api/auth/logout</code> - Logout user</li>
                    <li><code className={theme === 'dark' ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'}>GET /api/auth/verify</code> - Verify authentication</li>
                  </ul>
                </div>

                <div className={`${styles.card} p-4 rounded-lg mb-4`}>
                  <h4 className={`font-semibold mb-2 ${styles.text}`}>Projects</h4>
                  <ul className={`space-y-2 ${styles.list}`}>
                    <li><code className={theme === 'dark' ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'}>GET /api/projects</code> - List all projects</li>
                    <li><code className={theme === 'dark' ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'}>GET /api/projects/:id</code> - Get project details</li>
                    <li><code className={theme === 'dark' ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'}>POST /api/projects</code> - Create new project</li>
                    <li><code className={theme === 'dark' ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'}>PUT /api/projects/:id</code> - Update project</li>
                    <li><code className={theme === 'dark' ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'}>DELETE /api/projects/:id</code> - Delete project</li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="database-schema" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>Database Schema</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  DesignDeck uses MongoDB with Mongoose for data modeling and storage. Below are the primary data models:
                </p>

                <div className={`${styles.card} p-4 rounded-lg mb-4`}>
                  <h4 className={`font-semibold mb-2 ${styles.text}`}>User Schema</h4>
                  <pre className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded overflow-x-auto text-sm`}>
                    <code className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
                      {`{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  bio: { type: String, default: '' },
  skills: [{ type: String }],
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    website: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now }
}`}
                    </code>
                  </pre>
                </div>

                <div className={`${styles.card} p-4 rounded-lg mb-4`}>
                  <h4 className={`font-semibold mb-2 ${styles.text}`}>Project Schema</h4>
                  <pre className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded overflow-x-auto text-sm`}>
                    <code className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
                      {`{
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  htmlCode: { type: String, default: '' },
  cssCode: { type: String, default: '' },
  jsCode: { type: String, default: '' },
  images: [{ type: String }],
  videoUrl: { type: String, default: '' },
  tags: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div id="realtime-features" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>Real-time Features</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  DesignDeck utilizes Socket.io to implement real-time features that enhance user engagement and collaboration.
                </p>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Real-time Functionality</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className={`${styles.card} p-4 rounded-lg`}>
                    <h4 className={`font-semibold mb-2 ${styles.text}`}>Live Comments</h4>
                    <p className={`${styles.list} text-sm`}>
                      Users receive new comments on their projects without refreshing the page. Comments appear instantly and include user information.
                    </p>
                  </div>
                  <div className={`${styles.card} p-4 rounded-lg`}>
                    <h4 className={`font-semibold mb-2 ${styles.text}`}>Notification System</h4>
                    <p className={`${styles.list} text-sm`}>
                      Real-time notifications for likes, comments, follows, and mentions keep users engaged with platform activity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="security-authentication" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>Security & Authentication</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  DesignDeck implements robust security measures to protect user data and ensure secure authentication.
                </p>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Authentication Methods</h3>
                <ul className={`list-disc pl-6 mb-4 ${styles.list}`}>
                  <li><strong>JWT Authentication:</strong> Securely transmit user identity between client and server</li>
                  <li><strong>Google OAuth 2.0:</strong> Simplified sign-in with Google credentials</li>
                  <li><strong>Password Hashing:</strong> Bcrypt for secure password storage</li>
                </ul>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Security Features</h3>
                <ul className={`list-disc pl-6 mb-4 ${styles.list}`}>
                  <li><strong>CORS Protection:</strong> Configured to prevent unauthorized cross-origin requests</li>
                  <li><strong>Rate Limiting:</strong> Prevents brute force attacks and API abuse</li>
                  <li><strong>Input Validation:</strong> Server-side validation for all user inputs</li>
                  <li><strong>XSS Protection:</strong> Content sanitization for user-generated content</li>
                </ul>
              </div>
            </div>

            <div id="deployment-guide" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>Deployment Guide</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  DesignDeck is configured for easy deployment to modern cloud platforms. Follow these steps to deploy your instance:
                </p>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Frontend Deployment (Vercel)</h3>
                <ol className={`list-decimal pl-6 mb-4 ${styles.list} space-y-2`}>
                  <li>Connect your GitHub repository to Vercel</li>
                  <li>Configure environment variables</li>
                  <li>Deploy from the Vercel dashboard</li>
                </ol>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Backend Deployment (Render)</h3>
                <ol className={`list-decimal pl-6 mb-4 ${styles.list} space-y-2`}>
                  <li>Create a new Web Service on Render</li>
                  <li>Connect your GitHub repository</li>
                  <li>Set build command and start command</li>
                  <li>Configure environment variables</li>
                </ol>

                <div className={`${styles.highlightBox} p-4 rounded-lg mb-4`}>
                  <h4 className="font-semibold mb-2">Production Considerations</h4>
                  <ul className={`list-disc pl-5 ${styles.list} text-sm`}>
                    <li>Set NODE_ENV to "production"</li>
                    <li>Configure proper CORS settings</li>
                    <li>Set up database connection pooling</li>
                    <li>Implement CDN for static assets</li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="future-enhancements" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>Future Enhancements</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  The DesignDeck roadmap includes several planned enhancements to expand functionality and improve user experience:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className={`${styles.card} p-4 rounded-lg`}>
                    <h4 className={`font-semibold mb-2 ${styles.text}`}>Collaborative Editing</h4>
                    <p className={`${styles.list} text-sm`}>
                      Real-time collaborative code editing with multiple users working on the same project simultaneously.
                    </p>
                  </div>
                  <div className={`${styles.card} p-4 rounded-lg`}>
                    <h4 className={`font-semibold mb-2 ${styles.text}`}>Advanced Analytics</h4>
                    <p className={`${styles.list} text-sm`}>
                      Detailed project analytics including viewer demographics, engagement metrics, and conversion tracking.
                    </p>
                  </div>
                  <div className={`${styles.card} p-4 rounded-lg`}>
                    <h4 className={`font-semibold mb-2 ${styles.text}`}>AI-Powered Suggestions</h4>
                    <p className={`${styles.list} text-sm`}>
                      Code and design suggestions using machine learning models trained on high-quality projects.
                    </p>
                  </div>
                </div>

                <h3 className={`text-xl font-semibold ${styles.text} mt-6 mb-3`}>Feature Voting</h3>
                <p className={`${styles.list} mb-4`}>
                  Users can vote on upcoming features in the community section. Current top-voted features include:
                </p>
                <ol className={`list-decimal pl-6 mb-4 ${styles.list} space-y-2`}>
                  <li>Project forking and version control</li>
                  <li>Team collaboration and shared projects</li>
                  <li>Integration with design tools (Figma, Sketch)</li>
                  <li>Custom domain support for portfolios</li>
                </ol>
              </div>
            </div>

            <div id="conclusion" className="mb-10">
              <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>Conclusion</h2>
              <div className="prose max-w-none">
                <p className={`${styles.list} mb-4`}>
                  DesignDeck represents a significant step forward in how developers and designers showcase their work. By combining code sharing, visual elements, and community engagement, it creates a unique platform for creative professionals to demonstrate their skills and receive valuable feedback.
                </p>

                <p className={`${styles.list} mb-4`}>
                  As the platform evolves, our focus remains on creating an intuitive, powerful, and inclusive space for all types of creative coders and designers. We welcome contributions from the community and look forward to seeing how DesignDeck shapes the future of portfolio sharing.
                </p>

                <div className={`${styles.highlightBox} p-4 rounded-lg mb-4`}>
                  <h4 className="font-semibold mb-2">Get Involved</h4>
                  <p className="mb-2">
                    Join the DesignDeck community by:
                  </p>
                  <ul className={`list-disc pl-5 mb-2 ${styles.list} text-sm`}>
                    <li>Contributing to the open-source codebase</li>
                    <li>Reporting bugs and suggesting features</li>
                    <li>Creating tutorials and documentation</li>
                    <li>Sharing your projects on the platform</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pt-6 mt-6`}>
              <p className={`${styles.secondaryText} text-sm`}>
                Documentation last updated: March 24, 2025
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
