import { useState } from 'react';
import * as userService from '../../utilities/users-service';

import {Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button,Heading, Text, useColorModeValue} from '@chakra-ui/react';
  
  export default function LoginForm({ setUser }) {
    const [credentials, setCredentials ] = useState({
        email: '',
        password: ''
    })
    const [ error, setError ] = useState('')

    const handleChange = (evt) => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try{
            const user = await userService.login(credentials);
            setUser(user)
        }catch(error){
            setError(error.message)
        }
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>

        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>
                Welcome
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>

          <form onSubmit={ handleSubmit }>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <Stack spacing={4}>
                
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" value={credentials.email} onChange={ handleChange }/>
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" value={ credentials.password }onChange={ handleChange }/>
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
              
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
                
              </Stack>
            </Stack>
          </Box>
          </form>

        </Stack>
      </Flex>
    );
  }
  