import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPinIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We offer a comprehensive range of wellness and spa services including massage therapy, facial treatments, body treatments, and holistic healing practices. Each service can be customized to your specific needs.",
  },
  {
    question: "How much do treatments cost?",
    answer:
      "Our treatments vary in price depending on the service and duration. Basic treatments start from $75, while premium packages can range between $150-300. We're happy to provide a detailed price list during consultation.",
  },
  {
    question: "How long do appointments typically last?",
    answer:
      "Most of our treatments range from 30 minutes to 2 hours, depending on the service. We recommend arriving 15 minutes before your scheduled appointment time for the best experience.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We accept several major insurance providers for specific medical spa treatments. Please contact us with your insurance details, and we'll be happy to verify your coverage.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="relative min-h-screen bg-whitesmoke">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl mb-6">
            Let's start your wellness journey
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            We're just one click away from helping you achieve your wellness
            goals. Fill in the form to share more about what you're looking for.
            Or your favorite treatment. Either way, we'd love to talk.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}>
              <div className="sticky top-8">
                <div className="mb-12">
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0">
                      <img
                        src="https://www.dropbox.com/scl/fi/tf3n1elg1uswldm8ty616/Photo-Mar-30-2025-1-46-55-PM-2.jpg?rlkey=w6t49msui5spqkjzaddg0lfwb&st=xiy14270&dl=0"
                        alt="Dr. Summer Graham"
                        className="w-48 h-48 rounded-full object-cover border-4 border-primary-100 shadow-lg"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">
                        Hi, I'm Dr. Summer Graham!
                      </h2>
                      <p className="text-lg text-neutral-600">
                        "I'm here to guide you through your wellness journey and
                        help you achieve your health and relaxation goals."
                      </p>
                      <a
                        href="mailto:sarah@medicspa.com"
                        className="inline-block mt-6 text-primary-600 hover:text-primary-700 font-medium">
                        Email Dr. Graham directly →
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <MapPinIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Our Location</h3>
                      <p className="text-neutral-600 mb-4">
                        123 Wellness Street
                        <br />
                        New York, NY 10001
                      </p>
                      <p className="text-neutral-600">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-neutral-50 border-0 focus:ring-2 focus:ring-primary-500"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-neutral-50 border-0 focus:ring-2 focus:ring-primary-500"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-neutral-50 border-0 focus:ring-2 focus:ring-primary-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2">
                    Tell us about your wellness goals
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-neutral-50 border-0 focus:ring-2 focus:ring-primary-500"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Send
                </button>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="mt-24">
            <h2 className="text-3xl font-bold mb-12">FAQs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="space-y-3">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
