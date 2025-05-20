import { motion } from "framer-motion";
import { useTransitionContext } from "~/context/TransitionContext";

export const TransitionOverlay = () => {
  const { isTransitioning } = useTransitionContext();

  return isTransitioning ? (
    <motion.div
      className="fixed inset-0 bg-black z-40 flex items-center justify-center w-[200vw] h-dvh"
      initial={{ x: "-200vw" }}
      animate={{ x: "200vw" }}
      transition={{ duration: 2.6, delay: 0, ease: "easeInOut" }}
      exit={{ x: "200vw" }}
    ></motion.div>
  ) : null;
};
