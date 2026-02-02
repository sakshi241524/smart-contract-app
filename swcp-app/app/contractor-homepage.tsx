import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from 'lottie-react-native';

export default function ContractorHome() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    router.replace("/"); 
  };

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.appTitle}>SmartConnect</Text>
        </View>

        {/* Right Side: Notification + Menu */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          
          {/* Notification Button */}
          <TouchableOpacity onPress={() => console.log("Notifications")}>
            <AntDesign
              name="notification"
              size={22}
              color="#000"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>

          {/* Menu Button */}
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <AntDesign name="menu-fold" size={24} color="#000" />
          </TouchableOpacity>

        </View>
      </View>

      {/* ANIMATION */}
      {showAnimation && (
        <View style={styles.animationContainer}>
          <LottieView 
            source={require('../assets/images/animations/contractor_start.json')}
            autoPlay 
            loop 
            style={{ width: 350, height: 350 }} 
          />
        </View>
      )}

      {/* MENU */}
      <Modal transparent={true} visible={menuVisible} animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPressOut={() => setMenuVisible(false)}>
          <View style={styles.popupMenu}>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.popupItem}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
              <Text style={styles.popupItem}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {!showAnimation && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

          {/* STATS */}
          <View style={styles.statsContainer}>
            {[
              { label: "Available Workers", value: "" },
              { label: "New Responses", value: "" },
              { label: "Active Projects", value: "" },
              { label: "Demand Forecast", value: "" },
            ].map((item, i) => (
              <View key={i} style={styles.statBox}>
                <Text style={styles.statLabel}>{item.label}</Text>
                <Text style={styles.statValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* SUGGESTED WORKERS */}
          <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
            <Text style={styles.sectionTitle}>Suggested Workers</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {["", "", ""].map((name, i) => (
                <View key={i} style={styles.workerCard}>
                  <View style={styles.workerAvatar} />
                  <Text style={styles.workerName}>{name}</Text>
                  <Text style={styles.workerTag}></Text>
                  <Text style={styles.workerRating}></Text>
                </View>
              ))}
            </View>
          </View>

          {/* NOTIFICATIONS */}
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={styles.sectionTitle}>Notifications & Alerts</Text>

            {/* Empty notifications list */}
            {[].map((note, i) => (
              <View key={i} style={styles.notificationBox}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: i === 0 ? "red" : "green",
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontSize: 14 }}>{note}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="home" size={22} color="#1DB954" />
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
          <AntDesign name="user" size={22} color="#666" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: 50 },


  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  appTitle: {
    fontSize: 20,
    fontWeight: "700",
    color:"#540b0e"
  },

  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 1
  },

  modalBackground: { 
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'flex-end', 
    paddingTop: 70, 
    paddingRight: 20 
  },

  popupMenu: { 
    backgroundColor: '#FFF', 
    width: 150, 
    paddingVertical: 10,
    borderRadius: 10, 
    elevation: 5 
  },

  popupItem: { 
    fontSize: 18, 
    padding: 12, 
    borderBottomWidth: 0.5, 
    borderBottomColor: '#DDD' 
  },

  postJobBtn: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25
  },

  postJobText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700"
  },

  statsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
sectionTitle: {
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 10,
  color: "#333",
},
  statBox: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  statLabel: { fontSize: 14, color: "#555" },
  statValue: { fontSize: 22, fontWeight: "700", marginTop: 5 },

  workerCard: {
    width: "32%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    elevation: 3,
    alignItems: "center",
  },

  workerAvatar: {
    width: 55,
    height: 55,
    backgroundColor: "#eee",
    borderRadius: 30,
    marginBottom: 5,
  },

  workerName: { fontWeight: "700", fontSize: 14 },
  workerTag: { fontSize: 12, color: "#999" },
  workerRating: { fontSize: 12, color: "#444", marginTop: 4 },

  notificationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  bottomNav: {
    width: "100%",
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
  },

  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },

  navLabel: {
    fontSize: 12,
    marginTop: 2,
    color: "#444",
  },
});
