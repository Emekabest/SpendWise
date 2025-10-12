import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import AddFundsController from "./controller/addfundscontroller";
import NotificationController from './controller/notificationcontroller';
import formatAmount from './service/formatamount';



const PaymentScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  
  const amount = params.amount || '0'; // Default amount
  const email = params.email || 'customer@email.com'; // Default email
const reference = `REF-${Math.floor(Math.random() * 1000000000)}-${Date.now()}`;

// IMPORTANT: Replace with your actual Paystack public key
  
//pk_test_49f11d97818e250a00077f276cd3a13dbeca0d1c
//  pk_live_099fb8dcd678b1213971335d42dc25be20e0ce1b
  const PAYSTACK_PUBLIC_KEY = 'pk_test_49f11d97818e250a00077f276cd3a13dbeca0d1c';

  


  const handleSuccess = async(transactionRef: string) => {

    const numericAmount = parseFloat(amount);

    const response = await AddFundsController(email, amount);

    if (response.status === 200){
      const userEmail = await AsyncStorage.getItem("user-email");



        const notificationResponse = await NotificationController(
              userEmail, 
              "payment-successful",
              "Payment Successful", 
              "You have successfully added " + formatAmount(numericAmount) + " to your account",
              null,
              false
          );

        Alert.alert(
        'Payment Successful',
        `Your account has been credited with ${formatAmount(numericAmount)}.`,
        [{ text: 'OK', onPress: () => router.replace("/homescreen") }]
      );

    }else{
      Alert.alert(
      'Payment Failed',
      `Something went wrong try again!`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
    }

  
  };

  const handleCancel = () => {

    router.back();

  };

  const handleWebViewMessage = (event: any) => {
    try {
      const { data } = event.nativeEvent;
      const parsedData = JSON.parse(data);

      switch (parsedData.event) {
        case 'success':
          handleSuccess(parsedData.transactionRef);
          break;
        case 'cancel':
          handleCancel();
          break;
      }
    } catch (error) {
    
      console.error('Error parsing WebView message:', error);

    }
  };

  // This HTML and JavaScript code is loaded into the WebView
const paystackHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://js.paystack.co/v1/inline.js"></script>
    </head>
    <body style="background-color:#fff; height:100vh; overflow:hidden;">
      <p style="text-align:center;">Initializing Payment...</p>
      <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
          // Wait a bit to ensure Paystack script is loaded
          setTimeout(function() {
            if (typeof PaystackPop === 'undefined') {
              document.body.innerHTML = '<p style="color:red; text-align:center;">Failed to load Paystack script.</p>';
              return;
            }

            var handler = PaystackPop.setup({
              key: '${PAYSTACK_PUBLIC_KEY}',
              email: '${email}',
              amount: ${Number(amount) * 100}, // amount in kobo
              currency: 'NGN',
              ref: '${reference}', // your unique reference
              callback: function(response) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  event: 'success',
                  reference: response.reference
                }));
              },
              onClose: function() {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  event: 'cancel'
                }));
              }
            });

            handler.openIframe();
          }, 1000); // wait 1s to ensure script is loaded
        });
      </script>
    </body>
  </html>
`;


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Card Payment</Text>
      </View>
      <WebView
        style={{ flex: 1 }}
        source={{ html: paystackHtml }}
        originWhitelist={['*']}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator size="large" color="#007AFF" style={StyleSheet.absoluteFill} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F7F8FA',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
});

export default PaymentScreen;