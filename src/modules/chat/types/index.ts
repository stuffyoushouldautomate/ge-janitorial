export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatConfig {
  apiEndpoint: string;
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  welcomeMessage: string;
  placeholderText: string;
}

export interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ChatConfig;
}