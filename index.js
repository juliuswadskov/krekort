import { Text, Button, View, Image, Pressable } from "react-native";
import { useEffect, useState } from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
    useFonts,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
  } from '@expo-google-fonts/ibm-plex-sans';

  

import Front       from "./front-page";
import ImagePage       from "./image-page";

const Stack = createNativeStackNavigator();

export default function Index() {
    const [isLoaded] = useFonts({IBMPlexSans_500Medium, IBMPlexSans_600SemiBold});

    if (!isLoaded) {
        return (
            <View>
            </View>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Front">
                    <Stack.Screen name="Front" options={{headerShown: false}} component={Front} />
                    <Stack.Screen name="Image" options={{headerShown: false}} component={ImagePage} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}