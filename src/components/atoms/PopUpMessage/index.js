import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PopUpMessage = ({message, isVisible, onClose}) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View
        style={{
          backgroundColor: '#000000aa',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            margin: 50,
            padding: 40,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
            {message}
          </Text>
          <Button title="Close" onPress={onClose} />
          {/* <TouchableOpacity onPress={onClose}><Text>Close</Text></TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

export default PopUpMessage;

const styles = StyleSheet.create({});
