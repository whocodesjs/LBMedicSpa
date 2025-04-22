import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  XMarkIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface Service {
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  badge: string;
  features?: string[];
}

interface BookingCardProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.2, 0.0, 0.0, 1.0], // iOS cubic-bezier
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.2, 0.0, 0.0, 1.0],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.2, 0.0, 0.0, 1.0],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.2, 0.0, 0.0, 1.0],
    },
  },
};

const BookingCard: React.FC<BookingCardProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!service) return null;

  // Filter available times (9 AM to 5 PM, every hour)
  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  // Get available times for the selected date
  const getAvailableTimes = () => {
    if (!selectedDate) return [];
    const times = [];
    const date = new Date(selectedDate);
    date.setHours(9, 0, 0, 0); // Start at 9 AM

    while (date.getHours() < 17) {
      // Until 5 PM
      times.push(new Date(date));
      date.setHours(date.getHours() + 1);
    }

    return times;
  };

  // Format time to AM/PM
  const formatTime = (time: Date) => {
    return time
      .toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
      .split(" ")
      .map((part, index) =>
        index === 0 ? (
          part
        ) : (
          <div key={index} className="text-sm mt-1">
            {part}
          </div>
        )
      );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          open={isOpen}
          onClose={onClose}
          className="relative z-[100]">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-lg"
            aria-hidden="true"
            onClick={onClose}
          />

          <div className="fixed inset-0 flex items-center justify-center">
            <div className="w-full flex items-center justify-center p-4">
              <Dialog.Panel
                as={motion.div}
                variants={cardVariants}
                className="relative w-full max-w-lg rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl">
                <div className="absolute -top-3 right-3 sm:-right-3 sm:-top-3 z-10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/100 transition-all duration-300">
                    <XMarkIcon className="h-5 w-5 text-neutral-600" />
                  </motion.button>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="space-y-8">
                    {/* Service Header */}
                    <div className="flex items-start gap-6">
                      <div className="w-1/3 aspect-square overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
                        <motion.img
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.2, 0.0, 0.0, 1.0],
                          }}
                          src={service.image}
                          alt={service.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 pt-1">
                        <span className="inline-flex items-center rounded-full bg-primary-50/80 px-3 py-1 text-sm font-medium text-primary-700">
                          {service.badge}
                        </span>
                        <Dialog.Title className="mt-2.5 text-2xl font-semibold text-neutral-900 tracking-tight">
                          {service.title}
                        </Dialog.Title>
                        <Dialog.Description className="mt-2 text-base text-neutral-600 leading-relaxed line-clamp-2">
                          {service.description}
                        </Dialog.Description>
                        <div className="flex items-center gap-4 mt-3 text-sm text-neutral-700">
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1.5 text-neutral-500" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="h-4 w-4 mr-1 text-neutral-500" />
                            <span>{service.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time Selection */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-medium text-neutral-900 mb-2.5">
                          Select Date
                        </label>
                        <div className="relative group">
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {
                              setSelectedDate(date);
                              setSelectedTime(null);
                            }}
                            minDate={new Date()}
                            filterDate={(date) => date.getDay() !== 0}
                            placeholderText="Select a date"
                            className="w-full rounded-2xl border-2 border-neutral-200/80 py-3.5 pl-4 pr-12 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:ring-0 transition-all duration-300 hover:border-neutral-300/80"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <CalendarDaysIcon className="h-5 w-5 text-neutral-400 group-hover:text-neutral-500 transition-colors duration-300" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-neutral-900 mb-2.5">
                          Available Times
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedDate ? (
                            getAvailableTimes()
                              .slice(0, 6)
                              .map((time) => (
                                <motion.button
                                  key={time.toISOString()}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setSelectedTime(time)}
                                  className={`flex flex-col items-center justify-center rounded-2xl border-2 py-3.5 px-3 transition-all duration-300
                                  ${
                                    selectedTime?.getTime() === time.getTime()
                                      ? "border-primary-500 bg-primary-50/50 text-primary-700 shadow-sm"
                                      : "border-neutral-200/80 text-neutral-900 hover:border-primary-500/70 hover:bg-primary-50/30"
                                  } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}>
                                  {formatTime(time)}
                                </motion.button>
                              ))
                          ) : (
                            <p className="col-span-3 text-base text-neutral-500 italic py-3.5 px-4 rounded-2xl border-2 border-dashed border-neutral-200/80 bg-neutral-50/50">
                              Please select a date first
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Terms and Action Buttons */}
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="flex h-6 items-center">
                          <motion.input
                            whileTap={{ scale: 0.9 }}
                            id="terms"
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="h-5 w-5 rounded-lg border-2 border-neutral-300 text-primary-600 focus:ring-primary-500/20 cursor-pointer transition-all duration-300"
                          />
                        </div>
                        <div className="ml-3">
                          <label
                            htmlFor="terms"
                            className="text-base text-neutral-600 cursor-pointer select-none">
                            I agree to the{" "}
                            <button className="text-primary-600 hover:text-primary-700 font-medium underline-offset-2 hover:underline">
                              terms and conditions
                            </button>
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={
                            !selectedDate || !selectedTime || !agreedToTerms
                          }
                          className="flex-1 rounded-2xl bg-primary-600 px-6 py-3.5 text-base font-medium text-white shadow-sm hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
                          Book Appointment
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={onClose}
                          className="flex-1 rounded-2xl bg-neutral-100 px-6 py-3.5 text-base font-medium text-neutral-900 hover:bg-neutral-200 transition-all duration-300">
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default BookingCard;
