import {View, Text, StyleSheet, SafeAreaView, Image, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';


const MuscleCreateDetail = ({navigation, route}) => {
  const [musclecreate_name, setMusclecreate_name] = useState([]);
  const [musclecreate_description, setMusclecreate_description] = useState([]);
  const [musclecreate_image, setMusclecreate_image] = useState(route.params.musclecreate_image);
  const [musclecreate_times, setMusclecreate_times] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const [bookmark, setBookmark] = useState(false);

  function getData() {  
    firestore()
      .collection('muscleCreate')
      .where('musclecreate_name', '==', route.params.musclecreate_name)
      // .get()
      // .then(querySnapshot => {
      //   querySnapshot.forEach(documentSnapshot => {
      //     setMusclecreate_name(documentSnapshot.data().musclecreate_name);
      //     setMusclecreate_description(documentSnapshot.data().musclecreate_description);
      //     setMusclecreate_image(documentSnapshot.data().musclecreate_image);
      //     setMusclecreate_times(documentSnapshot.data().musclecreate_times);
      //   });
      // });
      .onSnapshot(querySnapshot => {

        querySnapshot.forEach(documentSnapshot => {
          setMusclecreate_name(documentSnapshot.data().musclecreate_name);
          setMusclecreate_description(documentSnapshot.data().musclecreate_description);
          setMusclecreate_image(documentSnapshot.data().musclecreate_image);
          setMusclecreate_times(documentSnapshot.data().musclecreate_times);
        });
      });


      firestore()
      .collection('Bookmark')
      .where('musclecreate_name', '==', route.params.musclecreate_name)
      .where('user_id', '==', auth().currentUser.uid)
      // .get()
      // .then(querySnapshot => {
      //   if (querySnapshot.size > 0) {
      //     setBookmark(true);
      //   } else {
      //     setBookmark(false);
      //   }
      // });
      .onSnapshot(querySnapshot => {
        if (querySnapshot.size > 0) {
          setBookmark(true);
        } else {
          setBookmark(false);
        }
      });
  }


  function addBookmark() {
    firestore()
      .collection('Bookmark')
      .add({
        musclecreateID: route.params.muscleCreateId,
        musclecreate_name: musclecreate_name,
        musclecreate_image: musclecreate_image,
        user_id: auth().currentUser.uid,
      })
      .then(() => {
        console.log('Bookmark added!');
      });
  }

  function deleteBookmark() {
    firestore()
      .collection('Bookmark')
      // .where('musclecreateID', '==', route.params.muscleCreateId)
      .where('musclecreate_name', '==', route.params.musclecreate_name)
      .where('user_id', '==', auth().currentUser.uid)
      // .get()
      // .then(querySnapshot => {
      //   querySnapshot.forEach(documentSnapshot => {
      //     firestore()
      //       .collection('Bookmark')
      //       .doc(documentSnapshot.id)
      //       .delete()
      //       .then(() => {
      //         console.log('Bookmark deleted!');
      //       });
      //   });
      // });
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          firestore()
            .collection('Bookmark')
            .doc(documentSnapshot.id)
            .delete()
            .then(() => {
              console.log('Bookmark deleted!');
            });
        });
      });
  }


  function displayDescription(){
    const description = [];
    for (let i = 0; i < musclecreate_description.length; i++) {
      description.push(
        <View style={{marginBottom:10,marginTop:10,marginLeft: 20, alignSelf:'flex-start'}}
          key={i}
        >
          <Text style={{fontSize: 16}}>{i+1}. {musclecreate_description[i]}</Text>
        </View>
      );
    }
    return description;
  }
  

  

 

  return (
    <View style={styles.container} >
      
      <View style={styles.headContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../img/Logo_header.jpg')}
            style={{width: 220, height: 50}}
          />
        </View>
      </View>

      <View>
        
        </View>
        <View style={styles.bannerContainer}>
        <Image
            source={{uri: musclecreate_image}}
            style={{width: '80%',height: 175, resizeMode: 'stretch',borderRadius: 10, marginTop: 10, alignSelf: 'center',borderRadius: 15}}
            />
        </View>

        <View style={styles.buttonContainer}>

          <Text style={styles.header}>{musclecreate_name}</Text>
          <Text>{musclecreate_times}</Text>

          {displayDescription()}
         
          {/* {
            musclecreate_description.map((item) =>
              <View style={{marginBottom:10,marginTop:10,marginLeft: 20, alignSelf:'flex-start'}}
              
                key={item}
              >
                <Text style={{fontSize: 16}} > {item}</Text> 
              </View> 
            )
          } */}

        </View>
        
        
        

      

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginLeft: 10, marginRight: 10}}>
        <Button
          icon="arrow-left"
          mode="contained"
          buttonColor="#EC8C32"
          onPress={() => 
            {
              navigation.goBack()          
            }
          }>
          Back
        </Button>
        <Button
          icon="bookmark"
          mode="contained"
          onPress={() => {
            if (bookmark) {
              deleteBookmark();
              alert('Bookmark deleted!');
            } else {
              addBookmark();
              alert('Bookmark added!');
            }
            
          }}
          buttonColor= {bookmark ? '#A51E1E' : '#DABD16'}
         
          >
          {/* {bookmark ? 'Remove Bookmark' : 'Add Bookmark'} */}
        </Button>
        

      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    paddingBottom: 200,
    backgroundColor: '#355682',
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
  fontMenu: {
    fontFamily: 'verdana',
    fontSize: 39,
    paddingLeft: 13,
    paddingTop: 10,
    color: '#EC8C32',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 100,
    width: 'auto',
    height:'auto',
    backgroundColor: '#BABFC4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 15
    
  },
  bannerContainer: {
    paddingTop:150,
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  header: {
    fontFamily: 'verdana',
    fontSize: 25,
    color: '#EC8C32',
    fontWeight: 'bold',
    textTransform: "uppercase"
  }
});

export default MuscleCreateDetail;
