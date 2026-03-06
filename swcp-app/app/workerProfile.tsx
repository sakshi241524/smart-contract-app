import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function WorkerProfile() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [certificate, setCertificate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [languages, setLanguages] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  // 📸 Pick Image (Latest Expo SDK Safe Version)
const pickImage = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert("Permission required to access gallery");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    setImage(result.assets[0].uri);
  }
};

  const saveProfile = async () => {
    if (!name || !skill || !experience || !phone || !email) {
      Alert.alert("Please fill all required details");
      return;
    }

    const profileData = {
      image,
      name,
      skill,
      experience,
      certificate,
      phone,
      email,
      address,
      languages,
      country,
      state,
      district,
    };

    await AsyncStorage.setItem("workerProfile", JSON.stringify(profileData));
    await AsyncStorage.setItem("profileCompleted", "true");

    Alert.alert("Profile Saved Successfully!");
    router.replace("/worker-homepage");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={styles.title}>Complete Your Profile</Text>

        {/* Profile Image */}
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <AntDesign name="camera" size={30} color="#555" />
          )}
        </TouchableOpacity>

        <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
        <TextInput placeholder="Skills (Electrician, Plumber...)" style={styles.input} value={skill} onChangeText={setSkill} />
        <TextInput placeholder="Experience (in years)" style={styles.input} value={experience} onChangeText={setExperience} keyboardType="numeric" />
        <TextInput placeholder="Certificate Details" style={styles.input} value={certificate} onChangeText={setCertificate} />
        <TextInput placeholder="Phone Number" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput placeholder="Address" style={styles.input} value={address} onChangeText={setAddress} />
        <TextInput placeholder="Languages Known" style={styles.input} value={languages} onChangeText={setLanguages} />
        <TextInput placeholder="Country" style={styles.input} value={country} onChangeText={setCountry} />
        <TextInput placeholder="State" style={styles.input} value={state} onChangeText={setState} />
        <TextInput placeholder="District" style={styles.input} value={district} onChangeText={setDistrict} />

        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
          <Text style={styles.saveText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ================== BOTTOM NAV ================== */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/worker-homepage")}
        >
          <AntDesign name="home" size={22} color="#666" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="profile" size={22} color="#666" />
          <Text style={styles.navLabel}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="team" size={22} color="#666" />
          <Text style={styles.navLabel}>Workers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="user" size={22} color="#1DB954" />
          <Text style={styles.navLabelActive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },

  imageContainer: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    marginHorizontal: 20,
  },

  saveBtn: {
    backgroundColor: "#1DB954",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  bottomNav: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  navItem: {
    alignItems: "center",
  },

  navLabel: {
    fontSize: 12,
    marginTop: 2,
    color: "#444",
  },

  navLabelActive: {
    fontSize: 12,
    marginTop: 2,
    color: "#1DB954",
    fontWeight: "600",
  },
});