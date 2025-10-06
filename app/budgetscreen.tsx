import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

const BudgetScreen = () => {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  return (
    <View className="flex-1 items-center bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-4 absolute top-10 left-4">
            <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-1 justify-center">
            <View style={{ width: screenWidth * 0.5 }} className="items-center bg-gray-100 p-12 rounded-lg my-8">
                <Text className="text-xl font-monasans-light text-black">Daily</Text>
            </View>
            <View style={{ width: screenWidth * 0.5 }} className="items-center bg-gray-100 p-12 rounded-lg my-8">
                <Text className="text-xl font-monasans-light text-black">Weekly</Text>
            </View>
            <View style={{ width: screenWidth * 0.5 }} className="items-center bg-gray-100 p-12 rounded-lg my-8">
                <Text className="text-xl font-monasans-light text-black">Monthly</Text>
            </View>
        </View>
    </View>
  );
};

export default BudgetScreen;