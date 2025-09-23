import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SignupController from './controller/SignupController';
import Loader from "./loader";
import AppDetails from './service/AppService';



const CreateAccountScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    

    const [isLoading, setIsLoading] = useState(false);
    const [formFeedbackMsg, setFormFeedbackMsg] = useState('');





    const handleCreateAccount = async()=> {
        setIsLoading(true);
        setFormFeedbackMsg('');
    
          const message =  await SignupController(firstName, lastName, email, phone, password, confirmPassword)
          
          if (message?.status === 400 || message.status === 403){
                setFormFeedbackMsg(message.message)
          }
          else if (message.status === 200){

            
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
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Phone</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="numeric"
                            />
                        </View>

                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Password</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>


                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Confirm Password</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg w-full bg-gray-50"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                        </View>

                        <Text className='text-red-600 text-center font-monasans-light mb-5 text-xs'>{formFeedbackMsg}</Text>


                        <TouchableOpacity
                            className=" py-4 rounded-full w-full items-center shadow-md"
                            onPress={handleCreateAccount}
                            style={{backgroundColor:AppDetails.color.iconColors}}
                        >
                            <Text className="text-white text-lg font-monasans-bold">Create Account</Text>
                        </TouchableOpacity>



                        <View className="flex-row justify-center mt-6">
                            <Text className="text-gray-500">Already a member? </Text>
                            <Link href="/login" asChild>
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
