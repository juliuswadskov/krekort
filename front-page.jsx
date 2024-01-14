import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, Keyboard, TextInput, Pressable, View, ImageBackground, TurboModuleRegistry } from 'react-native';
import { Image } from 'expo-image';
import splash from './assets/splash.png'
import * as SplashScreen from 'expo-splash-screen';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import DialogInput from 'react-native-dialog-input';
import { DevToolsSettingsManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

  function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



const image = { uri: "https://cdn.discordapp.com/attachments/1035632471317958686/1195840616630857928/IMG_9268.png?ex=65b5745c&is=65a2ff5c&hm=8d7a41514a91d2df6c9a7a142b2ee404b564af0de9d654aba1b4fce89b9c5992&" };
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Index({navigation, route}) {
    console.log(route.params)
    const [birthdate, setBirthday] = useState("00.00.0001")
    const [age, setAge] = useState(0)
    const [fullname, setFullname] = useState('Lars Jensen');

    const [frontImage, setFrontImage] = useState("")

    const [dateGotLicense, setDateGotLicense] = useState()
    const [yearGotLicense, setYearGotLicense] = useState()
    const [licenseNumber, setLicenseNumber] = useState()

    
    useEffect(() => {
        AsyncStorage.getItem('date-got-license', (err, value) => {
            if (err) throw err;
            
            if(value !== null) {
                setDateGotLicense(value)
            } else {
                let dateGotLicenseTMP = (`${1+getRandomInt(29)}`)
                setDateGotLicense(dateGotLicenseTMP)
                AsyncStorage.setItem("date-got-license", dateGotLicenseTMP)
            }
        })

        AsyncStorage.getItem('year-got-license', (err, value) => {
            if (err) throw err;
            
            if(value !== null) {
                setYearGotLicense(value)
            } else {
                let yearGotLicenseTMP = (("20"+(19+getRandomInt(3))))
                setYearGotLicense(yearGotLicenseTMP)
                AsyncStorage.setItem("year-got-license", yearGotLicenseTMP)
            }
        })

        AsyncStorage.getItem('license-number', (err, value) => {
            if (err) throw err;
            
            if(value !== null) {
                setLicenseNumber(value)
            } else {
                let licenseNumberTMP = ("37"+Math.random().toString().slice(4,10))
                setLicenseNumber(licenseNumberTMP)
                AsyncStorage.setItem("license-number", licenseNumberTMP)
            }
        })
        
        AsyncStorage.getItem('birthdate', (err, value) => {
            if (err) throw err;
            
            if(value !== null) {
                setBirthday(value)
            } else {
                setBirthday("00.00.0001")
                AsyncStorage.setItem("birthdate", "00.00.0001")
            }
        })
        
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

        AsyncStorage.getItem('front-image', (err, value) => {
            if (err) throw err;
            
            if(value !== null) {
                setFrontImage(value)
            } else {
                setFrontImage("")
                AsyncStorage.setItem("front-image", "")
            }
        })
        
        // AsyncStorage.setItem("back-image", "")
    }, [])
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDialogVisible, showDialog] = useState(false)
    const showDatePicker = () => {setDatePickerVisibility(true);};
    const hideDatePicker = () => {setDatePickerVisibility(false);};

    const handleConfirm = (birthdateHandle) => {
        const yyyy = birthdateHandle.getFullYear();
        let mm = birthdateHandle.getMonth() + 1; // Months start at 0!
        let dd = birthdateHandle.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const birthdateFormattte = dd + '.' + mm + '.' + yyyy;

        setBirthday(birthdateFormattte)
        AsyncStorage.setItem("birthdate", birthdateFormattte)

        setAge(calculate_age(new Date(birthdateHandle)))
        AsyncStorage.setItem("age", `${calculate_age(new Date(birthdateHandle))}`)

        hideDatePicker();
    };

    var date = new Date()       

    const formatter = new Intl.DateTimeFormat('da', { month: 'long' });
    var month = formatter.format(new Date());

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{position: 'absolute', fontSize: 15, top: 110, left: 20}}>
                    <Text style={{fontSize: 15}}>
                        Færdselsstyrelsen{"\n"}
                        {dateGotLicense}. okt. {yearGotLicense}
                    </Text>
                </View>

                <View style={{position: 'absolute', fontSize: 15, width: 150, height: 210, top: 115, right: 22}}>
                    <Pressable style={{width: "100%", height: "100%"}} onPress={() => {navigation.navigate('Image')}}>
                        <Image
                            source={frontImage}
                            contentFit="cover"
                            style={{width: "100%", height: "100%", backgroundColor: "white", borderRadius: 10, borderWidth: 2, borderColor: "white"}}
                            transition={1000}
                        />
                    </Pressable>
                </View>

                <View style={{position: 'absolute', fontSize: 15, top: 224, left: 20, maxWidth: 150}}>
                    <Text style={{fontSize: 25, fontFamily: "IBMPlexSans_600SemiBold", color: "#22215d"}}>
                        {fullname}
                    </Text>
                </View>
                <View style={{position: 'absolute', width: "90%", bottom: 405, left: 20}}>
                    <Text style={{fontSize: 13, textAlign: "center", fontFamily: "IBMPlexSans_600SemiBold", color: "#22215d"}}>
                        FØDSELSDATO{"\t\t"}ALDER{"\t\t"}KØREKORTNR
                    </Text>
                </View>
                <View style={{position: 'absolute', width: "90%", bottom: 376, left: 20}}>
                    <Text style={{fontSize: 13, textAlign: "center", fontSize: 20, fontFamily: "IBMPlexSans_600SemiBold", color: "#22215d"}}>
                        {birthdate}{"\t\t"}{age} år{"\t\t"}{licenseNumber}
                    </Text>
                </View>
                <View style={{position: 'absolute', width: "90%", bottom: 180, left: 20}}>
                    <Text style={{fontSize: 13, textAlign: "center"}}><Text style={{fontWeight: "bold"}}>Sidst opdateret:</Text> {date.getDate()}. {month} {date.getFullYear()} {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                </View>

                <View style={{position: 'absolute', backgroundColor: "", width: 60, height: 60, bottom: 0, left: 0}}>
                    <Pressable style={{width: 60, height: 60}}
                        onPress={async () => {
                            let result = await ImagePicker.launchImageLibraryAsync({
                                quality: 1,
                            });

                            if (!result.canceled) {
                                setFrontImage(result.assets[0].uri)
                                AsyncStorage.setItem("front-image", result.assets[0].uri)
                            } else {
                                alert('You did not select any image.');
                            }
                        }}
                    />
                </View>

                <View style={{position: 'absolute', backgroundColor: "", width: 60, height: 60, bottom: 60, left: 0}}>
                    <Pressable style={{width: 60, height: 60}}
                        onPress={async () => {
                            setDatePickerVisibility(true)
                        }}
                    />
                </View>

                <View style={{position: 'absolute', backgroundColor: "", width: 60, height: 60, bottom: 120, left: 0}}>
                <Pressable style={{width: 60, height: 60}}
                        onPress={async () => {
                            showDialog(true)
                        }}
                    />
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                <DialogInput isDialogVisible={isDialogVisible}
                    title={""}
                    message={"Set Fulde navn"}
                    hintInput ={"Lars Jensen"}
                    submitInput={ (inputText) => {
                        setFullname(inputText)
                        AsyncStorage.setItem("fullname", inputText)
                    }}
                    closeDialog={ () => {showDialog(false)}}>
                </DialogInput>
            </ImageBackground>
        </View>
    );
}

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      color: '#01152e',
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    text: {
      
      
//    fontFamily: "StatTextPro",
    },
});

// #