import React from "react";
import { motion } from "framer-motion";
import { ShoppingBagIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const upcomingProducts = [
  {
    title: "Essential Oils Collection",
    description: "Premium aromatherapy oils for your wellness journey",
    image: "/shop/essential-oils.jpg",
    category: "Aromatherapy",
  },
  {
    title: "Wellness Accessories",
    description: "Curated tools for your daily wellness routine",
    image: "/shop/accessories.jpg",
    category: "Lifestyle",
  },
  {
    title: "Skincare Line",
    description: "Natural and effective skincare solutions",
    image: "/shop/skincare.jpg",
    category: "Beauty",
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
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

export default function Shop() {
  return (
    <div className="relative min-h-screen bg-whitesmoke">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-3xl text-center mb-24">
          <motion.h1
            variants={fadeUpVariants}
            className="text-[64px] font-medium leading-tight mb-8">
            Coming Soon to Your Wellness Journey
          </motion.h1>
          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-neutral-600 leading-relaxed">
            We're crafting a collection of premium wellness products designed to
            enhance your self-care routine. Be the first to know when we launch.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {upcomingProducts.map((product, index) => (
            <motion.div
              key={product.title}
              variants={fadeUpVariants}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100 mb-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-neutral-500 mb-2 block">
                {product.category}
              </span>
              <h3 className="text-xl font-medium mb-2">{product.title}</h3>
              <p className="text-neutral-600 mb-6">{product.description}</p>
              <button className="inline-flex items-center text-neutral-900 font-medium group-hover:text-neutral-600 transition-colors">
                Notify me
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-neutral-900 mb-8">
            <ShoppingBagIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-medium mb-6">Join the Waitlist</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Be the first to know when our shop launches and receive exclusive
            early access to our premium wellness products.
          </p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
            <button className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-base font-medium text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
