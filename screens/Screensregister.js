import { StyleSheet, View, Text, Image, Touchable, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, TextInput, RadioButton } from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';


const Screensregister = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    
   

    
    const resgister = () => {
      const user = 
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
            console.log('UserID : ' + auth().currentUser.uid);
            firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .set({
                userID: auth().currentUser.uid,
                email: email,
                fname: fname,
                lname: lname,
                gender: gender,
                date: date,

            })
            .then(() => {
                console.log('User added!');
            });


            navigation.navigate('Screensmenu');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error);
        });

        
    }

    
    const [gender, setGender] = React.useState('Male');

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={require('../img/register_logo.jpg')}
            style={{width: 350, height: 80}}
          />
        </View>
        <View>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            label="Enter Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.input}
            label="Enter Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Text style={styles.text}>First Name</Text>
          <TextInput
            style={styles.input}
            label="Enter First Name"
            value={fname}
            onChangeText={text => setFname(text)}
          />
          <Text style={styles.text}>Last Name</Text>
          <TextInput
            style={styles.input}
            label="Enter Last Name"
            value={lname}
            onChangeText={text => setLname(text)}
          />
          <Text style={styles.text}>Gender</Text>
          <View
            style={{
              alignContent:'space-around',
              alignSelf:'center',
              flexDirection: 'row',
            }}>
            <RadioButton
              value="Male"
              status={gender === 'Male' ? 'checked' : 'unchecked'}
              onPress={() => setGender('Male')}
            />
            <Text style={{alignSelf: 'center', color: 'white',paddingRight:50}}>Male</Text>
            <RadioButton
              value="Female"
              status={gender === 'Female' ? 'checked' : 'unchecked'}
              onPress={() => setGender('Female')}
            />
            <Text style={{alignSelf: 'center', color: 'white'}}>Female</Text>
          </View>
          <View>
            <Text style={styles.text}>Date of Birth</Text>
              <TouchableOpacity onPress={() => setOpen(true)}
              style={styles.inputDate}>
              <Text style={{color: 'black', alignSelf: 'center',paddingTop:15}}>{date.toDateString()}</Text>
              <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
                onDateChange={date => setDate(date)}
                value={date}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Button
            style={styles.buttonregisterContainer}
            mode="contained"
            onPress={resgister}>
            Register
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Screensregister

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 430,
        alignSelf: "center",       
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
    inputDate: {
        width: '70%',
        alignSelf: "center",
        margin : 3,
        backgroundColor: "#FFFFFF",
        height: 50,
    },
    RadioButton: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: '70%',
        alignSelf: "center",
        margin : 3
    },
    buttonregisterContainer: {
        alignSelf: "center",
        width: '45%',
        margin : 7,
        backgroundColor: "#EC8C32",
        marginTop: 50,

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