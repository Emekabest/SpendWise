import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import AppDetails from "./service/AppService";



const HomeScreen  = ()=>{
    const [firstname, setFirstname] = useState("User");
    const { height } = Dimensions.get("window");

    const [balance, setBalance] = useState("")




    return (
        <SafeAreaView className="flex-1 p-4" style={{height:height, backgroundColor:"#fff"}}>
            <View className="h-[10%] flex-row">
                <View className="h-[100%] w-[50%] justify-center">
                    <Text className="text-lg font-monasans-bold text-gray-800">Hi, {firstname}</Text>
                </View>
                <View></View>
            </View>
            <View className="h-[15%] w-[100%] rounded-2xl flex-row p-4 justify-between" style={{backgroundColor:AppDetails.color.iconColors}}>{/**Balance and Funds Section */}
                <View className="h-full w-[48%] justify-between">
                    <Text className="text-white/80 font-monasans-light text-base">Balance</Text>
                    <Text className="text-white text-2xl font-monasans-bold">₦10,000</Text>
                </View>


                <View className="h-full w-[48%] items-end justify-between">
                    <TouchableOpacity><Text className="text-white/80 font-monasans-light text-sm">Transaction history</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=> router.push("/addfundscreen")} activeOpacity={1} className="bg-white py-2 px-4 rounded-full"><Text className="font-monasans-bold" style={{color:AppDetails.color.iconColors}}>Add Funds</Text></TouchableOpacity>
                </View>
            </View>
            

            <View className="h-[12%] w-full bg-gray-100 rounded-2xl mt-4 flex-row items-center justify-around">{/**Categories Section */}
                <TouchableOpacity className="items-center">
                    <Ionicons name="wallet" size={30} color={AppDetails.color.iconColors} />
                    <Text className="font-monasans-regular text-sm mt-1" style={{color: AppDetails.color.iconColors}}>Budget</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center">
                    <Ionicons name="cash" size={30} color={AppDetails.color.iconColors} />
                    <Text className="font-monasans-regular text-sm mt-1" style={{color: AppDetails.color.iconColors}}>Withdraw</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;
