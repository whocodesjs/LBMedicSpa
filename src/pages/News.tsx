import React, { useState } from "react";
import { motion } from "framer-motion";
import NewsCard from "../components/NewsCard";

const newsItems = [
  {
    id: 1,
    title: "New Street Light Installation",
    description:
      "New LED street lights have been installed along King Street between James and John.",
    location: "Downtown Hamilton",
    date: "2024-03-29",
  },
  {
    id: 2,
    title: "Community Garden Opening",
    description:
      "A new community garden is opening this spring, offering plots for local residents.",
    location: "Westdale",
    date: "2024-03-28",
  },
  {
    id: 3,
    title: "Road Construction Update",
    description:
      "Major road construction on Main Street will begin next week. Please plan alternate routes.",
    location: "Central Hamilton",
    date: "2024-03-27",
  },
];

export default function News() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (id: number) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  const handleComment = (id: number) => {
    console.log("Comment on post:", id);
  };

  return (
    <div className="relative pt-24">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="heading-2">Latest Updates</h1>
          <p className="subtitle mt-2">
            Stay informed about what's happening in your community
          </p>
        </div>

        <div className="space-y-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}>
              <NewsCard
                title={item.title}
                description={item.description}
                location={item.location}
                date={new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                liked={likedPosts.includes(item.id)}
                onLike={() => handleLike(item.id)}
                onComment={() => handleComment(item.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
