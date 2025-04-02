import React from "react";
import { HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface NewsCardProps {
  title: string;
  description: string;
  location: string;
  date: string;
  liked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
}

export default function NewsCard({
  title,
  description,
  location,
  date,
  liked = false,
  onLike,
  onComment,
}: NewsCardProps) {
  return (
    <div className="group">
      <div className="card-news">
        <div className="flex flex-col gap-4">
          {/* Content */}
          <div>
            <h3 className="news-title">{title}</h3>
            <p className="news-description">{description}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{location}</span>
              <time className="news-metadata">{date}</time>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onLike}
                className="btn-icon"
                aria-label={liked ? "Unlike" : "Like"}>
                {liked ? (
                  <HeartIconSolid className="h-5 w-5 text-danger" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={onComment}
                className="btn-icon"
                aria-label="Comment">
                <ChatBubbleLeftIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
