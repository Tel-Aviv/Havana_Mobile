/**
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Text} from 'native-base';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['he'] = {
  monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  monthNamesShort: ['Янв.','Фев.','Март','Апр','Май','Июнь','Июль','Авг.','Сен.','Окт.','Ноябрь.','Дек.'],
  dayNames: ['Воскресенье','понедельник','вторник','среда','Четверг','пятница','суббота'],
  dayNamesShort: ['Вскр.','Пнд.','Вт.','Ср.','Чт.','Пт.','Суб.'],
  today: 'Сегодня',
};
LocaleConfig.defaultLocale = 'he';

import DataContext from '../DataContext';

function Separator() {
  return <View style={styles.separator} />;
}

const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workOff = {key: 'daysoff', color: 'green'};

const Reports = ({route, navigation}) => {
  const [date, setDate] = useState(new Date());
  const [showAgenda, setShowAgenda] = useState(false);

  const {reportData, daysOff} = useContext(DataContext);
  console.log(reportData);
  console.log(daysOff);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onDayPress = (day) => {
    console.log('selected day', day);
    setShowAgenda(true);
  };

  const renderAgendaItem = (item, firstItemInDay) => {
    return (
      <TouchableOpacity
        style={[styles.agendaItem, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const onCalendarToggled = (calendarOpened) => {
    console.log(calendarOpened);
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {top: 22}]}>
      <View style={{flex:0.1}}>
        <View style={styles.horizontal}>
          <Button title="Submit" disabled />
          <Button title="Check" />
        </View>
        <Separator />
      </View>
      <View style={{flex: 0.9}}>
        {showAgenda ? (
          <View style={{flex:1}}>
            <Agenda
              theme={{agendaKnobColor: 'gray'}}
              // The list of items that have to be displayed in agenda. If you want to render item as empty date
              // the value of date key has to be an empty array []. If there exists no value for date key it is
              // considered that the date in question is not yet loaded
              items={{
                '2020-05-12': [{name: 'item 1 - any js object'}],
                '2020-05-13': [{name: 'item 2 - any js object', height: 80}],
                '2020-05-15': [],
                '2020-05-16': [
                  {name: 'item 3 - any js object'},
                  {name: 'any js object'},
                ],
              }}
              // Callback that gets called when items for a certain month should be loaded (month became visible)
              loadItemsForMonth={(month) => {console.log('trigger items loading')}}
              // Callback that fires when the calendar is opened or closed
              onCalendarToggled={onCalendarToggled}
              // Callback that gets called on day press
              onDayPress={(day)=>{console.log('day pressed')}}
              // Callback that gets called when day changes while scrolling agenda list
              onDayChange={(day)=>{console.log('day changed')}}
              // Initially selected day
              selected={'2020-05-16'}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={'2020-05-01'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={'2020-05-30'}
              // Max amount of months allowed to scroll to the past. Default = 50
              pastScrollRange={2}
              // Max amount of months allowed to scroll to the future. Default = 50
              futureScrollRange={2}
              // Specify how each item should be rendered in agenda
              renderItem={renderAgendaItem}
              // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
              renderDay={(day, item) => {return (<View />);}}
              // Specify how empty date content with no items should be rendered
              renderEmptyDate={renderEmptyDate}
              // Specify how agenda knob should look like
              //renderKnob={renderKnob}
              // Specify what should be rendered instead of ActivityIndicator
              renderEmptyData = {() => {return (<View />);}}
              // Specify your item comparison function for increased performance
              rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
              // Hide knob button. Default = false
              hideKnob={false}
              // By default, agenda dates are marked if they have at least one item, but you can override this if needed
              markedDates={{
                '2020-05-11': {selected: true, marked: true},
                '2020-05-15': {marked: true},
                '2020-05-14': {disabled: true},
              }}
              // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
              disabledByDefault={true}
              // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
              onRefresh={() => console.log('refreshing...')}
              // Set this true while waiting for new data from a refresh
              refreshing={false}
              // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
              refreshControl={null}
              // Agenda container style
              style={{}}
            />
            <Button title="Close" />
          </View>
        ) : (
          <Calendar
            current={Date()}
            onDayPress={onDayPress}
            pagingEnabled={false}
            markingType={'multi-dot'}
            markedDates={{
              '2020-05-01': {
                selected: true,
                marked: true,
                selectedColor: 'blue',
              },
              '2020-05-02': {marked: true},
              '2020-05-03': {
                dots: [vacation, massage, workOff],
              },
              '2020-05-25': {disabled: true, disableTouchEvent: true},
            }}
          />
        )}
      </View>
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
  agendaItem: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
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
