import { User } from "../../models/User.ts";
import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface IUserBadgeItemProps {
  user: User;
  handleFunction: () => void;
}
const UserBadgeItem = ({ user, handleFunction }: IUserBadgeItemProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      fontSize={12}
      bg="facebook.300"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
