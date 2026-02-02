import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function WorkerSignUp() {
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
