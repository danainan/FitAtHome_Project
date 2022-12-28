import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'



const Screenstypemuscle = ({navigation}) => {
  return (

    <View style={styles.container}>
        <View style={styles.headContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../img/Logo_header.jpg')} 
                    style={{ width: 220, height: 50}}
                />
            </View>     
        </View>

        <View>
            <Text style={styles.fontMenu}>
                Muscle Building
            </Text>
        </View>
        
        <View style={{ padding:10, flex: 1}}>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MuscleCreate',{
                        category_name: 'biceps',

                    })}
                >
                    <View style={styles.buttonContainer}>
                            <Image source={require('../img/category/biceps.jpg')} 
                                style={styles.bannerContainer} 
                                
                            />  

                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MuscleCreate',{
                        category_name: 'quads',

                    })}
                >
                    <View style={styles.buttonContainer}>
                            <Image source={require('../img/category/quads.jpg')} 
                                style={styles.bannerContainer} 
                            />  
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={() => navigation.navigate('MuscleCreate',{
                        category_name: 'chest',

                    })}
                >
                    <View style={styles.buttonContainer}>
                            <Image source={require('../img/category/pec.jpg')}
                                style={styles.bannerContainer} 
                            />  
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MuscleCreate',{
                        category_name: 'triceps',

                    })}
                >
                    <View style={styles.buttonContainer}>
                            <Image source={require('../img/category/triceps.jpg')}
                                style={styles.bannerContainer} 
                            />  
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MuscleCreate',{
                        category_name: 'abs',

                    })}
                    >
                    <View style={styles.buttonContainer}>
                            <Image source={require('../img/category/abs.jpg')}
                                style={styles.bannerContainer} 
                            />  
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MuscleCreate',{
                        category_name: 'shoulders',

                    })}
                >
                    <View style={styles.buttonContainer}>
                            <Image source={require('../img/category/shoulders.jpg')}
                                style={styles.bannerContainer} 
                            />  
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MuscleCreate',{
                        category_name: "back",
  

                    })}
                >
                    <View style={styles.buttonContainer}>
                            <Image source={require('../img/category/back.jpg')}
                                style={styles.bannerContainer} 
                            />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('BookmarkList',{
                        category_name: "bookmark",
                        

                    })}
                >
                    <View style={styles.buttonContainer}>
                            <Image source={require('../img/category/bookmark2.jpg')}
                                style={styles.bannerContainer} 
                            />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </View>
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
        width: 160,
        height: 135,
        backgroundColor: "#A7A5A5",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15
    },
    button: {
        textTransform: "uppercase",
        color: "#FFF",
        fontSize: 20,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    bannerContainer: {
        width: '100%', height:135, resizeMode: 'stretch',borderRadius: 10, paddingVertical: 10, marginBottom: 10, marginTop: 10, alignSelf: 'center'
    }
})

export default Screenstypemuscle