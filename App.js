import React from 'react';
import { StyleSheet, StatusBar, View, Text, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
// import { Platform } from '@unimodules/core';
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo:""
  };
  render() {
    const { newToDo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>To Do List</Text>
        <View style={styles.card}>
          <TextInput 
          style={styles.input} 
          placeholder={"New To do"} 
          value={newToDo} 
          onChangeText={this._crontollNewToDo} 
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false} />
        <ScrollView contentContainerStyle={styles.toDos}>
      <ToDo text={"hello its me i just wondering"}/>
        </ScrollView>
        </View>
      </View>
    )
  };
  _crontollNewToDo = text => {
    this.setState({
      newToDo: text
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    color:"white",
    fontSize:30,
    marginTop:100,
    marginBottom:30,
    fontWeight:"200"
  },
  card : {
    backgroundColor:"white",
    flex:1,
    width:width-50,
    // borderRadius:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    ...Platform.select ({
      ios:{
        shadowOpacity:0.5,
        shadowColor:"rgb(50,50,50)",
        shadowRadius: 5,
        shadowOffset: {
          height:-1,
          width:0
        }
      }, 
      android :{
        elevation:3
      }
    })
  },
  input : {
    padding:20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize:25
  }, 
  toDos: {

  }
});
