

import { StyleSheet, Text, View ,SafeAreaView, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import React, {useState, useEffect} from 'react'
import { LineChart } from 'react-native-chart-kit'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import { Button } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'


const ScreenbmiHistory = ({navigation}) => {

  const [bmi, setBmi] = useState([])
  const [date, setDate] = useState([])
  const [id, setId] = useState([])
  const [datalist, setDatalist] = useState([])
  
  const [loading, setLoading] = useState(true)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [openStartDate, setOpenStartDate] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)

  useEffect(() => {
    const subscriber = firestore()
      .collection('Bmi').orderBy('date', 'asc')
      .where('UserID', '==', auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const bmiRecords = [0];
        const dateRecords = [0];
        const datalist = [];

        if (querySnapshot == null) {
          return null;
        }
        querySnapshot.forEach(documentSnapshot => {
          bmiRecords.push(documentSnapshot.data().bmi)
          dateRecords.push(moment(documentSnapshot.data().date.toDate()).format('DD/MM/YYYY'))
          datalist.push({...documentSnapshot.data(),key : documentSnapshot.id})
        })
        

        setBmi(bmiRecords)
        setDate(dateRecords.sort())
        setDatalist(datalist)
        console.log('=====USEEFFECT======')
        console.log(dateRecords)
        console.log(bmiRecords)
        console.log(datalist)
        console.log('=====USEEFFECT======')
        setLoading(false)
        
      });
      


    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  if (loading) {
    return (
      <View>
        <Text style={{alignSelf:'center'}}>Loading...</Text>
      </View>
    ) 
  }
  function filterDate() {
    const subcriber = firestore()
      .collection('Bmi').orderBy('date', 'asc')
      .where('UserID', '==', auth().currentUser.uid)
      .where('date', '>=', new Date(startDate))
      .where('date', '<=', new Date(endDate))
      .onSnapshot(querySnapshot => {
        const bmiRecords = [0];
        const dateRecords = [0];
        const datalist = []
        
        if(querySnapshot == null) {
          return null;
        }
        else {
          querySnapshot.forEach(documentSnapshot => {
            bmiRecords.push(documentSnapshot.data().bmi)
            dateRecords.push(moment(documentSnapshot.data().date.toDate()).format('DD/MM/YYYY'))
            datalist.push({...documentSnapshot.data(),key : documentSnapshot.id})
          })
        }
  
        setBmi(bmiRecords)
        setDate(dateRecords.sort())
        setDatalist(datalist)
        console.log('=====FILTER======')
        console.log(dateRecords)
        console.log(bmiRecords)
        console.log(datalist)
        setLoading(false)
      })
  }

  
     

  return (
    
    <SafeAreaView style={styles.container}>
    <View style={{width: '100%',marginRight:8}}>
     <LineChart
        data={{
          labels: date,
          datasets: [
            {
              data: bmi
            }
          ]
        }}
        width={400} // Dimensions.get('window').width
        height={220}
        // yAxisLabel={'BMI'}
        // yAxisSuffix={'kg/m2'}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        
      />


    </View>


    <View style={{justifyContent: 'space-between', width: '100%',marginLeft:10}}>
      
    </View>
    <View style={{alignItems:'center', width: '100%',marginLeft:10}}>
      <Text style={{fontSize:20, fontWeight:'bold',margin:10, color:"#fb8c00"}}>Filter By Date</Text>
    </View>
    <View style={{alignItems:'center', width: '100%',marginBottom:20}}>
      <TouchableOpacity onPress={() => setOpenStartDate(true)}style={styles.inputDate}
      >
        <Text style={{color: 'black', alignSelf: 'center',paddingTop:15}}>{startDate.toDateString()}</Text>
              <DatePicker
                modal
                open={openStartDate}
                date={startDate}
                mode="date"
                onConfirm={(date) => {
                  setStartDate(date);
                  setOpenStartDate(false);
                }}
                onCancel={() => setOpenStartDate(false)}
                onDateChange={(date) => {setStartDate(date)}}
                
                

              />
      </TouchableOpacity>
      <Text style={{fontSize:20, fontWeight:'bold',margin:10, color:"#fb8c00"}}>To</Text>
      <TouchableOpacity onPress={() => setOpenEndDate(true)}style={styles.inputDate}
      >
              <Text style={{color: 'black', alignSelf: 'center',paddingTop:15}}>{endDate.toDateString()}</Text>
              <DatePicker
                modal
                open={openEndDate}
                date={endDate}
                mode="date"
                onConfirm={(date) => {
                  setEndDate(date);
                  setOpenEndDate(false);
                }}
                onCancel={() => setOpenEndDate(false)}
                onDateChange={(date) => {setEndDate(date)}}
                maximumDate={new Date()}
                
              />
      </TouchableOpacity>

      
    </View>
      {/* <Button title="Filter Date" onPress={filterDate} color="#fb8c00"/> */}
      <Button
        icon="filter"
        textColor='white'
        mode='contained'
        buttonColor='#fb8c00'
        onPress={filterDate}
      >
        Filter Data
      </Button>
      
      
      
      <FlatList
        data={datalist}
        renderItem={({ item }) => (
          <View style={{borderBottomColor:'white',borderBottomWidth:1,width:400}}>
            <Text style={styles.text}>วันที่ : {moment(item.date.toDate()).format('DD/MM/YYYY')}</Text>
            <Text style={styles.text}>น้ำหนัก : {item.weight}</Text>
            <Text style={styles.text}>ส่วนสูง : {item.height}</Text>
            <Text style={styles.text}>BMI : {item.bmi}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
        />
      
    


      
      
    </SafeAreaView>

  )
}

export default ScreenbmiHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#355682",
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal:10
  },
  inputDate: {
    width: '80%',
    alignSelf: "center",
    margin : 3,
    backgroundColor: "#FFFFFF",
    height: 50,
    borderRadius:20
  },
  text: {
    paddingTop: 1,
    color: "#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    backgroundColor: "#3556",
    padding: 5,
    width: 350,
    alignSelf: "center",
  
  },
  
})