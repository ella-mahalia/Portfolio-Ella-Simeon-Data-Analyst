import React from 'react';
import { PiGraduationCapFill, PiStarFourFill } from 'react-icons/pi';
import { motion } from 'framer-motion';

export const Resume = () => {
    // Education array
    const educationData = [
        {
            year: "2021 - 2025",
            title: "Bachelor's of Business Administration in Computer Information Systems",
            institution: "CUNY Baruch, Zicklin School of Business",
            description: "Focused on the intersection of business and technology, with coursework in data analysis, information systems, and project management.",
        },
        {
            year: "2025 - Present",
            title: "Masters in Data Science - Computational Track",
            institution: "New Jersey Institute of Technology",
            description: "Emphasizing advanced computational techniques, machine learning, and big data analytics to solve complex problems in various domains.",
        },
    ];

    // Work data array
    const workData = [
        {
            year: "January 2024 - August 2025",
            title: "Data Analyst",
            company: "New York Department of Transportation",
            description: "Designed and deployed interactive Power BI dashboards to track package locker usage, identifying peak hours, pickup durations, and borough-level trends. Developed custom DAX measures and optimized ETL workflows integrating data from multiple sources, including SOAP APIs, ensuring data accuracy and actionable insights. Implemented SQL upsert functions and managed Power BI Online datasets to improve query performance and streamline cross-team data accessibility."
        },
    ];

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.2 } },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="mt-12 pb-8" id="resume">
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
                    Resume
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-900 text-transparent bg-clip-text">
                    Education and Work Experience
                </h2>
            </motion.div>

            {/* Timeline Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Education */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <h3 className="text-xl md:text-2xl font-bold text-content mb-8">
                        My Education
                    </h3>
                    <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 custom-gradient opacity-60"></div>
                        <div>
                            {educationData.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    variants={item}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 120 }}
                                    className="relative flex items-start space-x-6 pb-8 cursor-pointer"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 custom-gradient rounded-full flex items-center justify-center">
                                            <PiGraduationCapFill className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                                {edu.year}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-content">{edu.title}</h4>
                                        <p className="text-gray-600 mb-2">{edu.institution}</p>
                                        <p className="text-gray-800 text-md">{edu.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Work Experience */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <h3 className="text-xl md:text-2xl font-bold text-content mb-8">
                        Work Experience
                    </h3>
                    <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 custom-gradient opacity-60"></div>
                        <div>
                            {workData.map((work, index) => (
                                <motion.div
                                    key={index}
                                    variants={item}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 120 }}
                                    className="relative flex items-start space-x-6 pb-8 cursor-pointer"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 custom-gradient rounded-full flex items-center justify-center">
                                            <PiGraduationCapFill className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                                {work.year}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-content">{work.title}</h4>
                                        <p className="text-gray-600 mb-2">{work.company}</p>
                                        <p className="text-gray-800 text-md">{work.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Resume;
