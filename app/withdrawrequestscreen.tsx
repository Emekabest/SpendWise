import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import AppDetails from './service/AppService';
import formatAmount from './service/formatamount';


const WithdrawRequestscreen = ()=>{
    const router = useRouter();
    const [withdrawRequests, setWithdrawRequests] = useState([{
                    id: '0',
                    bankName: "Joetivity",
                    accountName: "John Doe",
                    accountNumber: "1234567890",
                    amount: 3000,
                    status: 'pending'
                },]);

    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        Alert.alert("Copied", "Account number copied to clipboard.");
    };
    
    useEffect(()=>{
        const getWithdrawRequests = async()=>{
            // In a real app, you would fetch this from your backend API
            setWithdrawRequests([
                {
                    id: '1',
                    bankName: "United Bank for Africa",
                    accountName: "John Doe",
                    accountNumber: "1234567890",
                    amount: 3000,
                    status: 'pending'
                },
                {
                    id: '2',
                    bankName: "Opay Digital Services",
                    accountName: "Jane Smith",
                    accountNumber: "0987654321",
                    amount: 5000,
                    status: 'pending'
                },
                {
                    id: '3',
                    bankName: "Access Bank",
                    accountName: "Peter Jones",
                    accountNumber: "5556667771",
                    amount: 9000,
                    status: 'pending'
                },
            ]);
        }

        getWithdrawRequests();
    }, []);

    return(
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="flex-row items-center p-6 border-b border-gray-200 bg-white">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
                </TouchableOpacity>
                <Text className="text-2xl font-monasans-bold text-gray-900">Withdrawal Requests</Text>
            </View>

            <FlatList
                data={withdrawRequests}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <View className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
                        <View className="flex-row justify-between items-start">
                            <View className="flex-1">
                                <Text className="text-lg font-monasans-bold text-gray-800">{item.accountName}</Text>
                                <Text className="text-sm font-monasans-regular text-gray-500">{item.bankName}</Text>
                                <View className="flex-row items-center mt-1">
                                    <Text className="text-sm font-monasans-regular text-gray-500">{item.accountNumber}</Text>
                                    <TouchableOpacity onPress={() => copyToClipboard(item.accountNumber)} className="ml-2 p-1">
                                        <Ionicons name="clipboard-outline" size={18} color={AppDetails.color.iconColors} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text className="text-xl font-monasans-bold" style={{color: AppDetails.color.iconColors}}>{formatAmount(item.amount)}</Text>
                        </View>
                        <View className="flex-row justify-end mt-4 pt-4 border-t border-gray-100">
                          
                            <TouchableOpacity activeOpacity={0.7} className="py-2 px-5 rounded-full bg-green-100">
                                <Text className="font-monasans-bold text-green-600">Approve</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <View className="flex-1 justify-center items-center mt-20">
                        <Ionicons name="file-tray-outline" size={48} color="#A0A0A0" />
                        <Text className="text-lg font-monasans-medium text-gray-500 mt-4">No pending requests</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default WithdrawRequestscreen;