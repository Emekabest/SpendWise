import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppDetails from './service/AppService';

const DailyBudgetScreen = () => {
  const router = useRouter();
  
  const getSevenDaysFromNow = () => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 7));
  };
  const [date, setDate] = useState(getSevenDaysFromNow());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    
  };



  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <SafeAreaView style={{ backgroundColor: AppDetails.color.iconColors }} className="flex-1">
      <View style={{ backgroundColor: AppDetails.color.iconColors }} className="flex-row items-center px-4 py-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="flex-1 text-2xl font-monasans-bold text-center text-white">Set Daily Budget</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View className="flex-1 bg-white p-8">
        <TextInput
          placeholder="Limit Amount"
          keyboardType="numeric"
          className="border border-gray-300 p-4 rounded-lg mb-4"
        />
        
        <TouchableOpacity onPress={showDatepicker} className="border border-gray-300 p-4 rounded-lg mb-8">
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        
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
        >
          <Text className="text-white font-monasans-bold text-lg">Set Budget</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DailyBudgetScreen;