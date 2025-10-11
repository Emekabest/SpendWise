import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import useSharedStore from './repository/store';
import AppDetails from './service/AppService';

const BudgetScreen = () => {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const [budget, setBudget] = useState({type: "", limitAmount: 0, accessAmount: 0, alterDate: []});


  const budgetStore = useSharedStore((state) => state.budget);

  useEffect(() => {
    
    if (budgetStore){
        setBudget(budgetStore);

    }
  
  
  }, [budgetStore]);




  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="default" />

      <View className="flex-row items-center px-4 py-8 bg-gray-50">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="flex-1 text-2xl font-bold text-center color-[#333]">Select your budget type</Text>
        <View style={{ width: 24 }} />
      </View>
      <View className="flex-1">
        {budget.limitAmount > 0 ? (
          <View className="flex-1 items-center pt-4 bg-white">
            <Feather name="activity" size={50} color={AppDetails.color.iconColors} />
            <Text className="text-lg font-monasans-bold text-center color-[#333] px-8 mt-4">
              Your current budget is still ongoing, come back when the date is due
            </Text>


            <View className="mt-8 w-11/12 bg-gray-100 p-4 rounded-lg">
              <View className="flex-row justify-between py-4 border-b border-gray-200">
                <Text className="font-monasans-regular text-gray-600">Budget Type</Text>
                <Text className="font-monasans-bold text-gray-800">{budget.type}</Text>
              </View>
              <View className="flex-row justify-between py-4 border-b border-gray-200">
                <Text className="font-monasans-regular text-gray-600">Limit Amount</Text>
                <Text className="font-monasans-bold text-gray-800">{budget.limitAmount}</Text>
              </View>
              <View className="flex-row justify-between py-4 border-b border-gray-200">
                <Text className="font-monasans-regular text-gray-600">Access Balance</Text>
                <Text className="font-monasans-bold text-gray-800">{budget.accessAmount}</Text>
              </View>
              <View className="flex-row justify-between py-4">
                <Text className="font-monasans-regular text-gray-600">Alter Date</Text>
                <Text className="font-monasans-bold text-gray-800">{new Date(budget.alterDate[0], budget.alterDate[1] - 1, budget.alterDate[2]).toDateString()}</Text>
              </View>

            </View>
          </View>
        ) : (
          <View className="flex-1 items-center bg-white pt-8">
            <TouchableOpacity activeOpacity={1} onPress={() => router.push('/dailybudgetscreen')} style={{ width: screenWidth * 0.5 }} className="items-center bg-gray-100 p-12 rounded-lg my-8">
              <View className="flex-row items-center">
                <Feather name="sun" size={24} color={AppDetails.color.iconColors} className="mr-2" />
                <Text className="text-xl font-monasans-light text-black" style={{ color: AppDetails.color.iconColors }}>Daily</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => router.push('/weeklybudgetscreen')} style={{ width: screenWidth * 0.5, }} className="items-center bg-gray-100 p-12 rounded-lg my-8">
              <View className="flex-row items-center">
                <Feather name="bar-chart-2" size={24} color={AppDetails.color.iconColors} className="mr-2" />
                <Text className="text-xl font-monasans-light text-black" style={{ color: AppDetails.color.iconColors }}>Weekly</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => router.push('/monthlybudgetscreen')} style={{ width: screenWidth * 0.5, backgroundColor: AppDetails.color.iconColors }} className="items-center bg-gray-100 p-12 rounded-lg my-8">
              <View className="flex-row items-center">
                <Feather name="calendar" size={24} color="#fff" className="mr-2" />
                <Text className="text-xl font-monasans-light text-black" style={{ color: "#fff" }}>Monthly</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BudgetScreen;