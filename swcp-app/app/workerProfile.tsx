import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function WorkerProfile() {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");

  const saveProfile = async () => {
    if (!name || !skill || !experience || !location) {
      Alert.alert("Please fill all details");
      return;
    }

    const profileData = {
      name,
      skill,
      experience,
      location,
    };

    await AsyncStorage.setItem("workerProfile", JSON.stringify(profileData));
    await AsyncStorage.setItem("profileCompleted", "true");

    router.replace("/worker-homepage"); // go to home
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Skill (Electrician, Plumber...)"
        style={styles.input}
        value={skill}
        onChangeText={setSkill}
      />

      <TextInput
        placeholder="Experience (in years)"
        style={styles.input}
        value={experience}
        onChangeText={setExperience}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Location"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
        <Text style={styles.saveText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: "#1DB954",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});