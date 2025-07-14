import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import LeadForm from './LeadForm';
import ModalLeadForm from './ModalLeadForm';
import ChatModal from './ChatModal';

const LandingPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleRequestQuote = () => {
    setShowModal(true);
  };

  const handleRequestQuoteScroll = () => {
    setShowForm(true);
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenChat = () => {
    setShowChat(true);
  };
  return (
    <div className="min-h-screen">
      <HeroSection onRequestQuote={handleRequestQuote} />
      <ServicesSection />
      
      {/* Always show the form at the bottom */}
      <motion.div
        id="lead-form"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LeadForm />
      </motion.div>
      
      {/* Modal Form */}
      <ModalLeadForm 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
      
      {/* Chat Modal */}
      <ChatModal 
        isOpen={showChat} 
        onClose={() => setShowChat(false)} 
      />
      
      {/* Floating Chat Button */}
      <motion.button
        onClick={handleOpenChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full shadow-lg z-40 flex items-center"
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
    </div>
  );
};

export default LandingPage;