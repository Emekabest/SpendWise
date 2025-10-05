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

interface PaymentOption {
  id: string;
  title: string;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'card', title: 'Card' },
  { id: 'bank_transfer', title: 'Bank Transfer' },
  { id: 'bank', title: 'Bank' },
];

const AddFundScreen = () => {
  const handleSelectOption = (option: PaymentOption) => {
    // TODO: Implement navigation or action for the selected payment option
    console.log('Selected payment option:', option.title);
  };

  const renderItem = ({ item }: { item: PaymentOption }) => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => handleSelectOption(item)}
      activeOpacity={0.7}>
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Funds</Text>
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
    backgroundColor: '#F7F8FA',
  },
  header: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  listContainer: {
    paddingTop: 16,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 18,
    color: '#333333',
  },
});

export default AddFundScreen;
