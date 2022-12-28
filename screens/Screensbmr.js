import { StyleSheet, View, Text, Image, SafeAreaView , Dimensions , processColor} from 'react-native'
import React, { useState, useEffect} from 'react'
import { Button, DefaultTheme, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { PieChart } from 'react-native-chart-kit';



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
            setBmr(bmr.toFixed(0))
        } else {
            const bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
            setBmr(bmr.toFixed(0))
        }

        // const carb = bmr * 0.5;
        // const protein = bmr * 0.2;
        // const fat = bmr * 0.3;

        // setCarb(carb.toFixed(0));
        // setProtein(protein.toFixed(0));
        // setFat(fat.toFixed(0));

        
    }

    function validate() {
        if (weight == "" || height == "") {
            alert("Please enter your weight and height")
        } else {
            calculateBMR()

        }
    }


    useEffect(() => {
        getUserDate()
        getUserGender()
 
    }, [])

    const screenWidth = Dimensions.get("window").width;

    const data = [
        {
          name: "คาร์โบไฮเดรต [50%]",
          kal: bmr*0.5,
          color: "#E6E0CA",
          legendFontColor: "#E6E0CA",
          legendFontSize: 12
        },
        {
          name: "โปรตีน [40%]",
          kal: bmr*0.4,
          color: "#C76E50",
          legendFontColor: "#C76E50",
          legendFontSize: 12
        },
        {
          name: "ไขมัน [10%]",
          kal: bmr*0.1,
          color: "#FFC000",
          legendFontColor: "#FFC000",
          legendFontSize: 12
        }
      ];

      function renderChart() {
        return (
          <PieChart
            data={data}
            width={400}
            height={220}
            chartConfig={{
              backgroundColor: "#000000",
              backgroundGradientFrom: "#000000",
              backgroundGradientTo: "#000000",
              decimalPlaces: 2, // optional, defaults to 2dp
              strokeWidth: 2, // optional, default 3
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            accessor="kal"
            backgroundColor="transparent"
            absolute
          />
        );
      }









   
    
    

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../img/Logo_header.jpg')}
              style={{width: 220, height: 50}}
            />
          </View>
        </View>

        <View>
          <Text style={styles.fontBMR}>BMR</Text>
        </View>

        <View>
          <Text style={styles.text}>น้ำหนักตัว (kg.)</Text>
          <TextInput
            style={styles.input}
            label="Enter Weight"
            value={weight}
            onChangeText={text => setWeight(text)}
          />
          <Text style={styles.text}>ส่วนสูง (cm.)</Text>
          <TextInput
            style={styles.input}
            label="Enter Height"
            value={height}
            onChangeText={text => setHeight(text)}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={[styles.text]}>อายุ (ปี)</Text>
              <TextInput
                style={[styles.input2,{color: 'white'}]}
                value={age.toString()}
                disabled={true}
                textColor="white"
                
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.text}>เพศ</Text>
              <TextInput 
                style={styles.input2} value={gender} 
                disabled={true} 
                textColor="white" />
            </View>
          </View>

          <View>
            <Button
              style={styles.buttoncalContainer}
              mode="contained"
              onPress={() => validate()

                
              }>
              Calculate
            </Button>
          </View>
          <View>
            <Text style={styles.text}>แคลอรี่ที่ควรได้รับต่อวัน(BMR)</Text>
            <TextInput style={styles.input} label={bmr.toString()} />
          </View>
        </View>

       
      <View>
        <Text style={styles.text}>ประเภทสารอาหารที่แนะนำ (แคลอรี่)</Text>
          {renderChart()}
     
      </View>




      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 430,
        // paddingBottom: 200,
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
        paddingTop: 20,
        color: "#FFFFFF"
    },
    input: {
        height: 50,
        width: '80%',
        alignSelf: "center",
        // margigLeft: 25, 
    },
    input2: {
        height: 50,
        width: '60%',
        alignSelf:"center",
        margigLeft: 25,
        // margin: 5,
        backgroundColor: "#54565A"
        
    },
    buttoncalContainer: {
        alignSelf: "center",
        width: '45%',
        margin : 10,
        backgroundColor: "#EC8C32"

    },
})

export default Screensbmr