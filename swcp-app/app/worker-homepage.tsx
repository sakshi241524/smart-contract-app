import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

export default function ContractorHome() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  // 🔥 Hide animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 Logout Function
  const logout = async () => {
    await AsyncStorage.clear();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* ================== TOP BAR ================== */}
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>SmartConnect</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <AntDesign
              name="notification"
              size={22}
              color="#000"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <AntDesign name="menu-fold" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================== START ANIMATION ================== */}
      {showAnimation && (
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../assets/images/animations/contractor_start.json")}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
        </View>
      )}

      {/* ================== POPUP MENU ================== */}
      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View style={styles.popupMenu}>
            {/* Profile */}
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                router.push("/workerProfile"); // 🔥 Opens Profile Page
              }}
            >
              <Text style={styles.popupItem}>Profile</Text>
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                logout();
              }}
            >
              <Text style={styles.popupItem}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ================== MAIN CONTENT ================== */}
      {!showAnimation && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Stats Section */}
          <View style={styles.statsContainer}>
            {[
              { label: "All Workers", value: "0" },
              { label: "New Responses", value: "0" },
              { label: "Active Projects", value: "0" },
              { label: "Demand Forecast", value: "0" },
            ].map((item, index) => (
              <View key={index} style={styles.statBox}>
                <Text style={styles.statLabel}>{item.label}</Text>
                <Text style={styles.statValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Notifications */}
          <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
            <Text style={styles.sectionTitle}>Notifications & Alerts</Text>

            <View style={styles.notificationBox}>
              <View style={styles.redDot} />
              <Text style={{ fontSize: 14 }}>
                No new notifications available.
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* ================== BOTTOM NAV ================== */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="home" size={22} color="#1DB954" />
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="profile" size={22} color="#666" />
          <Text style={styles.navLabel}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="team" size={22} color="#666" />
          <Text style={styles.navLabel}>Workers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/workerProfile")}
        >
          <AntDesign name="user" size={22} color="#666" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  appTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#540b0e",
  },

  animationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 70,
    paddingRight: 20,
  },

  popupMenu: {
    backgroundColor: "#FFF",
    width: 160,
    borderRadius: 10,
    elevation: 5,
  },

  popupItem: {
    fontSize: 16,
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDD",
  },

  statsContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statBox: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  statLabel: {
    fontSize: 14,
    color: "#555",
  },

  statValue: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },

  notificationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },

  redDot: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 5,
    marginRight: 10,
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