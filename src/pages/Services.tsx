import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClockIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import BookingCard from "../components/BookingCard";

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
    title: "Laser Hair Removal",
    description:
      "Smooth, hair-free skin is just a few sessions away. Safe, effective, and virtually painless—our laser technology targets unwanted hair with precision, for lasting results.",
    image: "/assets/image.jpg",
    price: "$80",
    duration: "60 minutes",
    badge: "Popular",
    features: [
      "Laser hair removal",
      "All skin types",
      "No downtime",
      "Long-lasting results",
    ],
  },
  {
    title: "Microneedling",
    description:
      "Stimulate collagen, refine texture, and restore your skin's youthful radiance. Perfect for reducing scars, fine lines, and enlarged pores.",
    image: "/assets/microneedling.jpg",
    price: "$120",
    duration: "90 minutes",
    badge: "Premium",
    features: [
      "Skin rejuvenation",
      "Collagen production",
      "No downtime",
      "Long-lasting results",
    ],
  },
  {
    title: "Chemical Peel",
    description:
      "Reveal fresh, glowing skin with our customized peels. Whether you're battling acne, pigmentation, or dullness, we have the right peel for your skin type and goals",
    image: "/assets/peel.jpg",
    price: "$100",
    duration: "75 minutes",
    badge: "Essential",
    features: [
      "Skin rejuvenation",
      "Exfoliation",
      "No downtime",
      "Long-lasting results",
    ],
  },
  {
    title: "Neurotoxin Injection",
    description:
      "Smooth away fine lines and dynamic wrinkles for a refreshed, natural look. Subtle, refined, and always tailored to you.",
    image: "/assets/injection.jpg",
    price: "$90",
    duration: "60 minutes",
    badge: "Popular",
    features: [
      "Wrinkle reduction",
      "Skin rejuvenation",
      "No downtime",
      "Long-lasting results",
    ],
  },
  {
    title: "IV Vitamin Therapy",
    description:
      "Revitalize from within with targeted infusions of essential vitamins and nutrients. Boost immunity, energy, hydration, and overall well-being—drip by drip.",
    image: "/assets/ivtherapy.jpg",
    price: "$130",
    duration: "90 minutes",
    badge: "Specialty",
    features: [
      "IV vitamin therapy",
      "Overall health and wellness",
      "No downtime",
      "Long-lasting results",
    ],
  },
  {
    title: "Hair Loss Treatment with PRP/PRF",
    description:
      "Regrow confidence along with your hair. Our PRP/PRF therapy taps into your body's own healing power to stimulate natural hair growth and scalp health.",
    image: "/assets/hair-removal.jpg",
    price: "$60",
    duration: "45 minutes",
    badge: "Essential",
    features: [
      "Hair loss treatment",
      "PRP/PRF",
      "No downtime",
      "Long-lasting results",
    ],
  },
];

// Refined easing curves for ultra-smooth animations
const springTransition = {
  type: "spring",
  stiffness: 220, // Reduced for silkier motion
  damping: 28,
  mass: 1.1,
  restDelta: 0.00001,
  restSpeed: 0.0001,
};

const buttonSpringTransition = {
  type: "spring",
  stiffness: 380,
  damping: 42,
  mass: 0.65,
  restDelta: 0.00001,
  restSpeed: 0.0001,
};

// Apple's refined easing curves
const appleEaseOut = [0.16, 1, 0.3, 1];
const appleEaseInOut = [0.85, 0, 0.15, 1];
const appleSmoothEase = [0.42, 0, 0.12, 1];

const heroVariants = {
  hidden: {
    opacity: 0,
    scale: 1.12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.6,
      ease: appleEaseOut,
      opacity: {
        duration: 1.2,
        ease: appleSmoothEase,
      },
    },
  },
};

const heroContentVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: 0.5,
      ease: appleEaseOut,
    },
  },
};

const fadeVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: appleEaseInOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.97,
    transition: {
      duration: 0.6,
      ease: appleSmoothEase,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 170,
      damping: 22,
      mass: 0.85,
      restDelta: 0.00001,
    },
  },
  hover: {
    y: -6,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 35,
      mass: 0.7,
    },
  },
  tap: {
    scale: 0.975,
    transition: {
      type: "spring",
      stiffness: 420,
      damping: 35,
      mass: 0.6,
    },
  },
};

