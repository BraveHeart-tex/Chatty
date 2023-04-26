import { useChatState } from "../context/ChatProvider.tsx";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatConfig.ts";
import ProfileModal from "./mixed/ProfileModal.tsx";
import capitalizeWords from "../utils/capitalizeWords.ts";
import UpdateGroupChatModal from "./mixed/UpdateGroupChatModal";

interface ISingleChatProps {
  fetchAgain: boolean;
  setFetchAgain: (fetchAgain: boolean) => void;
}
const SingleChat = ({ fetchAgain, setFetchAgain }: ISingleChatProps) => {
  const { user, selectedChat, setSelectedChat } = useChatState();
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
            {/*  TODO: messages will be here   */}
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
