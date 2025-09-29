import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
import loginController from './controller/loginController';
import Loader from './loader';
import AppDetails from './service/AppService';





const LoginScreen2 = () => {
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const [isLoading, setIsLoading] = useState(false);    
    const [formFeedbackMsg, setFormFeedbackMsg] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [userEmail, setUserEmail] = useState("");




    useEffect(()=>{
        const getUserEmail = async()=>{
            const userEmail = await AsyncStorage.getItem("user-email")

            
            setUserEmail(userEmail ? userEmail : "")


        }

        getUserEmail()
    },[])



    const handleLogin = async() => {
        if (password == ""){
            setFormFeedbackMsg('Password is required')
            return
        }

        setIsLoading(true);
        
        const message = await loginController(userEmail, password)


        setFormFeedbackMsg(message?.status === 403 ? message.message : '')
        if (message?.status === 403 || message.status === 400){
                setFormFeedbackMsg(message.message)

          }
          else if (message.status === 200){

            await AsyncStorage.setItem("is-launched", "true")
            await AsyncStorage.setItem("email", userEmail.trim())

            
            router.dismissAll()   
            router.replace("/homescreen")
          }
          else{
            setFormFeedbackMsg(message.message)
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
                    <View className="p-6">
                        <TouchableOpacity onPress={() => router.back()} className="absolute top-4 left-4 z-10">
                            <Ionicons name="arrow-back" size={28} color="black" />
                        </TouchableOpacity>

                        <View className="items-center mb-8">
                            <Text className="text-3xl font-bold text-gray-800">Welcome</Text>
                            <View>
                                 <Text className="text-gray-500 mt-1">{userEmail}</Text>
                            </View>
                        </View>



                        <View className="w-full mb-6">
                            <View className="relative justify-center">
                                <TextInput
                                    className="border border-gray-300 p-4 rounded-lg w-full bg-gray-50"
                                    placeholder="Enter your pin"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!isPasswordVisible}
                                    keyboardType="numeric"
                                />

                                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute right-4">
                                    <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <Text className='text-red-600 text-center font-monasans-light mb-5 text-xs'>{formFeedbackMsg}</Text>
                        

                        <TouchableOpacity
                            activeOpacity={1}
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
                            <View className="flex-row justify-center mt-3">
                            <Text className="text-gray-500"></Text>
                            <Link href="/loginscreen" asChild>
                                <TouchableOpacity>
                                    <Text style={{color:AppDetails.color.iconColors}} className="font-monasans-light">Login to another account</Text>
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

export default LoginScreen2;