import React,{useState} from 'react';

import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomPop from './BottomPopUp';
const MyTask = (props) => {
    const [doneList, setDoneList] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style = {styles.item}>
            <View style = {styles.itemLeft} >
                
                <TouchableOpacity style = {styles.square} 
                                  onPress = {() => {
                                      setDoneList(!doneList);
                                      
                                      if(!doneList) {
                                        setModalVisible(true);
                                        setTimeout(()=> setModalVisible(false), 1000);
                                      }
                                  }} >
                {
                    [doneList ? (
                        <Icon name = "done" 
                              size = {25}
                              color = "#0f3604" 
                        /> 
                    ) : null,
                    modalVisible ? (<BottomPop text = "Task finished"/>) : null
                    ]
                }
                </TouchableOpacity>
                
                <Text style = {(doneList) ? styles.colorText : styles.itemText}> {props.text} </Text>
            </View>
            <View style = {styles.itemRight}>
                <TouchableOpacity style = {{paddingLeft : 10}} onPress = {props.delete} >
                    
                    <Icon name = "delete" 
                        color = "red" 
                        size = {30}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    item : {
        flex : 1,
        backgroundColor : "#45302f",
        padding : 20,
        borderRadius : 20,
        flexDirection : "row",
        alignItems : "center",
        marginBottom : 20,
        justifyContent : "space-between"
    }, 
    
    itemRight : {
        flex : 0.1,
        // backgroundColor : "pink",
        flexDirection : "row",
        flexWrap : "wrap",
    },
    itemLeft : {
        flex : 0.8,
        alignItems : "center",
        flexDirection : "row",
    }, 

    itemText : {
        // backgroundColor : "yellow",
        fontSize : 16,
        color : "#c9bebd"
    },

    square : {
        width : 30,
        height : 30,
        backgroundColor : "#55bcf6",
        marginRight : 20,
        borderRadius : 5,
        opacity : 0.6,
        alignItems : "center"
    },
    colorText : {
        fontSize : 16,
        color : "green"
    }
});

export default MyTask;