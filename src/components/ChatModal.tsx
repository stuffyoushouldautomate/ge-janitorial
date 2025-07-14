import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  MessageCircle, 
  Phone, 
  Mail, 
  Calendar,
  Factory,
  Loader2,
  User,
  Bot
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to help you with your industrial cleaning needs. What can I assist you with today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure modal is fully rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const query = async (data: { question: string }) => {
    const response = await fetch(
      "https://flowise-production-1547.up.railway.app/api/v1/prediction/1799f45d-99ea-4dcc-b7b3-a5c7f4dfb435",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    const result = await response.json();
    return result;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await query({ question: inputValue });
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || response.message || "I'm sorry, I couldn't process that request. Please try again.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing some technical difficulties. Please try again or contact us directly at (313) 889-3324.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 md:px-6 py-4 flex items-center justify-between md:rounded-t-2xl">
              <div className="flex items-center">
                <Factory className="w-6 h-6 text-yellow-400 mr-3" />
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    GE Janitorial Assistant
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
                            <a href="tel:+1-313-889-3324" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <Phone className="w-4 h-4 mr-1" />
              (313) 889-3324
                </a>
                <a href="mailto:info@gejanitorial.com" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <Mail className="w-4 h-4 mr-1" />
                  info@gejanitorial.com
                </a>
              </div>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-medium transition-colors"
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
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser ? 'bg-blue-600' : 'bg-gray-200'
                    }`}>
                      {message.isUser ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.isUser 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
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
                            <a href="tel:+1-313-889-3324" className="flex items-center text-blue-600 text-sm">
            <Phone className="w-4 h-4 mr-1" />
                    Call
                  </a>
                  <a href="mailto:info@gejanitorial.com" className="flex items-center text-blue-600 text-sm">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </a>
                </div>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-yellow-500 text-blue-900 px-3 py-1.5 rounded-lg text-sm font-medium"
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
                    placeholder="Ask about our cleaning services..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    disabled={isLoading}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors"
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