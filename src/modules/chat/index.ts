// Main exports for the chat module
export { default as ChatModal } from './components/ChatModal';
export { default as ChatButton } from './components/ChatButton';
export { useChat } from './hooks/useChat';
export { createChatConfig } from './utils/chatConfig';
export type { Message, ChatConfig, ChatModalProps } from './types';