import { StyleSheet, View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useDebugValue } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Screenstypemuscle = () => {
  return (

    <View style={styles.container}>
        <View style={styles.headContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../img/Logo_header.jpg')} 
                    style={{ width: 220, height: 50}}
                />
            </View>     
        </View>

        <View>
            <Text style={styles.fontMenu}>
                Muscle Building
            </Text>
        </View>
        
        <View style={{ padding:10, flex: 1}}>
            <View style={styles.row}>
                <TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>BICEPS</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>QUADS</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>CHEST</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>TRICEPS</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>ABS</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>SHOULDERS</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>BACK</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 430,
        paddingBottom: 200,
        backgroundColor: "#355682"
    },
    headContainer: {
        backgroundColor: "#EC8C32",
        alignSelf: "center",
        justifyContent: "center",
        width: '100%',
        padding: 17
    },
    imageContainer: {
        alignSelf: "center",
        justifyContent: "center"
    },
    fontMenu: {
        fontFamily: "verdana",
        fontSize: 39,
        paddingLeft: 13,
        paddingTop: 10,
        color: "#EC8C32",
        fontWeight: "bold"
    },
    buttonContainer: {
        margin: 15,
        width: 160,
        height: 135,
        backgroundColor: "#A7A5A5",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15
    },
    button: {
        textTransform: "uppercase",
        color: "#FFF",
        fontSize: 20,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
     },
})

export default Screenstypemuscle