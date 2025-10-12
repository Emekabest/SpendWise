import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import CreateAccountController from "./controller/createaccountcontroller";
import NotificationController from './controller/notificationcontroller';
import VerifyOtpController from './controller/verifyOtpController';
import Loader from './loader';
import AppDetails from './service/AppService';



const OtpScreen = ()=>{


    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef<Array<TextInput | null>>([]);
    const [countdown, setCountdown] = useState(180);
    const [isTimerActive, setIsTimerActive] = useState(true);


    const { firstName, lastName, email, pin} = useLocalSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [formFeedbackMsg, setFormFeedbackMsg] = useState('');
    
    
    

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isTimerActive && countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

        } else if (countdown === 0) {
            setIsTimerActive(false);

        }



        return () => clearInterval(interval);
    }, [isTimerActive, countdown]);

    const handleResend = () => {
        
        console.log('Resending OTP...');
        setCountdown(180);
        setIsTimerActive(true);
    };



    const handleInputChange = (text: string, index: number) => {
        if (/^[0-9]$/.test(text) || text === '') {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);

            // Move to next input
            if (text !== '' && index < 3) {
                inputs.current[index + 1]?.focus();
            }

            // If all fields are filled, you can auto-submit or just dismiss the keyboard
            if (newOtp.every(digit => digit !== '')) {
                Keyboard.dismiss();
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {


        // Move to previous input on backspace if current is empty
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };






    const handleVerify = async () => {
        setIsLoading(true);
        setFormFeedbackMsg('');



        const otpCode = otp.join('');
        if (otpCode.length === 4) {
            const response = await VerifyOtpController(email, otpCode)

            if (response.status === 200) {

                const createAccountResponse =  await CreateAccountController(firstName, lastName, email, pin)
                if (200 === createAccountResponse.status){

                    setFormFeedbackMsg("Successful");



                    await AsyncStorage.setItem("user-email", email.toString().trim())

                      const notificationResponse = await NotificationController(
                            email.toString().trim(),
                            "welcome",
                            "Welcome to SpendWise!",
                            "Get started by creating a budget",
                            null,
                            false
                        );


                    
                    router.replace('/loginscreen2');
                }
                else{

                    setFormFeedbackMsg("An error occured while creating your account")
                }
            }
             else{
                setFormFeedbackMsg(response.message)
             }


        } else {

            setFormFeedbackMsg('Please enter a valid 4-digit OTP.');
        }

        setIsLoading(false)
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex-1 p-6">
                <TouchableOpacity onPress={() => router.back()} className="absolute top-4 left-4 z-10">
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>

                <View className="flex-1 justify-center items-center">
                    <Text className="text-3xl font-monasans-bold text-gray-800 mb-2">Enter OTP</Text>
                    <Text className="text-gray-500 font-monasans-regular text-center mb-8">A 4-digit code has been sent to your email address.</Text>

                    <View className="flex-row justify-between w-full mb-8">
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={ref => inputs.current[index] = ref}
                                className="border-b-2 border-gray-300 w-12 h-14 text-center text-2xl font-bold"
                                style={{ borderColor: digit ? AppDetails.color.iconColors : '#D1D5DB' }}
                                keyboardType="number-pad"
                                maxLength={1}
                                value={digit}
                                onChangeText={(text) => handleInputChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                autoFocus={index === 0}
                            />
                        ))}
                    </View>

                    <Text style={{color:formFeedbackMsg == "Successful" ? 'green' : 'red'}} className='text-center font-monasans-light mb-5 text-xs'>{formFeedbackMsg}</Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="py-4 rounded-full w-full items-center shadow-md mb-6"
                        onPress={handleVerify}
                        style={{ backgroundColor: AppDetails.color.iconColors }}
                    >


                    <Text className="text-white text-lg font-monasans-bold">Verify</Text>
                    </TouchableOpacity>

                    <View className="flex-row justify-center">
                        {isTimerActive ? (
                            <Text className="text-gray-500">
                                Resend code in {String(Math.floor(countdown / 60)).padStart(2, '0')}:{String(countdown % 60).padStart(2, '0')}
                            </Text>
                        ) : (
                            <TouchableOpacity onPress={handleResend}>
                                <Text style={{ color: AppDetails.color.iconColors }} className="font-monasans-light">Resend Code</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
        {isLoading && <Loader />}
    </SafeAreaView>
)


}

export default OtpScreen;
