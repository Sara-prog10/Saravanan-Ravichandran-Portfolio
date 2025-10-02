import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon, XIcon, SendIcon } from './icons/Icons';

const AI_AGENT_WEBHOOK_URL = 'https://theintellect.app.n8n.cloud/webhook/77261bb3-f417-4219-b1d0-03f961b895be';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const loadingMessages = [
    "Generating…",
    "Processing…",
    "On it…",
    "Almost there…"
];

// Helper to generate a UUID-like string without dashes for sessionId
const generateSessionId = () => {
    let uuid;
    if (crypto && crypto.randomUUID) {
        uuid = crypto.randomUUID();
    } else {
        // Fallback for older browsers
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    // Remove dashes to match the required format (e.g., 34a7c63b63fc42dd80cf46d812123980)
    return uuid.replace(/-/g, '');
};


export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm Chola, Saravanan's AI assistant. How can I help you today?",
            sender: 'bot'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [sessionId] = useState(generateSessionId); // Generate sessionId once per component mount

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);
    
    const renderFormattedText = (text: string) => {
        // Split by the bold markdown, but keep the captured group
        const parts = text.split(/(\*\*.*?\*\*)/g);
        
        return parts.map((part, index) => {
            // Check if the part is bold markdown
            if (part.startsWith('**') && part.endsWith('**')) {
                // Return a <strong> element without the asterisks
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            // Otherwise, return the text part as is
            return part;
        });
    };

    const handleToggle = () => setIsOpen(prev => !prev);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return;

        const userMessage: Message = {
            id: Date.now(),
            text: trimmedInput,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        // Set a random loading message
        const randomIndex = Math.floor(Math.random() * loadingMessages.length);
        setLoadingMessage(loadingMessages[randomIndex]);

        // Construct the payload as a single JSON object
        const payload = {
            sessionId: sessionId,
            action: "sendMessage",
            chatInput: trimmedInput
        };

        try {
            const response = await fetch(AI_AGENT_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload), // Send the single object
            });

            if (!response.ok) {
                throw new Error(`Webhook failed with status: ${response.status}`);
            }

            const responseText = await response.text();
            let replyText = 'Sorry, I encountered an issue processing the response.';

            try {
                // Try to parse the response as JSON
                const responseData = JSON.parse(responseText);

                // Handle n8n's tendency to wrap responses in an array
                const data = Array.isArray(responseData) ? responseData[0] : responseData;

                if (typeof data === 'object' && data !== null) {
                     // Check for common reply keys, or serialize the object as a fallback
                    replyText = data.output || data.reply || data.message || data.answer || data.text || JSON.stringify(data);
                } else if (typeof data === 'string') {
                    // If the parsed data (or first array element) is a string
                    replyText = data;
                } else {
                    // Fallback to the raw text if parsing doesn't yield a useful result
                    replyText = responseText;
                }
            } catch (error) {
                // If JSON.parse fails, the response is likely just a plain string
                replyText = responseText;
            }

            const botMessage: Message = {
                id: Date.now() + 1,
                text: replyText,
                sender: 'bot',
            };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Error communicating with AI agent:", error);
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: 'Sorry, I am having trouble connecting. Please check your connection or try again later.',
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={handleToggle}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary dark:bg-dark-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary/90 dark:hover:bg-dark-primary/90 transition-transform transform hover:scale-110"
                aria-label="Open chat"
            >
                <ChatIcon className="w-8 h-8" />
            </button>
        );
    }

    return (
        <div className="fixed z-50 bottom-4 inset-x-4 h-[85vh] sm:h-[70vh] sm:w-96 sm:bottom-6 sm:right-6 sm:left-auto max-h-[600px] bg-surface dark:bg-dark-surface-subtle shadow-2xl rounded-lg flex flex-col transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-surface-subtle dark:bg-dark-surface rounded-t-lg">
                <h3 className="font-bold text-lg text-text dark:text-dark-text">Chola</h3>
                <button onClick={handleToggle} aria-label="Close chat">
                    <XIcon className="w-6 h-6 text-text-muted dark:text-dark-text-muted" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-2xl whitespace-pre-wrap ${msg.sender === 'user'
                            ? 'bg-primary dark:bg-dark-primary text-white'
                            : 'bg-surface-subtle dark:bg-dark-surface text-text dark:text-dark-text'
                            }`}>
                            {renderFormattedText(msg.text)}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                         <div className="max-w-xs px-4 py-2 rounded-2xl bg-surface-subtle dark:bg-dark-surface text-text-muted dark:text-dark-text-muted">
                            <span className="animate-pulse">{loadingMessage}</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask something..."
                    className="flex-grow w-full px-3 py-2 bg-white dark:bg-dark-surface-subtle border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-text dark:text-dark-text"
                />
                <button type="submit" className="p-3 bg-primary dark:bg-dark-primary text-white rounded-md hover:bg-primary/90 dark:hover:bg-dark-primary/90 disabled:opacity-50" disabled={isLoading || !inputValue.trim()}>
                    <SendIcon className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};
