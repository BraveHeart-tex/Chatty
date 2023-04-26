import { Message } from "../models/Message.ts";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../config/ChatConfig.ts";
import { useChatState } from "../context/ChatProvider.tsx";
import { Avatar, Tooltip } from "@chakra-ui/react";

interface IScrollableChatProps {
  messages: Message[];
}
const ScrollableChat = ({ messages }: IScrollableChatProps) => {
  const { user } = useChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => (
          <div style={{ display: "flex" }} key={message._id}>
            {(isSameSender(messages, message, index, user?._id) ||
              isLastMessage(messages, message, index, user?._id)) && (
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                  src={message.sender?.picture}
                />
              </Tooltip>
            )}
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
