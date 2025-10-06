import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppDetails from './service/AppService';

const AddFundScreen = () => {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleProceedToPayment = async() => {
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');

    // In a real app, you would get the user's email from state management or async storage.
    router.push({
      pathname: '/paymentscreen',
      params: { amount, email: await AsyncStorage.getItem('user-email')},
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <View>
          <Text  style={styles.headerText}>Add Funds</Text>
        </View>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Enter the amount you want to add</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.currencySymbol}>₦</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={text => {
              setAmount(text);
              if (error) setError('');
            }}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={styles.button}
          onPress={handleProceedToPayment}
          activeOpacity={0.8}>
          <Text className='' style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 12,
    backgroundColor: '#F7F8FA',
  },
  backButton: {
    marginRight: 16,
  },
  subHeader: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#F7F8FA',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666666',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 24,
    paddingVertical: 16,
    color: '#333333',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    marginLeft: 4,
  },
  button: {
    backgroundColor: AppDetails.color.iconColors,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddFundScreen;
