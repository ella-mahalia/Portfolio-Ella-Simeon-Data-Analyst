"use client";

import React, { useEffect, useRef, useState } from "react";
import { PiStarFourFill } from "react-icons/pi";
import {
  HiArrowLeft,
  HiArrowRight,
  HiArrowUpRight,
  HiLockClosed,
} from "react-icons/hi2";
import { motion } from "framer-motion";

export const Portfolio = () => {
  const projects = [
    {
      id: 5,
      title: "Airline Analytics: Booking & Route Forecasting",
      image: "/assets/airline-analytics-cover.png",
      tags: ["A/B Testing", "Forecasting", "Python", "Power BI"],
      link: "/airline_analytics-case-study/index.html",
    },
    {
      id: 1,
      title: "House Prediction ML Model",
      image: "/assets/project-1.png",
      tags: ["Machine Learning", "Regression Analysis"],
      link: "https://ellamahalia.pythonanywhere.com/house_price_prediction",
    },
    {
      id: 2,
      title: "Package Locker Utilization Dashboard",
      image: "/assets/project-2.png",
      tags: [
        "Data Analytics",
        "Power BI",
        "SQL",
        "ETL",
        "Dashboard Design",
      ],
    },
    {
      id: 3,
      title: "Loyalty Program Impact Analysis",
      image: "/assets/project-3.png",
      tags: [
        "Data Analytics",
        "Customer Segmentation",
        "A/B Testing",
        "Power BI",
      ],
    },
    {
      id: 4,
      title: "Heart Attack Classification Model",
      image: "/assets/project-4.png",
      tags: ["Machine Learning", "Python", "Data Science"],
      link: "https://ellamahalia.pythonanywhere.com/heart_attack",
    },
    {
      id: 6,
      title: "Subway Ridership Forecast & Station Trends",
      image: "/subway-ridership-forecast/cover.png",
      tags: [
        "Public MTA Data",
        "Time Series",
        "Forecasting",
        "Python",
      ],
      link: "/subway-ridership-forecast/index.html",
    },
  ];

  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ======================================================
      GET CARD WIDTH + GAP
  ====================================================== */

  const getScrollAmount = () => {
    const track = trackRef.current;

    if (!track) return 0;

    const card = track.querySelector(".portfolio-slider-card");

    if (!card) return 0;

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);

    return card.offsetWidth + gap;
  };

  /* ======================================================
      ARROW CONTROLS
  ====================================================== */

  const scrollProjects = (direction) => {
    const track = trackRef.current;

    if (!track) return;

    const amount = getScrollAmount();

    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  /* ======================================================
      UPDATE ACTIVE PROJECT
  ====================================================== */

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const handleScroll = () => {
      const amount = getScrollAmount();

      if (!amount) return;

      const index = Math.round(track.scrollLeft / amount);

      setActiveIndex(
        Math.max(
          0,
          Math.min(index, projects.length - 1)
        )
      );
    };

    track.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [projects.length]);

  const progress =
    ((activeIndex + 1) / projects.length) * 100;

  return (
    <section
      id="portfolio"
      className="portfolio-slider-section"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        className="portfolio-slider-header"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.65,
        }}
      >
        <div className="portfolio-slider-heading-wrap">
          {/* Keep your current Portfolio badge */}
          <p className="portfolio-slider-badge">
            <PiStarFourFill />
            Portfolio
          </p>

          {/* Keep your current wording */}
          <h2 className="portfolio-slider-title">
             Check out my featured projects
          </h2>
        </div>

        {/* Carousel arrows */}
        <div className="portfolio-slider-controls">
          <button
            type="button"
            className="portfolio-slider-arrow portfolio-slider-arrow-prev"
            onClick={() => scrollProjects("prev")}
            aria-label="Previous project"
          >
            <HiArrowLeft />
          </button>

          <button
            type="button"
            className="portfolio-slider-arrow portfolio-slider-arrow-next"
            onClick={() => scrollProjects("next")}
            aria-label="Next project"
          >
            <HiArrowRight />
          </button>
        </div>
      </motion.div>

      {/* =====================================================
          PROJECT CAROUSEL
      ===================================================== */}

      <motion.div
        ref={trackRef}
        className="portfolio-slider-track"
        initial={{
          opacity: 0,
          y: 35,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.7,
          delay: 0.08,
        }}
      >
        {projects.map((project) => (
          <motion.article
            key={project.id}
            className="portfolio-slider-card"
            whileHover={{
              y: -6,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {/* ===============================
                PROJECT IMAGE
            =============================== */}

            <div className="portfolio-slider-image-wrap">
              <img
                src={project.image}
                alt={project.title}
                className="portfolio-slider-image"
              />

              <div
                className="portfolio-slider-image-shade"
                aria-hidden="true"
              />
            </div>

            {/* ===============================
                GLASS CONTENT PANEL
            =============================== */}

            <div className="portfolio-slider-info">
              {/* Tags */}

              <div className="portfolio-slider-tags">
                {project.tags.map((tagText) => (
                  <span
                    key={tagText}
                    className="portfolio-slider-tag"
                  >
                    {tagText}
                  </span>
                ))}
              </div>

              {/* Bottom title / link */}

              <div className="portfolio-slider-card-bottom">
                <h3 className="portfolio-slider-card-title">
                  {project.title}
                </h3>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-slider-project-link"
                    aria-label={`View ${project.title}`}
                    title="View project"
                  >
                    <HiArrowUpRight />
                  </a>
                ) : (
                  <div
                    className="portfolio-slider-project-link portfolio-slider-project-private"
                    title="Private project (company-owned)"
                    aria-label="Private project"
                  >
                    <HiLockClosed />
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* =====================================================
          COUNTER + PROGRESS
      ===================================================== */}

      <motion.div
        className="portfolio-slider-progress-row"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
          delay: 0.2,
        }}
      >
        <div className="portfolio-slider-count">
          <span className="portfolio-slider-current">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>

          <span className="portfolio-slider-slash">
            /
          </span>

          <span className="portfolio-slider-total">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="portfolio-slider-progress">
          <div
            className="portfolio-slider-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Portfolio;