import React, {useState} from 'react';
import {useAuth} from '../context/AuthContext';

import ProductSvg from '../assets/images/product.svg';

import {
  Button,
  Text,
  Input,
  Icon,
  Stack,
  VStack,
  Box,
  Heading,
} from 'native-base';
import {MaterialIcons, AntDesign} from '@expo/vector-icons';

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {status, error, signIn} = useAuth();

  return (
    <VStack flex="1" alignItems="center" justifyContent="center">
      <Box w="80%">
        <Heading size="sm" fontWeight={'400'} textAlign="center">
          VMware Cloud Provider
        </Heading>
        <Heading size="lg" fontWeight={'500'} textAlign="center">
          COMMERCE PORTAL ™
        </Heading>

        <Box mb="20" alignItems={'center'}>
          <ProductSvg width={120} height={80} />
        </Box>

        <Stack space={4} alignItems="center">
          <Input
            variant="underlined"
            value={username}
            placeholder="Enter username"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                mx="2"
                color="muted.400"
              />
            }
            onChangeText={text => setUsername(text)}
          />
          <Input
            variant="underlined"
            value={password}
            placeholder="Enter password"
            InputLeftElement={
              <Icon
                as={<AntDesign name="key" />}
                size={5}
                mx="2"
                color="muted.400"
              />
            }
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <Button
            w={'100%'}
            isLoading={status === 'loading'}
            onPress={() => {
              signIn({username, password});
            }}>
            Login
          </Button>

          <Text color="red.500" minH={12} alignSelf={'flex-start'}>
            {status === 'error' ? error : ''}
          </Text>
        </Stack>
      </Box>
    </VStack>
  );
};

export default LoginScreen;
