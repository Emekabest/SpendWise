import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import WithdrawRequestContoller from "./controller/withdrawrequestscontroller";
import FeedBackPanel from './feedbackpanel';
import Loader from './loader';
import AppDetails from './service/AppService';
import formatAmount from './service/formatamount';


const WithdrawRequestscreen = ()=>{
    const router = useRouter();
    const [withdrawRequests, setWithdrawRequests] = useState<any[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false)

    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        Alert.alert("Copied", "Account number copied to clipboard.");
    };

    const handleApprovePress = (id: string) => {
        setSelectedRequestId(id);
        setModalVisible(true);
    };

    const confirmApproval = () => {
        if (!selectedRequestId) return;

        console.log(selectedRequestId)

        setWithdrawRequests(prevRequests =>
            prevRequests.map(req =>
                req.id === selectedRequestId ? { ...req, settled: true } : req
            )
        );

        setModalVisible(false);
        setSelectedRequestId(null);


        // Here you would also make an API call to your backend to finalize the approval
    };
    
    useEffect(()=>{
        const getWithdrawRequests = async()=>{
            setIsLoading(true)

            const response = await WithdrawRequestContoller();

            if (response.status === 200){

                setWithdrawRequests(response.data);

            }
            else{

            }

            setIsLoading(false)

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
                            {item.settled === false ? (
                                <>
                                   
                                    <TouchableOpacity onPress={() => handleApprovePress(item.id)} activeOpacity={0.7} className="py-2 px-5 rounded-full bg-green-100">
                                        <Text className="font-monasans-bold text-green-600">Settle</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <View className="flex-row items-center bg-green-100 py-2 px-4 rounded-full">
                                    <Ionicons name="checkmark-circle" size={20} color="green" />
                                    <Text className="font-monasans-bold text-green-800 ml-2">Settled</Text>
                                </View>
                            )}
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
            <FeedBackPanel
                visible={isModalVisible}
                message="Are you sure you want to approve this request?"
                onConfirm={confirmApproval}
                onCancel={() => setModalVisible(false)}
            />
            {isLoading && <Loader />}
        </SafeAreaView>
    )
}

export default WithdrawRequestscreen;