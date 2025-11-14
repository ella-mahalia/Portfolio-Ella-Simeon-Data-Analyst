import React from 'react'
import {
    FaLinkedinIn
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export const Footer = () => {
    // Social Media Links Array
    const socialLinks = [
        { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/ella-mahalia-simeon/" },
    ]

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.2 } },
    };
    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <footer className="py-12 px-4 text-center">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                className="flex justify-center gap-2 md:gap-6 mb-8 ">
                {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                        <motion.a
                            variants={item}
                            whileHover={{ scale: 1.02, rotate: 5 }}
                            whileTap={{ sclae: 0.9 }}
                            href={social.href}
                            key={index}
                            className="p-4 rounded-2xl border border-outer hover:bg-primary/10 transition-all">
                            <IconComponent className="text-xl md:text-2xl text-primary" />
                        </motion.a>
                    );
                })}
            </motion.div>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-semibold text-gradient max-w-3xl mx-auto mb-8">
                © 2025 Ella Simeon | Data Analyst & Developer | Striving to make an impact in the corporate world
            </motion.p>
            <motion.hr
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="border-outer mb-8" />
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 text-md text-content">
                <motion.div variants={item}>
                    <p className="font-semibold">Location</p>
                    <p>Union, NJ</p>
                </motion.div>
                <motion.div variants={item}>
                    <p className="font-semibold">Phone</p>
                    <p>+1 929-444-3355</p>
                </motion.div>
                <motion.div variants={item}>
                    <p className="font-semibold">Email</p>
                    <p>ellamahaliasimeon@gmail.com</p>
                </motion.div>
            </motion.div>
        </footer>
    );
};

