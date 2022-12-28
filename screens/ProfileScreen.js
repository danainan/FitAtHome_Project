import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';


function ProfileScreen({navigation}) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [date, setDate] = useState(new Date);
  const [gender, setGender] = useState('');
 

  const [open, setOpen] = useState(false);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Screenslogin');
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 

    
  }, []);

  function onAuthStateChanged(user) {
    if (user) {
      console.log('User is signed in!');
      console.log('UserID : ' + auth().currentUser.uid);
      firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            console.log('User Data', documentSnapshot.data());
            setName(documentSnapshot.data().fname);
            setSurname(documentSnapshot.data().lname);
            setGender(documentSnapshot.data().gender);
            setDate(documentSnapshot.data().date.toDate());
          }
          console.log('date => ', date)
        });
    } else {
      console.log('User is signed out!');
    }
  }

    const updateProfile = () => {
        firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
            fname: name,
            lname: surname,
            gender: gender,
            date: firestore.Timestamp.fromDate(date),

        })
        .then(() => {
            console.log('User updated!');
            alert('User updated!');
        });
    }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../img/Logo_header.jpg')}
            style={{width: 220, height: 50}}
          />
        </View>
      </View>

      <View style={{}}>
        <Text style={styles.fontMenu}>Name</Text>
        <TextInput
          style={[styles.input,{alignSelf:'center'}]}
          label="Enter Name"
          value={name}
          onChangeText={text => setName(text)}
        />

        <Text style={styles.fontMenu}>Surname</Text>
        <TextInput
          style={[styles.input,{alignSelf:'center'}]}
          label="Enter Surname"
          value={surname}
          onChangeText={text => setSurname(text)}
        />

        <Text style={styles.fontMenu}>Gender</Text>
        <View
          style={{
            alignContent: 'space-around',
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <RadioButton
            value="Male"
            status={gender === 'Male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Male')}
            theme={{colors: {primary: 'white'}}}
          />
          <Text style={{alignSelf: 'center', color: 'white', paddingRight: 50}}>
            Male
          </Text>
          <RadioButton
            value="Female"
            status={gender === 'Female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Female')}
            theme={{colors: {primary: 'white'}}}
          
          />
          <Text style={{alignSelf: 'center', color: 'white'}}>Female</Text>
        </View>
        <Text style={styles.fontMenu}>Date Of Birth</Text>
        <View>
          <TouchableOpacity onPress={() => setOpen(true)}
              style={[styles.inputDate,{alignSelf:'center'}]}>
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
        <Button
            style={{marginTop: 50,width:'80%',alignSelf:'center'}}
            buttonColor='#EC8C32'
            mode="contained"
            onPress={() => updateProfile()}
            icon= "account-edit"
          
            
        >
            Update Profile
        </Button>

        
        <Button
            style={{marginTop: 10,width:'80%',alignSelf:'center'}}
            mode="contained"
            onPress={() => signOut()}
            buttonColor='#2D52'
            icon="logout"
          
        >
            Sign Out
        </Button>

        
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    paddingBottom: 200,
    backgroundColor: '#2D5283',
  },
  headContainer: {
    backgroundColor: '#EC8C32',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 17,
  },
  imageContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  functioncalbmi: {
    marginTop: 15,
    marginBottom: 1,
    height: '100%',
  },

  button: {
    textTransform: 'uppercase',
    color: '#FFF',
    fontSize: 20,
  },
  fontMenu: {
    fontFamily: 'verdana',
    fontSize: 18,
    paddingLeft: 40,
    paddingTop: 10,
    color: '#EC8C32',
    fontWeight: 'bold',
    fontStyle: 'italic',
    // alignSelf: 'flex-start',
  },
  buttonContainer: {
    backgroundColor: '#EC8C32',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 17,
    marginTop: 15,
  },
  bannerContainer: {
    width: '100%',
    height: 150,
    resizeMode: 'stretch',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  input: {
    paddingBottom: 1,
    width: '80%',
    alignSelf: 'flex-start',
    margin: 10,
  },
  inputDate: {
    width: '80%',
    alignSelf: "flex-start",
    margin : 10,
    backgroundColor: "#FFFFFF",
    height: 50,
},
});
