import { StyleSheet, View, Text, Image,TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useDebugValue } from 'react'
import { Button, IconButton,MD3Colors } from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


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

    const getUsername = () => {
        const user = auth().currentUser.uid;
        firestore()
          .collection('Users')
          .doc(user)
          // .get()
          // .then((doc) => {
          //     if (doc.exists) {
          //         // console.log("Document data:", doc.data().fname),console.log("Document data:", doc.data().lname);
          //         setName(doc.data().fname);
          //         setLname(doc.data().lname);
          //     } else {
          //         // doc.data() will be undefined in this case
          //         console.log("No such document!");
          //     }
          // }).catch((error) => {
          //     console.log("Error getting document:", error);
          // });
          .onSnapshot((doc) => {
            setName(doc.data().fname);
            setLname(doc.data().lname);
          }
          );


       
    }

    const [name, setName] = useState('');
    const [lname, setLname] = useState('');


    useEffect(() => {
      
        getUsername();
    }, []);
   
    
    return (
      
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../img/Logo_header.jpg')}
              style={{width: 220, height: 50}}
            />
          </View>
        </View>

        <View>
          <View style={{flexDirection: 'row',marginTop:15,marginLeft:15}}>
            <View
              style={{
                flex: 3,
                paddingTop: 10,
                paddingRight: 13,
                borderRadius:20,
                backgroundColor:'#748CAD'
              }}>
            {getUsername()}
            <Text style={[styles.fontMenu,{color:'white'}]}>Welcome ' s</Text>
            <Text style={[styles.fontMenu]}>{name.toUpperCase()} {lname.toUpperCase()}</Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                paddingRight: 7,
                borderColor: '#EC8C32',
              }}>
              <IconButton
                icon="account"
                size={50}
                iconColor={MD3Colors.neutral100}
                onPress={() => navigation.navigate('ProfileScreen')}
              />
            </View>
          </View>
        </View>
        
        <View style={{marginHorizontal:15, marginVertical:15}}>
        {/* กดเข้า Function คำนวณ BMI */}
        <TouchableOpacity onPress={Screensbmi}>
          <Image
            source={require('../img/bmibanner.jpg')}
            style={styles.bannerContainer}
          />
        </TouchableOpacity>

        {/* กดเข้า Function คำนวณ BMR */}
        <TouchableOpacity onPress={Screensbmr}>
          <Image
            source={require('../img/bmr.png')}
            style={styles.bannerContainer}
          />
        </TouchableOpacity>

        {/* กดเข้า Function Muscle Building */}
        <TouchableOpacity onPress={Screenstypemuscle}>
          <Image
            source={require('../img/havyweightbanner.png')}
            style={styles.bannerContainer}
          />
        </TouchableOpacity>
        </View>
        
      </View>

    );
}

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

