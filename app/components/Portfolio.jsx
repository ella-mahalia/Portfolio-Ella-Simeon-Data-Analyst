import React from 'react';
import { PiStarFourFill } from 'react-icons/pi';
import { HiArrowUpRight, HiLockClosed } from 'react-icons/hi2';
import { motion } from 'framer-motion';

export const Portfolio = () => {
  // Projects array
  const projects = [
    {
      id: 1,
      title: "House Prediction ML Model",
      image: "assets/project-1.png",
      tags: ["Machine Learning", "Regression Analysis"],
      link: "https://ellamahalia.pythonanywhere.com/house_price_prediction",
    },
    {
      id: 2,
      title: "Package Locker Utilization Dashboard",
      image: "assets/project-2.png",
      tags: ["Data Analytics", "Power BI", "SQL", "ETL", "Dashboard Design"],
      // 🔒 No link (company-owned)
    },
    {
      id: 3,
      title: "Loyalty Program Impact Analysis",
      image: "assets/project-3.png",
      tags: ["Data Analytics", "Customer Segmentation", "A/B Testing", "Power BI"],
      // 🔒 No link (company-owned)
    },
    {
      id: 4,
      title: "Heart Attack Classification Model",
      image: "assets/project-4.png",
      tags: ["Machine Learning", "Python", "Data Science"],
      link: "https://ellamahalia.pythonanywhere.com/heart_attack",
    },
  ];

  // Animation variants
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 60, rotateX: -10 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="my-8" id="portfolio">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-content font-semibold inline-flex items-center gap-1 border border-outer py-1.5 px-3 rounded-2xl mb-4">
          <PiStarFourFill className="text-lg" />
          Portfolio
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-900 text-transparent bg-clip-text">
          Check out my featured <br />
          projects
        </h2>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={card}
            whileHover={{ scale: 1.03, rotateY: 3 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 cursor-pointer"
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden z-0"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 md:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>

            {/* Project Info */}
            <div className="absolute bottom-4 left-4 right-4 p-3 md:p-6 rounded-2xl bg-black/20 backdrop-blur-md border-t border-white/10 z-10">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-wrap gap-2 mb-3"
              >
                {project.tags.map((tagText, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full border border-white/20"
                  >
                    {tagText}
                  </span>
                ))}
              </motion.div>

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Link or Private Indicator */}
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors duration-300 z-20"
                    title="View project"
                  >
                    <HiArrowUpRight className="text-lg" />
                  </a>
                ) : (
                  <div
                    className="flex items-center justify-center w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/50 cursor-not-allowed"
                    title="Private project (company-owned)"
                  >
                    <HiLockClosed className="text-lg opacity-40" />
                  </div>
                )}
              </div>
            </div>

            {/* Hover glow effect (behind everything) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 z-0 pointer-events-none"
            ></motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Portfolio;
