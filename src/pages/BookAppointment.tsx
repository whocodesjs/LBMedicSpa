import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  SparklesIcon,
  ChevronLeftIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfWeek, addDays } from "date-fns";

const services = [
  {
    id: 1,
    title: "Laser Hair Removal",
    duration: "60 minutes",
    price: "$80",
  },
  {
    id: 2,
    title: "Microneedling",
    duration: "90 minutes",
    price: "$120",
  },
  {
    id: 3,
    title: "Chemical Peel",
    duration: "75 minutes",
    price: "$100",
  },
  {
    id: 4,
    title: "Neurotoxin Injection",
    duration: "60 minutes",
    price: "$90",
  },
  {
    id: 5,
    title: "IV Vitamin Therapy",
    duration: "90 minutes",
    price: "$130",
  },
  {
    id: 6,
    title: "Consultation",
    duration: "30 minutes",
    price: "Free",
  },
];

const PointerFollower = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  // Bouncier spring config
  const springConfig = {
    damping: 15, // Reduced damping for more bounce
    stiffness: 150, // Reduced stiffness for more elastic feel
    mass: 0.8, // Added mass for more natural physics
  };

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      x.set(e.clientX - 25); // Center the larger ball
      y.set(e.clientY - 25);
    };

    const handleMouseDown = () => {
      scale.set(1.2);
    };

    const handleMouseUp = () => {
      scale.set(1);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [x, y, scale]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        scale: springScale,
        pointerEvents: "none",
        zIndex: 0, // Set below form content
      }}
      className="flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-primary-400/40 to-primary-600/40 backdrop-blur-md shadow-lg">
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-tr from-transparent to-white/20"
          style={{
            boxShadow:
              "inset -4px -4px 8px rgba(0,0,0,0.1), inset 4px 4px 8px rgba(255,255,255,0.2)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const ServiceOption = ({
  service,
  isSelected,
  onSelect,
  showOnlySelected = false,
}: {
  service: (typeof services)[0];
  isSelected: boolean;
  onSelect: () => void;
  showOnlySelected?: boolean;
}) => (
  <motion.button
    whileHover={{ scale: showOnlySelected ? 1 : 1.01 }}
    whileTap={{ scale: showOnlySelected ? 1 : 0.99 }}
    onClick={onSelect}
    className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 group
      ${
        isSelected
          ? "bg-primary-50 border-2 border-primary-500"
          : "bg-white/80 border-2 border-neutral-200/80 hover:border-neutral-300"
      }
      ${showOnlySelected ? "cursor-default" : ""}`}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`text-lg font-medium ${
              isSelected ? "text-primary-700" : "text-neutral-900"
            }`}>
            {service.title}
          </span>
          {service.price === "Free" && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-sm font-medium rounded-full">
              Free
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 text-sm text-neutral-500">
          <ClockIcon className="h-4 w-4" />
          <span>{service.duration}</span>
          {service.price !== "Free" && (
            <>
              <span className="text-neutral-300">•</span>
              <span>{service.price}</span>
            </>
          )}
        </div>
      </div>
      {!showOnlySelected && (
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
          ${
            isSelected
              ? "border-primary-500 bg-primary-500"
              : "border-neutral-300 group-hover:border-neutral-400"
          }`}>
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full bg-white"
            />
          )}
        </div>
      )}
    </div>
  </motion.button>
);

