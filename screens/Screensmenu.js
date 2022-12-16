import { StyleSheet, View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useDebugValue } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function Screensmenu({navigation}){

    const Screensbmi = () => {
        navigation.navigate('Screensbmi');
    }
    const Screensbmr = () => {
        navigation.navigate('Screensbmr');
    }
    const Screenstypemuscle = () => {
        navigation.navigate('Screenstypemuscle')
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../img/Logo_header.jpg')} 
                        style={{ width: 220, height: 50}}
                    />
                </View>
            </View>

            <View >
                <Text style={styles.fontMenu}>
                    MENU
                </Text>
            </View>

            {/* กดเข้า Function คำนวณ BMI */}
            <TouchableOpacity onPress={Screensbmi}>
            <View style={styles.buttonContainer}>
                    <Text style={styles.button}>Function Calculator BMI</Text>
                </View>
                
            </TouchableOpacity>

            {/* กดเข้า Function คำนวณ BMR */}
            <TouchableOpacity onPress={Screensbmr}>
            <View style={styles.buttonContainer}>
                    <Text style={styles.button}>Function Calculator BMR</Text>
                </View>
            </TouchableOpacity>

            {/* กดเข้า Function Muscle Building */}
            <TouchableOpacity onPress={Screenstypemuscle}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.button}>Function Muscle Building</Text>
                </View>
            </TouchableOpacity>
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
    functioncalbmi: {
        marginTop: 15,
        marginBottom:1,
        height : "100%",
    },
   
    button: {
        textTransform: "uppercase",
        color: "#FFF",
        fontSize: 20,
    },
    fontMenu: {
        fontFamily: "verdana",
        fontSize: 39,
        paddingLeft: 13,
        paddingTop: 10,
        color: "#EC8C32",
        fontWeight: "bold"
    }

})

