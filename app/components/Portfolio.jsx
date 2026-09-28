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
    id: 1,
    title: "Airline Analytics: Booking & Route Forecasting",
    image: "/assets/airline-analytics-cover.png",
    imagePosition: "center 20%",
    tags: [
      "A/B Testing",
      "Forecasting",
      "Python",
      "Power BI",
    ],
    link: "/airline_analytics-case-study/index.html",
  },

  {
    id: 2,
    title: "Retail Demand Forecasting & Store Performance",
    image: "/assets/project-7.png",
    imagePosition: "center 30%",
    tags: [
      "Time Series",
      "Forecasting",
      "Python",
      "SQL",
      "Data Visualization",
    ],
    link: "/retail-demand-forecast/index.html",
  },

  {
  id: 3,
  title: "Customer Churn Prediction & Retention Modeling",
  image: "/assets/customer-churn.png",
  imagePosition: "center center",
  tags: [
    "Machine Learning",
    "Classification",
    "Python",
    "scikit-learn",
  ],
  link: "https://customer-churn-retention-model.vercel.app/",
  },

  {
    id: 4,
    title: "Subway Ridership Forecast & Station Trends",
    image: "/subway-ridership-forecast/cover.png",
    imagePosition: "center center",
    tags: [
      "Public MTA Data",
      "Time Series",
      "Forecasting",
      "Python",
    ],
    link: "/subway-ridership-forecast/index.html",
  },

  {
    id: 5,
    title: "Package Locker Utilization Dashboard",
    image: "/assets/project-2.png",
    imagePosition: "center center",
    tags: [
      "Data Analytics",
      "Power BI",
      "SQL",
      "ETL",
      "Dashboard Design",
    ],
  },

  {
    id: 6,
    title: "Loyalty Program Impact Analysis",
    image: "/assets/project-3.png",
    imagePosition: "center 20%",
    tags: [
      "Data Analytics",
      "Customer Segmentation",
      "A/B Testing",
      "Power BI",
    ],
  },
];

  const trackRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(2);

  /* ======================================================
     RESPONSIVE CARDS PER PAGE
  ====================================================== */

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(1);
      } else {
        setCardsPerPage(2);
      }
    };

    updateCardsPerPage();

    window.addEventListener("resize", updateCardsPerPage);

    return () => {
      window.removeEventListener("resize", updateCardsPerPage);
    };
  }, []);

  const totalPages = Math.ceil(
    projects.length / cardsPerPage
  );

  /* ======================================================
     GET ONE CARD WIDTH + GAP
  ====================================================== */

  const getCardStep = () => {
    const track = trackRef.current;

    if (!track) return 0;

    const card = track.querySelector(
      ".portfolio-slider-card"
    );

    if (!card) return 0;

    const styles =
      window.getComputedStyle(track);

    const gap = parseFloat(
      styles.columnGap ||
        styles.gap ||
        "0"
    );

    return card.offsetWidth + gap;
  };

  /* ======================================================
     SCROLL TO PAGE
  ====================================================== */

  const scrollToPage = (page) => {
    const track = trackRef.current;

    if (!track) return;

    const cardStep = getCardStep();

    if (!cardStep) return;

    const safePage = Math.max(
      0,
      Math.min(page, totalPages - 1)
    );

    track.scrollTo({
      left:
        safePage *
        cardsPerPage *
        cardStep,

      behavior: "smooth",
    });

    setCurrentPage(safePage);
  };

  /* ======================================================
     ARROW CONTROLS
  ====================================================== */

  const scrollProjects = (direction) => {
    if (direction === "next") {
      scrollToPage(currentPage + 1);
    } else {
      scrollToPage(currentPage - 1);
    }
  };

  /* ======================================================
     UPDATE PAGE WHEN USER SCROLLS
  ====================================================== */

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const handleScroll = () => {
      const cardStep = getCardStep();

      if (!cardStep) return;

      const pageWidth =
        cardStep * cardsPerPage;

      const page = Math.round(
        track.scrollLeft / pageWidth
      );

      setCurrentPage(
        Math.max(
          0,
          Math.min(
            page,
            totalPages - 1
          )
        )
      );
    };

    track.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      track.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [
    cardsPerPage,
    totalPages,
  ]);

  /* ======================================================
     PAGE DISPLAY VALUES
  ====================================================== */

  const firstVisibleProject =
    currentPage * cardsPerPage + 1;

  const lastVisibleProject =
    Math.min(
      firstVisibleProject +
        cardsPerPage -
        1,
      projects.length
    );

  const progress =
    ((currentPage + 1) /
      totalPages) *
    100;

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
          <p className="portfolio-slider-badge">
            <PiStarFourFill />
            Portfolio
          </p>

          <h2 className="portfolio-slider-title">
            Check out my featured projects
          </h2>
        </div>

        <div className="portfolio-slider-controls">
          <button
            type="button"
            className="portfolio-slider-arrow portfolio-slider-arrow-prev"
            onClick={() =>
              scrollProjects("prev")
            }
            aria-label="Previous projects"
            disabled={currentPage === 0}
          >
            <HiArrowLeft />
          </button>

          <button
            type="button"
            className="portfolio-slider-arrow portfolio-slider-arrow-next"
            onClick={() =>
              scrollProjects("next")
            }
            aria-label="Next projects"
            disabled={
              currentPage ===
              totalPages - 1
            }
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
            {/* IMAGE */}

            <div className="portfolio-slider-image-wrap">
              <img
                src={project.image}
                alt={project.title}
                className="portfolio-slider-image"
                style={{
                  objectPosition:
                    project.imagePosition,
                }}
              />

              <div
                className="portfolio-slider-image-shade"
                aria-hidden="true"
              />
            </div>

            {/* CONTENT */}

            <div className="portfolio-slider-info">
              <div className="portfolio-slider-tags">
                {project.tags.map(
                  (tagText) => (
                    <span
                      key={tagText}
                      className="portfolio-slider-tag"
                    >
                      {tagText}
                    </span>
                  )
                )}
              </div>

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
            {String(
              firstVisibleProject
            ).padStart(2, "0")}
          </span>

          {cardsPerPage > 1 && (
            <>
              <span className="portfolio-slider-range">
                –
              </span>

              <span className="portfolio-slider-current">
                {String(
                  lastVisibleProject
                ).padStart(2, "0")}
              </span>
            </>
          )}

          <span className="portfolio-slider-slash">
            /
          </span>

          <span className="portfolio-slider-total">
            {String(
              projects.length
            ).padStart(2, "0")}
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