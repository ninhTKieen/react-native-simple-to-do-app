import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import TaskList from './components/TaskList';
const ToDoListApp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TaskList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#291d1d',
  },
});

export default ToDoListApp;
