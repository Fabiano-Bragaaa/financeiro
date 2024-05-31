import React, {useContext, useEffect, useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';

import {AuthContext} from '../../contexts/Auth';

import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Header} from '../../components/Header';

import {Background, ListBalance, Area, Title, List} from './styles';
import {api} from '../../services/api';
import {useIsFocused} from '@react-navigation/native';
import {BalanceItem} from '../../components/BalanceItem';
import {HistoricoList} from '../../components/HistoricoList';
import {CalendarModal} from '../../components/CalendarModal';

export function Home() {
  const [listBalance, setListBalance] = useState([]);
  const [dateMoviment, setDateMoviment] = useState(new Date());
  const [moviments, setMoviments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;

    async function getMoviments() {
      let date = new Date(dateMoviment);
      let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;

      let dateFormated = format(onlyDate, 'dd/MM/yyyy');

      const receives = await api.get('/receives', {
        params: {
          date: dateFormated,
        },
      });

      const balance = await api.get('/balance', {
        params: {
          date: dateFormated,
        },
      });

      if (isActive) {
        setMoviments(receives.data);
        setListBalance(balance.data);
      }
    }

    getMoviments();

    return () => (isActive = false);
  }, [isFocused, dateMoviment]);

  async function handleDelete(id) {
    try {
      await api.delete('/receives/delete', {
        params: {
          item_id: id,
        },
      });

      setDateMoviment(new Date());
    } catch (error) {
      console.log(error);
    }
  }

  function filterDateMoviments(dateSelected) {
    setDateMoviment(dateSelected);
  }

  return (
    <Background>
      <Header title="Minhas Movimentações" />
      <ListBalance
        data={listBalance}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.tag}
        renderItem={({item}) => <BalanceItem data={item} />}
      />

      <Area>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="event" color="#121212" size={30} />
        </TouchableOpacity>
        <Title>Ultimas Movimentações</Title>
      </Area>

      <List
        data={moviments}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <HistoricoList data={item} deleteItem={handleDelete} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      />

      <Modal visible={modalVisible} animationType="fade" transparent>
        <CalendarModal
          setVisible={() => setModalVisible(false)}
          handleFilter={filterDateMoviments}
        />
      </Modal>
    </Background>
  );
}
