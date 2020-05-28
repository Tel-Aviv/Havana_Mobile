/**
 * @format
 */
import React, {useState, useEffect, useContext} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'native-base';

import {LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'Juny',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
} from 'react-native-calendars';

import DataContext from '../DataContext';

// const today = new Date().toISOString().split('T')[0];
// const fastDate = getPastDate(3);
// const futureDates = getFutureDates(9);
// const dates = [fastDate, today].concat(futureDates);
const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';

// function getFutureDates(days) {
//   const array = [];
//   for (let index = 1; index <= days; index++) {
//     const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
//     const dateString = date.toISOString().split('T')[0];
//     array.push(dateString);
//   }
//   return array;
// }

// function getPastDate(days) {
//   return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
// }

// const ITEMS = [
//   {
//     title: dates[0],
//     // data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}],
//     data: [],
//   },
//   {
//     title: dates[1],
//     data: [
//       {hour: '4pm', duration: '1h', title: 'Entry'},
//       {hour: '5pm', duration: '1h', title: 'Exit'},
//     ],
//   },
// ];

const Reports = ({route, navigation}) => {
  // const [date, setDate] = useState(new Date());
  const [monthlyReportData, setMonthlyReportData] = useState([]);
  
  const {reportData, daysOff} = useContext(DataContext);
  console.log(reportData);
  console.log(daysOff);

  useEffect(() => {
    const _data = reportData.map((item) => ({
      title: moment(item.rdate).format('YYYY-MM-DD'),
      data: [{ 
              entry: item.entry, 
              exit: item.exit,
              total: item.total, 
              title: item.notes
        },
      ],
    }));
    setMonthlyReportData(_data);
  }, [reportData]);

  const getTheme = () => {
    const disabledColor = 'grey';

    return {
      // arrows
      arrowColor: 'black',
      arrowStyle: {padding: 0},
      // month
      monthTextColor: 'black',
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: 'black',
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: 'white',
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: 'white',
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2},
    };
  };

  const onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  const buttonPressed = () => {
    // Alert.alert('show more');
    navigation.navigate('Edit Record');
  };

  const itemPressed = (id) => {
    Alert.alert(id);
  };

  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return renderEmptyItem();
    }

    return (
      <TouchableOpacity
        onPress={() => itemPressed(item.title)}
        style={styles.item}>
        <View style={styles.timesSection}>
          <Text style={styles.itemHourText}>Enter: {item.entry}</Text>
          <Text style={styles.itemHourText}>Exit: {item.exit}</Text>
          <Text style={styles.itemDurationText}>Total: {item.total}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Edit'} onPress={buttonPressed} />
        </View>
      </TouchableOpacity>
    );
  };

  const getMarkedDates = () => {
    const marked = {};
    // ITEMS.forEach((item) => {
    //   // NOTE: only mark dates with data
    //   if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
    //     marked[item.title] = {marked: true, dotColor: 'red', disabled: true};
    //   }
    // });
    monthlyReportData.forEach((item) => {
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {marked: true, dotColor: 'green'};
      }
    });
    // monthlyReportData.forEach((item) => {
    //   marked[item.title] = item.isWorkingDay
    //     ? {disabled: false}
    //     : {marked: true, disabled: true};
    // });
    daysOff.forEach((item) => {
      const propName = moment(item).format('YYYY-MM-DD');
      marked[propName] = {marked: true, dotColor: 'grey', disabled: true};
    });
    return marked;
  };

  return (
    <CalendarProvider
      date={
        monthlyReportData.length > 0 ? monthlyReportData[0].title : new Date()
      }
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      // theme={{
      //   todayButtonTextColor: themeColor
      // }}
      // todayBottomMargin={16}
    >
      <ExpandableCalendar
        horizontal={true}
        // hideArrows
        // disablePan
        // hideKnob
        // initialPosition={ExpandableCalendar.positions.OPEN}
        displayLoadingIndicator
        calendarStyle={styles.calendar}
        headerStyle={styles.calendar} // for horizontal only
        // disableWeekScroll
        theme={getTheme()}
        firstDay={0}
        markedDates={getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
        leftArrowImageSource={require('../img/previous.png')}
        rightArrowImageSource={require('../img/next.png')}
      />
      <AgendaList
        sections={monthlyReportData}
        renderItem={renderItem}
        // sectionStyle={styles.section}
      />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
  timesSection: {
    paddingRight: 14,
    borderRightWidth: 2,
    borderRightColor: 'green',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});

export default Reports;
