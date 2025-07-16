import { ChatConfig } from '../types';

export const createChatConfig = (overrides: Partial<ChatConfig>): ChatConfig => {
  const defaultConfig: ChatConfig = {
    apiEndpoint: "https://flowise-production-1547.up.railway.app/api/v1/prediction/1799f45d-99ea-4dcc-b7b3-a5c7f4dfb435",
    companyName: "Company Assistant",
    companyPhone: "(555) 123-4567",
    companyEmail: "info@company.com",
    brandColors: {
      primary: "#2563eb", // blue-600
      secondary: "#1e40af", // blue-800
      accent: "#eab308" // yellow-500
    },
    welcomeMessage: "Hi! I'm here to help you. What can I assist you with today?",
    placeholderText: "Ask me anything..."
  };

  return { ...defaultConfig, ...overrides };
};