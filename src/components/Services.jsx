import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const services = [
  {
    img: "/assets/service1.png",
    title: "Web Development",
    desc: "We build fast, responsive, and SEO-optimized websites to establish a powerful online presence.",
  },
  {
    img: "/assets/service2.png",
    title: "App Development",
    desc: "App development Be it smartphones or tablets, the modern age of digital transformation is driven by applications. Easier development of applications by recording ecosystem and state data.",
  },
  {
    img: "/assets/service3.png",
    title: "AI Solutions",
    desc: "Nowadays, Artificial Intelligence is penetrating every side of the industry, from deploying Chatbots to AI-driven applications..",
  },
  {
    img: "/assets/service4.png",
    title: "Custom Solutions",
    desc: "We design and develop fully customized tech solutions to solve your most complex challenges.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="bg-gray-50 min-h-[30rem] py-10 px-4">
      <div className="mt-[5rem] mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900"
          >
            More of our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-2 text-gray-600"
          >
            Comprehensive Software solutions tailored to accelerate your business growth
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group rounded-lg bg-white p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer text-left"
            >
              {/* Image (left-aligned, rounded corners, no box) */}
              <img
                src={service.img}
                alt={service.title}
                className="mb-4 w-[3rem] rounded-md object-contain"
              />

              {/* Title */}
              <h3 className="text-[1.5rem] font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-[1rem] text-black leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
