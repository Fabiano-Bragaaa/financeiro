import React, {useContext} from 'react';
import {
  Container,
  Message,
  Name,
  NewLink,
  NewText,
  LogoutButton,
  LogoutText,
} from './styles';
import {Header} from '../../components/Header';

import {AuthContext} from '../../contexts/Auth';

import {useNavigation} from '@react-navigation/native';

export function Profile() {
  const {user, singOut} = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <Container>
      <Header title="Meu perfil" />
      <Message>Hey, bem vindo de volta!</Message>
      <Name numberOfLines={1}>{user && user.name}</Name>

      <NewLink onPress={() => navigation.navigate('Registrar')}>
        <NewText>Fazer Registro</NewText>
      </NewLink>

      <LogoutButton onPress={() => singOut()}>
        <LogoutText>Sair</LogoutText>
      </LogoutButton>
    </Container>
  );
}
