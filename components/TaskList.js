import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';

import TaskInput from './TaskInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MyTask from './MyTask';
import WaitingPage from './SplashScreen';

const mockAPI = `https://6210b0334cd3049e178245b0.mockapi.io/api/todos`;

const TaskList = () => {
  let storeData = [];
  const [taskItems, setTaskItems] = useState([]);
  const [isReady, setReady] = useState(false);

  const handleAddTask = async task => {
    Keyboard.dismiss();
    if (!task.content) {
      return;
    }
    await fetch(mockAPI, {
      method: 'POST',
      body: JSON.stringify({
        content: task.content,
        description: task.description,
        isComplete: task.isComplete,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    retrieveData();
  };

  const completeTasks = async (id, isComplete) => {
    await fetch(mockAPI + `/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        isComplete: !isComplete,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    retrieveData();
  };

  const removeTasks = async id => {
    await fetch(mockAPI + `/${id}`, {
      method: 'DELETE',
    });

    retrieveData();
  };

  const editTasks = async (newTask, id) => {
    if (!newTask.content) {
      return;
    }
    await fetch(mockAPI + `/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        content: newTask.content,
        description: newTask.description,
        isComplete: newTask.isComplete,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    retrieveData();
  };

  const _storeData = async (data = []) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveData = async () => {
    try {
      const response = await fetch(mockAPI);
      if (response.status === 200) {
        const data = await response.json();
        setTaskItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  // if (!isReady) {
  //   return <WaitingPage />;
  // }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleSpace}>Today's Tasks</Text>
        <View>
          <TouchableOpacity onPress={() => handleDeleteAllTask()}>
            <Icon name="delete" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView>
          {taskItems.map(task => {
            return (
              <MyTask
                key={task.id}
                task={task}
                completeTasks={completeTasks}
                removeTasks={removeTasks}
                editTasks={editTasks}
              />
            );
          })}
        </ScrollView>
      </View>
      <TaskInput onChange={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    flex: 0.9,
    paddingHorizontal: 10,
  },
  titleSpace: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20,
    color: '#c9bebd',
  },
});
export default TaskList;
