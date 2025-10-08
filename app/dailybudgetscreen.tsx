import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Platform, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BudgetController from "./controller/budgetcontroller";
import FeedBackPanel from './feedbackpanel';
import Loader from './loader';
import AppDetails from './service/AppService';


const DailyBudgetScreen = () => {
  const router = useRouter();
  
  const getSevenDaysFromNow = () => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 7));
  };

  const [alterDate, setAlterDate] = useState(getSevenDaysFromNow());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dayDifference, setDayDifference] = useState(7);
  const [limitAmount, setLimitAmount] = useState('');
  const [error, setError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);    
  

  const onDateChange = (event, selectedDate) => {
    console.log(typeof(new Date()))
    const currentDate = selectedDate || alterDate;
    setShowDatePicker(Platform.OS === 'ios');
    setAlterDate(currentDate);
    
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



  const handleSetBudgetPress = () => {
    const numericAmount = parseFloat(limitAmount);
    if (!limitAmount || isNaN(numericAmount) || numericAmount < 1000) { // check for minimum amount
      setError('Please enter a valid amount. Minimum is ₦1,000.'); // update error message
      return;
    }
    
    setError('');
    setModalVisible(true);
  };





  const confirmSetBudget = async() => {
    setModalVisible(false);

    setIsLoading(true);


    const userEmail = await AsyncStorage.getItem("user-email")
  
    const numericLimitAmount = Number(limitAmount);

    
    const response = await BudgetController(userEmail, "daily", numericLimitAmount, alterDate)
    
    console.log(response)

    if (response.status === 200){

        router.replace("/homescreen")

        Alert.alert('Success', `Budget of ₦${numericLimitAmount} set until ${alterDate.toLocaleDateString()}.`);
    }
    else{
          Alert.alert('Failed', "An error ocurred::"+response.message);
    }




    setIsLoading(false);

  };


  const confirmationMessage = useMemo(() => {
    const numericAmount = parseFloat(limitAmount) || 0;
    return `Are you sure you want to set a daily budget of ₦${numericAmount.toLocaleString()} until ${alterDate.toLocaleDateString()}? This cannot be changed for ${dayDifference} days.`;
  }, [limitAmount, alterDate, dayDifference]);



  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="default" />

      
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
          placeholder="Minimum of ₦1,000"
          keyboardType="numeric"
          className="border border-gray-300 p-4 rounded-lg"
          value={limitAmount}
          onChangeText={(text) => {
            setLimitAmount(text);
            if (error) setError('');
          }}
        />
        {error ? <Text className="text-red-500 font-monasans-light mt-2 ml-1">{error}</Text> : null}
        
        <Text className="text-gray-600 mb-2 ml-1 font-medium mt-4">Alter Date</Text>
        <TouchableOpacity onPress={showDatepicker} className="border border-gray-300 p-4 rounded-lg mb-4">
          <Text>{alterDate.toLocaleDateString()}</Text>
        </TouchableOpacity>

        <Text className="text-[red] ml-1 text-sm font-monasans-light mb-4">
          Note: This budget can't be modified until after <Text className="font-monasans-bold color-[#333]">{dayDifference}</Text> days from today.
        </Text>
        

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={alterDate}
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
          onPress={handleSetBudgetPress}
        >
          <Text className="text-white font-monasans-bold text-lg">Set Budget</Text>
        </TouchableOpacity>
      </View>


      <FeedBackPanel
        visible={isModalVisible}
        message={confirmationMessage}
        onConfirm={confirmSetBudget}
        onCancel={() => {
          setModalVisible(false);
        }}
      />

      {isLoading && <Loader />}
    </SafeAreaView>
  );
};

export default DailyBudgetScreen;