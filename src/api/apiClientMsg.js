export async function fetchMessages(phoneNumber) {
    const res = await fetch(`/api/messages?phoneNumber=${phoneNumber}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return await res.json();
}

export async function sendMessage({ phoneNumber, content, sender }) {
    const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, content, sender }),
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return await res.json();
}
