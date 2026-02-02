import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

export default function Firstpage() {
  const handleGetStarted = () => {
    router.push("/choose-role"); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <LottieView
source={require("./../assets/images/animations/firstpage.json")} 
autoPlay
loop
style={{
width: "100%",
height: "60%",
}}
/>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          marginTop: -40,
          padding: 25,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: "#540b0e",
            textAlign: "center",
            marginTop: 20,
            lineHeight: 52,
          }}
        >
          SmartConnect
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: "#310d0dff",
            textAlign: "center",
            marginTop: 10,
            paddingHorizontal: 10,
            lineHeight: 20,
          }}
        >
          Smart Worker Contactor Platform.
        </Text>

        <Text
          style={{
            fontSize: 19,
            color: "#310d0dff",
            textAlign: "center",
            marginTop: 25,
            paddingHorizontal: 10,
            lineHeight: 20,
          }}
        >
          Connecting skilled workers with reliable contractors fast, simple, smart.
        </Text>

        <TouchableOpacity
          onPress={handleGetStarted}
          style={{
            marginTop: 30,
            backgroundColor: "#83c5be",
            width: width * 0.8,
            paddingVertical: 15,
            borderRadius: 25,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
