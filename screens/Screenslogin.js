import { StyleSheet, View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Screenslogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../img/Logo_project.jpg')}
                    style={{ width: 350, height: 100}}
                />
            </View>
            <View>
                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={styles.inputContainer}
                    label="Enter Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Text style={styles.text}>Password</Text>
                <TextInput 
                    style={styles.inputContainer}
                    label="Enter Password"
                    secureTextEntry
                    right={<TextInput.Icon icon="eye"/>}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <View>
                <Button style={styles.buttonloginContainer} mode="contained" onPress={() => console.log('Pressed')}>
                    Login
                </Button>
                <Button style={styles.buttonloginContainer} mode="contained" onPress={() => console.log('Pressed')}>
                    Register
                </Button>
            </View>
        </View>
    )
}

export default Screenslogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth:430,
        alignSelf: "center",
        paddingBottom: 150,
        justifyContent: "center",
        backgroundColor: "#355682",
    },
    imageContainer: {
        alignSelf: "center",
        paddingBottom: 0
    },
    inputContainer: {
        paddingBottom: 8,
        width: '70%',
        alignSelf: "center",
        margin : 3
    },
    buttonloginContainer: {
        alignSelf: "center",
        width: '40%',
        margin : 6,
        backgroundColor: "#EC8C32",
        color: "#000000"
    },
    text: {
        paddingLeft: 5,
        marginLeft: 55,
        paddingBottom: 0,
        marginBottom: 0,
        paddingTop: 20,
        color: "#FFFFFF"
    }
})