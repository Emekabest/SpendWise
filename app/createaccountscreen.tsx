import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CreateAccountController from './controller/createaccountcontroller';
import Loader from "./loader";
import AppDetails from './service/AppService';



const CreateAccountScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const router = useRouter();
    const [isPinVisible, setIsPinVisible] = useState(false);
    

    const [isLoading, setIsLoading] = useState(false);
    const [formFeedbackMsg, setFormFeedbackMsg] = useState('');





    const handleCreateAccount = async()=> {
        setIsLoading(true);
        setFormFeedbackMsg('');
    
          const message =  await CreateAccountController(firstName, lastName, email, phone, pin, confirmPin)
          
          if (message?.status === 400 || message.status === 403){
                setFormFeedbackMsg(message.message)

          }
          else if (message.status === 200){

            await AsyncStorage.setItem("is-launched", "true")
            await AsyncStorage.setItem("phone", phone.trim())

            router.push("/loginscreen")
          }
          


        setIsLoading(false);
    };


    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <Stack.Screen options={{ headerShown: false }} />
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">

                    <View className="p-5">
                        <TouchableOpacity onPress={() => router.back()} className="absolute top-4 left-4 z-10">
                            <Ionicons name="arrow-back" size={28} color="black" />
                        </TouchableOpacity>

                        <View className="items-center mb-2">
                            <Text className="text-3xl font-bold text-gray-800">Create Account</Text>
                            <Text className="text-gray-500 mt-1">Join us to manage your finances wisely.</Text>
                        </View>


                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">First Name</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChangeText={setFirstName}
                                autoCapitalize="words"
                            />
                        </View>

                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Last Name</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChangeText={setLastName}
                                autoCapitalize="words"
                            />
                        </View>


                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Email</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Pin (4 digits)</Text>
                            <View className="relative justify-center">
                                <TextInput
                                    className="border border-gray-300 p-3 rounded-lg w-full bg-gray-50"
                                    placeholder="Enter your pin"
                                    value={pin}
                                    onChangeText={setPin}
                                    keyboardType="numeric"
                                    secureTextEntry={!isPinVisible}
                                />
                                <TouchableOpacity onPress={() => setIsPinVisible(!isPinVisible)} className="absolute right-4">
                                    <Ionicons name={isPinVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Confirm Pin</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg w-full bg-gray-50"
                                placeholder="Confirm your pin"
                                value={confirmPin}
                                onChangeText={setConfirmPin}
                                keyboardType="numeric"
                                secureTextEntry
                            />
                        </View>

                        <Text className='text-red-600 text-center font-monasans-light mb-5 text-xs'>{formFeedbackMsg}</Text>


                        <TouchableOpacity
                            activeOpacity={1}
                            className=" py-4 rounded-full w-full items-center shadow-md"
                            onPress={handleCreateAccount}
                            style={{backgroundColor:AppDetails.color.iconColors}}
                        >
                            <Text className="text-white text-lg font-monasans-bold">Create Account</Text>
                        </TouchableOpacity>



                        <View className="flex-row justify-center mt-6">
                            <Text className="text-gray-500">Already a member? </Text>
                            <Link href="/loginscreen" asChild>
                                <TouchableOpacity>
                                    <Text style={{color:AppDetails.color.iconColors}} className="font-monasans-light">Login</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {isLoading && <Loader />}
        </SafeAreaView>
    );
};

export default CreateAccountScreen;
