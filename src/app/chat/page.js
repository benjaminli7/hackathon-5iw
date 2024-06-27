import { Container, Title } from '@mantine/core';
import ChatBox from '@/app/chat/components/ChatBox';
import { getMsg } from '@/api/messages';

export default async function Page() {
    const phoneNumber = '1234567890'; // Change this number dynamically if necessary
    const user = await getMsg(phoneNumber);
    const messages = user ? user.messages : [];

    return (
        <Container size="xl" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', padding: '20px' }}>
                <Title align="center" order={1} mb="lg">Chat Page</Title>
                <ChatBox phoneNumber={phoneNumber} initialMessages={messages} />
            </div>
        </Container>
    );
}
