import { StyleSheet, View, Text, Image, SafeAreaView, Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';




const Screenslogin = ({navigation}) => {

    const Screensmenu = () => {
        navigation.navigate('Screensmenu');
    }
    const Screensregister = () => {
        navigation.navigate('Screensregister');
    }

    

   



    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Login Success');
            navigation.navigate('Screensmenu', {
                email: email,
                UserID : auth().currentUser.uid
                
            });
            console.log('UserID : ' + auth().currentUser.uid);

        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {   
                console.log('That email address is already in use!');
                alert('That email address is already in use!');
                
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                alert('That email address is invalid!');
                
            }

        

            console.error(error);
           
        });
    }

    function loginValidation() {
        if (email == "" || password == "") {
            Alert.alert("Please fill in all fields");
        } else {
            login();
        }
    }
    


    



    return (
        <SafeAreaView style={styles.container}>
            
                

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
                    right={<TextInput.Icon icon="email"/>}
                    value={email}
                    onChangeText={text => setEmail(text)}

                />
                <Text style={styles.text}>Password</Text>
                <TextInput 
                    style={styles.inputContainer}
                    label="Enter Password"
                    secureTextEntry
                    right={<TextInput.Icon icon="lock"/>}
                    value={password}
                    onChangeText={text => setPassword(text)}
                   
                />
            </View>
            <View>
                <Button style={styles.buttonloginContainer} mode="contained" onPress={loginValidation}>
                    Login
                </Button>
                <Button style={styles.buttonloginContainer} mode="contained" onPress={Screensregister}>
                    Register
                </Button>
            </View>
        </SafeAreaView>
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