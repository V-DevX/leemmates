import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductCard from "./VisionCard";
import AnimationLottie from "./animation-lottie";
import educationAnimation from "./study.json"; // adjust path if needed

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Vision = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="bg-gray-50 px-4 py-10">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-3"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Lottie Animation - First on small screens */}
        <motion.div
          variants={itemVariants}
          className="order-1 lg:order-2 flex justify-center"
        >
          <AnimationLottie animationData={educationAnimation} width="80%" />
        </motion.div>

        {/* Product Card - Second on small screens */}
        <motion.div
          variants={itemVariants}
          className="order-2 lg:order-1 flex justify-center"
        >
          <ProductCard />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Vision;
