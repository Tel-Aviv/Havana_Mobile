// flow
import React, {useState, useEffect} from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';
import {
  Text,
  Container,
  Form,
  Header,
  Content,
  Item,
  Input,
  Label,
  Left,
  Right,
  Body,
  Icon,
} from 'native-base';
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
    <Container>
      <Header span transparent>
        <Left>
          <Icon name="arrow-back" onPress={() => navigation.goBack()} />
        </Left>
        <Body>
          <Text style={{fontSize: 20}}>{item.date}</Text>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item underline>
            <Label>Entry:</Label>
            <DatePicker
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                },
              }}
              date={enterTime}
              mode="time"
              is24Hour={true}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              display="default"
              onDateChange={(date) => onTimePickerChange(date)}
            />
          </Item>
          <Item underline>
            <Label
              style={{
                marginRight: 12
              }}>
              Exit:
            </Label>
            <DatePicker
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                },
              }}
              date={exitTime}
              mode="time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              display="default"
              onDateChange={(date) => onTimePickerChange(date)}
            />
          </Item>
          <Item>
            <Icon active name='home' />
            <Label>Notes:</Label>
            <TextInput style={styles.panelSubtitle}>{item.notes}</TextInput>
          </Item>
          <Button onPress={() => navigation.goBack()} title="Update" />
        </Form>
      </Content>
    </Container>
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
    width: 200,
    direction: 'rtl',
  },
});

export default EditRecordModal;