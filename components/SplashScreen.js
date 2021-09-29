import React from "react";
import {View, Text,StyleSheet, Image} from "react-native";

const WaitingPage = (props) => {
    return (
        <View style = {styles.container}>
            <Image style = {styles.imageLogo} 
                source = {require("../assets/todoIcon.png")} />
            <Text style = {styles.textStyle}>Welcome to Kien's ToDo List App</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        backgroundColor : "orange",
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    textStyle : {
        fontWeight : "bold",
        color : "white",
        fontSize : 40,
        textAlign : "center"
    },
    imageLogo : {
        width : 400,
        height : 200,
    }
})
export default WaitingPage;