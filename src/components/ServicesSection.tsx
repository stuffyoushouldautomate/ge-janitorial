import React from 'react';
import { motion } from 'framer-motion';
import { 
  Factory, 
  Wrench, 
  Shield, 
  Truck, 
  AlertTriangle, 
  Clock,
  CheckCircle,
  Droplets
} from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Factory,
      title: 'Industrial Floor Maintenance',
      description: 'Epoxy floor cleaning, concrete sealing, and specialized degreasing for high-traffic warehouse environments.',
      features: ['Forklift path cleaning', 'Oil spill remediation', 'Anti-slip treatments']
    },
    {
      icon: Wrench,
      title: 'Equipment Decontamination',
      description: 'Specialized cleaning protocols for machinery, conveyor systems, and manufacturing equipment.',
      features: ['OSHA compliance', 'Downtime minimization', 'Precision cleaning']
    },
    {
      icon: Shield,
      title: 'Safety & Compliance',
      description: 'Comprehensive safety protocols ensuring full regulatory compliance and worker protection.',
      features: ['OSHA documentation', 'Safety audits', 'Incident reporting']
    },
    {
      icon: Truck,
      title: 'Loading Dock Services',
      description: 'Specialized cleaning for loading areas, dock plates, and freight handling zones.',
      features: ['Debris removal', 'Pressure washing', 'Spill containment']
    },
    {
      icon: AlertTriangle,
      title: 'Hazmat Cleanup',
      description: 'Certified hazardous material cleaning with proper disposal and documentation.',
      features: ['EPA certified', 'Proper disposal', 'Emergency response']
    },
    {
      icon: Clock,
      title: '24/7 Emergency Response',
      description: 'Round-the-clock availability for urgent cleaning needs and facility emergencies.',
      features: ['Immediate response', 'Emergency protocols', 'Rapid deployment']
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Comprehensive quality control with detailed reporting and performance metrics.',
      features: ['Digital reporting', 'Performance metrics', 'Continuous improvement']
    },
    {
      icon: Droplets,
      title: 'Specialized Sanitization',
      description: 'Advanced sanitization protocols for food processing and pharmaceutical facilities.',
      features: ['FDA compliance', 'Validated processes', 'Contamination control']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Industrial Cleaning Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive facility maintenance solutions designed for Chicago's manufacturing, 
            warehousing, and distribution centers
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4 p-3 bg-blue-100 rounded-lg"
              >
                <service.icon className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;