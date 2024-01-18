// OtherWorldScreen
import React,{useState,useEffect} from "react";
import {ScrollView,KeyboardAvoidingView,TextInput, View, Text, ImageBackground, TouchableOpacity,Modal } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uid } from 'uid';
import AsyncStorage from "@react-native-async-storage/async-storage";


const OtherWorld = ({ navigation }) => {
    const [modalIsVivible, setModalIsVivible] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [eventSpaces, setEventSpaces] = useState("");
    const [accommodations, setAccommodations] = useState('');
    const [dining, setDining] = useState("");
    const [healthFacilities, setHealthFacilities] = useState("");
    const [services, setServices] = useState("");
    const [selectPhoto, setSelectPhoto] = useState(null);
    const [newHottelsArr, setNewHottelsArr] = useState([]);
    console.log('newHottelsArr==>', newHottelsArr);


    {/** */ }
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setData();
    }, [newHottelsArr ])

    const setData = async () => {
        try {
            const data = {
                newHottelsArr
            }
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem(`OtherWorld`, jsonData);
            console.log('Дані збережено в AsyncStorage')
        } catch (e) {
            console.log('Помилка збереження даних:', e);
        }
    };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem(`OtherWorld`);
            if (jsonData !== null) {
                const parsedData = JSON.parse(jsonData);
                console.log('parsedData==>', parsedData);
                setNewHottelsArr(parsedData.newHottelsArr);
        
            }
        } catch (e) {
            console.log('Помилка отримання даних:', e);
        }
    };


    const handleSaveHotel = () => {
        let newHotel = {
            name,
            description,
            eventSpaces,
            accommodations,
            dining,
            healthFacilities,
            services,
            photo: selectPhoto,
        };

        setNewHottelsArr([...newHottelsArr, newHotel]);

        setName('');
        setDescription('');
        setEventSpaces('');
        setAccommodations('');
        setDining('');
        setHealthFacilities('');
        setServices('');

        setModalIsVivible(false)
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
                setSelectPhoto(response.assets[0].uri);

            } else {
                console.log('Вибір скасовано');
            }
        });
    };


    return (
       <View style={{flex:1}}>

            <ImageBackground
                style={{flex:1}}
                source={require('../accets/bgr.jpeg')}
            >
                <View style={{ flex: 1, position: 'relative'}}>

                     <View>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{ width: '70%', height: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gold', marginTop: 30 }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 28 }}>HOTELS BLOG
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop: 20, marginHorizontal: 50}}>
                        <ScrollView>
                            {newHottelsArr ? (newHottelsArr.map((newHotel) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => { navigation.navigate('NewHotel', newHotel) }}
                                                style={{ width: '100%', height: 50, borderWidth: 2, marginBottom: 10, borderRadius: 20, borderColor: 'gold', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(196,0,0,0.5)' }}
                                                key={uid()}
                                            >
                                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{newHotel.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    })) : (
                                            <></>
                                    )
                                    }
                        </ScrollView>
                    </View>
                    


                    {/**BTN ADD */}
                    <TouchableOpacity
                        onPress={() => { setModalIsVivible(true) }}
                        style={{ position: 'absolute', right: 5, top: 25, }}
                    >
                        <AntDesign name='pluscircleo' style={{ fontSize: 35, color: 'gold' }} />
                    </TouchableOpacity>

                     {/**BTN BACK */}
                    <TouchableOpacity
                        onPress={()=> navigation.goBack()}
                        style={{position: 'absolute', right: 5, bottom: 20, }}
                    >
                        <Ionicons name='chevron-back-circle-outline' style={{fontSize: 45, color: '#000' }} />
                    </TouchableOpacity>


                    {/**MODAL ADD HOTELS */}
                    <Modal
                        animationType="slide"
                        visible={modalIsVivible}
                        transparent={true}
                    >
                        <View style={{ flex: 1, backgroundColor: '#9bd0db', position: 'relative' }}>
                               

                            <View style={{ marginHorizontal: 20, marginTop: 50, alignItems: 'center' }}>
                                <Text style={{ fontSize: 23, fontWeight: 'bold' }}>ENTER THE HOTEL DETAILS</Text>
                            </View>
                            <ScrollView><KeyboardAvoidingView>
                                {/**INPUTS BLOCK */}
                                <View style={{ marginHorizontal: 20, marginTop: 20 }}>

                                    <TextInput
                                        placeholderTextColor='#555555'
                                        placeholder="Hotel Name..."
                                        value={name}
                                        onChangeText={setName}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#000', borderRadius: 10, width: 250, height: 40
                                        }}
                                    />

                                    <TextInput
                                        placeholderTextColor='#555555'
                                        placeholder="Event Spaces..."
                                        value={eventSpaces}
                                        onChangeText={setEventSpaces}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#000', borderRadius: 10, width: 250, height: 40
                                        }}
                                    />

                                    <TextInput
                                        placeholderTextColor='#555555'
                                        placeholder="Accommodations..."
                                        value={accommodations}
                                        onChangeText={setAccommodations}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#000', borderRadius: 10, width: 250, height: 40
                                        }}
                                    />

                                    <TextInput
                                        placeholderTextColor='#555555'
                                        placeholder="Dining..."
                                        value={dining}
                                        onChangeText={setDining}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#000', borderRadius: 10, width: 250, height: 40
                                        }}
                                    />

                                    <TextInput
                                        placeholderTextColor='#555555'
                                        placeholder="Health Facilities..."
                                        value={healthFacilities}
                                        onChangeText={setHealthFacilities}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#000', borderRadius: 10, width: 250, height: 40
                                        }}
                                    />

                                    <TextInput
                                        placeholderTextColor='#555555'
                                        placeholder="Services..."
                                        value={services}
                                        onChangeText={setServices}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#000', borderRadius: 10, width: 250, height: 40
                                        }}
                                    />

                                    <TextInput
                                        placeholderTextColor='#555555'
                                        placeholder="Description..."
                                        multiline={true}
                                        value={description}
                                        onChangeText={setDescription}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#000', borderRadius: 10, width: 250, height: 120
                                        }}
                                    />

                                    <View style={{ alignItems: 'center', width: 250 }}>
                                        <TouchableOpacity
                                            onPress={()=>{ImagePicer()}}
                                            style={{
                                                alignItems: 'center', justifyContent: 'center',
                                                shadowOffset: { width: 3, height: 4 },
                                                shadowOpacity: .8,
                                                elevation: 9,
                                                marginBottom: 15, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#000', borderRadius: 10, width: 120, height: 40
                                            }}
                                        >
                                            <Text style={{ color: '#555555' }}>ADD PHOTO</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => { handleSaveHotel() }}
                                        style={{
                                            alignItems: 'center', justifyContent: 'center',
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            marginBottom: 15, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#000', borderRadius: 10, width: 250, height: 40
                                        }}
                                    >
                                        <Text style={{ color: '#555555', fontSize: 20 }}>SAVE</Text>
                                    </TouchableOpacity>

                                </View>
                            </KeyboardAvoidingView>
                            </ScrollView>

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
                                
                        </View>

                    </Modal>

                </View>
            </ImageBackground>
            
        </View>
    );
};


export default OtherWorld;