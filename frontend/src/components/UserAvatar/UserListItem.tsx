import { User } from "../../models/User.ts";
import { Avatar, Box, Text } from "@chakra-ui/react";

interface IUserListItemProps {
  user: User;
  handleFunction: (userId: string) => void;
}
const UserListItem = ({ user, handleFunction }: IUserListItemProps) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="blue.300"
      _hover={{
        background: "facebook.400",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="white"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user?.name}
        src={user?.picture}
      />
      <Box>
        <Text>{user?.name}</Text>
        <Text fontSize="xs">
          <b>Email: </b>
          {user?.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
