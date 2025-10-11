import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import AppDetails from './service/AppService';


const AdminSectionScreen = ()=>{
    const router = useRouter();

    const adminOptions = [
        { title: 'DashBoard', icon: 'grid-outline', action: () => {} },
        { title: 'Withdrawal Request', icon: 'cash-outline', action: () => {router.push("/withdrawrequestscreen")} }
    ];

    return(
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center p-6 border-b border-gray-200">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            {/* Options */}
            <View className="p-6">
                {adminOptions.map((item, index)=> (
                    <TouchableOpacity key={index} onPress={item.action} activeOpacity={0.7} className="flex-row items-center py-4 border-b border-gray-100">
                        <Ionicons name={item.icon as any} size={26} color={AppDetails.color.iconColors} />
                        <Text className="text-lg font-monasans-medium text-gray-700 ml-5 flex-1">{item.title}</Text>
                        <Ionicons name="chevron-forward-outline" size={22} color="#A0A0A0" />

                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    )

}

export default AdminSectionScreen;