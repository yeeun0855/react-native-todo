import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export default class ToDo extends Component {
    state = {
        isEditing: false,
        isCompleted: false,

    };
    render() {
        const { isEditing, isCompleted } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggoleComplete}>
                        <View style={[
                            styles.circle,
                            isCompleted ? styles.completedCircle : styles.uncompleteCircle
                        ]} />
                    </TouchableOpacity>
                    <Text style={[
                        styles.text,
                        isCompleted ? styles.completedText : styles.uncompletedText
                    ]}>Hello</Text>
                </View>
                {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>브이</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>연필</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>엑스</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                </View>
        )
    }
    _toggoleComplete = () => {
        this.setState(prevState => {
            return ({
                isCompleted: !prevState.isCompleted,
            })
        })
    }
    _startEditing = () => {
        this.setState = ({
            isEditing: true
        });
    }
    _finishEditing = () => {
        this.setState = ({
            isEditing: false
        });
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20,
        marginLeft: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompleteCircle: {
        borderColor: "#F23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20,
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
        justifyContent: "space-between",
    },
    actions: {
        flexDirection: "row",
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    }
})