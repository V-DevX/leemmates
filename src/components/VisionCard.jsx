import "./ProductCard.css"; // we’ll use a CSS file for gradient animation

const ProductCard = () => {
  return (
    <div className="flex justify-center items-center min-h-[30rem] px-5">
      <div className="relative group">
        {/* Background Card (Glassy + Animated Gradient) */}
        <div className="bg-card absolute inset-0 rounded-xl backdrop-blur-md border border-white/20 z-0" />

        {/* Foreground Card */}
        <div className="relative z-10 bg-white rounded-xl p-6 transition-transform duration-300 ease-in-out group-hover:translate-x-2 group-hover:translate-y-2 shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Vision & Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our vision is to become a trusted global partner for innovative web, mobile, and AI-powered solutions, empowering businesses and startups to scale with confidence, creativity, and impactful technology. We combine technical excellence with bold ideas to build high-quality, scalable digital products - from web and mobile apps to AI tools and custom workflows - delivering solutions worth every penny our clients invest, while fostering long-term partnerships and growing together to shape the future of technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
