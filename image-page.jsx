import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, Keyboard, TextInput, Pressable, View, ImageBackground, TurboModuleRegistry } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = { uri: "https://cdn.discordapp.com/attachments/1035632471317958686/1196096808791847032/IMG_9295.png?ex=65b662f5&is=65a3edf5&hm=61a935ca4e5b3648bb41211bbd77a9871c2e1ceb6bc1ba0e1c0589ad023c0d0c&" };


export default function Index({navigation, route}) {
    console.log(route.params)
    const [age, setAge] = useState(0)
    const [fullname, setFullname] = useState('Lars Jensen');
    const [backImage, setBackImage] = useState("")

    useEffect(() => {
        AsyncStorage.getItem('age', (err, value) => {
            if (err) throw err;
            
            if(value !== null) {
                setAge(value)
            } else {
                setAge(0)
                AsyncStorage.setItem("age", `0`)
            }
        })

        AsyncStorage.getItem('fullname', (err, value) => {
            if (err) throw err;
            
            if(value !== null) {
                setFullname(value)
            } else {
                setFullname("Lars Jensen")
                AsyncStorage.setItem("fullname", "Lars Jensen")
            }
        })

        AsyncStorage.getItem('back-image', (err, value) => {
            if (err) throw err;
            
            if(value !== null) {
                setBackImage(value)
            } else {
                setBackImage("")
                AsyncStorage.setItem("back-image", "")
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{
                    flex: 1,
                }}>
                    <View style={{flex: 1}}>
                        <Image
                            source={backImage}
                            contentFit="cover"
                            style={{flex: 1, position: 'absolute', width: "96%", height: "70%", bottom: "13.3%", left: 8, borderTopLeftRadius: 5, borderTopRightRadius: 5}}
                        />
                    </View>
                </View>
                

                <View style={{position: 'absolute', width: "90%", bottom: 35, left: 23}}>
                    <Text style={{fontSize: 18, fontFamily: "IBMPlexSans_600SemiBold", color: "white"}}>
                        {fullname}
                    </Text>
                </View>

                <View style={{position: 'absolute', bottom: 35, right: 27}}>
                    <Text style={{fontSize: 13, fontSize: 18, fontFamily: "IBMPlexSans_600SemiBold", color: "white"}}>
                        {age} år
                    </Text>
                </View>

                <View style={{position: 'absolute', backgroundColor: "", width: 60, height: 60, bottom: 0, left: 0}}>
                    <Pressable style={{width: 60, height: 60}}
                        onPress={async () => {
                            let result = await ImagePicker.launchImageLibraryAsync({
                                quality: 1,
                            });

                            if (!result.canceled) {
                                setBackImage(result.assets[0].uri)
                                AsyncStorage.setItem("back-image", result.assets[0].uri)
                            } else {
                                alert('You did not select any image.');
                            }
                        }}
                    />
                </View>

                <View style={{position: 'absolute', backgroundColor: "", width: 60, height: 60, top: 50, left: 0}}>
                    <Pressable style={{width: 60, height: 60}}
                        onPress={async () => {
                            navigation.navigate("Front")
                        }}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      color: '#01152e'
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
});