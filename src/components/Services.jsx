// SplitHalfThumbnailCarousel.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const IMAGES = [
  {
    src: "/assets/web.png",
    title: "Web Development",
    desc: "We build fast, responsive, and SEO-optimized websites to establish a powerful online presence.",
    color: "#DC2626",
  },
  {
    src: "/assets/app.png",
    title: "Mobile App Development",
    desc: "Be it smartphones or tablets, the modern age of digital transformation is driven by applications. Easier development of applications by recording ecosystem and state data.",
    color: "#2563EB",
  },
  {
    src: "/assets/ai.png",
    title: "AI Solutions",
    desc: "Nowadays, Artificial Intelligence is penetrating every side of the industry, from deploying Chatbots to AI-driven applications.",
    color: "#7C3AED",
  },
  {
    src: "/assets/custom.png",
    title: "Custom Solutions",
    desc: "We design and develop fully customized tech solutions to solve your most complex challenges.",
    color: "#EAB308",
  },
];

export default function Services({ intervalMs = 5000, transitionMs = 700 }) {
  const n = IMAGES.length;

  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [transitionsEnabled, setTransitionsEnabled] = useState(true);

  const [carouselHeight, setCarouselHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const carouselRef = useRef(null);
  const animatingRef = useRef(false);
  const timerRef = useRef(null);
  const transitionRef = useRef(null);
  const currentRef = useRef(current);
  const incomingRef = useRef(incoming);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);
  useEffect(() => {
    incomingRef.current = incoming;
  }, [incoming]);

  const updateCarouselHeight = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCarouselHeight(el.clientHeight);
  };

  useEffect(() => {
    updateCarouselHeight();
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      requestAnimationFrame(updateCarouselHeight);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", updateCarouselHeight);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", updateCarouselHeight);
    };
  }, []);

  const clearTimer = () => clearTimeout(timerRef.current);
  const startTimer = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      triggerChange((currentRef.current + 1) % n);
    }, intervalMs);
  };

  useEffect(() => {
    startTimer();
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        clearTimer();
        clearTimeout(transitionRef.current);
      } else if (document.visibilityState === "visible") {
        flushSync(() => {
          setTransitionsEnabled(false);
          const toIndex =
            incomingRef.current !== null
              ? incomingRef.current
              : currentRef.current;
          setCurrent(toIndex);
          currentRef.current = toIndex;
          setIncoming(null);
          incomingRef.current = null;
          setPhase("idle");
          animatingRef.current = false;
        });
        requestAnimationFrame(() => {
          setTransitionsEnabled(true);
          updateCarouselHeight();
          startTimer();
        });
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () =>
      document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  function triggerChange(targetIndex) {
    if (animatingRef.current) return;
    const idx = ((targetIndex % n) + n) % n;
    if (idx === currentRef.current) return;

    animatingRef.current = true;
    clearTimer();

    setIncoming(idx);
    incomingRef.current = idx;
    setPhase("mounted");

    requestAnimationFrame(() => {
      updateCarouselHeight();
      requestAnimationFrame(() => {
        setPhase("animating");
      });
    });

    transitionRef.current = setTimeout(() => {
      setTransitionsEnabled(false);
      setCurrent(idx);
      currentRef.current = idx;
      setIncoming(null);
      incomingRef.current = null;
      setPhase("idle");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionsEnabled(true);
          animatingRef.current = false;
          updateCarouselHeight();
          startTimer();
        });
      });
    }, transitionMs + 30);
  }

  function goPrev() {
    triggerChange((currentRef.current - 1 + n) % n);
  }
  function goNext() {
    triggerChange((currentRef.current + 1) % n);
  }

  const transitionStyle = transitionsEnabled
    ? {
        transition: `transform ${transitionMs}ms cubic-bezier(.2,.9,.2,1), opacity ${transitionMs}ms ease`,
      }
    : { transition: "none" };

  const outgoingLeftTransform =
    phase === "animating" ? "translateY(-100%)" : "translateY(0)";
  const outgoingRightTransform =
    phase === "animating" ? "translateY(100%)" : "translateY(0)";
  const incomingLeftTransform =
    phase === "animating" ? "translateY(0)" : "translateY(100%)";
  const incomingRightTransform =
    phase === "animating" ? "translateY(0)" : "translateY(-100%)";

  const titleTransition = `transform ${transitionMs}ms cubic-bezier(.2,.9,.2,1), opacity ${transitionMs}ms ease`;
  const textShadowStyle = { textShadow: "2px 2px 8px rgba(0,0,0,0.8)" };

  const outgoingTitleStyle = {
    transform: phase === "animating" ? "translateY(-120%)" : "translateY(0)",
    opacity: phase === "animating" ? 0 : 1,
    transition: titleTransition,
    ...textShadowStyle,
  };
  const incomingTitleStyle = {
    transform: phase === "animating" ? "translateY(0)" : "translateY(120%)",
    opacity: phase === "animating" ? 1 : 0,
    transition: titleTransition,
    ...textShadowStyle,
  };

  const isSmall = windowWidth < 768;
  const descHeight = carouselHeight
    ? isSmall
      ? Math.round(carouselHeight * 0.55)
      : carouselHeight
    : undefined;

  const cardBgColor =
    incoming !== null && phase === "animating"
      ? IMAGES[incoming].color
      : IMAGES[current].color;

  const descTransition = `transform ${transitionMs}ms cubic-bezier(.2,.9,.2,1), opacity ${transitionMs}ms ease`;
  const descOutgoingStyle = {
    transform:
      incoming !== null && phase === "animating"
        ? "translateY(-12px)"
        : "translateY(0)",
    opacity: incoming !== null && phase === "animating" ? 0 : 1,
    transition: descTransition,
  };
  const descIncomingStyle = {
    transform: phase === "animating" ? "translateY(0)" : "translateY(12px)",
    opacity: phase === "animating" ? 1 : 0,
    transition: descTransition,
  };

  const [inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-gray-50 px-8 py-10">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[2.2rem] md:text-[3rem] font-bold text-gray-900"
        >
          More of our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-2 text[1.5rem] text-gray-600"
        >
          Comprehensive Software solutions tailored to accelerate your business
          growth
        </motion.p>
      </div>

      <div className="grid grid-cols-5 gap-6 items-start max-w-[1400px] mx-auto">
        {/* Carousel */}
        <div className="col-span-5 md:col-span-3 flex justify-center">
          <div
            ref={carouselRef}
            className="relative overflow-hidden rounded-lg shadow-lg bg-black w-full"
            style={{ aspectRatio: "3 / 2", maxWidth: 900 }}
          >
            {/* Outgoing halves */}
            <div className="absolute inset-0 flex">
              <div
                className="w-1/2 h-full overflow-hidden"
                style={{ ...transitionStyle, transform: outgoingLeftTransform }}
              >
                <img
                  src={IMAGES[current].src}
                  alt={IMAGES[current].title}
                  className="w-full h-full object-cover object-left"
                  draggable={false}
                  onLoad={updateCarouselHeight}
                />
              </div>
              <div
                className="w-1/2 h-full overflow-hidden"
                style={{
                  ...transitionStyle,
                  transform: outgoingRightTransform,
                }}
              >
                <img
                  src={IMAGES[current].src}
                  alt={IMAGES[current].title}
                  className="w-full h-full object-cover object-right"
                  draggable={false}
                  onLoad={updateCarouselHeight}
                />
              </div>
            </div>

            {/* Incoming halves */}
            {incoming !== null && (
              <div className="absolute inset-0 flex z-10 pointer-events-none">
                <div
                  className="w-1/2 h-full overflow-hidden"
                  style={{ ...transitionStyle, transform: incomingLeftTransform }}
                >
                  <img
                    src={IMAGES[incoming].src}
                    alt={IMAGES[incoming].title}
                    className="w-full h-full object-cover object-left"
                    draggable={false}
                    onLoad={updateCarouselHeight}
                  />
                </div>
                <div
                  className="w-1/2 h-full overflow-hidden"
                  style={{
                    ...transitionStyle,
                    transform: incomingRightTransform,
                  }}
                >
                  <img
                    src={IMAGES[incoming].src}
                    alt={IMAGES[incoming].title}
                    className="w-full h-full object-cover object-right"
                    draggable={false}
                    onLoad={updateCarouselHeight}
                  />
                </div>
              </div>
            )}

            {/* Title */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 flex items-center justify-center z-40 pointer-events-none"
              style={{ maxWidth: "90%" }}
            >
              <div className="relative h-40 w-450 overflow-hidden font-montserrat flex items-center justify-center">
                {incoming !== null && (
                  <div
                    style={outgoingTitleStyle}
                    className="absolute text-white font-bold text-3xl text-center px-2"
                  >
                    {IMAGES[current].title}
                  </div>
                )}
                {incoming !== null ? (
                  <div
                    style={incomingTitleStyle}
                    className="absolute text-white font-bold text-3xl text-center px-2"
                  >
                    {IMAGES[incoming].title}
                  </div>
                ) : (
                  <div
                    style={{
                      transform: "translateY(0)",
                      opacity: 1,
                      transition: titleTransition,
                      ...textShadowStyle,
                    }}
                    className="absolute text-white text-3xl font-bold text-center px-2"
                  >
                    {IMAGES[current].title}
                  </div>
                )}
              </div>
            </div>

            {/* Chevrons */}
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60 z-5"
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60 z-5"
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Description Card */}
        <div className="col-span-5 md:col-span-2 flex justify-center">
          <div
            className="rounded-lg shadow-lg p-6 text-white flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundColor: cardBgColor,
              width: "100%",
              maxWidth: 500,
              height: descHeight ? `${descHeight}px` : undefined,
              transition: `background-color backdrop-blur-md border border-white/20 ${transitionMs}ms ease`,
            }}
          >
            <div
              key={`desc-current-${current}`}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                textAlign: "center",
                ...descOutgoingStyle,
              }}
            >
              <div>
                <h3 className="text-[1.8rem] md:[2.1rem] lg:text-[2.5rem] font-bold mb-3">
                  {IMAGES[current].title}
                </h3>
                <p className="text-[1rem] lg:text-[1.2rem] leading-relaxed max-w-lg">
                  {IMAGES[current].desc}
                </p>
              </div>
            </div>

            {incoming !== null && (
              <div
                key={`desc-in-${incoming}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                  textAlign: "center",
                  ...descIncomingStyle,
                }}
              >
                <div>
                  <h3 className="text-[1.8rem] md:[2.1rem] lg:text-[2.5rem] font-bold mb-3">
                    {IMAGES[incoming].title}
                  </h3>
                  <p className="text-[1rem] lg:text-[1.2rem] leading-relaxed max-w-lg">
                    {IMAGES[incoming].desc}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
