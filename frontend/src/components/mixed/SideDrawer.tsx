import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { GoBell, GoChevronDown, GoSearch } from "react-icons/all";
import { useChatState } from "../../context/ChatProvider.tsx";
import ProfileModal from "./ProfileModal.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading.tsx";
import { User } from "../../models/User.ts";
import UserListItem from "../UserAvatar/UserListItem.tsx";

const SideDrawer = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingChat, setLoadingChat] = useState<boolean>();
  const navigate = useNavigate();

  const { user, setSelectedChat, chats, setChats } = useChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left",
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

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      setLoading(false);
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

  const accessChat = async (userId: string) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((chat: unknown) => chat._id === data._id)) {
        setChats((prevChats) => [data, ...prevChats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#edf2f4"
        color="blue.400"
        w="100%"
        p="5px 10px 5px 10px"
        borderRadius="8px"
      >
        <Tooltip
          label="Search users to chat 😎"
          hasArrow
          placement="bottom"
          bg="blue.400"
        >
          <Button variant="ghost" onClick={onOpen}>
            <GoSearch />
            <Text display={{ base: "none", md: "block" }} px="4">
              Search user
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans" color="facebook.400">
          💬 Chatty
        </Text>
        <div>
          <Menu>
            <MenuButton p={1} fontSize="xl" m={1} color="blue.300">
              <GoBell />
            </MenuButton>
            {/*<MenuList></MenuList>*/}
          </Menu>
          <Menu>
            <MenuButton
              color="blue.300"
              as={Button}
              rightIcon={<GoChevronDown />}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.name}
                src={user?.picture}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent color="blue.400">
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={handleSearch}
                bgColor="blue.400"
                color="white"
                _hover={{ bgColor: "blue.300", color: "white" }}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResults.map((user: User) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
