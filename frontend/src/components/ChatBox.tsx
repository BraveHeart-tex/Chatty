import { useChatState } from "../context/ChatProvider.tsx";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat.tsx";

interface IChatBoxProps {
  fetchAgain: boolean;
  setFetchAgain: (fetchAgain: boolean) => void;
}

const ChatBox = ({ fetchAgain, setFetchAgain }: IChatBoxProps) => {
  const { selectedChat } = useChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="#edf2f4"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
