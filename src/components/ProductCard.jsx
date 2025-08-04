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
            An AI tool crafted for content creators and designers, built to learn your unique style and voice. Simply upload your past work, and it fine-tunes a model that thinks and creates like you. From content to design, it generates and edits with precision that mirrors your tone. No templates, no generic output — just your creativity, amplified. Save time without losing authenticity. Coming soon to transform how you create.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
