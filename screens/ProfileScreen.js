import React from 'react'
import { SafeAreaView, Text, StyleSheet, View , Image, Button } from 'react-native'
import auth from '@react-native-firebase/auth';


function ProfileScreen({navigation}) {

    const signOut = () => {
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
        navigation.navigate('Screenslogin');
    }


  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../img/Logo_header.jpg')}
                    style={{ width: 220, height: 50}}
                />
            </View>
        </View>

        <View>
            <Text style={styles.fontMenu}>
                Name
            </Text>

            <Text style={styles.fontMenu}>
                Surname
            </Text>

            <Text style={styles.fontMenu}>
                Date Of Birth
            </Text>

            <Text style={styles.fontMenu}>
                Gender
            </Text>

            <Text style={styles.fontMenu}>
                <Button title="Logout" onPress={signOut} />

            </Text>



        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 430,
        paddingBottom: 200,
        backgroundColor: "#2D5283"
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
        fontSize: 18,
        paddingLeft: 13,
        paddingTop: 10,
        color: "#EC8C32",
        fontWeight: "bold",
        fontStyle: "italic",

    },
    buttonContainer: {
        backgroundColor: "#EC8C32",
        alignSelf: "center",
        justifyContent: "center",
        width: '100%',
        padding: 17,
        marginTop: 15,
    },
    bannerContainer: {
        width: '100%', height:150, resizeMode: 'stretch',borderRadius: 20, paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10, marginTop: 10, alignSelf: 'center'
    }

})