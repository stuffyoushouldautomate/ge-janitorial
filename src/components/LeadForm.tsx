import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Building, 
  Settings, 
  Phone, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Mail,
  MapPin
} from 'lucide-react';

interface FormData {
  // Step 1: Basic Info
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  
  // Step 2: Facility Details
  facilityType: string;
  squareFootage: string;
  location: string;
  cleaningFrequency: string;
  
  // Step 3: Service Requirements
  services: string[];
  specialRequirements: string;
  budget: string;
  timeline: string;
  
  // Step 4: Contact Preferences
  preferredContact: string;
  preferredTime: string;
  urgency: string;
}

const LeadForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    facilityType: '',
    squareFootage: '',
    location: '',
    cleaningFrequency: '',
    services: [],
    specialRequirements: '',
    budget: '',
    timeline: '',
    preferredContact: '',
    preferredTime: '',
    urgency: ''
  });

  const totalSteps = 4;

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = () => {
    // Store form data in sessionStorage
    sessionStorage.setItem('leadFormData', JSON.stringify(formData));
    navigate('/status');
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const serviceOptions = [
    'Industrial Floor Maintenance',
    'Equipment Decontamination',
    'Loading Dock Services',
    'Hazmat Cleanup',
    '24/7 Emergency Response',
    'Specialized Sanitization',
    'Window Cleaning',
    'Carpet Cleaning'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get Your Custom Facility Assessment
          </h2>
          <p className="text-xl text-gray-600">
            Complete our brief questionnaire for a tailored cleaning solution
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
                animate={{
                  scale: step === currentStep ? 1.2 : 1,
                  backgroundColor: step <= currentStep ? '#2563eb' : '#e5e7eb'
                }}
                transition={{ duration: 0.3 }}
              >
                {step < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{step}</span>
                )}
              </motion.div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: '25%' }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-gray-50 rounded-lg shadow-lg p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <User className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-2xl font-semibold text-gray-900">Contact Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="(312) 555-0123"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="ABC Manufacturing"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position/Title
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Facility Manager"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Facility Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <Building className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-2xl font-semibold text-gray-900">Facility Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facility Type *
                    </label>
                    <select
                      value={formData.facilityType}
                      onChange={(e) => handleInputChange('facilityType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select facility type</option>
                      <option value="warehouse">Warehouse/Distribution Center</option>
                      <option value="manufacturing">Manufacturing Plant</option>
                      <option value="food-processing">Food Processing</option>
                      <option value="pharmaceutical">Pharmaceutical</option>
                      <option value="automotive">Automotive</option>
                      <option value="logistics">Logistics Hub</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Square Footage *
                    </label>
                    <select
                      value={formData.squareFootage}
                      onChange={(e) => handleInputChange('squareFootage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select square footage</option>
                      <option value="under-10k">Under 10,000 sq ft</option>
                      <option value="10k-50k">10,000 - 50,000 sq ft</option>
                      <option value="50k-100k">50,000 - 100,000 sq ft</option>
                      <option value="100k-500k">100,000 - 500,000 sq ft</option>
                      <option value="over-500k">Over 500,000 sq ft</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Chicago, IL"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Cleaning Frequency *
                    </label>
                    <select
                      value={formData.cleaningFrequency}
                      onChange={(e) => handleInputChange('cleaningFrequency', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="as-needed">As needed</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Service Requirements */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <Settings className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-2xl font-semibold text-gray-900">Service Requirements</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Select Services Needed *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceOptions.map((service) => (
                        <motion.div
                          key={service}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.services.includes(service)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => handleServiceToggle(service)}
                        >
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded mr-3 ${
                              formData.services.includes(service)
                                ? 'bg-blue-600'
                                : 'bg-gray-300'
                            }`} />
                            <span className="text-sm font-medium text-gray-900">
                              {service}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-5k">Under $5,000/month</option>
                        <option value="5k-10k">$5,000 - $10,000/month</option>
                        <option value="10k-25k">$10,000 - $25,000/month</option>
                        <option value="25k-50k">$25,000 - $50,000/month</option>
                        <option value="over-50k">Over $50,000/month</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline to Start
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate (within 1 week)</option>
                        <option value="1-2-weeks">1-2 weeks</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="planning">Just planning ahead</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requirements or Notes
                    </label>
                    <textarea
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any specific requirements, compliance needs, or special considerations..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Preferences */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <Phone className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-2xl font-semibold text-gray-900">Contact Preferences</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Preferred Contact Method *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['Phone', 'Email', 'Both'].map((method) => (
                        <motion.div
                          key={method}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.preferredContact === method
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => handleInputChange('preferredContact', method)}
                        >
                          <div className="flex items-center justify-center">
                            {method === 'Phone' && <Phone className="w-5 h-5 mr-2" />}
                            {method === 'Email' && <Mail className="w-5 h-5 mr-2" />}
                            {method === 'Both' && <CheckCircle className="w-5 h-5 mr-2" />}
                            <span className="text-sm font-medium text-gray-900">
                              {method}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Best Time to Contact
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select preferred time</option>
                        <option value="morning">Morning (8 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                        <option value="evening">Evening (5 PM - 8 PM)</option>
                        <option value="anytime">Anytime</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Urgency Level
                      </label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => handleInputChange('urgency', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select urgency</option>
                        <option value="urgent">Urgent - Contact today</option>
                        <option value="high">High - Contact within 24 hours</option>
                        <option value="normal">Normal - Within 2-3 days</option>
                        <option value="low">Low - Within a week</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {currentStep === totalSteps ? 'Submit Request' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;