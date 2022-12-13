import { StyleSheet, View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen'


const Screensregister = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthday, setBirthday] = useState("")

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={require('../img/register_logo.jpg')}
                style={{ width: 350, height:80}}                         
            />
        </View>
        <View >
            <Text style={styles.text}>Email</Text>
            <TextInput
                style ={styles.input}
                label="Enter Email"
                value={email} 
                onChangeText={text => setEmail(text)}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
                style ={styles.input}
                label="Enter Password"
                value={password}
                onChangeText={text => setPassword(text)} 
            />
            <Text style={styles.text}>Birthday</Text>
            <TextInput
                style ={styles.input}
                label="Enter Birthday"
                value={birthday}
                onChangeText={text => setBirthday(text)} 
            />
        </View>
        <Text style={styles.text}>เพศ</Text>
        <View style={{ paddingLeft:70}}>
            <View style={styles.row}>
                <TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>
                            ชาย
                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>
                            หญิง
                            </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        <View>
            <Button style={styles.buttonregisterContainer} mode="contained" onPress={() => console.log('Pressed')}>
                Register
            </Button>
        </View>
    </View>
  )
}

export default Screensregister

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 430,
        alignSelf: "center",
        paddingBottom: 180,
        justifyContent: "center",
        backgroundColor: "#355682"
    },
    imageContainer: {
        alignSelf: "center",
        paddingBottom: 10
    },
    input: {
        paddingBottom: 1,
        width: '70%',
        alignSelf: "center",
        margin : 3

    },
    buttonregisterContainer: {
        alignSelf: "center",
        width: '45%',
        margin : 7,
        backgroundColor: "#EC8C32"

    },
    text: {
        paddingLeft: 5,
        marginLeft: 57,
        paddingBottom: 0,
        marginBottom: 0,
        paddingTop: 20,
        color: "#FFFFFF"
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
     },
     buttonContainer: {
        margin: 15,
        width: 100,
        height: 30,
        backgroundColor: "#E4E4E4",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15
    },
    button: {
        textTransform: "uppercase",
        color: "#000000",
        fontSize: 13,
    },
    
})