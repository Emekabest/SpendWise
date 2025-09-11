import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import { Dimensions, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import "../global.css";




export default function RootLayout() {
  const colorScheme = useColorScheme();
  

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
