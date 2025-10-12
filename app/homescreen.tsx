import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import HomeController from "./controller/homecontroller";
import Loader from "./loader";
import useSharedStore from "./repository/store";
import AppDetails from "./service/AppService";
import formatAmount from "./service/formatamount";



const HomeScreen  = ()=>{

    
    const [firstname, setFirstname] = useState("...");
    const { height } = Dimensions.get("window");


    const [balance, setBalance] = useState("...");

    const [isLoading, setIsLoading] = useState(false);

    const [budgetData, setBudgetData] = useState({limitAmount:0, accessAmount:0});
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true); // Will be dynamic later
    


    //Store Options...
    const budgetStore = useSharedStore((state) => state.budget);
    const setBudgetStore = useSharedStore((state) => state.setBudget);
    
    const setTotalBalanceStore = useSharedStore((state) => state.setTotalBalance);

    const setNotificationsStore = useSharedStore((state) => state.setNotifications);

        const noti = [
        {
            id: '1',
            title: 'Payment Successful',
            message: 'You have successfully added ₦5,000 to your account.',
            timestamp: '10 mins ago',
            read: false,
            icon: 'checkmark-circle',
            iconColor: '#10B981', // green-500
        },
        {
            id: '2',
            title: 'Budget Alert',
            message: 'You are approaching your weekly budget limit for "Food".',
            timestamp: '1 hour ago',
            read: false,
            icon: 'warning',
            iconColor: '#F59E0B', // amber-500
        }
    ]

    
    const getHomeData = async()=>{
        setIsLoading(true);

        const email = await AsyncStorage.getItem("user-email");

        const response = await HomeController(email)
        if (response.status === 200){
            const user = response.data.user;

            setFirstname(user.firstname)
            setBalance(user.balance)

            setTotalBalanceStore(user.balance)

            setNotificationsStore([...noti])


            if (response.data.budget){
                
                setBudgetStore(response.data.budget)
                setBudgetData({limitAmount:response.data.budget.limitAmount, accessAmount:response.data.budget.accessAmount})
            }
            else{
                setBudgetStore(null)
                setBudgetData({limitAmount:0, accessAmount:0})
            }
            

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
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="default" />

            <View className="flex-1 p-4">
                <View className="h-[10%] flex-row justify-between items-center">
                    <Text className="text-lg font-monasans-bold text-gray-800">Hi, {firstname}</Text>
                    <TouchableOpacity activeOpacity={1} onPress={() => router.push('/notificationscreen')} className="relative">
                        <Ionicons name="notifications-outline" size={28} color="#333" />
                        {hasUnreadNotifications && (
                            <View className="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
                        )}
                    </TouchableOpacity>
                </View>
                <View className="h-[15%] w-[100%] rounded-2xl flex-row p-4 justify-between items-center" style={{backgroundColor:AppDetails.color.iconColors}}>{/**Balance and Funds Section */}
                    <View className="h-full justify-between">
                        <Text className="text-white/80 font-monasans-light text-base">Access Balance</Text>
                        <Text className="text-white text-2xl font-monasans-bold">{formatAmount(budgetData.accessAmount)}</Text>
                    </View>
                        
                        
                    <TouchableOpacity onPress={getHomeData}>
                        <Ionicons name="refresh" size={28} color="white" />
                    </TouchableOpacity>


                    <View className="h-full items-end justify-between">
                        <View className="mt-2">
                            <Text className="text-white/80 font-monasans-light text-sm">Total Balance</Text>
                            <Text className="text-white font-monasans-bold text-sm">{formatAmount(balance)}</Text>
                        </View>

                        <TouchableOpacity onPress={()=> router.push("/addfundscreen")} activeOpacity={1} className="bg-white py-2 px-4 rounded-full"><Text className="font-monasans-bold" style={{color:AppDetails.color.iconColors}}>Add Funds</Text></TouchableOpacity>
                    </View>
                </View>
                

                <View className="h-[12%] w-full bg-gray-100 rounded-2xl mt-4 flex-row items-center justify-around">{/**Categories Section */}
                    <TouchableOpacity activeOpacity={1} onPress={()=> router.push("/budgetscreen")} className="items-center">
                        <Ionicons name="wallet" size={30} color={AppDetails.color.iconColors} />
                        <Text className="font-monasans-regular text-sm mt-1" style={{color: AppDetails.color.iconColors}}>Budget</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={()=> router.push("/withdrawfundsscreen")} className="items-center">
                        <Ionicons name="cash" size={30} color={AppDetails.color.iconColors} />
                        <Text className="font-monasans-regular text-sm mt-1" style={{color: AppDetails.color.iconColors}}>Withdraw</Text>
                    </TouchableOpacity>
                </View>
                {isLoading && <Loader />}
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;
