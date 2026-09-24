import React from 'react';
import { PiStarFourFill } from 'react-icons/pi';
import { HiDownload } from 'react-icons/hi';
import { motion } from 'framer-motion';

export const About = () => {
    // Animation Variants
    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.2 } },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="mt-12 pb-8" id="about">
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
                    About
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-900 text-transparent bg-clip-text">
                    Turning data into direction <br /> and innovation.
                </h2>
            </motion.div>

            {/* About data */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
                {/* Card 1 */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-outer"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-3">
                        Analytics & BI
                    </h3>
                    <p className="text-gray-700 font-medium text-base">Power BI • SQL • Python</p>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-outer"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-3">
                        Statistics & ML
                    </h3>
                    <p className="text-gray-700 font-medium text-base">Experimentation • Predictive Modeling</p>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-outer"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-3">
                        Real-World Impact
                    </h3>
                    <p className="text-gray-700 font-medium text-base">MTA • NYC DOT Projects</p>
                </motion.div>
            </motion.div>

            {/* Content text */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
            >
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-gray-600 text-lg leading-relaxed"
                    >
                        I’m Ella Simeon, a data analyst with experience turning complex data
                        into dashboards and insights that support better decisions. At the MTA,
                        I build Power BI reports that help IT leaders and managers monitor
                        workloads, spot trends, and identify items needing attention. Previously,
                        at the NYC Department of Transportation, I developed dashboards and
                        improved data workflows for operational reporting.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="text-gray-600 text-lg leading-relaxed"
                    >
                        I’m currently pursuing a master’s in data science at NJIT, where I’m
                        building on my experience in analytics through statistics and machine
                        learning. I’m interested in roles where I can investigate business
                        questions, develop useful models, and communicate findings that help
                        teams make better decisions.
                    </motion.p>

                    {/* Download Button */}
                    <motion.a
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        viewport={{ once: true }}
                        href="/assets/resume.pdf"
                        download
                        className="py-3 px-8 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity duration-300 w-max bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900"
                    >
                        Download Resume
                        <HiDownload className="text-lg" />
                    </motion.a>
                </div>

                {/* Right Column */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="lg:col-span-1 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-500 text-sm font-medium mb-1">Name</p>
                        <p className="text-gray-800 text-xl font-semibold">Ella Simeon</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-500 text-sm font-medium mb-1">Phone</p>
                        <p className="text-gray-800 text-xl font-semibold">+1 929-444-3355</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-500 text-sm font-medium mb-1">Email</p>
                        <p className="text-gray-800 text-xl font-semibold">
                            ellamahaliasimeon@gmail.com
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-500 text-sm font-medium mb-1">Location</p>
                        <p className="text-gray-800 text-xl font-semibold">Union, NJ</p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

