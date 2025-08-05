import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ProductCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Product = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="bg-gray-50 px-4">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center lg:px-20 text-center lg:text-left"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Left: Text Content */}
        <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start">
          <p className="text-[1.5rem] md:text-[3rem] tracking-wide text-black font-bold mb-2 px-4">
            Our Product
          </p>
          <h2 className="font-montserrat text-[2rem] md:text-[4rem] font-bold bg-gradient-to-r from-blue-500 via-red-500 to-purple-500 bg-clip-text text-transparent mb-4 px-4">
            LeemPulse
          </h2>
          <p className="text-[1rem] md:text-[1.3rem] text-black leading-relaxed px-4">
            Launching Soon...
          </p>
        </motion.div>

        {/* Right: Product Card */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <ProductCard />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Product;
