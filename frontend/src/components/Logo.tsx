import { Text } from "@chakra-ui/react";

interface ILogoProps {
  customFontSize?: string;
}
const Logo = ({ customFontSize }: ILogoProps) => {
  return (
    <Text fontSize={customFontSize} fontFamily="Work sans" color="facebook.400">
      💬 Chatty
    </Text>
  );
};

export default Logo;
