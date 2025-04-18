import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, animate, useMotionValue } from "framer-motion";
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/outline";

// Simple icon components for services
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-neutral-100">
    {children}
  </div>
);

const LaserIcon = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  </IconWrapper>
);

const MicroneedlingIcon = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  </IconWrapper>
);

const ChemicalPeelIcon = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  </IconWrapper>
);

const NeurotoxinInjectionIcon = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"
      />
    </svg>
  </IconWrapper>
);

const IVVitaminIcon = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
      />
    </svg>
  </IconWrapper>
);

const HairLossTreatmentIcon = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  </IconWrapper>
);

const ConsultationIcon = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  </IconWrapper>
);

const stats = [
  { label: "Active Patients", value: 2000, suffix: "+" },
  { label: "Expert Staff", value: 50, suffix: "+" },
  { label: "Years Experience", value: 15, suffix: "+" },
];

const services = [
  {
    name: "Laser Hair Removal",
    description: "Expert laser hair removal for all skin types",
    icon: LaserIcon,
  },
  {
    name: "Microneedling",
    description: "Microneedling for skin rejuvenation and collagen production",
    icon: MicroneedlingIcon,
  },
  {
    name: "Chemical Peels",
    description: "Chemical peels for skin rejuvenation and exfoliation",
    icon: ChemicalPeelIcon,
  },
  {
    name: "Neurotoxin Injections",
    description:
      "Neurotoxin injections for wrinkle reduction and skin rejuvenation",
    icon: NeurotoxinInjectionIcon,
  },
  {
    name: "IV Vitamin Therapy",
    description: "IV vitamin therapy for overall health and wellness",
    icon: IVVitaminIcon,
  },
  {
    name: "Hair Loss Treatment with PRP/PRF",
    description: "Hair loss treatment with PRP/PRF for men and women",
    icon: HairLossTreatmentIcon,
  },
  {
    name: "Consultation",
    description: "Consultation for all services",
    icon: ConsultationIcon,
  },
];

const testimonials = [
  {
    content:
      "The cosmetician isn't just about enhancing beauty, but crafting confidence.",
    author: "Jenna Milton",
    role: "Visit Cosmetician",
  },
  {
    content:
      "In the realm of care, my doctor here isn't just a practitioner; they're a guardian of health.",
    author: "Maria Reed",
    role: "Visit Female Doctor",
  },
  {
    content:
      "Trust isn't given; it's earned. And my surgeon here didn't just earn my trust, but my admiration.",
    author: "Michiko Miller",
    role: "Surgeon Clinic",
  },
];

const CountingNumber = ({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    amount: 0.5,
    margin: "-50px",
  });
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      count.set(0);
      animate(count, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (latest: number) => {
          if (ref.current) {
            const formattedValue = Math.round(latest).toLocaleString("en-US");
            ref.current.textContent = `${formattedValue}${suffix}`;
          }
        },
      });
    }
  }, [isInView, value, count, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
};

export default function Home() {
  return (
    <div className="bg-whitesmoke">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-white z-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="max-w-3xl">
            <h1 className="text-[64px] font-medium leading-tight mb-8 tracking-tight">
              LB Medica Spa & Wellness Centre
            </h1>
            <p className="text-xl text-neutral-600 mb-12 max-w-2xl leading-relaxed">
              At LB MedicSpa & Wellness Centre, we are dedicated to providing
              personalized care that nurtures both your body and mind.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-base font-medium text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105">
                Book Appointment
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 text-neutral-900 hover:text-neutral-600 transition-all duration-300 group">
                <PlayIcon className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Watch video</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="max-w-2xl mb-16">
            <h2 className="text-3xl font-medium mb-6 tracking-tight">
              Our Services
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              We offer expert treatments designed to help you look and feel your
              best, with a focus on your overall wellness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="group relative p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="mb-6">
                  <service.icon />
                </div>
                <h3 className="text-xl font-medium mb-3 tracking-tight">
                  {service.name}
                </h3>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-neutral-900 font-medium group-hover:text-neutral-600 transition-colors">
                  Learn more
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* About Section */}
      <div className="py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-medium mb-6 tracking-tight">
            Our range of services combines advanced medical aesthetics with
            holistic wellness approaches, ensuring you receive the highest
            standard of care in a tranquil and supportive environment. Whether
            you're seeking rejuvenation, relaxation, or a healthier lifestyle,
            we are here to guide you on your journey to enhanced beauty and
            well-being. Welcome to a new you—where science meets self-care.
          </h2>
        </div>
      </div>
      {/* Stats Section */}
      <div className="py-32 bg-whitesmoke">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="text-center">
                <div className="text-[56px] font-medium text-neutral-900 mb-2 tracking-tight">
                  <CountingNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xl text-neutral-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="max-w-2xl mb-16">
            <h2 className="text-3xl font-medium mb-6 tracking-tight">
              Client Stories
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Hear from our clients about their wellness journey with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  {testimonial.content}
                </p>
                <div>
                  <div className="font-medium text-neutral-900 tracking-tight">
                    {testimonial.author}
                  </div>
                  <div className="text-neutral-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 bg-whitesmoke">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-center">
            <h2 className="text-[56px] font-medium mb-8 tracking-tight">
              Because You Deserve to Feel Amazing—Every Day.
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Book your appointment and take the first step towards a healthier,
              more balanced you.
            </p>
            <Link
              to="/book-appointment"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-4 text-base font-medium text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105">
              Book Appointment
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
