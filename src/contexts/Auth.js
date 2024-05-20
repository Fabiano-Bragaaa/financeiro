import React, {createContext, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {api} from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({children}) {
  const [user, setUser] = useState({nome: 'fbiano'});
  const [loadingAuth, setLoadingAuth] = useState(false);

  const navigation = useNavigation();

  async function signUp(email, password, nome) {
    try {
      setLoadingAuth(true);
      const response = await api.post('/users', {
        name: nome,
        password: password,
        email: email,
      });
      setLoadingAuth(false);
      navigation.goBack();
    } catch (error) {
      console.log('erro ao cadastrar:', error);
      setLoadingAuth(false);
    }
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, signUp, loadingAuth}}>
      {children}
    </AuthContext.Provider>
  );
}
