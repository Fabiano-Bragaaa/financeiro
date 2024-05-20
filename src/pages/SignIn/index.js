import React from 'react';
import {
  Background,
  Container,
  AreaInput,
  Input,
  Logo,
  SubmitButton,
  SubmitText,
  Link,
  LinkText,
} from './styles';

import {useNavigation} from '@react-navigation/native';

import {Platform} from 'react-native';

export function SignIn() {
  const navigation = useNavigation();
  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <Logo source={require('../../assets/Logo.png')} />

        <AreaInput>
          <Input placeholder="Seu Email" />
        </AreaInput>

        <AreaInput>
          <Input placeholder="Sua senha" />
        </AreaInput>

        <SubmitButton activeOpacity={0.8}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
