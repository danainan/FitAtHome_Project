import { View, Text, StyleSheet, SafeAreaView, Image} from 'react-native'
import React,{useState, useEffect} from 'react'
import firestore from '@react-native-firebase/firestore';

const MuscleCreateDetail = ({navigation, route}) => {

    const [musclecreate_name, setMusclecreate_name] = useState([]);
    const [musclecreate_description, setMusclecreate_description] = useState([]);
    const [musclecreate_image, setMusclecreate_image] = useState([]);
    const [musclecreate_times, setMusclecreate_times] = useState([])

  

    useEffect(() => {
        firestore()
            .collection('muscleCreate')
            .doc(route.params.muscleCreateId)
            .onSnapshot(documentSnapshot => {
                setMusclecreate_image(documentSnapshot.data().musclecreate_image)
                setMusclecreate_name(documentSnapshot.data().musclecreate_name)
                setMusclecreate_times(documentSnapshot.data().musclecreate_times)
                setMusclecreate_description(documentSnapshot.data().musclecreate_description)
            });

            


        

        


            
            
       
       
    }, []);




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
        <View>
            <Image
                source={{uri: musclecreate_image}}
                style={[styles.bannerContainer]}
              />
        </View>
      
      <Text>{musclecreate_image}</Text>
      <Text>{musclecreate_times}</Text>
      <Text>{musclecreate_description[0]}</Text>
      <Text>{musclecreate_description.length}</Text>
      
      
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
    fontMenu: {
        fontFamily: "verdana",
        fontSize: 39,
        paddingLeft: 13,
        paddingTop: 10,
        color: "#EC8C32",
        fontWeight: "bold"
    },
    buttonContainer: {
        margin: 15,
        width: '80%',
        height: 135,
        backgroundColor: "#A7A5A5",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15
    },
    bannerContainer: {
        
        alignSelf: "center",
        borderBottomLeftRadius:300,
        width: '100%',
        
    },

})



export default MuscleCreateDetail