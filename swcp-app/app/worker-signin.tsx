import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      // 🔹 Step 1: Firebase Auth Login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      // 🔹 Step 2: Fetch user role
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        Alert.alert("Error", "User record not found.");
        setLoading(false);
        return;
      }

      const userData = userDocSnap.data();

      // 🔹 Step 3: Check if worker
      if (userData.role !== "worker") {
        Alert.alert("Access Denied", "You are not registered as a worker.");
        setLoading(false);
        return;
      }

      // 🔹 Step 4: Save login state
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("userRole", "worker");
      await AsyncStorage.setItem("uid", user.uid);

      // 🔥 Step 5: Check if profile exists
      const profileRef = doc(db, "workerProfiles", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        router.replace("/worker-homepage");
      } else {
        router.replace("/workerProfile");
      }

    } catch (error: any) {
  Alert.alert("Login Failed", error.message);
} finally {
      setLoading(false);
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
            marginTop: 60,
            color: "#540b0e",
          }}
        >
          Worker Sign In
        </Text>

        {/* Email */}
        <Text style={{ marginTop: 40, fontSize: 14, color: "#555" }}>
          Email Address
        </Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            backgroundColor: "#F4F4F4",
            padding: 14,
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
            padding: 14,
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
            marginTop: 30,
          }}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Login
            </Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
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

        {/* Google Button */}
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
            <Text style={{ color: "#1877F2", fontWeight: "600" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}