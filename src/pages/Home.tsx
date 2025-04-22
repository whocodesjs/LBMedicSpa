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
    <div className="bg-whitesmoke relative">
      {/* Hero Section */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-screen w-full">
          <div className="absolute inset-0">
            <img
              src="/assets/hero_img.jpg"
              alt="Professional medical spa treatment"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ objectPosition: "50% 30%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl">
            <h1 className="text-5xl font-light tracking-tight text-white sm:text-7xl">
              Elevate Your Natural Beauty
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-gray-100 font-light">
              Experience the perfect blend of advanced medical expertise and
              luxurious spa treatments.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/book-appointment"
                className="rounded-full bg-white/90 backdrop-blur-sm px-8 py-4 text-sm font-medium text-neutral-900 shadow-sm hover:bg-white transition-all">
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="text-sm font-medium leading-6 text-white flex items-center group">
                Explore Services{" "}
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative bg-white">
        {/* Featured Services */}
        <div className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mb-16">
              <h2 className="text-3xl font-light mb-6">Featured Services</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-6 rounded-xl hover:bg-neutral-50 transition-all duration-300">
                  <div className="mb-4">
                    <service.icon />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{service.name}</h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <Link
                    to={`/services/${service.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="inline-flex items-center text-sm text-neutral-900 font-medium group-hover:text-neutral-600 transition-colors">
                    Learn more
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats & About Combined Section */}
        <div className="py-24 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-16">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="border-l-2 border-neutral-200 pl-8">
                    <div className="text-4xl font-light mb-2">
                      <CountingNumber value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-lg text-neutral-600 leading-relaxed">
                <p className="mb-6">
                  Our range of services combines advanced medical aesthetics
                  with holistic wellness approaches, ensuring you receive the
                  highest standard of care in a tranquil and supportive
                  environment.
                </p>
                <p>
                  Whether you're seeking rejuvenation, relaxation, or a
                  healthier lifestyle, we are here to guide you on your journey
                  to enhanced beauty and well-being.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Testimonials Section - Simplified */}
        <div className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <blockquote key={testimonial.author} className="relative">
                  <p className="text-lg font-light text-neutral-600 mb-4">
                    "{testimonial.content}"
                  </p>
                  <footer className="text-sm">
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-neutral-500">{testimonial.role}</div>
                  </footer>
                </blockquote>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA Section - Minimalist */}
        <div className="py-24 bg-neutral-900 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-light mb-8">
                Begin Your Wellness Journey Today
              </h2>
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition-all">
                Book Your Appointment
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