const DateOption = ({
  date,
  isSelected,
  onSelect,
}: {
  date: Date;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const dayName = format(date, "EEE");
  const dayNumber = format(date, "d");
  const month = format(date, "MMM");

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300
        ${
          isSelected
            ? "bg-primary-50 border-primary-500 shadow-sm"
            : "bg-white/80 border-neutral-200/80 hover:border-neutral-300"
        }`}>
      <span
        className={`text-sm font-medium mb-1 ${
          isSelected ? "text-primary-600" : "text-neutral-500"
        }`}>
        {dayName}
      </span>
      <span
        className={`text-2xl font-semibold ${
          isSelected ? "text-primary-700" : "text-neutral-900"
        }`}>
        {dayNumber}
      </span>
      <span
        className={`text-sm mt-1 ${
          isSelected ? "text-primary-600" : "text-neutral-500"
        }`}>
        {month}
      </span>
    </motion.button>
  );
};

const customStyles = {
  calendar: `
    .react-datepicker {
      @apply font-sans border-0 w-full;
    }
    .react-datepicker__month-container {
      @apply w-full;
    }
    .react-datepicker__header {
      @apply bg-transparent border-0 pb-4;
    }
    .react-datepicker__navigation {
      @apply top-3;
    }
    .react-datepicker__navigation--previous {
      @apply left-2;
    }
    .react-datepicker__navigation--next {
      @apply right-2;
    }
    .react-datepicker__current-month {
      @apply text-xl font-medium text-neutral-900 mb-4;
    }
    .react-datepicker__day-names {
      @apply border-b border-neutral-200/60 pb-2 mb-4;
    }
    .react-datepicker__day-name {
      @apply text-sm font-medium text-neutral-500 w-10 mx-0.5;
    }
    .react-datepicker__month {
      @apply m-0;
    }
    .react-datepicker__day {
      @apply text-base font-normal text-neutral-900 w-10 h-10 leading-10 mx-0.5 mb-1 rounded-full
        hover:bg-primary-50 hover:text-primary-600 transition-colors relative;
    }
    .react-datepicker__day--selected {
      @apply bg-primary-500 text-white hover:bg-primary-600 hover:text-white;
    }
    .react-datepicker__day--keyboard-selected {
      @apply bg-primary-50 text-primary-600 hover:bg-primary-100;
    }
    .react-datepicker__day--outside-month {
      @apply text-neutral-400;
    }
    .react-datepicker__day--disabled {
      @apply text-neutral-300 hover:bg-transparent cursor-not-allowed;
    }
  `,
};

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showServiceList, setShowServiceList] = useState(true);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [weekStartDate, setWeekStartDate] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );

  // Interactive motion effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovered) return;
    const { left, top } = ref.current?.getBoundingClientRect() ?? {
      left: 0,
      top: 0,
    };
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [0, 300], [2, -2]);
  const rotateY = useTransform(x, [0, 700], [-2, 2]);

  // Get available times
  const getAvailableTimes = () => {
    if (!selectedDate) return [];
    const times = [];
    const date = new Date(selectedDate);

    // Set different hours based on weekday/weekend
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const startHour = isWeekend ? 11 : 16.5; // 4:30 PM on weekdays, 11 AM on weekends
    const endHour = isWeekend ? 17 : 18.5; // 6:30 PM on weekdays, 5 PM on weekends

    for (let hour = startHour; hour < endHour; hour += 0.5) {
      const timeSlot = new Date(date);
      timeSlot.setHours(Math.floor(hour));
      timeSlot.setMinutes((hour % 1) * 60);
      times.push(timeSlot);
    }

    return times;
  };

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

  // Function to get week dates based on a reference date
  const getWeekDates = (referenceDate: Date) => {
    const weekStart = startOfWeek(referenceDate, { weekStartsOn: 0 });
    return Array.from({ length: 7 }).map((_, index) =>
      addDays(weekStart, index)
    );
  };

  // Update week view when date is selected
  const handleDateSelection = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setSelectedTime(null);
      setWeekStartDate(startOfWeek(date, { weekStartsOn: 0 }));
      setShowFullCalendar(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16 relative overflow-hidden">
      <PointerFollower />
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">
          <h1 className="text-[64px] font-medium leading-tight mb-4">
            Book your wellness journey
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Schedule your personalized wellness session with our expert
            practitioners. Let us help you achieve balance and rejuvenation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10 relative z-10">
            <div>
              <h2 className="text-2xl font-medium mb-4">Available Hours</h2>
              <div className="space-y-3 text-neutral-600">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Monday - Friday: 4:30 PM - 6:30 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Saturday & Sunday: 11:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4">Location</h2>
              <p className="text-neutral-600">
                AVIV Dental & Aesthetics
                <br />
                2-6 South Avenue Road
                <br />
                Shop #6, Lane Plaza
                <br />
                Kingston, Jamaica
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4">Contact</h2>
              <p className="text-neutral-600">
                Email: drsummermgraham@gmail.com
                <br />
                Phone: (876) 822-5525
              </p>
            </div>
          </motion.div>

          <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative perspective-1000">
            <motion.div
              style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transition: "all 0.1s ease-out",
              }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-lg p-8 space-y-8 relative z-20">
              <div>
                <h2 className="text-2xl font-medium text-neutral-900 mb-6">
                  Book Appointment
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-lg text-neutral-900">
                        {showServiceList
                          ? "Select Service"
                          : "Selected Service"}
                      </label>
                      {!showServiceList && (
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          onClick={() => setShowServiceList(true)}
                          className="flex items-center gap-1 text-primary-600 hover:text-primary-700 transition-colors">
                          <ChevronLeftIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Change Service
                          </span>
                        </motion.button>
                      )}
                    </div>
                    <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2 -mr-2">
                      {showServiceList
                        ? services.map((service) => (
                            <ServiceOption
                              key={service.id}
                              service={service}
                              isSelected={selectedService === service.id}
                              onSelect={() => {
                                setSelectedService(service.id);
                                setShowServiceList(false);
                              }}
                            />
                          ))
                        : selectedService && (
                            <ServiceOption
                              service={
                                services.find((s) => s.id === selectedService)!
                              }
                              isSelected={true}
                              onSelect={() => {}}
                              showOnlySelected={true}
                            />
                          )}
                    </div>
                  </div>

                  {selectedService && !showServiceList && (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-lg text-neutral-900">
                            Select Date
                          </label>
                          <div className="flex items-center gap-3">
                            {selectedDate && (
                              <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                onClick={() => setSelectedDate(null)}
                                className="flex items-center gap-1 text-primary-600 hover:text-primary-700 transition-colors">
                                <ChevronLeftIcon className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                  Change Date
                                </span>
                              </motion.button>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                setShowFullCalendar(!showFullCalendar)
                              }
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors
                                ${
                                  showFullCalendar
                                    ? "bg-primary-100 text-primary-700"
                                    : "text-neutral-600 hover:text-primary-600"
                                }`}>
                              <CalendarDaysIcon className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                {showFullCalendar
                                  ? "Show Week"
                                  : "View Calendar"}
                              </span>
                            </motion.button>
                          </div>
                        </div>

                        <div className="relative">
                          {/* Week View */}
                          <motion.div
                            initial={false}
                            animate={{
                              opacity: showFullCalendar ? 0 : 1,
                              scale: showFullCalendar ? 0.98 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            style={{
                              display: showFullCalendar ? "none" : "block",
                            }}>
                            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-4">
                              {getWeekDates(weekStartDate).map((date) => (
                                <DateOption
                                  key={date.toISOString()}
                                  date={date}
                                  isSelected={
                                    selectedDate?.toDateString() ===
                                    date.toDateString()
                                  }
                                  onSelect={() => {
                                    setSelectedDate(date);
                                    setSelectedTime(null);
                                  }}
                                />
                              ))}
                            </div>
                          </motion.div>

                          {/* Calendar View */}
                          <motion.div
                            initial={false}
                            animate={{
                              opacity: showFullCalendar ? 1 : 0,
                              scale: showFullCalendar ? 1 : 0.98,
                            }}
                            transition={{ duration: 0.2 }}
                            style={{
                              display: showFullCalendar ? "block" : "none",
                            }}
                            className="rounded-2xl border-2 border-neutral-200/80 bg-white/80 backdrop-blur-sm p-6">
                            <style>{customStyles.calendar}</style>
                            <DatePicker
                              selected={selectedDate}
                              onChange={handleDateSelection}
                              inline
                              minDate={new Date()}
                              showPopperArrow={false}
                              renderCustomHeader={({
                                date,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled,
                              }) => (
                                <div className="flex items-center justify-between px-2">
                                  <button
                                    onClick={decreaseMonth}
                                    disabled={prevMonthButtonDisabled}
                                    className="p-1.5 rounded-full hover:bg-neutral-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors">
                                    <ChevronLeftIcon className="w-5 h-5 text-neutral-600" />
                                  </button>
                                  <h2 className="text-xl font-medium text-neutral-900">
                                    {format(date, "MMMM yyyy")}
                                  </h2>
                                  <button
                                    onClick={increaseMonth}
                                    disabled={nextMonthButtonDisabled}
                                    className="p-1.5 rounded-full hover:bg-neutral-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors">
                                    <ChevronLeftIcon className="w-5 h-5 text-neutral-600 rotate-180" />
                                  </button>
                                </div>
                              )}
                            />
                          </motion.div>

                          {!selectedDate && (
                            <div className="flex items-center gap-3 mt-2 px-1">
                              <CalendarIcon className="h-5 w-5 text-neutral-400" />
                              <span className="text-sm text-neutral-500">
                                Select a date to see available times
                              </span>
                            </div>
                          )}

                          <motion.div
                            initial={false}
                            animate={{
                              height: selectedDate ? "auto" : 0,
                              opacity: selectedDate ? 1 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden">
                            {selectedDate && (
                              <div className="pt-6">
                                <label className="block text-lg text-neutral-900 mb-3">
                                  Available Times
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                  {getAvailableTimes()
                                    .slice(0, 6)
                                    .map((time) => (
                                      <motion.button
                                        key={time.toISOString()}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedTime(time)}
                                        className={`flex flex-col items-center justify-center py-4 px-3 rounded-2xl border-2 transition-all duration-300
                                        ${
                                          selectedTime?.getTime() ===
                                          time.getTime()
                                            ? "border-primary-500 bg-primary-50 text-primary-700"
                                            : "border-neutral-200 hover:border-neutral-300 bg-white/80"
                                        }`}>
                                        <span className="text-lg font-medium">
                                          {format(time, "h:mm")}
                                        </span>
                                        <span className="text-sm mt-1 text-neutral-500">
                                          {format(time, "a")}
                                        </span>
                                      </motion.button>
                                    ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </div>
                      </div>

                      {selectedDate && selectedTime && (
                        <div className="space-y-4">
                          <h3 className="text-lg text-neutral-900 mb-3">
                            Your Information
                          </h3>
                          <div className="space-y-4">
                            <input
                              type="text"
                              placeholder="Full Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full rounded-2xl border border-neutral-200 py-4 px-4 text-lg text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:ring-0 transition-all duration-300 hover:border-neutral-300"
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-2xl border border-neutral-200 py-4 px-4 text-lg text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:ring-0 transition-all duration-300 hover:border-neutral-300"
                              />
                              <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full rounded-2xl border border-neutral-200 py-4 px-4 text-lg text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:ring-0 transition-all duration-300 hover:border-neutral-300"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={
                  !selectedService ||
                  !selectedDate ||
                  !selectedTime ||
                  !name ||
                  !email ||
                  !phone
                }
                className="w-full rounded-2xl bg-primary-600 py-4 px-6 text-lg font-medium text-white shadow-sm hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
                Book Appointment
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
