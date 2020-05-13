/**
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, SafeAreaView, Text, Button} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['he'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'he';

import DataContext from '../DataContext';

function Separator() {
  return <View style={styles.separator} />;
}

const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};

const Reports = ({route, navigation}) => {
  const [date, setDate] = useState(new Date());

  const {reportData} = useContext(DataContext);
  console.log(reportData);
  // const rd = parent.getParam('reportData');
  // console.log(`Params to Reports: ${rd}`);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={[styles.container, {top: 22}]}>
      <View style={{flex:1}}>
        <View style={styles.horizontal}>
          <Button title="Submit" disabled />
          <Button title="Check" />
        </View>
        <Separator />
      </View>
      <Calendar
        style={{flex: 6}}
        current={Date()}
        markingType={'multi-dot'}
        markedDates={{
          '2020-05-16': {selected: true, marked: true, selectedColor: 'blue'},
          '2020-05-17': {marked: true},
          '2020-05-18': {
            dots: [vacation, massage, workout],
          },
          '2020-05-19': {disabled: true, disableTouchEvent: true},
        }}
      />
      <View style={{flex:6}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginHorizontal: 14,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Reports;
