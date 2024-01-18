import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import ProfileScreen from "../screens/ProfileScreen";


const ProfileRoute = () => {


    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ProfileScreen"
                component={ProfileScreen} />
        </Stack.Navigator>
    );
};


export default ProfileRoute;