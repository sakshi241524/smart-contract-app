import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProfileType = {
  Username: string;
  Name: string;
  Skills: string;
  experience: string;
  courseName: string;
  certificateDate: string;
  phone: string;
  email: string;
  address: string;
  language: string;
  country: string;
  state: string;
  district: string;
  image: string;
};

export default function WorkerProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<ProfileType>({
    Username: "",
    Name: "",
    Skills: "",
    experience: "",
    courseName: "",
    certificateDate: "",
    phone: "",
    email: "",
    address: "",
    language: "",
    country: "",
    state: "",
    district: "",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  });

  // ✅ LOAD DATA
  useEffect(() => {
    const loadUserData = async () => {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        setProfile(JSON.parse(data));
      }
    };
    loadUserData();
  }, []);

  // ✅ HANDLE CHANGE
  const handleChange = (key: keyof ProfileType, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ IMAGE PICK
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const updated = { ...profile, image: imageUri };
      setProfile(updated);
      await AsyncStorage.setItem("userData", JSON.stringify(updated));
    }
  };

  // ✅ SAVE
  const saveProfile = async () => {
    await AsyncStorage.setItem("userData", JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity disabled={!isEditing} onPress={pickImage}>
          <Image source={{ uri: profile.image }} style={styles.avatar} />
        </TouchableOpacity>

        {!isEditing ? (
          <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
            <AntDesign name="edit" size={22} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.backBtn} onPress={() => setIsEditing(false)}>
            <AntDesign name="left" size={22} />
          </TouchableOpacity>
        )}
      </View>

      {/* CONTENT */}
      <View style={styles.content}>

        {!isEditing ? (
          <>
            {Object.entries(profile).map(([key, value]) =>
              key !== "image" ? (
                <View key={key}>
                  <Text style={styles.label}>{key}</Text>
                  <Text style={styles.value}>{value || "Not set"}</Text>
                </View>
              ) : null
            )}
          </>
        ) : (
          <>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={profile.Name} onChangeText={(t) => handleChange("Name", t)} />

            <Text style={styles.label}>Skills</Text>
            <TextInput style={styles.input} value={profile.Skills} onChangeText={(t) => handleChange("Skills", t)} />

            <Text style={styles.label}>Experience</Text>
            <TextInput style={styles.input} value={profile.experience} onChangeText={(t) => handleChange("experience", t)} />

            <Text style={styles.label}>Certificate Course</Text>
            <TextInput style={styles.input} value={profile.courseName} onChangeText={(t) => handleChange("courseName", t)} />

            <Text style={styles.label}>Certificate Date</Text>
            <TextInput style={styles.input} value={profile.certificateDate} onChangeText={(t) => handleChange("certificateDate", t)} />

            <Text style={styles.label}>Phone</Text>
            <TextInput style={styles.input} value={profile.phone} keyboardType="phone-pad" onChangeText={(t) => handleChange("phone", t)} />

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={profile.email} onChangeText={(t) => handleChange("email", t)} />

            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} value={profile.address} onChangeText={(t) => handleChange("address", t)} />

            <Text style={styles.label}>Language</Text>
            <TextInput style={styles.input} value={profile.language} onChangeText={(t) => handleChange("language", t)} />

            <Text style={styles.label}>Country</Text>
            <TextInput style={styles.input} value={profile.country} onChangeText={(t) => handleChange("country", t)} />

            <Text style={styles.label}>State</Text>
            <TextInput style={styles.input} value={profile.state} onChangeText={(t) => handleChange("state", t)} />

            <Text style={styles.label}>District</Text>
            <TextInput style={styles.input} value={profile.district} onChangeText={(t) => handleChange("district", t)} />

            <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </>
        )}

      </View>
    </ScrollView>
  );
}

// 🎨 STYLES
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },

  header: {
    height: 220,
    backgroundColor: "#5fd3c4",
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
  },

  editBtn: { position: "absolute", top: 50, right: 20 },
  backBtn: { position: "absolute", top: 50, left: 20 },

  content: { marginTop: 20, paddingHorizontal: 20 },

  label: { color: "#888", marginTop: 12, fontSize: 13 },
  value: { fontSize: 16, fontWeight: "600" },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },

  saveBtn: {
    marginTop: 25,
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  saveText: { color: "#fff", fontWeight: "700" },
});