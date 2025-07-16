import React from 'react';
import { motion } from 'framer-motion';

interface ChatButtonProps {
  onClick: () => void;
  config: {
    brandColors: {
      primary: string;
      accent: string;
    };
  };
  className?: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, config, className = "" }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-6 right-6 font-bold py-4 px-4 rounded-full shadow-lg z-40 flex items-center text-white ${className}`}
      style={{ backgroundColor: config.brandColors.primary }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <span className="hidden sm:inline mr-2">Chat Now</span>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        💬
      </motion.div>
    </motion.button>
  );
};

export default ChatButton;