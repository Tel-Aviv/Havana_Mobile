// flow
import React, {useState, useEffect} from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';
import {Text, Form, Item, Input, Label} from 'native-base';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

const EditRecordModal = ({route, navigation}) => {
  const [enterTime, setEnterTime] = useState();
  const [exitTime, setExitTime] = useState();

  const item = route.params.item;

  useEffect(() => {
    const _entryTime = moment(item.date + 'T' + item.entry, 'YYYY-MM-DDTHH:mm');
    setEnterTime(_entryTime);

    const _exitTime = moment(item.date + 'T' + item.exit, 'YYYY-MM-DDTHH:mm');
    setExitTime(_exitTime);
  }, [route.params.item]);

  const onTimePickerChange = (selectedTime) => {
    setEnterTime(selectedTime);
  };
  return (
    <View style={styles.container}>
      <Form>
        <View style={styles.panel}>
          <Text style={{fontSize: 30}}>{item.date}</Text>
          <Item>
            <Label>Entry:</Label>
            <DatePicker
              date={enterTime}
              mode="time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              display="default"
              onDateChange={(date) => onTimePickerChange(date)}
            />
          </Item>
          <Item>
            <Label>Exit:</Label>
            <DatePicker
              date={exitTime}
              mode="time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              display="default"
              onDateChange={(date) => onTimePickerChange(date)}
            />
          </Item>
          <Item>
            <Label>Notes:</Label>
            <TextInput style={styles.panelSubtitle}>{item.notes}</TextInput>
          </Item>
        </View>
        <Button onPress={() => navigation.goBack()} title="Update" />
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: '#f7f5eee8',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
});

export default EditRecordModal;