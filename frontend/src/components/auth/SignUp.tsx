import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState<string>('');
  const [picture, setPicture] = useState('');

  const handleShowClick = () => setShow(!show);

  const postDetails = (picture: any) => {
    console.log(picture);
  };

  const submitHandler = () => {
    console.log('the submit handler called');
  };

  return (
    <VStack spacing='5px'>
      <FormControl id='first-name' isRequired color='blue.600'>
        <FormLabel>Name</FormLabel>
        <Input
          type='text'
          placeholder='Enter your name'
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id='email' isRequired color='blue.600'>
        <FormLabel>Email Address</FormLabel>
        <Input
          type='email'
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='password' isRequired color='blue.600'>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleShowClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='confirm-password' isRequired color='blue.600'>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Confirm your password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleShowClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type='file'
          p={1}
          accept='image/*'
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        color={'white'}
        _hover={{ bg: 'blue.500' }}
        bg={'blue.400'}
        width={'100%'}
        style={{ marginTop: '20px' }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};
export default SignUp;
