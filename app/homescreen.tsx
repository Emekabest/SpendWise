import React, { useState } from "react";
import { Dimensions, SafeAreaView, Text, View } from "react-native";
import AppDetails from "./service/AppService";



const HomeScreen  = ()=>{
    // Placeholder for user's name. This would typically be fetched from an API or async storage after login.
    const [userName, setUserName] = useState("User");
        const { height } = Dimensions.get("window");



    return (
        <SafeAreaView className="flex-1 p-4" style={{height:height, backgroundColor:"#fff"}}>
            <View className="h-[10%] flex-row">{/**Header Seciton */}
                <View className="h-[100%] w-[50%] justify-center">
                    <Text className="text-lg font-bold text-gray-800">Hi, {userName}</Text>
                </View>
                <View></View>
            </View>
            <View className="h-[12%] w-[100%] rounded-2xl flex-row p-2 justify-between" style={{backgroundColor:AppDetails.color.iconColors}}>{/**Balance and Funds Section */}
                <View className="h-[100%] w-[48%]">
                    <View><Text>Balance</Text></View>
                    <View><Text>10000</Text></View>

                </View>


                <View className="h-[100%] w-[48%]">

                </View>
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen;
