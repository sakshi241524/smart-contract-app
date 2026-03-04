import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../configs/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkerSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      // 🔹 Step 1: Login with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🔹 Step 2: Get user document from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        Alert.alert("Error", "User data not found in database.");
        return;
      }

      const userData = userSnap.data();

      // 🔹 Step 3: Check if role is worker
      if (userData.role !== "worker") {
        Alert.alert("Access Denied", "You are not registered as a worker.");
        return;
      }

      // 🔹 Step 4: Save login state locally
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("userRole", userData.role);
      await AsyncStorage.setItem("uid", user.uid);

      // 🔹 Step 5: Navigate to worker homepage
      router.replace("/worker-homepage");

    } catch (error: any) {
  Alert.alert("Login Failed", error.message);
}
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20 }}>

        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
            color: "#540b0e",
          }}
        >
          Worker Signin
        </Text>

        {/* Email */}
        <Text style={{ marginTop: 40, fontSize: 14, color: "#555" }}>
          Email Address
        </Text>
        <TextInput
          placeholder="Enter Your Mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            backgroundColor: "#F4F4F4",
            padding: 12,
            borderRadius: 10,
            marginTop: 6,
            fontSize: 16,
          }}
        />

        {/* Password */}
        <Text style={{ marginTop: 20, fontSize: 14, color: "#555" }}>
          Password
        </Text>
        <TextInput
          placeholder="********"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            backgroundColor: "#F4F4F4",
            padding: 12,
            borderRadius: 10,
            marginTop: 6,
            fontSize: 16,
          }}
        />

        {/* Login Button */}
        <TouchableOpacity
          onPress={onLogin}
          style={{
            backgroundColor: "#83c5be",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Login
          </Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 25,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
          <Text style={{ marginHorizontal: 10, color: "#888" }}>Or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
        </View>

        {/* Google Login */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F4F4F4",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <AntDesign
            name="google"
            size={24}
            color="#DB4437"
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Login with Google
          </Text>
        </TouchableOpacity>

        {/* Signup Redirect */}
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/worker-signup")}>
            <Text style={{ color: "#1877F2" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}