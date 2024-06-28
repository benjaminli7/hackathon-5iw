'use client';

import { useState, useEffect } from 'react';
import { Container, Title, Select, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { getUsers } from '@/api/users';

export default function Page() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUsers() {
            const users = await getUsers();
            setUsers(users);
        }
        fetchUsers();
    }, []);

    const handleSelectUser = () => {
        if (selectedUser) {
            router.push(`/chat/${selectedUser}`);
        }
    };

    return (
        <Container size="xl" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', padding: '20px' }}>
                <Title align="center" order={1} mb="lg">Select User</Title>
                <Select
                    label="Select User"
                    placeholder="Pick one"
                    data={users.map(user => ({ value: user.id.toString(), label: user.name }))}
                    value={selectedUser}
                    onChange={setSelectedUser}
                />
                <Button onClick={handleSelectUser} color="blue" mt="lg">
                    Go to Chat
                </Button>
            </div>
        </Container>
    );
}
