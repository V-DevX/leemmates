import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const newErrors = {};

    if (!formData.user_name.trim()) {
      newErrors.user_name = "Name is required.";
    }

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

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    return newErrors;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      user_phone: form.current.user_phone.value,
      message: form.current.message.value,
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
        "service_85kig9f", // ← replace this
        "template_z704jvn", // ← replace this
        form.current,
        "L07UPVbbIWI1LimlG" // ← replace this
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
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Contact Us
        </h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          noValidate
          className="mt-10 space-y-6"
        >
          <div>
            <input
              type="text"
              name="user_name"
              placeholder="Name"
              className="w-full rounded-[5rem] border p-3"
            />
            {errors.user_name && (
              <p className="text-sm text-red-600 mt-1">{errors.user_name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              className="w-full rounded-[5rem] border p-3"
            />
            {errors.user_email && (
              <p className="text-sm text-red-600 mt-1">{errors.user_email}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="user_phone"
              placeholder="Phone"
              className="w-full rounded-[5rem] border p-3"
            />
            {errors.user_phone && (
              <p className="text-sm text-red-600 mt-1">{errors.user_phone}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              className="w-full rounded-[1rem] border p-3"
            ></textarea>
            {errors.message && (
              <p className="text-sm text-red-600 mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-[5rem] bg-black py-3 text-white hover:bg-gray-800"
          >
            Send Message
          </button>

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
    </section>
  );
};

export default Contact;
