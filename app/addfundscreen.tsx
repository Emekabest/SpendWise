import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppDetails from './service/AppService';

interface PaymentOption {
  id: string;
  title: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'card', title: 'Card', icon: 'card-outline' },
  { id: 'bank_transfer', title: 'Bank Transfer', icon: 'swap-horizontal-outline' },
  { id: 'bank', title: 'Bank', icon: 'business-outline' },
];

const AddFundScreen = () => {
  const router = useRouter();

  const handleSelectOption = (option: PaymentOption) => {
    if (option.id === 'card') {
      // In a real app, you would get the amount from user input
      // and the user's email from your state management or async storage.
      router.push({
        pathname: '/cardpaymentscreen',
        params: { amount: '100', email: 'josephemeka2611@email.com' },
      });
    } else {
      console.log('Selected payment option:', option.title);
    }
  };

  const renderItem = ({ item }: { item: PaymentOption }) => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => handleSelectOption(item)}
      activeOpacity={0.7}>
      <Ionicons
        name={item.icon}
        size={24}
        color={AppDetails.color.iconColors}
        style={styles.icon}
      />
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Add Funds</Text>
        </View>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Choose a payment method</Text>
      </View>
      <FlatList
        data={PAYMENT_OPTIONS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  listContainer: {
    paddingTop: 16,
  },
  optionButton: {
    backgroundColor: '#F7F8FA',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  icon: {
    marginRight: 16,
  },
  optionText: {
    fontSize: 18,
    color: '#333333',
  },
});

export default AddFundScreen;
