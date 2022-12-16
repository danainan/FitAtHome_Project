import { StyleSheet, View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';




const Screenslogin = ({navigation}) => {

    const Screensmenu = () => {
        navigation.navigate('Screensmenu');
      }


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => { 
        getFcmToken()
    },[])

    const getFcmToken = async () => {
        let token = await messaging().getToken();
        console.log(token);
    };
    

    const saveData = () => {
        // firestore()
        //     .collection('Users')
        //     .add({
        //         email:email,
        //         password:password
        //     })
        //     .then(()=> {
        //         console.log('User added!')
        //     })
        firestore()
            .collection('Users')
            .where('email', '==', email)
            .get()
            .then(querySnapshot => {
                console.log(querySnapshot.docs);

                if(querySnapshot.docs.length > 0){
                    console.log(querySnapshot.docs[0].data().email
                    + ' ' +
                    querySnapshot.docs[0].data().password   
                )
                }

                
            })
           
    }



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
                <Button style={styles.buttonloginContainer} mode="contained" onPress={saveData}>
                    Login
                </Button>
                <Button style={styles.buttonloginContainer} mode="contained" onPress={() => console.log('Pressed')}>
                    Register
                </Button>
                <Button style={styles.buttonloginContainer} mode="contained" onPress={Screensmenu}>
                    MENU
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