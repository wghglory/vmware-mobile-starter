import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../constants/AuthToken';
import {User} from '../models/user';

export interface AuthState {
  status: 'default' | 'loading' | 'success' | 'error';
  user: User | null;
  error: Error | null;
  token: string;
}

export const initialState: AuthState = {
  status: 'default',
  user: null,
  error: null,
  token: '', // AsyncStorage.getItem(ACCESS_TOKEN).then(res => res || '')
};
