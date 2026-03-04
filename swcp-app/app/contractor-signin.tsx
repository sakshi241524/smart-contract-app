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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "../configs/FirebaseConfig";

export default function ContractorSignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      // 🔹 1. Login with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      // 🔹 2. Get user data from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        Alert.alert("Error", "User data not found.");
        return;
      }

      const userData = userSnap.data();

      // 🔹 3. Check role
      if (userData.role !== "contractor") {
        Alert.alert("Access Denied", "You are not registered as a contractor.");
        return;
      }

      // 🔹 4. Save session locally
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("userRole", userData.role);
      await AsyncStorage.setItem("uid", user.uid);

      // 🔹 5. Navigate
      router.replace("/contractor-homepage");

    } catch (error: any) {
      console.log("Login Error:", error);

      let message = "Login failed. Please try again.";

      if (error.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email format.";
      }

      Alert.alert("Login Failed", message);
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
            marginTop: 40,
            color: "#540b0e",
          }}
        >
          Contractor Signin
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
          disabled={loading}
          style={{
            backgroundColor: loading ? "#ccc" : "#83c5be",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {loading ? "Logging In..." : "Login"}
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

        {/* Google Login (placeholder) */}
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
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/contractor-signup")}>
            <Text style={{ color: "#1877F2" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}