"use client";

import { useState, useEffect, useRef } from 'react';
import { ScrollArea, TextInput, Button, Box, Stack, Text } from '@mantine/core';
import { postMsg } from '@/api/messages';

const ChatBox = ({ userId, initialMessages = [], userName }) => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const scrollAreaRef = useRef(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const newMessage = {
            content: input,
            sender: userName,
        };

        setMessages([...messages, newMessage]);

        try {
            await postMsg(userId, input, userName);
            setInput('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', height: '70vh' }}>
            <ScrollArea style={{ flexGrow: 1, marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }} viewportRef={scrollAreaRef}>
                <Stack spacing="sm">
                    {messages.map((msg, index) => (
                        <Box key={index} mb="sm">
                            <Text weight={700} color={msg.sender === userName ? 'blue' : 'gray'}>
                                {msg.sender}:
                            </Text>
                            <Text>{msg.content}</Text>
                        </Box>
                    ))}
                </Stack>
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
