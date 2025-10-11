import 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { router, SplashScreen, Stack, usePathname } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import "../global.css";
import NavigationBar from './navigationbar';
import ActivateFonts from './service/ActivateFonts';




SplashScreen.preventAutoHideAsync();


export default function RootLayout(){

  const pathname = usePathname();

  // Define the screens where the navigation bar should be visible
  const navBarScreens = ['/homescreen', '/budgetscreen', '/profilescreen'];
  const showNavBar = navBarScreens.includes(pathname);

  const [fontsLoaded, fontError] = useFonts(ActivateFonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen once the fonts have loaded (or an error occurred)
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);


  const insets = useSafeAreaInsets();

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

  if (!fontsLoaded && !fontError) {
    return null; // Return null or a loading indicator while fonts are loading
  }


  return (
        <View onLayout={onLayoutRootView} style={{ flex: 1, backgroundColor: "#fff" }}>
          <StatusBar barStyle="default"/>
          {/* This SafeAreaView ensures the Stack content is not hidden by the status bar */}
          <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
            <Stack>
              <Stack.Screen name='homescreen' options={{headerShown:false}}/>
              <Stack.Screen name='getstartedscreen' options={{headerShown:false}}/>
              <Stack.Screen name='createaccountscreen' options={{headerShown:false}}/>
              <Stack.Screen name='loginscreen' options={{headerShown:false}}/>
              <Stack.Screen name='loginscreen2' options={{headerShown:false}}/>
              <Stack.Screen name='otpscreen' options={{headerShown:false}}/>
              <Stack.Screen name='addfundscreen' options={{headerShown:false}}/>
              <Stack.Screen name='paymentscreen' options={{headerShown:false}}/>
              <Stack.Screen name='budgetscreen' options={{headerShown:false}}/>
              <Stack.Screen name='dailybudgetscreen' options={{headerShown:false}}/>
              <Stack.Screen name='weeklybudgetscreen' options={{headerShown:false}}/>
              <Stack.Screen name='monthlybudgetscreen' options={{headerShown:false}}/>
              <Stack.Screen name="withdrawfundsscreen" options={{headerShown:false}}/>
              <Stack.Screen name="profilescreen" options={{headerShown:false}}/>"
            </Stack>
          </SafeAreaView>
          {showNavBar && <NavigationBar />}
        </View>
  );
}
