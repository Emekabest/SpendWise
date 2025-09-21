import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import SigninController from './controller/SigninController';
import AppDetails from './service/AppService';



const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const [formFeedbackMsg, setFormFeedbackMsg] = useState('');




    const handleLogin = async() => {
        
        const message = await SigninController(phone, password)

        setFormFeedbackMsg(message?.status === 400 ? message.message : '')

        
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <Stack.Screen options={{ headerShown: false }} />
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
                    <View className="p-6">
                        <TouchableOpacity onPress={() => router.back()} className="absolute top-4 left-4 z-10">
                            <Ionicons name="arrow-back" size={28} color="black" />
                        </TouchableOpacity>

                        <View className="items-center mb-8">
                            <Text className="text-3xl font-bold text-gray-800">Login</Text>
                            <Text className="text-gray-500 mt-1">Welcome back! Sign in to continue.</Text>
                        </View>

                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Phone</Text>
                            <TextInput
                                className="border border-gray-300 p-4 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="numeric"
                            />
                        </View>

                        <View className="w-full mb-6">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Password</Text>
                            <TextInput
                                className="border border-gray-300 p-4 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <Text className='text-red-600 text-center font-monasans-light mb-5 text-xs'>{formFeedbackMsg}</Text>
                        

                        <TouchableOpacity
                            className=" py-4 rounded-full w-full items-center shadow-md"
                            onPress={handleLogin}
                            style={{ backgroundColor: AppDetails.color.iconColors }}
                        >
                            <Text className="text-white text-lg font-monasans-bold">Login</Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-center mt-6">
                            <Text className="text-gray-500">New member? </Text>
                            <Link href="/createaccountscreen" asChild>
                                <TouchableOpacity>
                                    <Text style={{color:AppDetails.color.iconColors}} className="font-monasans-light">Create Account</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;