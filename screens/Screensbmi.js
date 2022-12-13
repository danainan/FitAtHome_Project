import { StyleSheet, View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useDebugValue } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Screensbmi = () => {
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")

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
            <Text style={styles.fontBMI}>
                BMI
            </Text>
        </View>

        <View>
            <Text style={styles.text}>น้ำหนักตัว (kg.)</Text>
            <TextInput
                style ={styles.input}
                label="Weight"
                value={weight}
                onChangeText={text => setWeight(text)}
            />
            <Text style={styles.text}>น้ำหนักตัว (kg.)</Text>
            <TextInput
                style ={styles.input}
                label="Height"
                value={height}
                onChangeText={text => setHeight(text)}
            />
        </View>
        <View>
            <Button style={styles.buttoncalContainer} mode="contained" onPress={() => console.log('Pressed')}>
                Calculate
            </Button>
        </View>
        <View>
            <Text style={styles.text}>ค่า BMI</Text>
                <TextInput
                    style ={styles.input}
                    label="เเสดงผลการคำนวณ"
            />
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
    fontBMI: {
        fontFamily: "verdana",
        fontSize: 39,
        paddingLeft: 15,
        paddingTop: 10,
        color: "#EC8C32",
        fontWeight: "bold"
    },
    input: {
        height: 50,
        width: '80%',
        alignSelf: "center",
        margigLeft: 25,
        marginBottom: 0,
        margin: 5
        
    },
    text: {
        paddingLeft: 5,
        marginLeft: 35,
        paddingBottom: 0,
        marginBottom: 0,
        paddingTop: 20,
        color: "#FFFFFF"
    },
    buttoncalContainer: {
        alignSelf: "center",
        width: '45%',
        margin : 20,
        backgroundColor: "#EC8C32"

    },
})



export default Screensbmi
