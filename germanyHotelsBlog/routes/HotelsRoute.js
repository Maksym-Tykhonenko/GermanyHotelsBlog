// HotelsRoute
import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import HotelsScreen from "../screens/HotelsScreen";
import Germany from "../screens/Germany";
import OtherWorld from "../screens/OtherWorld";
import Hotel from "../screens/Hotel";
import NewHotel from "../screens/NewHotel";


const HotelsRoute = () => {


    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="HotelsScreen"
                component={HotelsScreen} />
            
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Germany"
                component={Germany} />
            
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="OtherWorld"
                component={OtherWorld} />
            
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Hotel"
                component={Hotel} />
            
             <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="NewHotel"
                component={NewHotel} />
            
        </Stack.Navigator>
    );
};


export default HotelsRoute;