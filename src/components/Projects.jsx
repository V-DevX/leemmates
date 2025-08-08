import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    title: "Spa Application",
    description:
      "A modern web application for spa and wellness centers, offering online booking, treatment menus, and integrated customer management. Designed with a calming UI, responsive layouts, and seamless scheduling to enhance client experience.",
    image: "/assets/spa.png", // place spa.jpg in public/assets
  },
  {
    title: "Sales Analytics Dashboard",
    description:
      "An advanced analytics platform for tracking sales performance in real-time. Features interactive charts, KPI tracking, and AI-driven insights to help businesses make data-backed decisions and optimize revenue streams.",
    image: "/assets/sales.png", // place sales.jpg in public/assets
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="bg-gray-50 px-4 py-20">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          Projects
        </motion.h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