const navigationVariants = {
  hidden: {
    opacity: 0,
    x: -25,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: appleEaseOut,
    },
  },
};

const imageHoverVariants = {
  hover: {
    scale: 1.07,
    transition: {
      duration: 1.4,
      ease: appleEaseInOut,
    },
  },
};

export default function Services() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [serviceToBook, setServiceToBook] = useState<Service | null>(null);

  const categories = Array.from(
    new Set(services.map((service) => service.badge))
  );

  const filteredServices = services.filter(
    (service) => service.badge === selectedCategory
  );

  const handleBookNow = (service: Service) => {
    setServiceToBook(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-50">
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0">
          <img
            src="/assets/Photo Feb 12 2024, 8 44 29 PM.jpg"
            alt="Professional medical spa treatment"
            className="h-full w-full object-cover object-center transition-all duration-1000"
            style={{ objectPosition: "50% 20%" }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: appleSmoothEase }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          />
        </motion.div>

        <div className="relative h-full">
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
              <motion.div
                variants={heroContentVariants}
                initial="hidden"
                animate="visible"
                className="max-w-2xl">
                <h1 className="text-5xl font-light tracking-tight text-white sm:text-7xl mb-6">
                  Your wellness journey starts here
                </h1>
                <p className="text-xl text-gray-100 leading-relaxed font-light mb-8">
                  Each experience is tailored with intention, using
                  nature-inspired ingredients, expert techniques, and a deep
                  respect for your personal journey.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={buttonSpringTransition}>
                  <Link
                    to="/book-appointment"
                    className="inline-flex rounded-full bg-white/90 backdrop-blur-sm px-8 py-3.5 text-base font-medium text-neutral-900 shadow-sm hover:bg-white/100 hover:shadow-lg transition-all duration-700 ease-out">
                    Book Appointment
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Content */}
      <motion.div
        className="relative bg-white/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: appleEaseOut }}>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Side Navigation */}
            <motion.div
              variants={navigationVariants}
              initial="hidden"
              animate="visible"
              className="lg:w-64 flex-shrink-0">
              <nav className="sticky top-8 space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{
                      x: 4,
                      backgroundColor: "rgba(0,0,0,0.04)",
                      transition: {
                        duration: 0.4,
                        ease: appleEaseInOut,
                      },
                    }}
                    className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-700 ${
                      selectedCategory === category
                        ? "bg-neutral-100 text-neutral-900 shadow-sm"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}>
                    {category}
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Services Grid */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {filteredServices.map((service, index) => (
                    <motion.div
                      key={service.title}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                      transition={{
                        delay: index * 0.15,
                        duration: 0.8,
                        ease: appleEaseInOut,
                      }}
                      className="group relative bg-white rounded-2xl p-6 hover:bg-neutral-50/80 transition-all duration-1000 shadow-sm hover:shadow-lg">
                      <div className="space-y-6">
                        <div className="aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100">
                          <motion.img
                            variants={imageHoverVariants}
                            whileHover="hover"
                            src={service.image}
                            alt={service.title}
                            className="h-full w-full object-cover transition-all duration-1000"
                          />
                        </div>

                        <div className="space-y-4">
                          <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                            {service.title}
                          </h2>

                          <p className="text-base text-neutral-600 font-light line-clamp-2 hover:line-clamp-none transition-all duration-500">
                            {service.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {service.features?.map((feature) => (
                              <span
                                key={feature}
                                className="inline-flex items-center gap-1.5 text-sm text-neutral-600 font-light bg-neutral-50 px-3 py-1 rounded-full">
                                <div className="h-1 w-1 rounded-full bg-primary-500" />
                                {feature}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-4">
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center text-neutral-700">
                                <ClockIcon className="h-4 w-4 mr-1.5" />
                                <span>{service.duration}</span>
                              </div>
                              <div className="flex items-center text-neutral-700">
                                <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                                <span>{service.price}</span>
                              </div>
                            </div>

                            <motion.button
                              onClick={() => handleBookNow(service)}
                              whileHover={{
                                x: 6,
                                transition: {
                                  duration: 0.4,
                                  ease: appleEaseInOut,
                                },
                              }}
                              className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                              Book now
                              <ArrowRightIcon className="h-4 w-4 ml-1.5 transition-transform duration-500 group-hover:translate-x-1.5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <BookingCard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        service={serviceToBook}
      />
    </div>
  );
}
