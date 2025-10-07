import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppDetails from './service/AppService';


interface FeedBackPanelProps {
    visible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const FeedBackPanel: React.FC<FeedBackPanelProps> = ({ visible, message, onConfirm, onCancel }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText} className='font-monasans-regular'>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonNo]}
                            onPress={onCancel}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.textStyleNo}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: AppDetails.color.iconColors }]}
                            onPress={onConfirm}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.textStyleYes}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '85%',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'monasans-regular',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 2,
        minWidth: 100,
        alignItems: 'center',
    },
    buttonNo: {
        backgroundColor: '#f3f4f6', // gray-100
        borderWidth: 1,
        borderColor: '#d1d5db', // gray-300
    },
    textStyleYes: {
        color: 'white',
        fontFamily: 'monasans-bold',
        textAlign: 'center',
        fontSize: 16,
    },
    textStyleNo: {
        color: '#374151', // gray-700
        fontFamily: 'monasans-bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default FeedBackPanel;