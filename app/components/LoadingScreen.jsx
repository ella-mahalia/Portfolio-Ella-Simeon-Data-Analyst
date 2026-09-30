"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const routePath =
  "M40 82 C180 105 250 45 385 72 C520 100 595 105 690 70 C790 35 855 100 960 76";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const pathRef = useRef(null);

  const [plane, setPlane] = useState({
    x: 40,
    y: 82,
    angle: 0,
  });

  useEffect(() => {
    // Only show once per browser session.
    const isDevelopment = process.env.NODE_ENV === "development";

    if (!isDevelopment) {
    const alreadySeen = sessionStorage.getItem("portfolioLoaderSeen");

    if (alreadySeen) {
        setVisible(false);
        return;
    }
    }

    const start = performance.now();
    const duration = 1900;

    let animationFrame;
    let endTimeout;

    const updateProgress = (time) => {
      const elapsed = time - start;

      const percentage = Math.min(
        100,
        Math.round((elapsed / duration) * 100)
      );

      setProgress(percentage);

      if (percentage < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        endTimeout = setTimeout(() => {
          if (process.env.NODE_ENV !== "development") {
            sessionStorage.setItem("portfolioLoaderSeen", "true");
            }

            setVisible(false);
        }, 350);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(endTimeout);
    };
  }, []);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    const position = totalLength * (progress / 100);

    const currentPoint = path.getPointAtLength(position);

    const nextPoint = path.getPointAtLength(
      Math.min(position + 2, totalLength)
    );

    const angle =
      Math.atan2(
        nextPoint.y - currentPoint.y,
        nextPoint.x - currentPoint.x
      ) *
      (180 / Math.PI);

    setPlane({
      x: currentPoint.x,
      y: currentPoint.y,
      angle,
    });
  }, [progress]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="portfolio-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.45,
              ease: "easeInOut",
            },
          }}
        >
          {/* Clouds */}
          <div className="loader-cloud loader-cloud-one" />
          <div className="loader-cloud loader-cloud-two" />
          <div className="loader-cloud loader-cloud-three" />

          {/* Small decorative stars */}
          <motion.span
            className="loader-star star-one"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 15, 0],
              opacity: [0.45, 1, 0.45],
            }}
            transition={{
              duration: 1.7,
              repeat: Infinity,
            }}
          >
            ✦
          </motion.span>

          <motion.span
            className="loader-star star-two"
            animate={{
              scale: [0.8, 1.15, 0.8],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: 0.3,
            }}
          >
            ✦
          </motion.span>

          <motion.span
            className="loader-star star-three"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: 0.6,
            }}
          >
            ✧
          </motion.span>

          <div className="loader-content">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              Loading Ella&apos;s Portfolio
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
            >
              Preparing dashboards, models, and insights
            </motion.p>

            <div className="flight-loader">
              <svg
                viewBox="0 0 1000 150"
                preserveAspectRatio="none"
                className="flight-route"
              >
                {/* Remaining route */}
                <path
                  d={routePath}
                  fill="none"
                  stroke="#cad7e6"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="12 16"
                />

                {/* Completed route */}
                <path
                  ref={pathRef}
                  d={routePath}
                  fill="none"
                  stroke="#003876"
                  strokeWidth="6"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray={`${progress} 100`}
                />

                {/* Beginning point */}
                <circle
                  cx="40"
                  cy="82"
                  r="9"
                  fill="#fffaf3"
                  stroke="#769bc3"
                  strokeWidth="5"
                />

                {/* Destination */}
                <circle
                  cx="960"
                  cy="76"
                  r="9"
                  fill="#fffaf3"
                  stroke="#769bc3"
                  strokeWidth="5"
                />

                {/* Plane */}
                <g
                  transform={`translate(${plane.x} ${plane.y}) rotate(${plane.angle})`}
                  className="loading-plane"
                >
                  <path
                    d="
                      M -23 0
                      L -6 -6
                      L 3 -23
                      L 9 -23
                      L 5 -6
                      L 24 0
                      L 5 6
                      L 9 23
                      L 3 23
                      L -6 6
                      Z
                    "
                    fill="#fffaf3"
                    stroke="#003876"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>

              <motion.div
                className="loader-percentage"
                key={progress}
              >
                {progress}%
              </motion.div>
            </div>
          </div>

          <div className="loader-dots loader-dots-one">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>

          <div className="loader-dots loader-dots-two">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}