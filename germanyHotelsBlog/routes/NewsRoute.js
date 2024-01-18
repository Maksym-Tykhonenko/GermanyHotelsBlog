// NewsRoute

import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import NewsScreen from "../screens/NewsScreen";


const NewsRoute = () => {


    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false,
            }}
                name="NewsScreen"
                component={NewsScreen} />
        </Stack.Navigator>
    );
};


export default NewsRoute;