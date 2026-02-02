import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChooseRole() {

  const handleContractor = async () => {
    const loggedIn = await AsyncStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      router.replace("/contractor-homepage"); // skip signin
    } else {
      router.push("/contractor-signin"); // go to signin
    }
  };

  const handleWorker = async () => {
    const loggedIn = await AsyncStorage.getItem("isLoggedInWorker");
    if (loggedIn === "true") {
      router.replace("/worker-homepage"); // skip signin
    } else {
      router.push("/worker-signin");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>

      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.roleBox} onPress={handleContractor}>
          <Image
            source={require('./../assets/images/contractor.png')}
            style={styles.roleImage}
          />
          <Text style={styles.roleText}>Contractor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.roleBox} onPress={handleWorker}>
          <Image
            source={require('./../assets/images/worker.png')}
            style={styles.roleImage}
          />
          <Text style={styles.roleText}>Worker</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#edf6f9', paddingHorizontal: 20 },
  title: { fontSize: 36, fontWeight: 'bold', marginBottom: 40,color:'#7f5539' },
  boxContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  roleBox: { width: '45%', backgroundColor: '#F4F4F4', borderRadius: 16, paddingVertical: 25, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  roleImage: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 10 },
  roleText: { fontSize: 16, fontWeight: '600' },
});
