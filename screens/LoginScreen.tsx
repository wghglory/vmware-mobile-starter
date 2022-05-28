import React, {useState} from 'react';
import {useAuth} from '../context/AuthContext';
import {View, StyleSheet} from 'react-native';

import ProductSvg from '../assets/images/product.svg';

import {Button, Text, Input} from '@rneui/base';
import {FontAwesome} from '@expo/vector-icons';

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {status, signIn} = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>VMware Cloud Provider</Text>
        <Text style={styles.subTitle}>COMMERCE PORTAL ™</Text>

        <View style={styles.imgWrapper}>
          <ProductSvg width={120} height={80} />
        </View>

        <Input
          value={username}
          placeholder="Enter username"
          leftIcon={<FontAwesome name="user-o" size={20} />}
          leftIconContainerStyle={styles.inputIconWrapper}
          onChangeText={text => setUsername(text)}
        />
        <Input
          value={password}
          placeholder="Enter password"
          leftIcon={<FontAwesome name="key" size={20} />}
          leftIconContainerStyle={styles.inputIconWrapper}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Button
          style={styles.login}
          title="Login"
          disabled={username === '' || password === ''}
          onPress={() => {
            signIn({username, password});
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  imgWrapper: {
    alignItems: 'center',
    marginBottom: 80,
  },
  inputIconWrapper: {
    marginRight: 10,
  },
  login: {
    paddingHorizontal: 6,
  },
});

export default LoginScreen;
