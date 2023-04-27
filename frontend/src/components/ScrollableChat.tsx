import { Message } from "../models/Message.ts";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatConfig.ts";
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
                bgColor="blue.400"
                color="white"
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
            <span
              style={{
                backgroundColor: `${
                  message.sender._id === user?._id ? "#63B3ED" : "#3182CE"
                }`,
                color: "white",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(
                  messages,
                  message,
                  index,
                  user?._id
                ),
                marginTop: isSameUser(messages, message, index)
                  ? "3px"
                  : "10px",
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
