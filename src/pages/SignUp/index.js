import React, {useContext, useState} from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import {
  Background,
  Container,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from '../SignIn/styles';

import {AuthContext} from '../../contexts/Auth';

export function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signUp, loadingAuth} = useContext(AuthContext);

  function handleSignUp() {
    if (nome === '' || email === '' || password === '') {
      return;
    }
    signUp(email, password, nome);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <AreaInput>
          <Input placeholder="Nome" value={nome} onChangeText={setNome} />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Seu Email"
            value={email}
            onChangeText={setEmail}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Sua Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}
