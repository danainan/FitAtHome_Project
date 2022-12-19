import { StyleSheet, View, Text, Image, Touchable, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useDebugValue } from 'react'
import { Button, TextInput } from 'react-native-paper'
import firestore, {serverTimestamp} from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

const Screensbmi = ({navigation}) => {
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [bmi, setBmi] = useState('')
    const [description, setDescription] = useState('')

    const calculateBmi = () => {
        const bmi = weight /((height/100) * (height/100))
        setBmi(bmi.toFixed(1))
  
        if(bmi < 18.5){
          setDescription('Underweight, eat more!')
        }
        else if (bmi >= 18.5 && bmi <= 24.9){
          setDescription('Normal, Keep it up!')
        }
        else if (bmi >= 25 && bmi <= 29.9){
          setDescription('Overweight, start working out!!')
        }
        else if (bmi >= 30 ){
          setDescription('Obese, Hit the gym!')
        }
    }

    const saveData = () => {

        firestore()
        .collection('Bmi').add({
            UserID : auth().currentUser.uid,
            weight: weight,
            height: height,
            bmi: bmi,
            date: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log('Data saved!');
            alert('Data saved!');
        })
    }

    function validateSaveData() {
        if (weight == "" || height == "") {
            alert("Please enter your weight and height")
        } else {
            saveData()
        }
    }

    function validateCalculateBmi() {
        if (weight == "" || height == "") {
            alert("Please enter your weight and height")
        } else {
            calculateBmi()
        }
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
                keyboardType="numeric"
            />
            <Text style={styles.text}>ส่วนสูง (cm.)</Text>
            <TextInput
                style ={styles.input}
                label="Height"
                value={height}
                onChangeText={text => setHeight(text)}
                keyboardType="numeric"
            />
        </View>
        <View>
            <Button style={styles.buttoncalContainer} mode="contained" onPress={validateCalculateBmi}>
                Calculate
            </Button>
        </View>
        <View>
            <Text style={styles.text}>ค่า BMI</Text>
                <TextInput
                    style ={styles.input}
                    label={bmi}
                />
        </View>
        <View>
            <Text styles={styles.text}>{description}</Text>
        </View>

        <View>
            <Button style={styles.buttoncalContainer} mode="contained" onPress={validateSaveData}>
                Save
            </Button>
        </View>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('ScreenbmiHistory')}>
                <Image
                    source={require('../img/banner-graph.png')}
                    style={styles.bannerContainer}
                > 
                </Image>
                <Text style={{textAlign: 'center', color: '#FFFFFF'}}>คลิกเพื่อดูประวัติ</Text>
            </TouchableOpacity>
            
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
    bannerContainer: {
        width: '80%', height:150, resizeMode: 'stretch',borderRadius: 20, paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10, marginTop: 10, alignSelf: 'center',
        borderWidth: 3, borderColor: '#00B6DE'
        
    },


})



export default Screensbmi
