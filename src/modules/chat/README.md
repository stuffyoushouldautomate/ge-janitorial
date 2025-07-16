# Reusable Chat Module

A complete, customizable chat modal component that can be easily integrated into any React application.

## Features

- 🎨 **Fully Customizable**: Brand colors, company info, and messaging
- 🔌 **API Integration**: Connect to any chat API endpoint
- 📱 **Responsive Design**: Works on desktop and mobile
- ⚡ **TypeScript Support**: Full type safety
- 🎭 **Smooth Animations**: Framer Motion powered
- 🎯 **Easy Integration**: Drop-in component with minimal setup

## Quick Start

### 1. Copy the Module
Copy the entire `src/modules/chat` directory to your project.

### 2. Install Dependencies
```bash
npm install framer-motion lucide-react
```

### 3. Basic Usage
```tsx
import React, { useState } from 'react';
import { ChatModal, ChatButton, createChatConfig } from './modules/chat';

const App = () => {
  const [showChat, setShowChat] = useState(false);
  
  const chatConfig = createChatConfig({
    companyName: "Your Company Assistant",
    companyPhone: "(555) 123-4567",
    companyEmail: "info@yourcompany.com",
    apiEndpoint: "https://your-chat-api-endpoint.com",
    brandColors: {
      primary: "#2563eb",
      secondary: "#1e40af", 
      accent: "#eab308"
    },
    welcomeMessage: "Hi! How can I help you today?",
    placeholderText: "Ask about our services..."
  });

  return (
    <div>
      {/* Your app content */}
      
      <ChatButton 
        onClick={() => setShowChat(true)}
        config={chatConfig}
      />
      
      <ChatModal 
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        config={chatConfig}
      />
    </div>
  );
};
```

## Configuration Options

### ChatConfig Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `apiEndpoint` | string | Your chat API endpoint | Required |
| `companyName` | string | Company name for header | "Company Assistant" |
| `companyPhone` | string | Phone number for contact | "(555) 123-4567" |
| `companyEmail` | string | Email for contact | "info@company.com" |
| `brandColors.primary` | string | Primary brand color | "#2563eb" |
| `brandColors.secondary` | string | Secondary brand color | "#1e40af" |
| `brandColors.accent` | string | Accent color | "#eab308" |
| `welcomeMessage` | string | Initial bot message | "Hi! I'm here to help..." |
| `placeholderText` | string | Input placeholder | "Ask me anything..." |

## API Integration

The chat expects your API to:
- Accept POST requests with `{ question: string }`
- Return JSON with `{ text: string }` or `{ message: string }`

Example API response:
```json
{
  "text": "Thank you for your question! Here's how I can help..."
}
```

## Customization

### Styling
The component uses Tailwind CSS classes. You can customize:
- Colors via the `brandColors` config
- Layout by modifying the component files
- Animations by adjusting Framer Motion variants

### Behavior
- Modify `useChat` hook for different API patterns
- Extend `ChatConfig` type for additional options
- Add custom message types in the `types/index.ts`

## File Structure

```
src/modules/chat/
├── components/
│   ├── ChatModal.tsx      # Main chat modal component
│   └── ChatButton.tsx     # Floating chat button
├── hooks/
│   └── useChat.ts         # Chat logic and API integration
├── types/
│   └── index.ts           # TypeScript definitions
├── utils/
│   └── chatConfig.ts      # Configuration utilities
├── index.ts               # Main exports
└── README.md              # This file
```

## Migration from Existing Chat

If you have an existing chat component, you can migrate by:

1. Moving your API endpoint to the config
2. Updating brand colors in the config
3. Replacing your chat component with this module
4. Updating any custom styling or behavior

## Support

This module is designed to be self-contained and easily portable between projects. All dependencies are clearly defined and the API is stable.