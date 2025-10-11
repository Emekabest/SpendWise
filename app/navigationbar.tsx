import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppDetails from './service/AppService';

const NavigationBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { bottom } = useSafeAreaInsets();

    const navItems = [
        {
            name: 'Home',
            href: '/homescreen',
            icon: 'home-outline',
            activeIcon: 'home',
        },
        {
            name: 'Budget',
            href: '/budgetscreen',
            icon: 'wallet-outline',
            activeIcon: 'wallet',
        },
        {
            name: 'Profile',
            href: '/profilescreen',
            icon: 'person-outline',
            activeIcon: 'person',
        },
    ] as const;

    return (
        <View style={[styles.container, { height: 65 + bottom, paddingBottom: bottom }]}>
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.navItem}
                        onPress={() => router.replace(item.href)}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={isActive ? item.activeIcon : item.icon}
                            size={24}
                            color={isActive ? AppDetails.color.iconColors : '#888'}
                        />
                        <Text style={[styles.label, { color: isActive ? AppDetails.color.iconColors : '#888' }]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB', // gray-200
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    label: {
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'monasans-medium',
    },
});

export default NavigationBar;