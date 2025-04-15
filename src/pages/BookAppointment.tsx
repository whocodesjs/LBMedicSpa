import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarIcon } from "@heroicons/react/24/outline";

const BookAppointment = () => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-whitesmoke pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
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
            className="space-y-10">
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
              <h2 className="text-2xl font-medium mb-4">Consultation Hours</h2>
              <div className="space-y-3 text-neutral-600">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Monday - Friday: 4:30 PM - 7:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Saturday: 11:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Sunday: 12:00 PM - 4:00 PM</span>
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
                Email: hello@medicspa.com
                <br />
                Phone: (876) 822-5525
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-1">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/whocodesjs/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=f8f8f8&text_color=1a1a1a&primary_color=1a1a1a"
              style={{
                minWidth: "320px",
                height: "650px",
                borderRadius: "1rem",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
