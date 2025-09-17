import 'react-native-reanimated';

import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import "../global.css";



SplashScreen.preventAutoHideAsync();


export default function RootLayout() {

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      await SplashScreen.hideAsync();

    };

    prepare();
  }, []);

  

  const insets = useSafeAreaInsets();
  const usableHeight = Dimensions.get('screen').height;


  return (
        <SafeAreaView style={{height: usableHeight, backgroundColor:"#fff"}}>
          <StatusBar barStyle="default"/>
          <Stack>
            <Stack.Screen name='getstartedscreen' options={{headerShown:false}}/>


          </Stack>
        </SafeAreaView>
  );
}
