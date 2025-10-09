import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import BudgetController from "./controller/budgetcontroller";
import FeedBackPanel from './feedbackpanel';
import Loader from './loader';
import AppDetails from './service/AppService';


const WeeklyBudgetScreen = () => {
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
  

  const onDateChange = (day: DateData) => {
    const selectedDate = new Date(day.timestamp);
    // The calendar component already prevents selection of disabled dates.
    // We just need to update the state.
    setAlterDate(selectedDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const futureDate = new Date(selectedDate);
    futureDate.setHours(0, 0, 0, 0);

    const diffTime = futureDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDayDifference(diffDays);

    setShowDatePicker(false); // Close the calendar modal
  };

  const getMarkedDates = () => {
    const marked: { [key: string]: any } = {};
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); // Mark for the next year

    // First, disable all dates in the range
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0];
        marked[dateString] = { disabled: true, disableTouchEvent: true };
    }

    // Then, enable only the dates that fall on 7-day intervals
    const firstSelectableDate = getSevenDaysFromNow();
    for (let d = new Date(firstSelectableDate); d <= endDate; d.setDate(d.getDate() + 7)) {
        const dateString = d.toISOString().split('T')[0];
        marked[dateString] = { disabled: false, disableTouchEvent: false };
    }


    // Mark the currently selected date
    const selectedDateString = alterDate.toISOString().split('T')[0];
    marked[selectedDateString] = { ...marked[selectedDateString], selected: true, selectedColor: AppDetails.color.iconColors };

    return marked;
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

    
    const response = await BudgetController(userEmail, "weekly", numericLimitAmount, alterDate)
    
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
    return `Are you sure you want to set a weekly budget of ₦${numericAmount.toLocaleString()} until ${alterDate.toLocaleDateString()}? This cannot be changed for ${dayDifference} days.`;
  }, [limitAmount, alterDate, dayDifference]);



  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="default" />

      
      <View className="flex-row items-center px-4 py-8 bg-gray-50">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="flex-1 text-2xl font-monasans-bold text-center color-[#333]">Set Weekly Budget</Text>
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
        

        <Modal
            transparent={true}
            animationType="fade"
            visible={showDatePicker}
            onRequestClose={() => setShowDatePicker(false)}
        >
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setShowDatePicker(false)}>
                <View style={styles.modalContent}>
                    <Calendar
                        onDayPress={onDateChange}
                        minDate={new Date().toISOString().split('T')[0]}
                        markedDates={getMarkedDates()}
                        markingType={'custom'}
                        theme={{
                            arrowColor: AppDetails.color.iconColors,
                            todayTextColor: AppDetails.color.iconColors,
                            'stylesheet.calendar.header': {
                                week: {
                                    marginTop: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }
                            }
                        }}
                    />
                </View>
            </TouchableOpacity>
        </Modal>


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

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default WeeklyBudgetScreen;