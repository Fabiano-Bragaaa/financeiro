import React, {useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';

import {
  Container,
  ButtonFilterText,
  ModalContent,
  ButtonFilter,
} from './styles';

import {LocaleConfig, Calendar} from 'react-native-calendars';

import {ptBr} from './localeCalendar';

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

export function CalendarModal({setVisible, handleFilter}) {
  const [dateNow, setDateNow] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});

  function handleOnDayPress(date) {
    setDateNow(new Date(date.dateString));

    let markedDay = {};

    markedDay[date.dateString] = {
      selected: true,
      selectedColor: '#3b3dbf',
      textColor: '#fff',
    };

    setMarkedDates(markedDay);
  }

  function handleFilterDate() {
    handleFilter(dateNow);
    setVisible();
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={{flex: 1}}></View>
      </TouchableWithoutFeedback>

      <ModalContent>
        <Calendar
          onDayPress={handleOnDayPress}
          markedDates={markedDates}
          enableSwipeMonths
          theme={{
            todayTextColor: '#ff0000',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#fff',
          }}
        />

        <ButtonFilter onPress={handleFilterDate}>
          <ButtonFilterText>Filtrar</ButtonFilterText>
        </ButtonFilter>
      </ModalContent>
    </Container>
  );
}
