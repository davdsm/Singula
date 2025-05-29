import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface PopupContent {
  title: string;
  description: string;
  image?: string;
}

interface MaterialPopupProps {
  isOpen: boolean;
  content: PopupContent | null;
  onClose: () => void;
}

export const MaterialPopup = ({
  isOpen,
  content,
  onClose,
}: MaterialPopupProps) => {
  const { t } = useTranslation();

  if (!content) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gray-400 bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden relative flex"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="w-1/4 bg-gradient-to-br from-orange-400 to-orange-500 relative overflow-hidden">
              {content.image ? (
                <img
                  src={content.image}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-500"></div>
              )}
            </div>

            <div className="w-3/4 p-8 flex flex-col justify-start">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl font-bold mb-6 text-black"
              >
                {content.title}
              </motion.h2>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-gray-800 leading-relaxed text-sm overflow-y-auto flex-1 pr-2"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#CBD5E0 transparent",
                }}
              >
                <p className="text-justify">{content.description}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
