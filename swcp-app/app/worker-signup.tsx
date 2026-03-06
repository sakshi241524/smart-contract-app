import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WorkerSignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const workerData = {
        name,
        email,
        password
      };

      // Save worker data locally
      await AsyncStorage.setItem("workerAccount", JSON.stringify(workerData));

      Alert.alert("Success", "Account created successfully");

      // Go to homepage
      router.replace("/worker-homepage");

    } catch (error) {
      console.log(error);
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
            color:'#540b0e'
          }}
        >
          Worker Signup
        </Text>

        {/* Full Name */}
        <Text style={{ marginTop: 40, fontSize: 14, color: '#555' }}>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: '#F4F4F4',
            padding: 12,
            borderRadius: 10,
            marginTop: 6,
            fontSize: 16,
          }}
        />

        {/* Email */}
        <Text style={{ marginTop: 20, fontSize: 14, color: '#555' }}>Email Address</Text>
        <TextInput
          placeholder="Enter Your Mail"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: '#F4F4F4',
            padding: 12,
            borderRadius: 10,
            marginTop: 6,
            fontSize: 16,
          }}
        />

        {/* Password */}
        <Text style={{ marginTop: 20, fontSize: 14, color: '#555' }}>Password</Text>
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

        {/* Signup Button */}
        <TouchableOpacity
          onPress={handleSignup}
          style={{
            backgroundColor: '#83c5be',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Sign Up</Text>
        </TouchableOpacity>

        {/* Login Redirect */}
        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center' }}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/worker-signin')}>
            <Text style={{ color: '#1877F2' }}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}