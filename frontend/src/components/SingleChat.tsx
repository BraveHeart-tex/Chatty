import { useChatState } from "../context/ChatProvider.tsx";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatConfig.ts";
import ProfileModal from "./mixed/ProfileModal.tsx";
import capitalizeWords from "../utils/capitalizeWords.ts";
import UpdateGroupChatModal from "./mixed/UpdateGroupChatModal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Message } from "../models/Message.ts";
import "./styles.css";
import ScrollableChat from "./ScrollableChat.tsx";
import { io, Socket } from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";

interface ISingleChatProps {
  fetchAgain: boolean;
  setFetchAgain: (fetchAgain: boolean) => void;
}

const ENDPOINT = "http://localhost:4000";
let socket: Socket, selectedChatCompare: any;
const SingleChat = ({ fetchAgain, setFetchAgain }: ISingleChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>();
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const { user, selectedChat, setSelectedChat } = useChatState();
  const toast = useToast();

  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat?._id}`,
        config
      );

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: "Failed to fetch conversation",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // TODO: implement notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    // typing indicator inside the chat
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerDuration = 3000;

    setTimeout(() => {
      let now = new Date().getTime();
      let timeDifference = now - lastTypingTime;

      if (timeDifference >= timerDuration && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerDuration);
  };

  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat?._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        };

        setNewMessage("");

        const { data } = await axios.post(
          "api/message",
          { content: newMessage, chatId: selectedChat?._id },
          config
        );

        socket.emit("new message", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        toast({
          title: "Error occurred!",
          description: "Failed to send your message",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              aria-label={`Back to chats`}
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(undefined)}
            />

            {!selectedChat.isGroupChat ? (
              <>
                {
                  <Text color="facebook.400">
                    {getSender(user, selectedChat.users)}
                  </Text>
                }
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {
                  <Text color="facebook.400">
                    {capitalizeWords(selectedChat.chatName)}
                  </Text>
                }
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="whiteAlpha.500"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
                color="blue.400"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages}></ScrollableChat>
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? (
                <div>
                  <Lottie
                    width={50}
                    style={{ marginBottom: 10, marginLeft: 0 }}
                    options={lottieDefaultOptions}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="white"
                placeholder="Enter a message..."
                onChange={handleType}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans" color="blue.400">
            Select a user from "My Chats" to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
