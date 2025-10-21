import { motion, AnimatePresence } from "framer-motion";
import { useTransitionContext } from "~/context/TransitionContext";

export const TransitionOverlay = () => {
  const { isTransitioning } = useTransitionContext();

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          key="transition-overlay"
          className="fixed inset-0 bg-black z-40 w-full h-full"
          initial={{ x: "-100%" }}        // start off-screen to the left
          animate={{ x: 0 }}              // slide in to cover screen
          exit={{ x: "100%" }}            // slide out to the right
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
      )}
    </AnimatePresence>
  );
};
