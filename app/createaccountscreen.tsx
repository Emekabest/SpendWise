import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
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

const CreateAccountScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [nin, setNin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleCreateAccount = () => {
        // TODO: Add account creation logic (e.g., validation, API call)
        console.log({ firstName, lastName, email, nin, password, confirmPassword });
        // On success, you might want to navigate the user to the main app
        // router.replace('/(tabs)/home');
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
                            <Text className="text-3xl font-bold text-gray-800">Create Account</Text>
                            <Text className="text-gray-500 mt-1">Join us to manage your finances wisely.</Text>
                        </View>

                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">First Name</Text>
                            <TextInput
                                className="border border-gray-300 p-4 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChangeText={setFirstName}
                                autoCapitalize="words"
                            />
                        </View>

                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Last Name</Text>
                            <TextInput
                                className="border border-gray-300 p-4 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChangeText={setLastName}
                                autoCapitalize="words"
                            />
                        </View>

                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Email</Text>
                            <TextInput
                                className="border border-gray-300 p-4 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">NIN</Text>
                            <TextInput
                                className="border border-gray-300 p-4 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your National Identification Number"
                                value={nin}
                                onChangeText={setNin}
                                keyboardType="numeric"
                            />
                        </View>

                        <View className="w-full mb-4">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Password</Text>
                            <TextInput
                                className="border border-gray-300 p-4 rounded-lg w-full bg-gray-50"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <View className="w-full mb-6">
                            <Text className="text-gray-600 mb-2 ml-1 font-medium">Confirm Password</Text>
                            <TextInput
                                className="border border-gray-300 p-4 rounded-lg w-full bg-gray-50"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            className="bg-blue-600 py-4 rounded-lg w-full items-center shadow-md"
                            onPress={handleCreateAccount}
                        >
                            <Text className="text-white text-lg font-bold">Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CreateAccountScreen;
