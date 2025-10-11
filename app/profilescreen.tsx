import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import HomeController from './controller/homecontroller';
import Loader from './loader';
import AppDetails from './service/AppService';


const ProfileScreen = ()=>{
    const router = useRouter();
    const [user, setUser] = useState({ firstname: '', lastname: '', email: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            const email = await AsyncStorage.getItem("user-email");
            if (email) {
                const response = await HomeController(email);
                if (response.status === 200) {
                    setUser(response.data.user);
                } else {
                    // Handle error, maybe show a message
                    console.error("Failed to fetch user data");
                }
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.removeItem("is-launched");
                        await AsyncStorage.removeItem("user-email");
                        // Using dismissAll to clear navigation stack and go to the entry point
                        router.dismissAll();
                        router.replace('/loginscreen');
                    },
                },
            ]
        );
    };

    const profileOptions = [
        { title: 'Edit Profile', icon: 'person-circle-outline', action: () => {} },
        { title: 'Settings', icon: 'settings-outline', action: () => {} },
        { title: 'Help & Support', icon: 'help-circle-outline', action: () => {} },
        { title: 'About SpendWise', icon: 'information-circle-outline', action: () => {} },
    ];

    if (isLoading) {
        return <Loader />;
    }

    return(
        <SafeAreaView className="flex-1 bg-white">
            <View className="p-6">
                <Text className="text-2xl font-monasans-bold text-gray-800 mb-8">Profile</Text>
                
                {/* User Info Header */}
                <View className="flex-row items-center mb-10">
                    <View className="w-20 h-20 rounded-full items-center justify-center mr-5" style={{backgroundColor: AppDetails.color.iconColors}}>
                        <Text className="text-white text-3xl font-monasans-bold">
                            {user.firstname.charAt(0)}{user.lastname.charAt(0)}
                        </Text>
                    </View>
                    <View>
                        <Text className="text-2xl font-monasans-bold text-gray-800">{user.firstname} {user.lastname}</Text>
                        <Text className="text-base font-monasans-regular text-gray-500">{user.email}</Text>
                    </View>
                </View>

                {/* Profile Options */}
                <View className="mb-10">
                    {profileOptions.map((item, index) => (
                        <TouchableOpacity key={index} onPress={item.action} activeOpacity={0.7} className="flex-row items-center py-6  border-b border-gray-100">
                            <Ionicons name={item.icon as any} size={26} color={AppDetails.color.iconColors} />
                            <Text className="text-lg font-monasans-medium text-gray-700 ml-5 flex-1">{item.title}</Text>
                            <Ionicons name="chevron-forward-outline" size={22} color="#A0A0A0" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity onPress={handleLogout} activeOpacity={0.8} className="flex-row items-center justify-center py-4 rounded-full" style={{backgroundColor: '#FEE2E2'}}>
                    <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                    <Text className="text-lg font-monasans-bold text-red-500 ml-2">Logout</Text>
                </TouchableOpacity>

                {/* Sponsor */}
                <View className="items-center mt-12">
                    <Text className="text-sm font-monasans-regular text-gray-400">Joetivity Innovations</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen;