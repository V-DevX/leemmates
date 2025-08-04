import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const taglines = [
  "Tech That Delivers",
  "Smart. Scalable. Secure.",
  "Future-Ready Solutions",
];

const slideVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex h-screen flex-col items-center justify-center pt-20 text-center px-4 overflow-hidden">
      {/* Animated Background SVG */}
      <motion.img
        src="/assets/BG.svg"
        alt="Animated Background"
        initial={{ x: "-50%", y: "-50%", scale: 1 }}
        animate={{
          x: ["-75%", "10%"],
          y: ["-25%", "1%"],
          scale: [1, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 w-[2000px] max-w-none pointer-events-none z-[-1]"
      />

      {/* Bottom Gray Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-gray-60 to-transparent z-0" />

      {/* Main Gradient Logo */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold sm:text-6xl"
      >
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
          LeemMates
        </span>
      </motion.h1>

      {/* Animated Taglines */}
      <div className="h-10 md:h-20 lg:h-25 mt-6 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold text-gray-700"
          >
            {taglines[current]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Description Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 max-w-3xl rounded-md bg-white p-3 text-[1.2rem] text-gray-700"
      >
        We build businesses through AI automations, performance marketing, and creative solutions that drive real results.
      </motion.p>

      {/* CTA Button - Opens Mail */}
      <motion.a
        href="mailto:vasanthjany@gmail.com"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-white font-bold transition"
      >
        Get Started <FaChevronRight className="text-sm" />
      </motion.a>
    </section>
  );
};

export default Hero;
