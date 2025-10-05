import { Ionicons } from '@expo/vector-icons';
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

const CardPaymentScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const amount = params.amount || '100'; // Default amount
  const email = params.email || 'customer@email.com'; // Default email
const reference = `REF-${Math.floor(Math.random() * 1000000000)}-${Date.now()}`;

  // IMPORTANT: Replace with your actual Paystack public key
  const PAYSTACK_PUBLIC_KEY = 'pk_live_099fb8dcd678b1213971335d42dc25be20e0ce1b';

  const handleSuccess = (transactionRef: string) => {
    console.log('Paystack success:', transactionRef);
    Alert.alert(
      'Payment Successful',
      `Transaction reference: ${transactionRef}`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const handleCancel = () => {
    console.log('Paystack payment cancelled by user.');
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

export default CardPaymentScreen;