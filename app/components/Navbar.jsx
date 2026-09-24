"use client";

import { useEffect, useState } from "react";
import {
  PiMoonStarsFill,
  PiSunFill,
} from "react-icons/pi";
import {
  RiMenu4Line,
  RiCloseLine,
} from "react-icons/ri";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");

  const navLinks = [
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Work",
      href: "#portfolio",
    },
    {
      name: "Resume",
      href: "#resume",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  /* ======================================================
      THEME + SCROLL
  ====================================================== */

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("ella-theme");

    const startingTheme =
      savedTheme === "light" ? "light" : "dark";

    setTheme(startingTheme);

    document.documentElement.dataset.theme = startingTheme;
    document.documentElement.style.colorScheme = startingTheme;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ======================================================
      THEME TOGGLE
  ====================================================== */

  const toggleTheme = () => {
    const newTheme =
      theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    document.documentElement.dataset.theme = newTheme;
    document.documentElement.style.colorScheme = newTheme;

    window.localStorage.setItem(
      "ella-theme",
      newTheme
    );
  };

  /* ======================================================
      MOBILE MENU
  ====================================================== */

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{
        y: -40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.65,
        ease: "easeOut",
      }}
      className={`site-header ${
        isScrolled
          ? "site-header-scrolled"
          : ""
      }`}
    >
      <nav
        className="site-nav"
        aria-label="Main navigation"
      >
        {/* ==================================================
            LOGO
        ================================================== */}

        <motion.a
          href="#home"
          className="site-logo"
          onClick={closeMenu}
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          whileHover={{
            y: -2,
          }}
        >
          Ella<span>.</span>
        </motion.a>

        {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <motion.div
          className="site-links"
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{
                opacity: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.25 + index * 0.07,
              }}
              whileHover={{
                y: -2,
              }}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* ==================================================
            RIGHT CONTROLS
        ================================================== */}

        <motion.div
          className="site-controls"
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
        >
          {/* Theme toggle */}
          <motion.button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{
              rotate: 8,
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            aria-label={`Switch to ${
              theme === "dark"
                ? "light"
                : "dark"
            } mode`}
            title={`Switch to ${
              theme === "dark"
                ? "light"
                : "dark"
            } mode`}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {theme === "dark" ? (
                <motion.span
                  key="sun"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.6,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.6,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <PiSunFill />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.6,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.6,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <PiMoonStarsFill />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile menu toggle */}
          <motion.button
            type="button"
            className="site-menu-toggle"
            onClick={toggleMenu}
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            aria-label={
              isMenuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {isMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <RiCloseLine />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <RiMenu4Line />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </nav>

      {/* ======================================================
          MOBILE NAVIGATION
      ====================================================== */}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            className="site-mobile-links"
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <motion.a
              href="#home"
              onClick={closeMenu}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
            >
              Home
            </motion.a>

            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.25,
                  delay: (index + 1) * 0.05,
                }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;