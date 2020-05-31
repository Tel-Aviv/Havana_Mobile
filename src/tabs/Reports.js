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
import BottomSheet from 'reanimated-bottom-sheet';
import DataContext from '../DataContext';

const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';

const Reports = ({route, navigation}) => {
  // const [date, setDate] = useState(new Date());
  const [monthlyReportData, setMonthlyReportData] = useState([]);
  const {reportData, daysOff} = useContext(DataContext);
  console.log(reportData);
  console.log(daysOff);

  const bs = React.createRef();

  useEffect(() => {
    const _data = reportData.map((item) => {
      const date = moment(item.rdate).format('YYYY-MM-DD');

      return {
        title: date,
        data: [
          {
            entry: item.entry,
            exit: item.exit,
            total: item.total,
            notes: item.notes,
            date: date,
          },
        ],
      };
    });

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

  const itemPressed = (item) => {
    // setEditingRecord(item);
    // bs.current.snapTo(0);

    navigation.navigate('Edit Record', {
      item: item,
    });
  };

  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  };

  const renderItem = ({item}, rest) => {
    if (_.isEmpty(item)) {
      return renderEmptyItem();
    }

    return (
      <TouchableOpacity onPress={() => itemPressed(item)} style={styles.item}>
        <View style={styles.timesSection}>
          <Text style={styles.itemHourText}>Enter: {item.entry}</Text>
          <Text style={styles.itemHourText}>Exit: {item.exit}</Text>
          <Text style={styles.itemDurationText}>Total: {item.total}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.notes}</Text>
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
        marked[item.notes] = {marked: true, dotColor: 'green'};
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

  // const renderContent = () => {
  //   return edtingRecord ? (
  //     <Form>
  //       <View style={styles.panel}>
  //         <Item fixedLabel>
  //           <Text style={styles.panelTitle}>
  //             {moment(edtingRecord.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
  //           </Text>
  //         </Item>
  //         <Item>
  //           <Label>Entry:</Label>
  //           <Text style={styles.panelSubtitle} onPress={onEntryTimeEditing}>
  //             {edtingRecord.entry}
  //           </Text>
  //         </Item>
  //         <Item>
  //           <Label>Exit:</Label>
  //           <Text style={styles.panelSubtitle} onPress={onExitTimeEditing}>
  //             {edtingRecord.exit}
  //           </Text>
  //         </Item>
  //         <Item>
  //           <Label>Notes:</Label>
  //           <TextInput value={edtingRecord.notes} />
  //         </Item>
  //         <View style={styles.panelButton}>
  //           <Text style={styles.panelButtonTitle}>Apply</Text>
  //         </View>

  //       </View>
  //     </Form>
  //   ) : null;
  // };

  // const renderHeader = () => (
  //   <View style={styles.header}>
  //     <View style={styles.panelHeader}>
  //       <View style={styles.panelHandle} />
  //     </View>
  //   </View>
  // );

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
      <View style={styles.container}>
        {/* <BottomSheet
          ref={bs}
          snapPoints={[500, 250, 0]}
          renderContent={renderContent}
          renderHeader={renderHeader}
          initialSnap={2}
        /> */}
        <AgendaList
          sections={monthlyReportData}
          renderItem={renderItem}
          // sectionStyle={styles.section}
        />
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  // bottom sheet
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: '#f7f5eee8',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});

export default Reports;
