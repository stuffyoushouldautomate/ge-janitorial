import React from 'react';
import { motion } from 'framer-motion';
import { Phone, FileText, Factory, Shield, Clock } from 'lucide-react';

interface HeroSectionProps {
  onRequestQuote: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRequestQuote }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/public/home/project/public/0c9ea2a3-bea9-4d2f-8a79-b3bf7be8ea74.png")',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-gray-900/90" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full opacity-10"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="text-blue-300">GE Janitorial</span>
              <br />
              <span className="text-yellow-400">Solutions</span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
              Premier Commercial Cleaning for Chicago's Industrial Facilities
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
              Warehouse & Industrial Facility Specialists
            </h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              OSHA-compliant cleaning protocols • 24/7 emergency response • 
              Specialized equipment decontamination • Regulatory compliance documentation
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex items-center text-blue-200">
                <Shield className="w-6 h-6 mr-2 text-green-400" />
                <span>OSHA Certified</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Clock className="w-6 h-6 mr-2 text-yellow-400" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Factory className="w-6 h-6 mr-2 text-blue-400" />
                <span>Industrial Specialists</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.a
              href="tel:+1-312-889-3324"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: (312) 889-3324
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;