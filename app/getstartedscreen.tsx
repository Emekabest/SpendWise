import { useFonts } from "expo-font";
import { Text, TouchableOpacity, View } from "react-native";
import ActivateFonts from "./service/ActivateFonts";
import AppDetails from "./service/AppService";


const getStartedScreen = ()=>{
    
    const [fontsLoaded] = useFonts(ActivateFonts);
    


    return(
        <View className="h-[100%] bg-white">
            <View className="h-[25%] items-center justify-center">
                <Text className="font-monasans-bold text-3xl color-[#333]">SpendWise</Text>
            </View>


            <View className="h-[50%] bg-green-400">

            </View>


            <View className="h-[25%] px-4 pt-3 flex-col justify-center">
                <TouchableOpacity className="h-16 w-[100%] mb-4 rounded-full items-center justify-center" style={{backgroundColor:AppDetails.color.iconColors}}>
                        <Text className="font-monasans-regular text-xl color-white">Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity className="h-16 w-[100%] rounded-full items-center justify-center" style={{backgroundColor:AppDetails.color.iconColors}}>
                        <Text className="font-monasans-regular text-xl color-white">Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default getStartedScreen