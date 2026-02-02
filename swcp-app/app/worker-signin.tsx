import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function WorkerSignIn() {
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
          Worker Signin
        </Text>

        {/* Email */}
        <Text style={{ marginTop: 40, fontSize: 14, color: '#555' }}>Email Address</Text>
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

        {/* Forgot Password */}
        <TouchableOpacity style={{ marginTop: 10 }}>
          <Text style={{ color: '#1877F2', textAlign: 'right' }}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
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

        {/* Google Login Block */}
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
          <AntDesign name="google" size={24} color="" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Login with Google</Text>
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
