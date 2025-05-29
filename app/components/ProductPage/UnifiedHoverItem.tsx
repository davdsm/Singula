import { motion } from "framer-motion";

interface UnifiedHoverItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  isClickable?: boolean;
  className?: string;
}

export const UnifiedHoverItem = ({
  children,
  onClick,
  href,
  download = false,
  isClickable = false,
  className = "",
}: UnifiedHoverItemProps) => {
  const Component = href ? motion.a : motion.div;

  const props = href
    ? {
        href,
        download: download ? true : undefined,
      }
    : {
        onClick,
      };

  return (
    <Component
      {...props}
      className={`flex items-center group ${
        isClickable || href ? "cursor-pointer" : ""
      } ${className}`}
      whileHover={{ scale: 1.02, x: 3 }}
      whileTap={isClickable || href ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="w-3 h-3 rounded-full mr-3 md:mr-4 flex-shrink-0"
        initial={{ backgroundColor: "#ffffff" }}
        whileHover={{
          backgroundColor: "#ef4444",
          boxShadow: "0 0 8px rgba(239, 68, 68, 0.3)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.div
        className="text-sm md:text-base lg:text-lg text-white group-hover:text-red-400 transition-colors duration-300 flex-1"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </Component>
  );
};
