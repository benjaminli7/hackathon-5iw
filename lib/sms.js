const sms = async function (phone, message){
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: message,
        to: phone, // Text your number
        from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));

}

