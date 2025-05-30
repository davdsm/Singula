import { motion } from "framer-motion";

interface AnimatedButtonProps {
  primaryText: string;
  secondaryText: string;
  onClick?: () => void;
  className?: string;
}

export const AnimatedButton = ({
  primaryText,
  secondaryText,
  onClick,
  className = "",
}: AnimatedButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`bg-black rounded-full font-bold text-sm md:text-base transition-colors uppercase tracking-wider shadow-lg inline-flex items-center p-1 group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.span
        className="bg-red-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full uppercase font-bold transition-all duration-300"
        whileHover={{
          backgroundColor: "#dc2626",
          boxShadow: "0 0 15px rgba(239, 68, 68, 0.4)",
        }}
      >
        {primaryText}
      </motion.span>
      <motion.span
        className="px-4 py-2 md:px-6 md:py-3 text-red-500 uppercase font-bold transition-colors duration-300 group-hover:text-red-400"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        {secondaryText}
      </motion.span>
    </motion.button>
  );
};
