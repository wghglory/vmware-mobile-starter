import {StyleSheet} from 'react-native';

import {Button, Text} from 'native-base';
import {View} from '../components/Themed';
import {useAuth} from '../context/AuthContext';

export default function MoreScreen() {
  const {user, status, signOut} = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.userWrapper}>
          <Text style={styles.user}>{user?.name}</Text>
          <View style={styles.roles}>
            <Text style={styles.role}>Service Admin</Text>
            <Text style={styles.role}>Test Role</Text>
          </View>
        </View>
        <Button bg="black" onPress={signOut}>
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {width: '80%', paddingVertical: 24},
  userWrapper: {
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    padding: 24,
    marginBottom: 24,
  },
  user: {
    marginBottom: 24,
    fontWeight: 'bold',
  },
  roles: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
  },
  role: {
    paddingRight: 12,
  },
});
