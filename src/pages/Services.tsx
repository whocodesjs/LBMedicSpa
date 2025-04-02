import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClockIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface Service {
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  badge: string;
  features?: string[];
}

const services: Service[] = [
  {
    title: "Massage Therapy",
    description:
      "Relax and rejuvenate with our expert massage therapy sessions tailored to your needs.",
    image: "src/assets/ani-kolleshi-vu-DaZVeny0-unsplash.jpg",
    price: "$80",
    duration: "60 minutes",
    badge: "Popular",
    features: [
      "Swedish massage",
      "Deep tissue massage",
      "Sports massage",
      "Prenatal massage",
    ],
  },
  {
    title: "Facial Treatment",
    description:
      "Experience luxurious facial treatments using premium skincare products.",
    image: "/services/facial.jpg",
    price: "$120",
    duration: "90 minutes",
    badge: "Premium",
    features: [
      "Deep cleansing",
      "Anti-aging treatments",
      "Hydrating masks",
      "LED therapy",
    ],
  },
  {
    title: "Body Scrub",
    description:
      "Exfoliate and nourish your skin with our signature body scrub treatments.",
    image: "/services/scrub.jpg",
    price: "$100",
    duration: "75 minutes",
    badge: "Essential",
    features: [
      "Salt scrubs",
      "Sugar scrubs",
      "Coffee scrubs",
      "Moisturizing treatment",
    ],
  },
  {
    title: "Aromatherapy",
    description:
      "Enhance your wellness journey with therapeutic essential oils.",
    image: "/services/aromatherapy.jpg",
    price: "$90",
    duration: "60 minutes",
    badge: "Relaxing",
    features: [
      "Essential oil blending",
      "Diffusion therapy",
      "Massage integration",
      "Take-home oils",
    ],
  },
  {
    title: "Hot Stone Therapy",
    description:
      "Melt away tension with our soothing hot stone massage therapy.",
    image: "/services/hot-stone.jpg",
    price: "$130",
    duration: "90 minutes",
    badge: "Specialty",
    features: [
      "Heated volcanic stones",
      "Deep muscle relief",
      "Improved circulation",
      "Stress reduction",
    ],
  },
  {
    title: "Wellness Consultation",
    description:
      "Get personalized wellness advice from our experienced practitioners.",
    image: "/services/consultation.jpg",
    price: "$60",
    duration: "45 minutes",
    badge: "Essential",
    features: [
      "Health assessment",
      "Personalized plan",
      "Lifestyle guidance",
      "Follow-up support",
    ],
  },
];

// Apple-style spring animation
const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 1,
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1], // Apple's default easing
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function Services() {
  return (
    <div className="relative min-h-screen bg-whitesmoke">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Hero Section */}
        <motion.div
          variants={fadeUpVariants}
          className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-6xl mb-6">
            Your wellness journey starts here
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed font-light">
            No matter where you are in your wellness journey, we're here to help
            you reach new heights of relaxation and rejuvenation.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-24 space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeUpVariants}
              className="group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={springTransition}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-sm">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </motion.div>
                </div>

                <div className={index % 2 === 0 ? "lg:order-2" : "lg:order-1"}>
                  <div className="space-y-6">
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="inline-flex items-center rounded-full bg-primary-50/80 backdrop-blur-sm px-3 py-1 text-sm font-medium text-primary-700">
                      {service.badge}
                    </motion.span>

                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                      {service.title}
                    </h2>

                    <p className="text-lg text-neutral-600 font-light">
                      {service.description}
                    </p>

                    {service.features && (
                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        className="space-y-3">
                        {service.features.map((feature) => (
                          <motion.div
                            key={feature}
                            variants={fadeUpVariants}
                            className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                            <span className="text-neutral-600 font-light">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    <div className="flex items-center gap-6 text-sm">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={springTransition}
                        className="flex items-center text-neutral-700">
                        <ClockIcon className="h-4 w-4 mr-1.5" />
                        <span>{service.duration}</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={springTransition}
                        className="flex items-center text-neutral-700">
                        <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                        <span>{service.price}</span>
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={springTransition}>
                      <Link
                        to="/book-appointment"
                        className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                        Book this service
                        <ArrowRightIcon className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springTransition}
          className="mt-32 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to feel amazing?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 font-light">
            Let's discuss how we can help you achieve your wellness goals.
          </p>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 transition-all">
              Start your journey
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
