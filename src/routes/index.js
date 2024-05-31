import React, {useContext} from 'react';

import {AuthRoutes} from './auth.route';
import {AppRoutes} from './app.routes';

import {AuthContext} from '../contexts/Auth';
import {ActivityIndicator, View} from 'react-native';

export function Routes() {
  const {signed, loading} = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f4ff',
        }}>
        <ActivityIndicator size="large" color="#131313" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
