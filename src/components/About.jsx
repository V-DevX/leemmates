import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section ref={ref} className="bg-gray-50 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:items-center">
        
        {/* Left: Image */}
        <motion.div
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center"
        >
          <img
            src="/assets/about.png"
            alt="About us"
            className="w-full max-w-sm"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Are?</h2>
          <p className="text-gray-700 leading-loose">
            At We LeemMates, we are dedicated to empowering startups and founders by seamlessly converting their innovative ideas into robust Minimum Viable Products (MVPs). We fully understand the formidable challenges that entrepreneurs face when it comes to introducing a new product and achieving market traction. It's precisely why we offer comprehensive support to startups, encompassing all aspects from initial ideation to the complete product development cycle and beyond. We take pride in our track record of successfully kickstarting over 10 startups, specializing in cutting-edge niche technologies.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
