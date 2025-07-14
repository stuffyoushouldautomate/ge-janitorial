import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  Download, 
  Phone, 
  Mail, 
  ArrowLeft,
  FileText,
  Calendar,
  User
} from 'lucide-react';

const StatusPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);
  const [referenceNumber, setReferenceNumber] = useState<string>('');

  useEffect(() => {
    const savedData = sessionStorage.getItem('leadFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
      // Generate reference number
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substr(2, 5);
      setReferenceNumber(`GE-${timestamp}-${random}`.toUpperCase());
    } else {
      // Redirect if no form data
      navigate('/');
    }
  }, [navigate]);

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const handleDownloadCatalog = () => {
    // In a real app, this would download an actual PDF
    alert('Service catalog download would begin here');
  };

  const handleBackToHome = () => {
    sessionStorage.removeItem('leadFormData');
    navigate('/');
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={pulseAnimation}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Request Successfully Submitted
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Thank you for your interest in GE Janitorial Solutions
          </p>
          <div className="inline-block bg-blue-100 px-4 py-2 rounded-lg">
            <p className="text-sm font-medium text-blue-800">
              Reference Number: <span className="font-mono">{referenceNumber}</span>
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <motion.div
                animate={pulseAnimation}
                className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4"
              >
                <Clock className="w-6 h-6 text-yellow-600" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Request Status</h2>
                <p className="text-gray-600">Currently under review</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Request received and logged</span>
              </div>
              <div className="flex items-center">
                <motion.div
                  animate={pulseAnimation}
                  className="w-3 h-3 bg-yellow-500 rounded-full mr-3"
                />
                <span className="text-gray-700">Under review by our facility specialists</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                <span className="text-gray-500">Custom proposal preparation</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                <span className="text-gray-500">Initial consultation scheduling</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Expected Response Time
              </h3>
              <p className="text-blue-800">
                <strong>4-6 business hours</strong> for initial contact<br />
                <strong>24-48 hours</strong> for detailed proposal
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Request Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Contact:</p>
                  <p className="font-medium text-gray-900">{formData.name}</p>
                  <p className="text-gray-700">{formData.company}</p>
                </div>
                <div>
                  <p className="text-gray-600">Facility:</p>
                  <p className="font-medium text-gray-900">{formData.facilityType}</p>
                  <p className="text-gray-700">{formData.squareFootage}</p>
                </div>
                <div>
                  <p className="text-gray-600">Services:</p>
                  <p className="font-medium text-gray-900">
                    {formData.services.length} services selected
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Timeline:</p>
                  <p className="font-medium text-gray-900">{formData.timeline || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Immediate Assistance?
              </h3>
              <div className="space-y-3">
                <motion.a
                  href="tel:+1-312-889-3324"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (312) 889-3324
                </motion.a>
                <motion.a
                  href="mailto:quotes@gejanitorial.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center w-full bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </motion.a>
              </div>
            </div>

            {/* Resources Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resources
              </h3>
              <div className="space-y-3">
                <motion.button
                  onClick={handleDownloadCatalog}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Catalog
                </motion.button>
                <motion.button
                  onClick={handleBackToHome}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </motion.button>
              </div>
            </div>

            {/* Reference Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Save This Information
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Reference Number:</p>
                  <p className="font-mono text-sm font-medium text-gray-900 break-all">
                    {referenceNumber}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Submitted:</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;