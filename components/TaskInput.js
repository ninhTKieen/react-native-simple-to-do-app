import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const TaskInput = props => {
  const [input, setInput] = useState('');
  const handleAddTask = () => {
    props.onChange({
      id : input,
      text : input,
      isComplete : false,
    })
    setInput('');
  }
  return (
    <View style={styles.footer}>
      <View style={styles.inputSpace}>
        <TextInput
          placeholder="Add your task"
          onChangeText={text => setInput(text)}
          value={input}
        />
      </View>
      <TouchableOpacity onPress = {handleAddTask}>
        <View style={styles.iconAdd}>
          <Icon name = "add" color = "white" size = {25} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    flex : 0.1,
    position: 'absolute',
    color: 'grey',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputSpace: {
    backgroundColor: 'grey',
    flex: 0.95,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  iconAdd: {
    height: 50,
    width: 50,
    backgroundColor: '#474675',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
export default TaskInput;
