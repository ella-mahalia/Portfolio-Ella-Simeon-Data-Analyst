"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiDownload } from "react-icons/hi";

const icons = [
  "/assets/icon-1.svg",
  "/assets/icon-2.svg",
  "/assets/icon-3.svg",
  "/assets/icon-4.svg",
  "/assets/icon-5.svg",
  "/assets/icon-6.svg",
  "/assets/icon-7.svg",
  "/assets/icon-8.svg",
];

export const Hero = () => {
  return (
    <section
      id="home"
      className="hero-stage scroll-mt-24"
      aria-labelledby="hero-title"
    >
      {/* =====================================================
          BACKGROUND DECORATIONS
      ===================================================== */}

      <div
        className="hero-background-glow"
        aria-hidden="true"
      />

      <div
        className="hero-data-circle hero-data-circle-one"
        aria-hidden="true"
      />

      <div
        className="hero-data-circle hero-data-circle-two"
        aria-hidden="true"
      />

      {/* Decorative chart bars */}
      <div
        className="hero-data-bars"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* =====================================================
          LEFT SOCIAL LINKS
      ===================================================== */}

      <motion.div
        className="hero-socials"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
        }}
      >
        <span className="hero-social-line" />

        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Ella's GitHub"
        >
          Github
        </a>

        <span className="hero-social-divider" />

        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Ella's LinkedIn"
        >
          Linkedin
        </a>

        <span className="hero-social-line" />
      </motion.div>

      {/* =====================================================
          MAIN HERO
      ===================================================== */}

      <div className="hero-inner">
        {/* =====================================================
            HERO COPY
        ===================================================== */}

        <motion.div
          className="hero-copy"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {/* Eyebrow */}
          <motion.div
            className="hero-eyebrow"
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
          >
            <span>DATA ANALYST</span>

            <span
              className="hero-eyebrow-dot"
              aria-hidden="true"
            />

            <span>DATA SCIENCE</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            id="hero-title"
            className="hero-title"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            Ella <span>Simeon</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="hero-description"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
          >
            Turning complex data into decisions.
          </motion.p>

          {/* =====================================================
              CTA
          ===================================================== */}

          <motion.div
            className="hero-actions"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.4,
            }}
          >
            <motion.a
              href="#portfolio"
              className="hero-primary"
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <span>View my work</span>

              <HiArrowUpRight
                aria-hidden="true"
              />
            </motion.a>

            <motion.a
              href="/assets/resume.pdf"
              download
              className="hero-secondary"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <span>Download résumé</span>

              <HiDownload
                aria-hidden="true"
              />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* =====================================================
            PORTRAIT
        ===================================================== */}

        <motion.div
          className="hero-visual"
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: "easeOut",
          }}
        >
          <div
            className="hero-portrait-glow"
            aria-hidden="true"
          />

          <div
            className="hero-ring hero-ring-one"
            aria-hidden="true"
          />

          <div
            className="hero-ring hero-ring-two"
            aria-hidden="true"
          />

          <Image
            src="/assets/ella-portrait.png"
            alt="Portrait of Ella Simeon"
            width={1145}
            height={1374}
            className="hero-portrait"
            priority
          />
        </motion.div>
      </div>

      {/* =====================================================
          MOVING TECHNOLOGY RIBBON
      ===================================================== */}

      <motion.div
        className="hero-tech-ribbon"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.65,
        }}
        aria-label="Technology and analytics tools"
      >
        <div className="hero-tech-track">
          {[0, 1].map((copy) => (
            <div
              className="hero-tech-set"
              key={copy}
              aria-hidden={copy === 1}
            >
              {icons.map((icon, index) => (
                <div
                  className="hero-tech-item"
                  key={`${copy}-${icon}`}
                >
                  <Image
                    src={icon}
                    alt={
                      copy === 0
                        ? `Technology tool ${index + 1}`
                        : ""
                    }
                    width={40}
                    height={40}
                    className="hero-tool-icon"
                  />

                  <span
                    className="hero-tech-divider"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.a
        href="#portfolio"
        className="hero-scroll"
        aria-label="Scroll to portfolio"
        initial={{
          opacity: 0,
          y: -5,
        }}
        animate={{
          opacity: 1,
          y: [0, 6, 0],
        }}
        transition={{
          opacity: {
            duration: 0.8,
            delay: 1,
          },

          y: {
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <span />
      </motion.a>
    </section>
  );
};

export default Hero;