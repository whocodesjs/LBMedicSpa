import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  StarIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Wellness Enthusiast",
    rating: 5,
    comment:
      "The massage therapy session was exactly what I needed. The staff is professional and caring, and the atmosphere is so peaceful and welcoming.",
    date: "March 15, 2024",
    image: "/testimonials/sarah.jpg",
  },
  {
    name: "Michael Chen",
    role: "Fitness Trainer",
    rating: 5,
    comment:
      "The facial treatment was exceptional. My skin feels rejuvenated and glowing. The attention to detail and personalized care made all the difference.",
    date: "March 10, 2024",
    image: "/testimonials/michael.jpg",
  },
  {
    name: "Emily Brown",
    role: "Yoga Instructor",
    rating: 5,
    comment:
      "The hot stone therapy was incredible. The therapist was very skilled and attentive to my needs. I left feeling completely renewed.",
    date: "March 5, 2024",
    image: "/testimonials/emily.jpg",
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

export default function Reviews() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  return (
    <div className="relative min-h-screen bg-whitesmoke">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-3xl text-center mb-24">
          <motion.div variants={fadeUpVariants}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-neutral-900 mb-8">
              <ChatBubbleBottomCenterTextIcon className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          <motion.h1
            variants={fadeUpVariants}
            className="text-[64px] font-medium leading-tight mb-8">
            What Our Clients Say
          </motion.h1>
          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-neutral-600 leading-relaxed">
            Discover how our wellness services have transformed the lives of our
            clients and helped them achieve their wellness goals.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              variants={fadeUpVariants}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-neutral-900">
                    {review.name}
                  </h3>
                  <p className="text-sm text-neutral-500">{review.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? "text-yellow-400" : "text-neutral-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-neutral-600 mb-6">{review.comment}</p>
              <p className="text-sm text-neutral-500">{review.date}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-medium mb-6">Share Your Experience</h2>
          <p className="text-lg text-neutral-600 mb-8">
            We'd love to hear about your wellness journey with us. Your feedback
            helps us improve and inspire others.
          </p>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-base font-medium text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105">
            Write a Review
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
      </div>

      {/* Review Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
            <h3 className="text-2xl font-medium mb-6">Write a Review</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        setNewReview({ ...newReview, rating: rating })
                      }
                      className="focus:outline-none">
                      <StarIcon
                        className={`h-6 w-6 ${
                          rating <= newReview.rating
                            ? "text-yellow-400 fill-current"
                            : "text-neutral-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="px-6 py-3 text-neutral-600 hover:text-neutral-900 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("Submitting review:", newReview);
                    setIsDialogOpen(false);
                  }}
                  disabled={
                    !newReview.name || !newReview.rating || !newReview.comment
                  }
                  className="px-6 py-3 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
