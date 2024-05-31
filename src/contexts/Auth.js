import React, {createContext, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {api} from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadingStorage() {
      const storageUsers = await AsyncStorage.getItem('@finApp');

      if (storageUsers) {
        const response = await api
          .get('/me', {
            headers: {
              Authorization: ` Bearer ${storageUsers}`,
            },
          })
          .catch(() => {
            setUser(null);
          });

        api.defaults.headers['Authorization'] = ` Bearer ${storageUsers} `;
        setUser(response.data);
        setLoading(false);
      }
      setLoading(false);
    }

    loadingStorage();
  }, []);

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

  async function signIn(email, password) {
    setLoadingAuth(true);
    try {
      const response = await api.post('/login', {
        email: email,
        password: password,
      });

      const {name, id, token} = response.data;

      const data = {
        name,
        id,
        token,
        email,
      };

      await AsyncStorage.setItem('@finApp', token);

      api.defaults.headers['Authorization'] = ` Bearer ${token} `;

      setUser({
        id,
        name,
        email,
      });

      setLoadingAuth(false);
    } catch (error) {
      console.log('Erro ao cadastrar', error);
      setLoadingAuth(false);
    }
  }

  async function singOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        signIn,
        singOut,
        loadingAuth,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
