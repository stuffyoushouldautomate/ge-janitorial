import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Phone, 
  Mail, 
  Calendar,
  Factory,
  Loader2,
  User,
  Bot
} from 'lucide-react';
import { ChatModalProps } from '../types';
import { useChat } from '../hooks/useChat';

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, config }) => {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    inputRef,
    sendMessage,
    handleKeyPress
  } = useChat({
    apiEndpoint: config.apiEndpoint,
    welcomeMessage: config.welcomeMessage
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 md:inset-4 md:max-w-4xl md:max-h-[90vh] md:mx-auto md:my-auto bg-white md:rounded-2xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ height: '100vh', maxHeight: '100vh' }}
          >
            {/* Header */}
            <div 
              className="px-4 md:px-6 py-4 flex items-center justify-between md:rounded-t-2xl"
              style={{ 
                background: `linear-gradient(to right, ${config.brandColors.secondary}, ${config.brandColors.primary})` 
              }}
            >
              <div className="flex items-center">
                <Factory className="w-6 h-6 mr-3" style={{ color: config.brandColors.accent }} />
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    {config.companyName}
                  </h2>
                  <p className="text-blue-200 text-sm">
                    Get instant answers about our services
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Contact Info Bar - Desktop */}
            <div className="hidden md:flex bg-gray-50 px-6 py-3 border-b items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <a 
                  href={`tel:${config.companyPhone}`} 
                  className="flex items-center hover:opacity-80 transition-colors"
                  style={{ color: config.brandColors.primary }}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  {config.companyPhone}
                </a>
                <a 
                  href={`mailto:${config.companyEmail}`} 
                  className="flex items-center hover:opacity-80 transition-colors"
                  style={{ color: config.brandColors.primary }}
                >
                  <Mail className="w-4 h-4 mr-1" />
                  {config.companyEmail}
                </a>
              </div>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 rounded-lg font-medium transition-colors text-blue-900"
                style={{ backgroundColor: config.brandColors.accent }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Consultation
              </motion.a>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4" style={{ minHeight: 0 }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div 
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isUser ? 'text-white' : 'bg-gray-200'
                      }`}
                      style={{ 
                        backgroundColor: message.isUser ? config.brandColors.primary : undefined 
                      }}
                    >
                      {message.isUser ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div 
                      className={`rounded-2xl px-4 py-3 ${
                        message.isUser 
                          ? 'text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}
                      style={{ 
                        backgroundColor: message.isUser ? config.brandColors.primary : undefined 
                      }}
                    >
                      <p className="text-sm md:text-base whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isUser ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                        <span className="text-sm text-gray-600">Typing...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Contact Info Bar - Mobile */}
            <div className="md:hidden bg-gray-50 px-4 py-3 border-t">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <a 
                    href={`tel:${config.companyPhone}`} 
                    className="flex items-center text-sm"
                    style={{ color: config.brandColors.primary }}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </a>
                  <a 
                    href={`mailto:${config.companyEmail}`} 
                    className="flex items-center text-sm"
                    style={{ color: config.brandColors.primary }}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </a>
                </div>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-blue-900"
                  style={{ backgroundColor: config.brandColors.accent }}
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  Book
                </motion.a>
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t bg-white px-4 md:px-6 py-4 md:rounded-b-2xl">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={config.placeholderText}
                    className="w-full px-4 py-3 border border-gray-300 rounded-full outline-none transition-colors"
                    style={{ 
                      focusRingColor: config.brandColors.primary,
                      focusBorderColor: config.brandColors.primary 
                    }}
                    disabled={isLoading}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="text-white p-3 rounded-full transition-colors disabled:bg-gray-300"
                  style={{ 
                    backgroundColor: !inputValue.trim() || isLoading ? undefined : config.brandColors.primary 
                  }}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;