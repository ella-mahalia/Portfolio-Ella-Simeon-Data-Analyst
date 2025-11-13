import React, { useState } from 'react';
import { PiStarFourFill } from 'react-icons/pi';
import { FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const Contact = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");

        const formData = new FormData(event.target);
        formData.append("access_key", "0bb9525f-d0f6-4c1c-9e7d-e24d1d2535b5");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Message sent successfully!");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.2 } },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
    return (
        <section className="mt-12" id="contact">
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center">
                <p className="text-content font-semibold inline-flex items-center gap-1 border-1 border-outer py-1.5 px-3 rounded-2xl mb-4">
                    <PiStarFourFill className="text-lg" />
                    Contact
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-900 text-transparent bg-clip-text">
                    Feel free to contact <br /> me!
                </h2>
            </motion.div>
            {/* Contact Form */}
            <motion.form
                variants={container}
                initial="hidden"
                whileInView="show"
                onSubmit={onSubmit}
                className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 text-xl font-semibold"
            >
                {/* Left Side */}
                <div className="flex flex-col space-y-6">
                    <motion.input
                        variants={item}
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="name" id=""
                        placeholder="Your Name*"
                        className="border-b-2 border-outer bg-transparent focus:outline-none focus:border-primary py-3"
                        required
                    />
                    <motion.input
                        variants={item}
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        name="email" id=""
                        placeholder="Email Address*"
                        className="border-b-2 border-outer bg-transparent focus:outline-none focus:border-primary py-3"
                        required
                    />
                </div>
                {/* Right Side */}
                <div className="flex flex-col space-y-6">
                    <motion.input
                        variants={item}
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="Company Name" id=""
                        placeholder="Company Name*"
                        className="border-b-2 border-outer bg-transparent focus:outline-none focus:border-primary py-3"
                        required
                    />
                    <motion.input
                        variants={item}
                        whileFocus={{ scale: 1.02 }}
                        type="tel"
                        name="Phone" id=""
                        placeholder="Phone Number*"
                        className="border-b-2 border-outer bg-transparent focus:outline-none focus:border-primary py-3"
                        required
                    />
                </div>
                {/* Text Area */}
                <div className="md:col-span-2">
                    <motion.textarea
                        variants={item}
                        whileFocus={{ scale: 1.02 }}
                        name="message"
                        id=""
                        placeholder="A Few Words*"
                        className="w-full border-b-2 border-outer bg-transparent focus:outline-none focus:border-primary py-2 h-24 resize-none"
                        required
                    ></motion.textarea>
                </div>
                {/* Button */}
                <div className="md:col-span-2">
                    <motion.button
                        variants={item}
                        whileFocus={{ scale: 1.02 }}
                        type="submit"
                        className="mt-6 custom-gradient text-white text-[1rem] font-semibold py-3 px-6 rounded-2xl flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
                        Send Message<FaPaperPlane />
                    </motion.button>
                </div>
                <span>{result}</span>
            </motion.form>
        </section>
    );
};


