import React, {useState,useEffect} from "react";
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uid } from "uid";
import MapView from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";


const NewHotel = ({ navigation, route }) => {
    const item = route.params;
    const [hotel, setHotel] = useState(item)
    const { name, description, eventSpaces, accommodations, dining, healthFacilities, services, photo, latitude, longitude } = hotel;
    //console.log('cordinats==>', latitude, longitude)
    const [hotelReting, setHotelReting] = useState(0);
    const [selectPhoto, setSelectPhoto] = useState([]);
    //console.log('selectPhoto==>', selectPhoto)
    const [modalIsVivible, setModalIsVivible] = useState(false);
    //const [avatart, setAvatart] = useState(null)


    {/** */ }
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setData();
    }, [hotelReting, selectPhoto])

    const setData = async () => {
        try {
            const data = {
                selectPhoto,
                hotelReting,
            }
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem(`NewHotel${name}`, jsonData);
            console.log('Дані збережено в AsyncStorage')
        } catch (e) {
            console.log('Помилка збереження даних:', e);
        }
    };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem(`NewHotel${name}`);
            if (jsonData !== null) {
                const parsedData = JSON.parse(jsonData);
                console.log('parsedData==>', parsedData);
                setSelectPhoto(parsedData.selectPhoto);
                setHotelReting(parsedData.hotelReting);
        
            }
        } catch (e) {
            console.log('Помилка отримання даних:', e);
        }
    };


    //console.log("Rating is: " + hotelReting);
    const ratingCompleted = (rating) => {
        //console.log("Rating is: " + rating);
        setHotelReting(rating)
    };

    const ImagePicer = () => {
        let options = {
            storageOptios: {
                path: 'image',
            }
        };
        
        launchImageLibrary(options, response => {
            if (!response.didCancel) {
                //console.log('response==>', response.assets[0].uri);
                setSelectPhoto([response.assets[0].uri, ...selectPhoto]);

            } else {
                console.log('Вибір скасовано');
            }
        });
    };

    const AvatarPicer = () => {
        let options = {
            storageOptios: {
                path: 'image',
            }
        };
        
        launchImageLibrary(options, response => {
            if (!response.didCancel) {
                //console.log('response==>', response.assets[0].uri);
                const selectedPhotoUri = response.assets[0].uri;

                setHotel(prevHotel => ({
                ...prevHotel,
                photo: selectedPhotoUri,
            }));
            } else {
                console.log('Вибір скасовано');
            }
        });
    };


    return (
        <View style={{ flex: 1 }}>

            <ImageBackground
                style={{ flex: 1 }}
                source={require('../accets/bgr.jpeg')}
            >
                <View style={{ flex: 1, position: 'relative' }}>

                    {/**LABLE */}
                    <View>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{ width: '70%', height: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gold', marginTop: 30 }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 28 }}>HOTELS BLOG
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginHorizontal: 20, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 10 }}>
                        {/* HEADER IMG + NAME */}
                        <View style={{ paddingBottom: 90 }}>
                            <ScrollView >

                                {photo ? (<Image
                                    style={{ flex: 1, width: '100%', height: 250, borderRadius: 10 }}
                                    source={{uri: photo}}
                                />) : (
                                        <TouchableOpacity
                                            onPress={() => {
                                                AvatarPicer()
                                            }}
                                            style={{width: '100%', height: 250, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center',justifyContent: 'center'}}
                                        >
                                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>PRESS HIRE</Text>
                                            <Text style={{fontSize: 40, fontWeight: 'bold'}}>FOR</Text>
                                            <Text style={{fontSize: 40, fontWeight: 'bold'}}>ADD PHOTO</Text>
                                        </TouchableOpacity>
                                ) }
                                

                                {hotelReting ? (
                                    <></>
                                ) : (
                                    <View style={{ marginHorizontal: 20, marginBottom: -30, marginTop: 10 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>PLEASE LEAVE YOUR FEEDBACK ABOUT THIS PLACE</Text>
                                    </View>
                                )}
                                {/**RAITING */}
                                <AirbnbRating
                                    onFinishRating={ratingCompleted}
                                    defaultRating={hotelReting}
                                />

                                
                                <View style={{ marginHorizontal: 10, marginTop: 10 }}>

                                    {/**HOTEL NAME */}
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{name}</Text>
                                    </View>

                                    {/**OTHER INFOM ABOUT HOTEL */}
                                    <Text style={{ fontSize: 16 }}>{description}</Text>
                                    <Text style={{ fontSize: 16 }}>{eventSpaces}</Text>
                                    <Text style={{ fontSize: 16 }}>{accommodations}</Text>
                                    <Text style={{ fontSize: 16 }}>{dining}</Text>
                                    <Text style={{ fontSize: 16 }}>{healthFacilities}</Text>
                                    <Text style={{ fontSize: 16 }}>{services}</Text>
                                    
                                </View>

                                {/**PHOTO INSTRYMENT CONTEINER */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, borderWidth: 1, borderRadius: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => { ImagePicer() }}
                                    >
                                        <MaterialIcons name='add-a-photo' style={{ fontSize: 70, }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => { setModalIsVivible(true) }}
                                        style={{}}>
                                        <Entypo name='folder' style={{ fontSize: 70, }} />
                                        <Text style={{ position: 'absolute', top: '50%', color: '#fff', marginLeft: 10 }}>{selectPhoto.length} photo</Text>
                                    </TouchableOpacity>
                                </View>

                                {/**MAP */}
                                <MapView
                                    style={{ flex: 1, height: 200, marginBottom: 50, marginTop: 20, borderRadius: 10 }}
                                    initialRegion={{
                                        latitude: 48.757191067069485,
                                        longitude: 8.240459720247586,
                                        latitudeDelta: 2.9922,
                                        longitudeDelta: 1.0421,
                                    }}
                                />
                                
                               
                            
                                
                            </ScrollView>
                        
                            

                        
                        </View>
                     
                    </View>
                    

                    <Modal
                        animationType="slide"
                        visible={modalIsVivible}
                        transparent={true}
                    >
                    

                        <View style={{ flex: 1, backgroundColor: '#9bd0db', position: 'relative' }}>

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 70, marginHorizontal: 10, }}>
                                {selectPhoto && selectPhoto.map((photo) => {
                                    return (
                                        <Image
                                            key={uid()}
                                            source={{ uri: photo }}
                                            style={{ width: 180, height: 100, marginRight: 5, marginBottom: 5, }} />
                                    )
                                })}
                            </View>

                            {/** BTN's BACK*/}
                            <TouchableOpacity
                                onPress={() => { setModalIsVivible(false) }}
                                style={{ position: 'absolute', top: 35, right: 20 }}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>X</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                onPress={() => { setModalIsVivible(false) }}
                                style={{ position: 'absolute', bottom: 35, right: 10 }}>
                                <Ionicons name='chevron-back-circle-outline' style={{ fontSize: 45, color: '#000' }} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ marginLeft: 10 }}
                                onPress={() => { ImagePicer() }}
                            >
                                <MaterialIcons name='add-a-photo' style={{ fontSize: 70, }} />
                            </TouchableOpacity>

                        </View>

                    </Modal>

                    {/**BTN BACK */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ position: 'absolute', right: 5, bottom: 20, }}
                    >
                        <Ionicons name='chevron-back-circle-outline' style={{ fontSize: 45, color: '#000' }} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            
        </View>
    );
};


export default NewHotel;