import React from "react";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const events = [
  {
    title: "Wellness Workshop",
    description:
      "Join us for an informative workshop on stress management and relaxation techniques.",
    image: "/events/workshop.jpg",
    date: "2024-04-15",
    time: "2:00 PM - 4:00 PM",
    location: "MedicSpa Wellness Center",
    price: "$49",
    badge: "Limited spots available",
  },
  {
    title: "Yoga & Meditation",
    description:
      "Experience the benefits of yoga and meditation with our expert instructors.",
    image: "/events/yoga.jpg",
    date: "2024-04-20",
    time: "9:00 AM - 10:30 AM",
    location: "MedicSpa Wellness Center",
    price: "$39",
    badge: "Open to all levels",
  },
  {
    title: "Nutrition Seminar",
    description:
      "Learn about healthy eating habits and nutrition for optimal wellness.",
    image: "/events/nutrition.jpg",
    date: "2024-04-25",
    time: "6:00 PM - 7:30 PM",
    location: "MedicSpa Wellness Center",
    price: "$29",
    badge: "Free refreshments included",
  },
];

const Events = () => {
  return (
    <div className="relative min-h-screen bg-whitesmoke pt-24 pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center">
          <h1 className="heading-1 mb-4">Events & Workshops</h1>
          <p className="subtitle mb-16">
            Join us for wellness events and educational workshops
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group">
              <div className="card-service h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="service-image"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="service-title">{event.title}</h2>
                  <p className="service-description">{event.description}</p>

                  <div className="mt-6 space-y-3">
                    <div className="service-metadata">
                      <CalendarIcon className="h-5 w-5 text-primary-500 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="service-metadata">
                      <ClockIcon className="h-5 w-5 text-primary-500 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="service-metadata">
                      <MapPinIcon className="h-5 w-5 text-primary-500 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xl font-semibold text-primary-600">
                      {event.price}
                    </span>
                    <span className="badge-primary">{event.badge}</span>
                  </div>

                  <button className="btn-primary mt-6">Register Now</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
