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
  name: string;
  department: string;
  phone: string;
  email: string;
  image: string;
};

export default function WorkerProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<ProfileType>({
    name: "",
    department: "",
    phone: "",
    email: "",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  });

  // ✅ LOAD DATA
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) {
          const parsed = JSON.parse(data);
          setProfile((prev) => ({
            ...prev,
            ...parsed,
          }));
        }
      } catch (error) {
        console.log("Error loading user data", error);
      }
    };

    loadUserData();
  }, []);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (key: keyof ProfileType, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ PICK IMAGE + SAVE IMMEDIATELY
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;

        const updatedProfile = {
          ...profile,
          image: imageUri,
        };

        setProfile(updatedProfile);

        // ✅ SAVE IMAGE INSTANTLY
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify(updatedProfile)
        );
      }
    } catch (error) {
      console.log("Image pick error:", error);
    }
  };

  // ✅ SAVE PROFILE
  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(profile));
      setIsEditing(false);
    } catch (error) {
      console.log("Error saving profile", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        
        {/* PROFILE IMAGE */}
        <TouchableOpacity disabled={!isEditing} onPress={pickImage}>
          <Image
            source={{ uri: profile.image }}
            style={styles.avatar}
            key={profile.image} // ✅ FORCE REFRESH
          />
        </TouchableOpacity>

        {/* EDIT BUTTON */}
        {!isEditing && (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setIsEditing(true)}
          >
            <AntDesign name="edit" size={22} color="#000" />
          </TouchableOpacity>
        )}

        {/* BACK BUTTON */}
        {isEditing && (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setIsEditing(false)}
          >
            <AntDesign name="left" size={22} color="#000" />
          </TouchableOpacity>
        )}

        {/* TEXT */}
        {isEditing && (
          <Text style={{ marginTop: 8, fontSize: 12 }}>
            Tap image to change
          </Text>
        )}
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {!isEditing ? (
          <>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{profile.name || "Not set"}</Text>

            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>
              {profile.department || "Not set"}
            </Text>

            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{profile.phone || "Not set"}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{profile.email || "Not set"}</Text>
          </>
        ) : (
          <>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={profile.name}
              onChangeText={(text) => handleChange("name", text)}
            />

            <Text style={styles.label}>Department</Text>
            <TextInput
              style={styles.input}
              value={profile.department}
              onChangeText={(text) => handleChange("department", text)}
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={profile.phone}
              keyboardType="phone-pad"
              onChangeText={(text) => handleChange("phone", text)}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={profile.email}
              keyboardType="email-address"
              onChangeText={(text) => handleChange("email", text)}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

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

  editBtn: {
    position: "absolute",
    top: 50,
    right: 20,
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
  },

  content: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  label: {
    color: "#888",
    marginTop: 15,
    fontSize: 13,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
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

  saveText: {
    color: "#fff",
    fontWeight: "700",
  },
});