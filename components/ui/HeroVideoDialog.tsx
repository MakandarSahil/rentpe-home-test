// components/ui/HeroVideoDialog.jsx
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react"; // Kept for the original thumbnail interaction, though it's now internal
import { AnimatePresence, motion } from "framer-motion"; // Changed from motion/react to framer-motion as it's more standard
import { Play, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string; // Still useful if you want to show a thumbnail *before* the video loads in the dialog
  thumbnailAlt?: string;
  className?: string;
  onClose: () => void; // Added onClose prop
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc, // This thumbnail is only relevant if HeroVideoDialog was clickable *before* being a modal
  thumbnailAlt = "Video thumbnail",
  className,
  onClose, // Destructure onClose prop
}: HeroVideoProps) {
  // isVideoOpen state is now managed by the parent (Hero component)
  // const [isVideoOpen, setIsVideoOpen] = useState(false); // Removed as parent manages this
  const selectedAnimation = animationVariants[animationStyle];

  return (
    // The AnimatePresence now wraps the direct modal content, as it's always rendered conditionally by parent
    <AnimatePresence>
      {/* The following div acts as the modal overlay and can be clicked to close */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose} // Close dialog when backdrop is clicked
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      >
        <motion.div
          {...selectedAnimation}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
          onClick={(e) => e.stopPropagation()} // Prevent closing dialog when clicking inside the video container
        >
          {/* Close button */}
          <motion.button
            className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black"
            onClick={onClose} // Close dialog when X icon is clicked
          >
            <XIcon className="size-5" />
          </motion.button>
          {/* Video iframe container */}
          <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
            <iframe
              src={videoSrc}
              className="size-full rounded-2xl"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}