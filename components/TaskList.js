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
const TaskList = () => {
  let storeData = [];
  const [taskItems, setTaskItems] = useState([]);
  const [isReady, setReady] = useState(false);
  const handleAddTask = task => {
    Keyboard.dismiss();
    if (!task.text) {
      return;
    }
    let count = 0;
    while (taskItems.filter(item => item.id === task.id).length) {
      task.id += count;
      count++;
    }
    const newTasks = [...taskItems, task];
    storeData.push(...taskItems, task);
    _storeData(storeData);
    retrieveData();
  };
  const completeTasks = async id => {
    let updateTasks = taskItems.map(task => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    AsyncStorage.removeItem('todos').then(_storeData(updateTasks));
    retrieveData();
  };
  const removeTasks = id => {
    let updateTasks = taskItems.filter(task => {
      if (task.id !== id) {
        return true;
      }
    });
    AsyncStorage.removeItem('todos').then(_storeData(updateTasks));
    retrieveData();
  };
  const handleDeleteAllTask = () => {
    Alert.alert('WARNING', 'Delete all ?', [
      {
        text: 'Yes',
        onPress: () => {
          storeData = [];
          AsyncStorage.removeItem('todos').then(_storeData(storeData));
          retrieveData();
        },
      },
      {text: 'No'},
    ]);
  };
  const editTasks = (newTask, id) => {
    if (!newTask.text) {
      return;
    }
    let updateTasks = taskItems.map(item => (item.id === id ? newTask : item));
    AsyncStorage.removeItem('todos').then(_storeData(updateTasks));
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
      const value = await AsyncStorage.getItem('todos');
      console.log(value);
      if (value) {
        console.log('set value');
        setTaskItems(JSON.parse(value));
      }
      setTimeout(() => setReady(true), 1000);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    retrieveData();
  }, []);
  if (!isReady) {
    return <WaitingPage />;
  }
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
