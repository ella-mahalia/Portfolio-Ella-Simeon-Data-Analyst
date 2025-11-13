import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiOutlineViewGrid, HiDownload } from 'react-icons/hi';

export const Hero = () => {

    // Icons array
    const icons = [
        "/assets/icon-1.svg",
        "/assets/icon-2.svg",
        "/assets/icon-3.svg",
        "/assets/icon-4.svg",
        "/assets/icon-5.svg",
        "/assets/icon-6.svg",
        "assets/icon-7.svg",
        "assets/icon-8.svg",
    ];
    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildern: 0.1
            },
        },
    };
    const item = {
        hidden: { opacity: 1, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };
    return (
        <section id="home" className="scroll-mt-24">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-2xl m-auto flex flex-col items-center justify-center text-center pt-24 md:pt-36 px-4 md:px-0 pb-8 overflow-hidden">
                {/* Profile Image */}
                <motion.div variants={item}>
                    <Image
                        src="/assets/profile.jpg"
                        width={150}
                        height={150}
                        className="rounded-full mb-4"
                        priority
                        alt="Profile Image"
                    />
                </motion.div>
                {/* Name */}
                <motion.h3
                    variants={item}
                    className="text-lg md:text-xl font-semibold flex items-center justify-center gap-2"
                >
                    I'm Ella Simeon <span className="inline-block">ꨄ︎</span>
                </motion.h3>
                {/* Title */}
                <motion.h1
                    variants={{ item }}
                    className="text-3xl md:text-5xl font-semibold mt-2 leading-tight"
                >
                    full stack developer <br className="md-hidden" /> & alumni.
                </motion.h1>
                {/* Icons Swipe */}
                <motion.div
                    variants={item}
                    className="relative my-6 md:my-8 w-full mask-r-from 50% mask-l-from-50% overflow-hidden"
                >
                    <motion.div
                        className="flex gap-4 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 15,
                            ease: "linear",
                        }}
                    >
                        {/* Icons Loop*/}
                        {icons.concat(icons).map((icon, index) => (
                            <Image
                                src={icon}
                                key={index}
                                alt={`icon ${index + 1}`}
                                width={40}
                                height={40}
                                className="md:w-[50px] md:h-[50px]"
                            />
                        ))}
                    </motion.div>
                </motion.div>
                {/* Buttons */}
                <motion.div
                    variants={item}
                    className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"
                >
                    <a href="#portfolio" className="bg-blue-900 text-white w-full md:w-auto py-4 px-8 rounded-full font-semibold flex items-center justify-center gap-2 border border-blue-900 hover:bg-blue-950 hover:shadow-lg hover:shadow-blue-800/40 transition-all duration-300">
                        My Work <HiOutlineViewGrid className="text-lg" />
                    </a>
                    <a href="/assets/resume.pdf" download className="w-full md:w-auto py-3 px-8 rounded-full font-semibold border border-content/20 hover:border-content/40 hover:shadow-sm transition-colors duration-300 flex items-center justify-center gap-2">
                        My Resume <HiDownload className="text-lg" />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

