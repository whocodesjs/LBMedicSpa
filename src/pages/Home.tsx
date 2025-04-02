import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, animate, useMotionValue } from "framer-motion";
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import {
  LaserIcon,
  MicroneedlingIcon,
  ChemicalPeelIcon,
  NeurotoxinInjectionIcon,
  IVVitaminIcon,
  HairLossTreatmentIcon,
  ConsultationIcon,
} from "../components/icons";

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
              Unwrap your path to wellness and rejuvenation
            </h1>
            <p className="text-xl text-neutral-600 mb-12 max-w-2xl leading-relaxed">
              Our team of expert practitioners has a passion for holistic
              wellness. For over 15 years, we've been helping people achieve
              their wellness goals through personalized care and innovative
              treatments.
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
              Experience our range of wellness treatments designed to enhance
              your well-being
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
                  <service.icon className="h-8 w-8 text-neutral-900" />
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
              Start your wellness journey today
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
