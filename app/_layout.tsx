import 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import "../global.css";




SplashScreen.preventAutoHideAsync();


export default function RootLayout(){

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      await SplashScreen.hideAsync();

    };

    prepare();
  }, []);


  const insets = useSafeAreaInsets();
  const usableHeight = Dimensions.get('screen').height;

  useEffect(() => {
    const checkIfLaunched = async () => {
    
      try {
        // await AsyncStorage.clear()

        const isLaunched = await AsyncStorage.getItem('is-launched');
        const isUser = await AsyncStorage.getItem("email");


        if (isLaunched === 'true' && isUser){

            router.replace('/homescreen' as any);
        }
        else if(isLaunched==="true" && !isUser){

            router.replace('/loginscreen' as any);
        }
        else{

          router.replace('/getstartedscreen' as any);
        }
        
      } catch (e) {

        //404 or 500 page error here...
        console.error('Failed to load launch status');
      } finally {

      }
    };


    checkIfLaunched();
  }, []);



  return (
        <SafeAreaView style={{height: usableHeight, backgroundColor:"#fff"}} edges={["top", "left", "right"]}>
          <StatusBar barStyle="dark-content"/>
          <Stack>
            <Stack.Screen name='homescreen' options={{headerShown:false}}/>
            <Stack.Screen name='getstartedscreen' options={{headerShown:false}}/>
            <Stack.Screen name='createaccountscreen' options={{headerShown:false}}/>
            <Stack.Screen name='loginscreen' options={{headerShown:false}}/>
            <Stack.Screen name='loginscreen2' options={{headerShown:false}}/>
            <Stack.Screen name='otpscreen' options={{headerShown:false}}/>
          </Stack>
        </SafeAreaView>
  );
}
