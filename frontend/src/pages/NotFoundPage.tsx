import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container
        maxW={'100%'}
        bg='blue.200'
        display={'flex'}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Stack as={Box} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={700}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            color={'white'}
          >
            Sorry, the page your looking for
            <Text as={'u'}> doesn't exist</Text> 😔
          </Heading>
          <Text fontSize='26px' color='white'>
            You probably tried to navigate to a page that doesn't exist yet.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              bg={'blue.400'}
              color={'white'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={() => navigate('/chats')}
            >
              Go to home page
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
export default NotFoundPage;
