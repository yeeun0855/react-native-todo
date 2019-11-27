import React from 'react';
import { StyleSheet, StatusBar, View, Text, TextInput, Dimensions, Platform, ScrollView, AsyncStorage } from 'react-native';
// import { Platform } from '@unimodules/core';
import { AppLoading } from 'expo';
import { v1 as uuid } from 'uuid';
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedTodos: false,
    toDos: {}
  };
  componentDidMount = () => {
    this._loadToDos();
  }

  render() {
    const { newToDo, loadedTodos, toDos } = this.state;
    
    if (!loadedTodos) {
      return <AppLoading />;
    }
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
            autoCorrect={false}
            onSubmitEditing={this._addTodo} />
          <ScrollView contentContainerStyle={styles.toDos}>
            {/* <ToDo text={"hello its me i just wondering"} /> */}
            {Object.values(toDos).reverse().map(toDo => 
                <ToDo 
                key={toDo.id} 
                deleteToDo={this._deleteToDo}
                uncompleteToDo={this._uncompleteToDo}
                completeToDo={this._completeToDo}
                updateToDo={this._updateToDo}
                {...toDo}
                />
              )}
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
  _loadToDos = async () => {
    try {
      // toDos: key value obj => 폰에 저장
      const toDos = await AsyncStorage.getItem("toDos");
      console.log(toDos)
      this.setState({
        loadedTodos: true,
        toDos: JSON.parse(toDos)
      })
    } catch(err) {
      console.log(err)
    }

   
  }
  _addTodo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      /*
          Todo Obj Modeling
          123456 = {
            id: 123456,
            text: 'tom',
            isCompleted: false,
            date: 894566
          }
      */
      this.setState(prevState => {
        // toDos: prevState.toDos + newToDo
        const ID = uuid();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now()
          }
        }
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        this._saveToDos(newState.toDos)
        return { ...newState };
      })
    }
  }
  _deleteToDo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      }
      this._saveToDos(newState.toDos)
      return {...newState}
    })
  }
  _uncompleteToDo = id => { // 해당 id를 갖고 있는 항목이 있다면 덮어쓰기
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted:false
          }
        }
      }
      this._saveToDos(newState.toDos)
      return { ...newState }
    })
  }
  _completeToDo = id => { // 해당 id를 갖고 있는 항목이 있다면 덮어쓰기
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: { ...prevState.toDos[id], isCompleted: true }
        }
      }
      this._saveToDos(newState.toDos)
      return { ...newState }
    })
  }
  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id] : {...prevState.toDos[id], text:text}
        }
      }
      this._saveToDos(newState.toDos)
      return { ...newState }
    })
  }
  // 묶기
  _saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
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
    color: "white",
    fontSize: 30,
    marginTop: 100,
    marginBottom: 30,
    fontWeight: "200"
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 50,
    // borderRadius:10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.5,
        shadowColor: "rgb(50,50,50)",
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {

  }
});
