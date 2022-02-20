import React, {useState} from 'react';
import {View, Modal, Text, StyleSheet} from 'react-native';

const BottomPop = props => {
  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View style={styles.modalView}>
        <Text style={styles.textStyle}> {props.text} </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: 40,
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#21211f',
    justifyContent: 'center',
    borderRadius: 5,
  },

  textStyle: {
    color: '#d4cdbc',
    paddingLeft: 20,
    fontSize: 16,
  },
});

export default BottomPop;
