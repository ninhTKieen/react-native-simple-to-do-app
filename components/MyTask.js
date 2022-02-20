import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyTask = ({task, completeTasks, removeTasks, editTasks}) => {
  const [edit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [done, isDone] = useState(false);

  return (
    <View style={styles.item} key={task.id}>
      <View style={styles.itemLeft}>
        <TouchableOpacity
          style={styles.square}
          onPress={() => completeTasks(task.id, task.isComplete)}>
          {!edit && task.isComplete ? (
            <Icon name="check" size={25} color="green" />
          ) : null}
        </TouchableOpacity>

        <TextInput
          multiline={true}
          style={!edit && task.isComplete ? styles.colorText : styles.itemEdit}
          placeholder="Update your task"
          defaultValue={task.content}
          onChangeText={text => setNewTask(text)}
          editable={edit}
          autoFocus={edit}
        />
      </View>

      <View style={styles.itemRight}>
        <TouchableOpacity
          style={{paddingLeft: 10}}
          onPress={() => {
            setEdit(!edit);
            if (edit) {
              editTasks(
                {
                  content: newTask,
                  isComplete: false,
                  description: '',
                },
                task.id,
              );
            }
          }}>
          <Icon
            name={edit ? 'content-save' : 'square-edit-outline'}
            color="dodgerblue"
            size={30}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{paddingLeft: 10}}
          onPress={() => removeTasks(task.id)}>
          <Icon name="delete" color="red" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#45302f',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },

  itemRight: {
    flex: 0.2,
    // backgroundColor : "pink",
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },

  itemLeft: {
    flex: 0.6,
    alignItems: 'center',
    flexDirection: 'row',
  },

  itemText: {
    fontSize: 20,
    color: '#c9bebd',
  },

  itemEdit: {
    alignItems: 'center',
    fontSize: 20,
    color: '#c9bebd',
    padding: 0,
  },

  square: {
    width: 30,
    height: 30,
    backgroundColor: '#55bcf6',
    marginRight: 20,
    borderRadius: 5,
    opacity: 0.6,
    alignItems: 'center',
  },
  colorText: {
    fontSize: 20,
    color: 'green',
    textDecorationLine: 'line-through',
    padding: 0,
  },
});
export default MyTask;
