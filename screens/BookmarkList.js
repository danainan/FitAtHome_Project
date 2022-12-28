import { View, Text , FlatList, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React , {useEffect, useState}from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


const BookmarkList = ({navigation}) => {

  const [data, setData] = useState([])
  const [dataBookmark, setDataBookmark] = useState([])
  const [loding, setLoding] = useState(true)

  useEffect(() => {
    // firestore()
    //   .collection('Bookmark')
    //   .where('user_id', '==', auth().currentUser.uid)
    //   .get()
    //   .then(querySnapshot => {
    //     const data = [];
    //     querySnapshot.forEach(documentSnapshot => {
    //       data.push({
    //         ...documentSnapshot.data(),
    //         key: documentSnapshot.id
    //       });
    //     }
    //     );
    //     setData(data);
    //   })

      
      // console.log(data.map(item => item.musclecreateID))

      firestore()
        .collection('Bookmark')
        .where('user_id', '==', auth().currentUser.uid)
        .onSnapshot(querySnapshot => {
          const data = [];
          querySnapshot.forEach(documentSnapshot => {
            data.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id
            });
          });
          setData(data);
        });

      
    
      

  }, [])

  


  function renderItem({ item }) {

    return (
      <View>    
        <TouchableOpacity onPress={()=> navigation.navigate('MuscleCreateDetail',{
            muscleCreateId: firestore().collection('muscleCreate').doc(item.key).id,
            musclecreate_name: item.musclecreate_name,
            
        })}
         style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}
        
        > 
        <View>
            <Image
                source={{uri: item.musclecreate_image}}
                style={[styles.bannerContainer]}
            /> 
        </View>
        
        <Text style={styles.button}>{item.musclecreate_name}</Text>
        {/* <Text>{item.key}</Text> */}
    

        </TouchableOpacity>
      </View>
    );
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
          <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 5 }}>
              <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 5 }}>
                  
                  <Text style={styles.fontMenu}>Your Bookmarks</Text>
              </View>
          </View>
      </View>
      

      <View>
      
          <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.key}    
          />
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
  bannerContainer:{
      width: '80%',height: 175, resizeMode: 'stretch',borderRadius: 10, paddingVertical: 10, marginBottom: 10, marginTop: 10, alignSelf: 'center',
      borderRadius: 15,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'
  },
  button: {
      textTransform: "uppercase",
      color: "#FFF",
      fontSize: 20,
      fontWeight: "bold",
      paddingLeft: 50,
  },
  row: {
    
      flexWrap: "wrap",
      // justifyContent: "space-between",
      padding: 10,
      flex: 1,
      
   },
 
})

export default BookmarkList