"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollArea, TextInput, Button, Box, Stack, Text } from "@mantine/core";
import { postMsg } from "@/api/messages";
import { setEstimatedAgeFromPrompt } from "@/app/utils";
import { patchAge } from "@/api/actions";

const ChatBox = ({ userId, initialMessages = [], userName }) => {
  //   console.log("ChatBox -> initialMessages", initialMessages);
  const [messages, setMessages] = useState(initialMessages);
  const [estimatedAge, setEstimatedAge] = useState(null);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef(null);
  //estimation de l'age
  useEffect(() => {
    async function setAgeUser() {
      const estimatedAge = await setEstimatedAgeFromPrompt(messages, userId);
      // alert(estimatedAge);
      if (estimatedAge) await patchAge(userId, estimatedAge);
      // console.log("estimatedAge", estimatedAge);
      setEstimatedAge(estimatedAge);
    }
    setAgeUser();
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = {
      content: input,
      sender: userName,
    };

    try {
      const sendedMessages = await postMsg(
        parseInt(userId),
        input,
        userName,
        messages[0].operation
      );

      setMessages((prev) => [...prev, sendedMessages.message]);

      if (sendedMessages.botmsg) {
        setMessages((prev) => [...prev, sendedMessages.botmsg]);
      }

      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
      {estimatedAge && (
        <Text align="center" weight={700} mb="sm" c="blue">
          D'après notre IA, l'age estimé de cette personne est de {estimatedAge}
        </Text>
      )}
      <ScrollArea
        style={{
          flexGrow: 1,
          marginBottom: "1rem",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
        viewportRef={scrollAreaRef}
      >
        <Stack spacing="sm">
          {messages.map((msg, index) => (
            <Box key={index} mb="sm">
              <Text weight={700} c={msg.sender != "bot" ? "blue" : "gray"}>
                {msg.sender != "bot" ? userName : "Bot"}
              </Text>
              <div
                dangerouslySetInnerHTML={{
                  __html: msg.contentIA ? msg.contentIA : msg.content,
                }}
              />{" "}
            </Box>
          ))}
        </Stack>
      </ScrollArea>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <TextInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flexGrow: 1, marginRight: "0.5rem" }}
        />
        <Button onClick={sendMessage} color="blue">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
