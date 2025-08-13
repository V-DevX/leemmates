import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay }
  })
};

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const startOverlayTimer = () => {
    if (!timerStarted) {
      setTimerStarted(true);
      setOverlayVisible(false);
      setTimeout(() => {
        setOverlayVisible(true); // fade starts here while gradient still animates
      }, 5000);
    }
  };

  const validate = (formData) => {
    const newErrors = {};
    if (!formData.user_name.trim()) newErrors.user_name = "Name is required.";
    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = "Invalid email address.";
    }
    if (!formData.user_phone.trim()) {
      newErrors.user_phone = "Phone number is required.";
    } else if (!/^\d{10,15}$/.test(formData.user_phone)) {
      newErrors.user_phone = "Invalid phone number.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      user_phone: form.current.user_phone.value,
      message: form.current.message.value
    };

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("");
      return;
    }

    setErrors({});
    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_85kig9f",
        "template_z704jvn",
        form.current,
        "L07UPVbbIWI1LimlG"
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="mx-auto max-w-3xl px-4">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Contact Us
        </motion.h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          noValidate
          className="mt-10 space-y-6"
        >
          {["user_name", "user_email", "user_phone", "message"].map(
            (field, idx) => (
              <motion.div
                key={field}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx * 0.2}
              >
                {field === "message" ? (
                  <textarea
                    name={field}
                    placeholder="Message"
                    rows="4"
                    className="w-full rounded-[1rem] border p-3"
                  ></textarea>
                ) : (
                  <input
                    type={
                      field === "user_email"
                        ? "email"
                        : field === "user_phone"
                        ? "tel"
                        : "text"
                    }
                    name={field}
                    placeholder={
                      field === "user_name"
                        ? "Name"
                        : field === "user_email"
                        ? "Email"
                        : "Phone"
                    }
                    className="w-full rounded-[5rem] border p-3"
                  />
                )}
                {errors[field] && (
                  <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
                )}
              </motion.div>
            )
          )}

          {/* Button with gradient fade to black after entering viewport */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="relative w-full"
            onViewportEnter={startOverlayTimer}
          >
            <button
              type="submit"
              className="relative w-full rounded-[5rem] py-3 text-white overflow-hidden"
              style={{
                background:
                  "linear-gradient(270deg, #3b82f6, #ef4444, #8b5cf6)",
                backgroundSize: "200% 200%",
                animation: "gradientMove 6s ease infinite" // keep moving until black overlay fully visible
              }}
            >
              <span className="relative z-10">Send Message</span>
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-[2000ms] ease-in-out ${
                  overlayVisible ? "opacity-100" : "opacity-0"
                }`}
              ></div>
            </button>
          </motion.div>

          {status && (
            <p
              className={`text-center text-sm mt-3 ${
                status.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
