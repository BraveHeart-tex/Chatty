import { useChatState } from "../context/ChatProvider.tsx";
import { useEffect, useState } from "react";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { GoPlus } from "react-icons/all";
import ChatLoading from "./ChatLoading.tsx";
import { getSender } from "../config/ChatConfig.ts";
import { User } from "../models/User.ts";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState<User>();
  const { selectedChat, setSelectedChat, user, chats, setChats } =
    useChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log(data[0]);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo") as string));
    fetchChats();
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bg="#edf2f4"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color="blue.400"
      >
        My Chats
        <Button
          display="flex"
          rightIcon={<GoPlus style={{ height: "16px", width: "16px" }} />}
        ></Button>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "blue.300" : "blue.200"}
                color={selectedChat === chat ? "white" : "facebook.500"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
