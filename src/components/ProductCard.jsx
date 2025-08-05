import "./ProductCard.css"; // we’ll use a CSS file for gradient animation

const ProductCard = () => {
  return (
    <div className="flex justify-center items-center min-h-[30rem] px-5">
      <div className="relative group">
        {/* Background Card (Glassy + Animated Gradient) */}
        <div className="bg-card absolute inset-0 rounded-xl backdrop-blur-md border border-white/20 z-0" />

        {/* Foreground Card */}
        <div className="relative z-10 bg-white rounded-xl p-6 transition-transform duration-300 ease-in-out group-hover:translate-x-2 group-hover:translate-y-2 shadow-md w-full max-w-md">
          <p className="text-gray-700 leading-relaxed">
            LeemPulse is our upcoming AI‑powered personalization engine designed to transform the way businesses connect with their audience. By understanding each visitor in real time, LeemPulse delivers tailored content, product suggestions, and experiences that truly resonate. Whether it’s an e‑commerce store, SaaS platform, or blog, our technology adapts dynamically to boost engagement and conversions. No coding, no complexity - just plug, play, and watch the results unfold. We’re bringing enterprise‑level personalization to everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
