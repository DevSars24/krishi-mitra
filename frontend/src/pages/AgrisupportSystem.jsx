// src/pages/AgrisupportSystem.jsx
function AgrisupportSystem() {
    const sections = [
      {
        title: "Drone Technology",
        description:
          "Startups using drones for precision farming, crop monitoring, pesticide spraying, and yield estimation.",
        link: "https://www.startupindia.gov.in/",
      },
      {
        title: "Smart Irrigation",
        description:
          "IoT & AI-powered irrigation systems to optimize water use and increase crop yield sustainably.",
        link: "https://www.startupindia.gov.in/",
      },
      {
        title: "Supply Chain & Logistics",
        description:
          "Agri-tech startups simplifying logistics, cold storage, and connecting farmers directly with markets.",
        link: "https://www.startupindia.gov.in/",
      },
      {
        title: "Digital Platforms",
        description:
          "Mobile & web platforms providing farmers with advisory, crop prices, and online marketplaces.",
        link: "https://www.startupindia.gov.in/",
      },
      {
        title: "Agri FinTech",
        description:
          "Startups providing farmers with digital loans, credit, insurance, and financial literacy.",
        link: "https://www.startupindia.gov.in/",
      },
      {
        title: "Agri AI & Data Analytics",
        description:
          "AI-driven startups analyzing soil, weather & satellite data for better crop decisions.",
        link: "https://www.startupindia.gov.in/",
      },
      {
        title: "Organic & Sustainable Tech",
        description:
          "Green startups promoting organic farming, bio-fertilizers, and sustainable agriculture solutions.",
        link: "https://www.startupindia.gov.in/",
      },
      {
        title: "Agri Robotics",
        description:
          "Robotics startups working on automated harvesting, weeding, and precision agriculture.",
        link: "https://www.startupindia.gov.in/",
      },
    ];
  
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-emerald-900 to-green-800"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_#ffffff33,_transparent_70%)]"></div>
  
        {/* Content */}
        <div className="relative z-10 p-10">
          <h1 className="text-4xl font-extrabold text-white text-center mb-12 drop-shadow-md">
            Agri-tech Startup Support 🚀🌱
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-green-950/80 backdrop-blur-md rounded-2xl shadow-xl p-10 
                           hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                           flex flex-col justify-between h-72"
              >
                <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-200 flex-grow">{section.description}</p>
                <a
                  href={section.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-green-900 font-semibold bg-emerald-300 px-5 py-3 rounded-lg 
                             hover:bg-emerald-400 transition text-center"
                >
                  Visit →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default AgrisupportSystem;
  