"use client";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

const Divider = ({ show, delay }: { show: boolean; delay: number }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="block lg:hidden">
          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 0.5,
              scaleX: 1,
              transition: {
                duration: delay,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              scaleX: 1.2,
              transition: {
                duration: delay * 5,
                ease: "easeInOut",
              },
            }}
            className="h-px bg-zinc-50 absolute left-0 right-0"
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default Divider;
