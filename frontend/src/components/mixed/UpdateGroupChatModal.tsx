import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { useChatState } from "../../context/ChatProvider.tsx";
import { useState } from "react";
import capitalizeWords from "../../utils/capitalizeWords.ts";
import { User } from "../../models/User.ts";
import UserBadgeItem from "../UserAvatar/UserBadgeItem.tsx";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem.tsx";

interface IUpdateGroupChatModalProps {
  fetchAgain: boolean;
  setFetchAgain: (fetchAgain: boolean) => void;
}
const UpdateGroupChatModal = ({
  fetchAgain,
  setFetchAgain,
}: IUpdateGroupChatModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [search, setSearch] = useState<string>();
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [renameLoading, setRenameLoading] = useState<boolean>(false);

  const { selectedChat, setSelectedChat, user } = useChatState();

  const toast = useToast();

  const handleRemove = async (user1: User) => {
    if (!user1) {
      toast({
        title: "Error occurred!",
        description: "User not found",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
    if (selectedChat?.groupAdmin._id !== user?._id && user1._id !== user?._id) {
      toast({
        title: "You are not the admin of this group",
        description: "Only the admin can remove users from the group",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.delete("/api/chat/group/remove", {
        data: {
          chatId: selectedChat?._id,
          userId: user1._id,
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      user1._id === user?._id
        ? setSelectedChat(undefined)
        : setSelectedChat(data);

      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };
  const handleAddUser = async (user1: User) => {
    if (selectedChat?.users.find((user: User) => user._id === user1._id)) {
      toast({
        title: "User is already in the group",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (selectedChat?.groupAdmin._id !== user?._id) {
      toast({
        title: "You are not the admin of this group",
        description: "Only the admin can add users to the group",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/group/add",
        {
          chatId: selectedChat?._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };
  const handleRename = async () => {
    if (!groupChatName || groupChatName.length === 0) {
      toast({
        title: "Error occurred!",
        description: "Please enter a chat name",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      console.log(
        `CHAT ID: ${selectedChat?._id} ------ CHAT NAME: ${selectedChat?.chatName}`
      );

      const { data } = await axios.put(
        `/api/chat/group/rename`,
        {
          chatId: selectedChat?._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }

    setGroupChatName("");
  };
  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query || query.length === 0) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: "Failed to load the search results for your query",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
        aria-label={"Open update group chat modal"}
      >
        Open
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          fontFamily="Work sans"
          fontSize="35px"
          display="flex"
          justifyContent="center"
          color="blue.400"
        >
          <ModalHeader>{capitalizeWords(selectedChat?.chatName)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat?.users.map((user: User) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                bg="blue.400"
                color="white"
                _hover={{ bg: "blue.600" }}
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add a user to the group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              <Box fontSize="16px" pt={2}>
                {searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))}
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleRemove(user)}
              bg="red.400"
              color="white"
              _hover={{ bg: "red.500" }}
            >
              Leave group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
