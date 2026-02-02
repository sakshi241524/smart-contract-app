import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

// Firebase imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../configs/FirebaseConfig';   // <-- Make sure this path is correct

export default function ContractorSignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const OnCreateAccount = () => {

    if (!email || !password) {
      console.log("Email and Password required");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User Created:", user);

        // Move to next page
        router.push('/contractor-homepage');  
      })
      .catch((error) => {
        console.log("Signup Error:", error.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>

        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 40,
            color:'#540b0e'
          }}
        >
          Contractor Signup
        </Text>

        {/* Full Name */}
        <Text style={{ marginTop: 40, fontSize: 14, color: '#555' }}>Full Name</Text>
        <TextInput
          placeholder="Full Name"
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
          placeholder="Enter email"
          onChangeText={(value) => setEmail(value)}
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
          onChangeText={(value) => setPassword(value)}
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
          onPress={OnCreateAccount}
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
          <TouchableOpacity onPress={() => router.push('/contractor-signin')}>
            <Text style={{ color: '#1877F2' }}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}
