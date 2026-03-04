import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "../configs/FirebaseConfig";

export default function WorkerSignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // 🔹 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🔹 2. Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: "worker",
        createdAt: serverTimestamp(),
      });

      // 🔹 3. Save login session locally
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("userRole", "worker");
      await AsyncStorage.setItem("uid", user.uid);

      Alert.alert("Success", "Worker account created successfully!");

      // 🔹 4. Navigate
      router.replace("/worker-homepage");
    } catch (error: any) {
      console.log("Signup Error:", error);

      let message = "Something went wrong. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password is too weak.";
      }

      Alert.alert("Signup Failed", message);
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
          Worker Signup
        </Text>

        {/* Full Name */}
        <Text style={{ marginTop: 40, fontSize: 14, color: "#555" }}>
          Full Name
        </Text>
        <TextInput
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: "#F4F4F4",
            padding: 12,
            borderRadius: 10,
            marginTop: 6,
            fontSize: 16,
          }}
        />

        {/* Email */}
        <Text style={{ marginTop: 20, fontSize: 14, color: "#555" }}>
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
          placeholder="Minimum 6 characters"
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

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={onSignUp}
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
            {loading ? "Creating Account..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        {/* Login Redirect */}
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/worker-signin")}>
            <Text style={{ color: "#1877F2" }}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}