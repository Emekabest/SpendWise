import { useFonts } from "expo-font";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    ViewToken,
} from "react-native";
import ActivateFonts from "./service/ActivateFonts";
import AppDetails from "./service/AppService";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image:
      "https://img.freepik.com/free-vector/budget-management-app-interface_23-2148613473.jpg",
    title: "Gain total control of your money",
    subtitle: "Become your own money manager and make every cent count",
  },
  {
    id: "2",
    image:
      "https://img.freepik.com/free-vector/financial-planning-abstract-concept-illustration_335657-3893.jpg",
    title: "Know where your money goes",
    subtitle:
      "Track your transaction easily, with categories and financial report",
  },
  {
    id: "3",
    image:
      "https://img.freepik.com/free-vector/financial-advisor-consulting-client-about-investment-savings-plan-cartoon-illustration_335657-3783.jpg",
    title: "Planning ahead",
    subtitle: "Setup your budget for each category so you in control",
  },
];


const Slide = ({ item }: { item: (typeof slides)[0] }) => {
  return (
    <View className="h-full items-center justify-center " style={{ width }}>
      <Image
        source={{ uri: item.image }}
        contentFit="contain"
        transition={300}
        style={{ width: "100%", height: "50%" }}
      />
      <Text className="font-monasans-bold text-xl mt-5 text-center text-[#333] px-10">
        {item.title}
      </Text>
      <Text className="font-monasans-regular text-sm mt-2 text-center text-gray-500 px-10">
        {item.subtitle}
      </Text>
    </View>
  );
};

const Pagination = ({ currentIndex }: { currentIndex: number }) => {
  return (
    <View className="flex-row justify-center items-center">
      {slides.map((_, index) => (
        <View
          key={index}
          className={`h-2 rounded-full mx-1 ${
            currentIndex === index ? "bg-blue-500 w-6" : "bg-gray-300 w-2"
          }`}
        />
      ))}
    </View>
  );
};

const getStartedScreen = ()=>{
    
    const [fontsLoaded] = useFonts(ActivateFonts);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef<FlatList>(null);

    const onViewableItemsChanged = useRef(
      ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        if (viewableItems.length > 0) {
          setCurrentIndex(viewableItems[0].index ?? 0);
        }
      }
    ).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return(
        <View className="h-[100%] bg-white">
            <View className="h-[25%] items-center justify-center">
                <Text className="font-monasans-bold text-3xl color-[#333]">SpendWise</Text>
            </View>


            <View className="h-[50%]">

            <View className="h-[100%] justify-center">
              <FlatList
                ref={ref}
                data={slides}
                renderItem={({ item }) => <Slide item={item} />}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewConfig}
                keyExtractor={(item) => item.id}
              />
              <View className="absolute bottom-5 w-full">
                <Pagination currentIndex={currentIndex} />
              </View>
            </View>


            <View className="h-[25%] px-4 pt-3 flex-col justify-center">
                <TouchableOpacity className="h-16 w-[100%] mb-4 rounded-full items-center justify-center" style={{backgroundColor:AppDetails.color.iconColors}}>
                        <Text className="font-monasans-regular text-xl color-white">Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity className="h-16 w-[100%] rounded-full items-center justify-center" style={{backgroundColor:AppDetails.color.iconColors}}>
                        <Text className="font-monasans-regular text-xl color-white">Login</Text>
                </TouchableOpacity>
            </View>
                        </View>
        </View>
    )
}

export default getStartedScreen