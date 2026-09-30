"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiStarFourFill } from "react-icons/pi";
import {
  HiArrowUpRight,
  HiLockClosed,
} from "react-icons/hi2";

export const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Airline Analytics: Booking & Route Forecasting",
      shortTitle: "Airline Analytics",
      subtitle: "Booking & Route Forecasting",
      image: "/assets/airline-analytics-cover.png",
      imagePosition: "center 20%",
      tags: [
        "A/B Testing",
        "Forecasting",
        "Python",
        "Power BI",
      ],
      description:
        "Analyzed airline booking behavior, route demand, traffic trends, seat capacity, departures, and load factors to uncover seasonal patterns and support data-driven planning. The project combines A/B testing, forecasting, and interactive analytics.",
      link: "/airline_analytics-case-study/index.html",
      type: "Featured Case Study",
    },

    {
      id: 2,
      title: "Retail Demand Forecasting & Store Performance",
      shortTitle: "Retail Demand Forecasting",
      subtitle: "Store Performance & Sales Analysis",
      image: "/assets/project-7.png",
      imagePosition: "center 30%",
      tags: [
        "Time Series",
        "Forecasting",
        "Python",
        "SQL",
        "Data Visualization",
      ],
      description:
        "Explored Walmart store and department sales to identify demand patterns, holiday effects, seasonality, and store performance differences. Built forecasting baselines and an interactive analytics experience using real retail data.",
      link: "/retail-demand-forecast/index.html",
      type: "Case Study",
    },

    {
      id: 3,
      title: "Customer Churn Prediction & Retention Modeling",
      shortTitle: "Customer Churn Prediction",
      subtitle: "Machine Learning & Retention",
      image: "/assets/customer-churn.png",
      imagePosition: "center center",
      tags: [
        "Machine Learning",
        "Classification",
        "Python",
        "scikit-learn",
      ],
      description:
        "Built and deployed a machine learning model using IBM Telco customer data to identify customers with elevated churn risk. The project evaluates classification performance and translates model results into retention-focused insights.",
      link: "https://customer-churn-retention-model.vercel.app/",
      type: "Deployed ML Project",
    },

    {
      id: 4,
      title: "Subway Ridership Forecast & Station Trends",
      shortTitle: "Subway Ridership Forecasting",
      subtitle: "Time Series & Station Trends",
      image: "/subway-ridership-forecast/cover.png",
      imagePosition: "center center",
      tags: [
        "Public MTA Data",
        "Time Series",
        "Forecasting",
        "Python",
      ],
      description:
        "Analyzed public subway ridership data to uncover station-level trends, changes in demand, and recurring ridership patterns. Forecasting techniques were used to explore future ridership behavior and system trends.",
      link: "/subway-ridership-forecast/index.html",
      type: "Case Study",
    },

    {
      id: 5,
      title: "Package Locker Utilization Dashboard",
      shortTitle: "Package Locker Dashboard",
      subtitle: "Operational Analytics",
      image: "/assets/project-2.png",
      imagePosition: "center center",
      tags: [
        "Data Analytics",
        "Power BI",
        "SQL",
        "ETL",
        "Dashboard Design",
      ],
      description:
        "Developed an operational analytics dashboard focused on package locker utilization, combining data preparation, SQL, ETL processes, KPI development, and dashboard design to support performance monitoring.",
      type: "Professional Project",
    },

    {
      id: 6,
      title: "Loyalty Program Impact Analysis",
      shortTitle: "Loyalty Program Analysis",
      subtitle: "Segmentation & Experimentation",
      image: "/assets/project-3.png",
      imagePosition: "center 20%",
      tags: [
        "Data Analytics",
        "Customer Segmentation",
        "A/B Testing",
        "Power BI",
      ],
      description:
        "Evaluated customer behavior and loyalty program performance using segmentation and experimentation techniques to understand differences in engagement and measure business impact.",
      type: "Analytics Project",
    },
  ];

  const [activeProjectId, setActiveProjectId] = useState(1);

  const activeProject =
    projects.find((project) => project.id === activeProjectId) ||
    projects[0];

  return (
    <section
      id="portfolio"
      className="selected-work-section"
    >
      {/* ================================
          HEADER
      ================================= */}
      <motion.div
        className="selected-work-header"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65 }}
      >
        <p className="selected-work-badge">
          <span className="selected-work-badge-line" />
          <PiStarFourFill />
          Portfolio
        </p>

        <h2 className="selected-work-title">
          Selected <span>Work</span>
        </h2>

        <p className="selected-work-intro">
          A selection of analytics, machine learning, and
          forecasting projects built around real-world business
          questions.
        </p>
      </motion.div>

      {/* ================================
          MAIN FEATURE AREA
      ================================= */}
      <div className="selected-work-layout">
        {/* LEFT SIDE */}
        <motion.div
          className="selected-work-feature"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
        >
          {/* IMAGE */}
          <div className="selected-work-image-shell">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeProject.id}
                src={activeProject.image}
                alt={activeProject.title}
                className="selected-work-image"
                style={{
                  objectPosition:
                    activeProject.imagePosition,
                }}
                initial={{
                  opacity: 0,
                  scale: 1.025,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.985,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
              />
            </AnimatePresence>

            <div className="selected-work-image-overlay" />

            <div className="selected-work-image-number">
              {String(activeProject.id).padStart(2, "0")}
            </div>
          </div>

          {/* PROJECT DETAILS */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`details-${activeProject.id}`}
              className="selected-work-details"
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <div className="selected-work-type">
                <span className="selected-work-type-dot" />
                {activeProject.type}
              </div>

              <h3 className="selected-work-project-title">
                {activeProject.title}
              </h3>

              <p className="selected-work-description">
                {activeProject.description}
              </p>

              <div className="selected-work-bottom">
                <div className="selected-work-tags">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="selected-work-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {activeProject.link ? (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="selected-work-cta"
                  >
                    View Case Study
                    <HiArrowUpRight />
                  </a>
                ) : (
                  <div className="selected-work-private">
                    <HiLockClosed />
                    Private Project
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ================================
            RIGHT PROJECT INDEX
        ================================= */}
        <motion.div
          className="selected-work-index"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            delay: 0.08,
          }}
        >
          {projects.map((project) => {
            const isActive =
              activeProject.id === project.id;

            return (
              <button
                type="button"
                key={project.id}
                className={`selected-work-index-item ${
                  isActive ? "is-active" : ""
                }`}
                onClick={() => setActiveProjectId(project.id)}
                aria-pressed={isActive}
              >
                <div className="selected-work-index-thumb-wrap">
                  <img
                    src={project.image}
                    alt=""
                    className="selected-work-index-thumb"
                    style={{
                      objectPosition:
                        project.imagePosition,
                    }}
                  />
                </div>

                <div className="selected-work-index-copy">
                  <span className="selected-work-index-number">
                    {String(project.id).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <strong>
                    {project.shortTitle}
                  </strong>

                  <span className="selected-work-index-subtitle">
                    {project.subtitle}
                  </span>
                </div>

                <span className="selected-work-index-arrow">
                  <HiArrowUpRight />
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;