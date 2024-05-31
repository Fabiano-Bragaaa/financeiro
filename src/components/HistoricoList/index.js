import React from 'react';
import {Alert, TouchableWithoutFeedback} from 'react-native';

import {Container, TypeText, Tipo, IconView, ValorText} from './styles';

import Icon from 'react-native-vector-icons/Feather';

export function HistoricoList({data, deleteItem}) {
  function handleDeleteItem() {
    Alert.alert('Atenção', 'Você tem certeza que deseja deletar esse item?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'continuar',
        onPress: () => deleteItem(data.id),
      },
    ]);
  }

  return (
    <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
      <Container>
        <Tipo>
          <IconView tipo={data.type}>
            <Icon
              name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'}
              color="#fff"
              size={20}
            />
            <TypeText>{data.type}</TypeText>
          </IconView>
        </Tipo>

        <ValorText>R$ {data.value}</ValorText>
      </Container>
    </TouchableWithoutFeedback>
  );
}
