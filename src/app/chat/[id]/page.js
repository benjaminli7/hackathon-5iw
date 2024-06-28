'use client';

import { useState, useEffect } from 'react';
import { Container, Title, Button, Select } from '@mantine/core';
import ChatBox from '@/app/chat/components/ChatBox';
import { getMsg } from '@/api/messages';
import { getUsers } from '@/api/users';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
    const userId = params.id;
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const fetchedUser = await getMsg(userId);
            const fetchedUsers = await getUsers();
            setUser(fetchedUser);
            setUsers(fetchedUsers);
        }
        fetchData();
    }, [userId]);

    const handleSelectUser = () => {
        if (selectedUser) {
            router.push(`/chat/${selectedUser}`);
        }
    };

    if (!user) return <div>Loading...</div>;

    const messages = user.messages || [];
    const userName = user.name || 'Anonymous';

    return (
        <Container size="xl" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', padding: '20px' }}>
                <Title align="center" order={1} mb="lg">Chat Page</Title>
                <Select
                    label="Select User"
                    placeholder="Pick one"
                    data={users.map(user => ({ value: user.id.toString(), label: user.name }))}
                    value={selectedUser}
                    onChange={setSelectedUser}
                    mb="lg"
                />
                <Button onClick={handleSelectUser} color="blue" mb="lg">
                    Swap User
                </Button>
                <ChatBox userId={userId} initialMessages={messages} userName={userName} />
            </div>
        </Container>
    );
}
