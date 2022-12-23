// ขาด การ order by date และ การแสดงค่า bmi ที่เป็น 0 ออกจากกราฟ
//setscale ;

import { StyleSheet, Text, View , Dimensions, SafeAreaView, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import { LineChart } from 'react-native-chart-kit'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import moment from 'moment'


const ScreenbmiHistory = ({navigation}) => {

  const [bmi, setBmi] = useState([])
  const [date, setDate] = useState([])
  const [loading, setLoading] = useState(true)
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const bmiRecords = [];
    const dateRecords = [];

    firestore()
      .collection('Bmi')
      .where('UserID', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          // bmiRecords.push(documentSnapshot.data().bmi)
          // dateRecords.push(moment(documentSnapshot.data().date.toDate()).format('DD/MM/YYYY'))
          if (documentSnapshot.data().bmi != 0) {
            bmiRecords.push(documentSnapshot.data().bmi)
            dateRecords.push(moment(documentSnapshot.data().date.toDate()).format('DD/MM/YYYY'))

            setBmi(bmiRecords)
            setDate(dateRecords)
            

          }
          else
          {
            Alert.alert("No data found")
            

            
          }
        })
        
        setLoading(false)


      }
      )

    



  }, [])

  if (loading) {
    return null 
  }

  

  







  








  return (
    
    <SafeAreaView style={styles.container}>
    <View style={{justifyContent: 'space-between', width: '100%'}}>
    <LineChart
        data={{
          labels: date,
          datasets: [
            {
              data: bmi
            }
          ]
        }}
        width={screenWidth} // from react-native
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
          borderRadius: 5
          
        }}
      />
    </View>
    </SafeAreaView>

  )
}

export default ScreenbmiHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  
})