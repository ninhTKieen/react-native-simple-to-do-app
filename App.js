import React, {useState} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyTask from "./components/Task";
import WaitingPage from './components/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomPop from './components/BottomPopUp';

const ToDoListApp = () => {
    storeData = [];
    const [textInputValue, setTextInputValue] = useState("");
    const [showAddButton,setViewAddButton] = useState(true);
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const [isReady, setReady] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalFillTask, setModalFillTask] = useState(false);
    /**
     * Handle Add new task
     */
    const handleAddText = () => {
      Keyboard.dismiss();
      if(task != null&&task != "") {
        setModalAdd(true);
         storeData.push(...taskItems, task);
        _storeData(storeData);
      }
      else {
        setModalFillTask(true);
        setTimeout(()=> setModalFillTask(false), 1000);
      }
      _retrieveData();
      setTextInputValue("");
      setTask(null);
      
    }
    /**
     * Handle Delete Tasks
     */
    
    const handleDeleteTodo =  async (id) => {
      storeData.push(...taskItems.filter((todo, index) => {
        if(index !== id) {
          return true;
        }
      }));
      AsyncStorage.removeItem("tasks").then(
          _storeData(storeData)
      )
      _retrieveData();
      console.log("Task deleted")
    }
    
    const handleDeleteAllTask = () => {
      console.log(storeData.length);
      Alert.alert("WARNING","Delete all ?", [
        {text : "Yes", onPress : () => {
          storeData = [];
          AsyncStorage.removeItem("tasks").then(
            _storeData(storeData)
          );
          _retrieveData();
        }},
        {text : "No"}
      ])
    }
    /**
     * Store and get data task
     */
    _storeData = async (storeData) => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(storeData));
      }
      catch(error) {
        console.log(error);
      }
    }

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('tasks');
        // console.log(value);
        if(value!==null){
          setTaskItems(JSON.parse(value))
        }
  
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    };
    /**
     * Splash Screen View
     */
    performTimeConsumingTask = async() => {
      /**
       * Set timeout for SplashScreen
       */
      return new Promise((resolve) =>
        setTimeout(
          () => { resolve('result') }, 2000)
      );
    }
    componentDidMount = async() => {
      // Preload data from an external API
      // Preload data using AsyncStorage
      const data = await performTimeConsumingTask();
      if (data !== null) {
        setReady(true);
      }
      _retrieveData();
    }
    //call function
    if(!isReady){
      componentDidMount();
      return <WaitingPage />
    }
    /**
     * Main app view
     */
    return (
        <SafeAreaView style = {styles.container}>
            {/* Todo list header */}
          <View style = {styles.header}>
            <Text style = {styles.titleSpace}>Today's Tasks</Text>
            <View>
              <TouchableOpacity onPress = {() => handleDeleteAllTask()}>
                <Icon name = "delete" 
                      size = {30}
                      color = "red"
                />
              </TouchableOpacity>
            </View>         
          </View>
            {/* Here is the task list will go */}
            <View style = {styles.body}>
              <ScrollView>
                {
                  taskItems.map((task, index) => {
                    return <MyTask 
                            key={index} 
                            text={task} 
                            delete = {() => {
                              handleDeleteTodo(index)
                              setModalDelete(true);
                              setTimeout(() => setModalDelete(false), 1000);
                            }}/>
                  })
                }
                {
                  modalDelete ? (<BottomPop text = "Task deleted" />) : null
                }
                
              </ScrollView>
            </View>
            
            {/* Text input space */}
            <View style = {styles.footer}>
              <View style = {styles.inputSpace}>
                <TextInput placeholder = "Add new task"
                  // onFocus = {() => setViewAddButton(true)} //click text to enalble button 
                  // onBlur = {() => setViewAddButton(true)} // left text, button dissappear 
                  onChangeText = {text => {
                    setTask(text);
                    setTextInputValue(text);
                  }}
                  value = {textInputValue}
                />
              </View>

            {/* Show button event */}
            {
              showAddButton ? <TouchableOpacity 
                onPress = {() => {
                  handleAddText();
                  setTimeout(() => setModalAdd(false), 1000);
                }}>
                  {
                    modalAdd ? (<BottomPop text = "Task added"  />) : null
                  }
                  {
                    modalFillTask ? (<BottomPop text = "Enter task please!" />) : null
                  }
                  <View style = {styles.iconAdd}>
                    <Icon name = "add" color = "white" size = {25} />
                  </View>
                </TouchableOpacity> : null  
            }
              
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container : {
      flex : 1,
      // backgroundColor : "#45302f",
      backgroundColor : "#291d1d",

    },

    header : {
      flex : 0.1,
      paddingTop : 60, // space with the top     
      paddingHorizontal : 20,
      flexDirection : 'row',
      justifyContent : "space-between",
      // backgroundColor : "red"
    },

    titleSpace : {
      fontSize : 24,
      fontWeight : "bold",
      paddingBottom : 20,
      color : "#c9bebd"
    },

    footer : {
      position : "absolute",
      color : "grey",
      bottom : 0,
      width : '100%',
      flexDirection : "row",
      alignItems : "center",
      paddingHorizontal : 20,
      flex : 0.1,
      // backgroundColor : "green"
    },

    inputSpace : {
      backgroundColor : "grey",
      flex : 0.95,
      height : 50,
      marginVertical : 20,
      marginRight : 20,
      borderRadius : 30,
      paddingHorizontal : 20,
    },

    iconAdd : {
      height : 50,
      width : 50,
      backgroundColor : "#474675",
      justifyContent : "center",
      alignItems : "center",
      borderRadius : 50
    },
    
    body : {
      // backgroundColor : "pink",
      flex : 0.8,
      paddingHorizontal : 10,
    }
});

export default ToDoListApp; 