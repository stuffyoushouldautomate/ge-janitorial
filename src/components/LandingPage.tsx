import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import LeadForm from './LeadForm';
import ModalLeadForm from './ModalLeadForm';
import { ChatModal, ChatButton, createChatConfig } from '../modules/chat';

const LandingPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const chatConfig = createChatConfig({
    companyName: "GE Janitorial Assistant",
    companyPhone: "(312) 889-3324",
    companyEmail: "info@gejanitorialsolutions.com",
    apiEndpoint: "https://flowise-production-1547.up.railway.app/api/v1/prediction/1799f45d-99ea-4dcc-b7b3-a5c7f4dfb435",
    brandColors: {
      primary: "#2563eb", // blue-600
      secondary: "#1e40af", // blue-800
      accent: "#eab308" // yellow-500
    },
    welcomeMessage: "Hi! I'm here to help you with your industrial cleaning needs. What can I assist you with today?",
    placeholderText: "Ask about our cleaning services..."
  });

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
        config={chatConfig}
      />
      
      {/* Floating Chat Button */}
      <ChatButton 
        onClick={() => setShowChat(true)}
        config={chatConfig}
      />
    </div>
  );
};

export default LandingPage;