import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppDetails from './service/AppService';

const DailyBudgetScreen = () => {
  const router = useRouter();
  
  const getSevenDaysFromNow = () => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 7));
  };
  const [date, setDate] = useState(getSevenDaysFromNow());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dayDifference, setDayDifference] = useState(7);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    
    if (currentDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const futureDate = new Date(currentDate);
      futureDate.setHours(0, 0, 0, 0);
      
      const diffTime = futureDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDayDifference(diffDays);
    }
  };



  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSetBudget = () => {
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid limit amount.');
      return;
    }
    setError('');
    // TODO: Implement budget saving logic here
    Alert.alert('Success', `Budget of ${numericAmount} set for ${date.toLocaleDateString()}.`);
    console.log('Budget to save:', { amount: numericAmount, date });
  };


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center px-4 py-8 bg-gray-50">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="flex-1 text-2xl font-monasans-bold text-center color-[#333]">Set Daily Budget</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View className="flex-1 bg-white p-8">
        <Text className="text-gray-600 mb-2 ml-1 font-medium">Limit Amount</Text>
        <TextInput
          placeholder="Limit Amount"
          keyboardType="numeric"
          className="border border-gray-300 p-4 rounded-lg"
          value={amount}
          onChangeText={(text) => {
            setAmount(text);
            if (error) setError('');
          }}
        />
        {error ? <Text className="text-red-500 font-monasans-light mt-2 ml-1">{error}</Text> : null}
        
        <Text className="text-gray-600 mb-2 ml-1 font-medium mt-4">Alter Date</Text>
        <TouchableOpacity onPress={showDatepicker} className="border border-gray-300 p-4 rounded-lg mb-4">
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>

        <Text className="text-[red] ml-1 text-sm font-monasans-light mb-4">
          Note: This budget can't be modified until after <Text className="font-monasans-bold color-[#333]">{dayDifference}</Text> days from today.
        </Text>{/**Notice */}
        
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onDateChange}
            minimumDate={getSevenDaysFromNow()}
          />
        )}

        <TouchableOpacity
          style={{ backgroundColor: AppDetails.color.iconColors }}
          className="p-4 rounded-lg items-center"
          onPress={handleSetBudget}
        >
          <Text className="text-white font-monasans-bold text-lg">Set Budget</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DailyBudgetScreen;