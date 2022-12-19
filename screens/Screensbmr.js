import { StyleSheet, View, Text, Image, SafeAreaView} from 'react-native'
import React, { useState, useEffect} from 'react'
import { Button, DefaultTheme, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';



const Screensbmr = () => {
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [age, setAge] = useState("")
    const [gender , setGender] = useState("")
    const [date, setDate] = useState("")
    const [bmr, setBmr] = useState("")
   
    
    function getUserDate() {
        const user = auth().currentUser;
        const uid = user.uid;
        const userRef = firestore().collection('Users').doc(uid);
        userRef.get().then((documentSnapshot) => {
            const userDate = documentSnapshot.data().date.toDate()
            const momentDate = moment(userDate).format('YYYY-MM-DD')
            console.log(momentDate)
            setDate(momentDate)

            const userAge = calculateAge(momentDate)
            setAge(userAge)
        })

    }

    function getUserGender() {
        const user = auth().currentUser;
        const uid = user.uid;
        const userRef = firestore().collection('Users').doc(uid);
        userRef.get().then((documentSnapshot) => {
            const userGender = documentSnapshot.data().gender
            setGender(userGender)
        })
    }


    const calculateAge = (momentDate) => {
        const today = new Date();
        const birthDate = new Date(momentDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        if (today.getMonth()+1 < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            age--;
          }
        return age;
    }

    const calculateBMR = () => {
        if (gender == 'Male') {
            const bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
            setBmr(bmr)
        } else {
            const bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
            setBmr(bmr)
        }
    }


    


    useEffect(() => {
        getUserDate()
        getUserGender()
 
    }, [])


   
    
    

  return (
    <SafeAreaView style={styles.container}>
    <View>
        <View style={styles.headContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../img/Logo_header.jpg')}
                    style={{ width: 220, height: 50}}
                />
            </View>
        </View>

        <View>
            <Text style={styles.fontBMR}>
                BMR
            </Text>
        </View>

        <View>
            <Text style={styles.text}>น้ำหนักตัว (kg.)</Text>
            <TextInput
                style ={styles.input}
                label="Enter Weight"
                value={weight}
                onChangeText={text => setWeight(text)}
            />
            <Text style={styles.text}>ส่วนสูง (cm.)</Text>
            <TextInput
                style ={styles.input}
                label="Enter Height"
                value={height}
                onChangeText={text => setHeight(text)}
            />
            <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                    <Text style={styles.text}>อายุ</Text>
                    <TextInput
                        style ={styles.input2}
                        value={age.toString()}
                        disabled={true}
                        theme={{colors: {primary: 'white'}}}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.text}>เพศ</Text>
                    <TextInput
                        style ={styles.input2}
                        value={gender}
                        disabled={true}
                        
                    />
                </View>

            </View>
           
            <View>
                <Button style={styles.buttoncalContainer} mode="contained" onPress={calculateBMR}>
                    Calculate
                </Button>
            </View>
            <View>
                <Text style={styles.text}>ค่า BMR</Text>
                <TextInput
                    style ={styles.input}
                    label={bmr.toString()}
            />
        </View>
        

        </View>

    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 430,
        paddingBottom: 200,
        backgroundColor: "#355682",    
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
    fontBMR: {
        fontFamily: "verdana",
        fontSize: 39,
        paddingLeft: 15,
        paddingTop: 10,
        color: "#EC8C32",
        fontWeight: "bold"
    },
    text: {
        paddingLeft: 5,
        marginLeft: 35,
        paddingBottom: 0,
        marginBottom: 0,
        paddingTop: 20,
        color: "#FFFFFF"
    },
    input: {
        height: 50,
        width: '80%',
        alignSelf: "center",
        margigLeft: 25,
        marginBottom: 0,
        margin: 5
        
    },
    input2: {
        height: 50,
        width: '60%',
        alignSelf:"center",
        margigLeft: 25,
        marginBottom: 0,
        margin: 5,
        backgroundColor: "#54565A"
        
    },

    buttoncalContainer: {
        alignSelf: "center",
        width: '45%',
        margin : 20,
        backgroundColor: "#EC8C32"

    },
})

export default Screensbmr