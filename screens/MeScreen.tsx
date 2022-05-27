import {StyleSheet} from 'react-native';

import {Button} from '@rneui/base';
import {Text, View} from '../components/Themed';
import {useAuth} from '../context/AuthContext';

export default function MeScreen() {
  const {user, status, signOut} = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {user?.name}</Text>
      <Button title="Logout" color="red" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});
