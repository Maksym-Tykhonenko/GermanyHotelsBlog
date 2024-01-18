// HotelsScreen

import React from "react";
import { View , Text,ImageBackground, TouchableOpacity} from "react-native";


const HotelsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>

            <ImageBackground
                style={{ flex: 1 }}
                source={require('../accets/bgr.jpeg')}
            >
                <View style={{ flex: 1, }}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{ width: '70%', height: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gold', marginTop: 30 }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 28 }}>HOTELS BLOG
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                        <TouchableOpacity
                            onPress={()=>{navigation.navigate('Germany')}}
                            style={{ width: 250, height: 60, borderWidth: 2, marginBottom: 10, marginTop: -30, borderRadius: 20, borderColor: 'gold', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(196,0,0,0.5)' }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                GERMANY
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                HOTELS
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity //OtherWorld
                            onPress={()=>{navigation.navigate('OtherWorld')}}
                            style={{ width: 250, height: 60, borderWidth: 2, marginTop: 10, borderRadius: 20, borderColor: 'gold', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(196,0,0,0.5)' }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                OTHER WORLD
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                HOTELS
                            </Text>
                        </TouchableOpacity>
                    </View>
                  

                    
                </View>
            </ImageBackground>
            
        </View>
    );
};


export default HotelsScreen;