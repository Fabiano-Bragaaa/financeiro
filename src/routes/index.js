import React, {useContext} from 'react';

import {AuthRoutes} from './auth.route';
import {AppRoutes} from './app.routes';

import {AuthContext} from '../contexts/Auth';

export function Routes() {
  const {signed} = useContext(AuthContext);

  const loading = false;

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
