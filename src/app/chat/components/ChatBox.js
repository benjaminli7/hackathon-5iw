"use client";

import { useState } from 'react';
import { ScrollArea, TextInput, Button, Box } from '@mantine/core';
import { postMsg } from '@/api/messages';

const ChatBox = ({ phoneNumber, initialMessages = [] }) => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const newMessage = {
            content: input,
            sender: 'user',
        };

        setMessages([...messages, newMessage]);

        try {
            await postMsg(phoneNumber, input, 'user');
            setInput('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
            <ScrollArea style={{ flexGrow: 1, marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
                {messages.map((msg, index) => (
                    <Box key={index} mb="sm">
                        <p style={{ fontWeight: 'bold', color: msg.sender === 'user' ? '#1c7ed6' : '#495057' }}>
                            {msg.sender === 'user' ? 'You' : 'Bot'}:
                        </p>
                        <p style={{ color: '#212529' }}>{msg.content}</p>
                    </Box>
                ))}
            </ScrollArea>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <TextInput
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{ flexGrow: 1, marginRight: '0.5rem' }}
                />
                <Button onClick={sendMessage} color="blue">
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatBox;
