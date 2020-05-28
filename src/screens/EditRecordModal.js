// flow
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const EditRecordModal = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditRecordModal;
