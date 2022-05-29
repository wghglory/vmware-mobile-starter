import {Box, Button, HStack, Text, VStack} from 'native-base';
import {useAuth} from '../context/AuthContext';

export default function MoreScreen() {
  const {user, status, signOut} = useAuth();

  return (
    <Box alignItems={'center'} flex="1" bg="white">
      <VStack space={4} py="10" w="80%">
        <VStack space={4} borderRadius="4" bg="gray.100" p="4">
          <Text fontSize={16} bold>
            {user?.name}
          </Text>
          <HStack space={4}>
            <Text>Service Admin</Text>
            <Text>Test Role</Text>
          </HStack>
        </VStack>
        <Button bg="black" onPress={signOut}>
          Logout
        </Button>
      </VStack>
    </Box>
  );
}
