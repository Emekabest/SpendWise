import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import AppDetails from './service/AppService';

const BudgetScreen = () => {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;


  return (
    <SafeAreaView style={{ backgroundColor: AppDetails.color.iconColors }} className="flex-1">
              <StatusBar barStyle="default" />
        
        <View className="flex-row items-center px-4 py-8 bg-gray-50">
            <TouchableOpacity onPress={() => router.back()}>
                <Feather name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text className="flex-1 text-2xl font-bold text-center color-[#333]">Select your budget type</Text>
            <View style={{ width: 24 }} />

        </View>
        <View className="flex-1 items-center bg-white pt-8">
            <TouchableOpacity activeOpacity={1} onPress={() => router.push('/dailybudgetscreen')} style={{ width: screenWidth * 0.5}} className="items-center bg-gray-100 p-12 rounded-lg my-8">
                <View className="flex-row items-center">
                    <Feather name="sun" size={24} color={AppDetails.color.iconColors} className="mr-2" />
                    <Text className="text-xl font-monasans-light text-black" style={{color:AppDetails.color.iconColors}}>Daily</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => {}} style={{ width: screenWidth * 0.5,  }} className="items-center bg-gray-100 p-12 rounded-lg my-8">
                <View className="flex-row items-center">
                    <Feather name="bar-chart-2" size={24} color={AppDetails.color.iconColors} className="mr-2" />
                    <Text className="text-xl font-monasans-light text-black" style={{color:AppDetails.color.iconColors}}>Weekly</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => {}} style={{ width: screenWidth * 0.5, backgroundColor: AppDetails.color.iconColors }} className="items-center bg-gray-100 p-12 rounded-lg my-8">
                <View className="flex-row items-center">
                    <Feather name="calendar" size={24} color="#fff" className="mr-2" />
                    <Text className="text-xl font-monasans-light text-black" style={{color:"#fff"}}>Monthly</Text>
                </View>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
};

export default BudgetScreen;