import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import http from '../utils/axios';

import {ACCESS_TOKEN} from '../constants/AuthToken';
import {SignInPayload, SignInResponse, User} from '../models';
import {AuthActionTypes, authReducer} from './AuthReducer';
import {AuthState, initialState} from './AuthState';

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ReferenceError: Can't find variable: navigation
  // const navigation = useNavigation();

  const signOut = useCallback(async () => {
    try {
      await http.delete('/session');

      await AsyncStorage.removeItem(ACCESS_TOKEN);

      dispatch({type: AuthActionTypes.SignOut});
    } catch (err) {
      console.log(`logout error ${err}`);
    } finally {
      // window.location.href = '/';
      // navigation.navigate('LoginScreen');
    }
  }, []);

  const signIn = useCallback(async (payload: SignInPayload) => {
    try {
      dispatch({type: AuthActionTypes.SignInInit});

      const {data: session, headers} = await http.post<SignInResponse>(
        '/session',
        payload,
      );

      console.log(session);
      const token = session.user.token; // headers[ACCESS_TOKEN];

      await AsyncStorage.setItem(ACCESS_TOKEN, token);

      dispatch({
        type: AuthActionTypes.SignInSuccess,
        payload: {...session.user, id: session.user.username},
        meta: {token},
      });

      // // TODO: update defaultPath
      // const defaultPath = ['SYSTEM_OPERATOR', 'PROVIDER_ADMIN'].includes(
      //   session.user.role,
      // )
      //   ? RoutePath.operator
      //   : ['TENANT_USER', 'TENANT_ADMIN'].includes(session.user.role)
      //   ? RoutePath.tenant
      //   : '/';

      // // (location.state as any)?.from means user accessed protected pages, but probably token expires
      // const from = (location.state as any)?.from || defaultPath; // usually we jump to /

      // navigate(from, {replace: true});
    } catch (error: any) {
      dispatch({type: AuthActionTypes.SignInFailure, error: error.data});
    }
  }, []);

  const getUser = useCallback(async (token: string) => {
    try {
      dispatch({type: AuthActionTypes.GetCurrentUserInit, meta: {token}});

      const {data: user} = await http.get<User>('/current-user');

      dispatch({
        type: AuthActionTypes.GetCurrentUserSuccess,
        payload: user,
        meta: {token},
      });
    } catch (error: any) {
      // navigate(RoutePath.signIn);

      await AsyncStorage.removeItem(ACCESS_TOKEN);

      dispatch({
        type: AuthActionTypes.GetCurrentUserFailure,
        error: error.data,
      });
    }
  }, []); // same issue, cannot include navigate...

  useEffect(() => {
    // if there's a token, get current user
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      if (token) {
        getUser(token);
      }
    });
  }, [getUser]);

  const {user, status, error, token} = state;

  const v = useMemo(
    () => ({user, status, error, token, signOut, signIn, getUser}),
    [user, status, error, token, signOut, signIn, getUser],
  );

  return <AuthContext.Provider value={v}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

// -------------------- below: types, reducers, actions, context initializer ------------------

type AuthContextState = AuthState & {
  signIn: (payload: SignInPayload) => Promise<void>;
  getUser: (token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextState>(
  initialState as AuthContextState,
);
AuthContext.displayName = 'AuthContext';
