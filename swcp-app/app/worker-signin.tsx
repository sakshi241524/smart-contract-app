import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkerSignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ AUTO LOGIN
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("workerLoggedIn");

        if (isLoggedIn === "true") {
          router.replace("/worker-homepage");
        }
      } catch (error) {
        console.log("Auto login error:", error);
      }
    };

    checkLogin();
  }, []);

  // ✅ LOGIN FUNCTION
  const handleLogin = async () => {
    try {
      const cleanEmail = email.trim();
      const cleanPassword = password.trim();

      if (!cleanEmail || !cleanPassword) {
        Alert.alert("Error", "Please enter email and password");
        return;
      }

      // 👉 Create username from email
      const username = cleanEmail.split("@")[0];

      // ✅ Create user object (VERY IMPORTANT)
      const userData = {
        name: username,
        email: cleanEmail,
        phone: "",
        department: "",
      };

      // ✅ Save to AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem("workerLoggedIn", "true");

      // ✅ Navigate to home
      router.replace("/worker-homepage");

    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>

        {/* Title */}
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 40,
            color: '#540b0e'
          }}
        >
          Worker Signin
        </Text>

        {/* Email */}
        <Text style={{ marginTop: 40, fontSize: 14, color: '#555' }}>
          Email Address
        </Text>
        <TextInput
          placeholder="Enter Your Mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            backgroundColor: '#F4F4F4',
            padding: 12,
            borderRadius: 10,
            marginTop: 6,
            fontSize: 16,
          }}
        />

        {/* Password */}
        <Text style={{ marginTop: 20, fontSize: 14, color: '#555' }}>
          Password
        </Text>
        <TextInput
          placeholder="********"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            backgroundColor: '#F4F4F4',
            padding: 12,
            borderRadius: 10,
            marginTop: 6,
            fontSize: 16,
          }}
        />

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: '#83c5be',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 25,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
          <Text style={{ marginHorizontal: 10, color: '#888' }}>Or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
        </View>

        {/* Google Login */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F4F4F4',
            padding: 15,
            borderRadius: 10,
          }}
        >
          <AntDesign name="google" size={24} color="#DB4437" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, fontWeight: '600' }}>
            Login with Google
          </Text>
        </TouchableOpacity>

        {/* Signup Redirect */}
        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center' }}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/worker-signup')}>
            <Text style={{ color: '#1877F2' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}