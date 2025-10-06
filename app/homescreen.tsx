import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import HomeController from "./controller/homecontroller";
import Loader from "./loader";
import AppDetails from "./service/AppService";



const HomeScreen  = ()=>{
    
    const [firstname, setFirstname] = useState("...");
    const { height } = Dimensions.get("window");

    const [balance, setBalance] = useState("...")


    const [isLoading, setIsLoading] = useState(false);    
    






    
    const getHomeData = async()=>{
        setIsLoading(true);

        const email = await AsyncStorage.getItem("user-email");

        const response = await HomeController(email)
        if (response.status === 200){
            const user = response.data;

            setFirstname(user.firstname)
            setBalance(user.balance)    

        }
        else{
            console.log(response.message)
        }


        setIsLoading(false);
    }


    useEffect(()=>{

        getHomeData()
    },[])




    return (
        <SafeAreaView className="flex-1 p-4" style={{height:height, backgroundColor:"#fff"}}>
            <StatusBar barStyle="default" />
        
            <View className="h-[10%] flex-row">
                <View className="h-[100%] w-[50%] justify-center">
                    <Text className="text-lg font-monasans-bold text-gray-800">Hi, {firstname}</Text>
                </View>
                <View></View>
            </View>
            <View className="h-[15%] w-[100%] rounded-2xl flex-row p-4 justify-between items-center" style={{backgroundColor:AppDetails.color.iconColors}}>{/**Balance and Funds Section */}
                <View className="h-full justify-between">
                    <Text className="text-white/80 font-monasans-light text-base">Balance</Text>
                    <Text className="text-white text-2xl font-monasans-bold">₦ {balance}</Text>
                </View>

                <TouchableOpacity onPress={getHomeData}>
                    <Ionicons name="refresh" size={28} color="white" />
                </TouchableOpacity>


                <View className="h-full items-end justify-between">
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
            {isLoading && <Loader />}
        </SafeAreaView>
    )
}

export default HomeScreen;
