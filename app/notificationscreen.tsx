import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import useSharedStore from "./repository/store";


const NotificationScreen = () => {
    const router = useRouter();

    // Mock data for notifications

    const demo = [
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
        },
        {
            id: '3',
            title: 'Withdrawal Processed',
            message: 'Your withdrawal of ₦2,500 has been processed.',
            timestamp: '5 hours ago',
            read: true,
            icon: 'arrow-up-circle',
            iconColor: '#3B82F6', // blue-500
        },
        {
            id: '4',
            title: 'New Feature!',
            message: 'You can now set monthly budgets. Check it out!',
            timestamp: '1 day ago',
            read: true,
            icon: 'sparkles',
            iconColor: '#8B5CF6', // violet-500
        },
    ]

    const notificationsStore = useSharedStore((state) => state.notifications);

    
    const [notifications, setNotifications] = useState([]);



    useEffect(()=>{

        const getNotifications = ()=>{
            setNotifications(notificationsStore)

        }
        getNotifications()
    },[])

    useEffect(() => {
        // When the user visits this screen, update the "seen" count.
        const markAsSeen = async () => {
            await AsyncStorage.setItem('lastSeenNotificationCount', String(notifications.length));
        };
        markAsSeen();
    }, [notifications]);

    







    const renderItem = ({ item }) => (
        <TouchableOpacity 
            activeOpacity={0.7}
            className={`p-4 border-b border-gray-100 flex-row items-start ${!item.read ? 'bg-blue-50' : 'bg-white'}`}
        >
            <View className="mr-4 mt-1">
                <Ionicons name={item.icon as any} size={24} color={item.iconColor} />
            </View>
            <View className="flex-1">
                <Text className="text-base font-monasans-bold text-gray-800">{item.title}</Text>
                <Text className="text-sm font-monasans-regular text-gray-600 mt-1">{item.message}</Text>
                <Text className="text-xs font-monasans-regular text-gray-400 mt-2">{item.timestamp}</Text>
            </View>
            {!item.read && (
                <View className="w-2.5 h-2.5 bg-blue-500 rounded-full self-center ml-2" />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center p-6 border-b border-gray-200">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
                </TouchableOpacity>
                <Text className="text-2xl font-monasans-bold text-gray-900">Notifications</Text>
            </View>

            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => (
                    <View className="flex-1 justify-center items-center mt-20">
                        <Ionicons name="notifications-off-outline" size={48} color="#A0A0A0" />
                        <Text className="text-lg font-monasans-medium text-gray-500 mt-4">No new notifications</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default NotificationScreen;