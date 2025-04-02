import React, { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
}

const categories = ["All", "Wellness", "Aromatherapy", "Nutrition"];

const blogPosts = [
  {
    title: "The Benefits of Regular Massage Therapy",
    excerpt:
      "Discover how regular massage therapy can improve your physical and mental well-being.",
    image: "/blog/massage-benefits.jpg",
    date: "2024-03-15",
    readTime: "5 min read",
    author: "Dr. Sarah Johnson",
    category: "Wellness",
  },
  {
    title: "Essential Oils for Stress Relief",
    excerpt:
      "Learn about the most effective essential oils for managing stress and anxiety.",
    image: "/blog/essential-oils.jpg",
    date: "2024-03-10",
    readTime: "4 min read",
    author: "Dr. Michael Chen",
    category: "Aromatherapy",
  },
  {
    title: "Healthy Eating for Better Skin",
    excerpt:
      "Explore the connection between nutrition and skin health with expert tips.",
    image: "/blog/skin-nutrition.jpg",
    date: "2024-03-05",
    readTime: "6 min read",
    author: "Dr. Emily Brown",
    category: "Nutrition",
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

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="relative min-h-screen bg-whitesmoke">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center mb-16">
          <motion.h1
            variants={fadeUpVariants}
            className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl mb-4">
            Wellness Journal
          </motion.h1>
          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-neutral-600 font-light leading-relaxed">
            Expert insights and practical advice for your wellness journey
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12">
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "bg-white/80 text-neutral-600 hover:bg-white backdrop-blur-sm"
                }`}>
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.title}
              variants={fadeUpVariants}
              whileHover={{ y: -2 }}
              transition={springTransition}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative h-48 overflow-hidden bg-neutral-50">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-primary-600">
                    {post.category}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-sm text-neutral-500 font-light">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3 line-clamp-2 flex-shrink-0">
                  {post.title}
                </h2>

                <p className="text-base text-neutral-600 font-light line-clamp-2 mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-4 w-4 text-neutral-400" />
                    <span className="text-sm text-neutral-500 font-light">
                      {post.author}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ x: 2 }}
                    transition={springTransition}
                    className="text-sm text-primary-600 font-medium group-hover:text-primary-700">
                    Read more
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
