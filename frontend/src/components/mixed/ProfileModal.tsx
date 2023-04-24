import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Box,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { GoEye } from "react-icons/all";
import { User } from "../../models/User.ts";
import React from "react";

interface IProfileModalProps {
  user: User | undefined;
  children?: React.ReactNode;
}

const ProfileModal = ({ user, children }: IProfileModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          aria-label={`View ${user?.name}'s profile`}
          display={{ base: "flex" }}
          icon={<GoEye />}
          onClick={onOpen}
        />
      )}
      <Modal
        size={{ base: "sm", md: "lg", lg: "xl" }}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            color="blue.400"
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user?.picture}
                alt={user?.name}
              />
              <Text
                fontSize={{ base: "20px", md: "28px" }}
                fontFamily="Work Sans"
              >
                Email: {user?.email}
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
