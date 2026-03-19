import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from 'lottie-react-native';

export default function ContractorHome() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  const [workers, setWorkers] = useState([
    { id: 1, name: "John Smith", profession: "Plumber" },
    { id: 2, name: "Sarah Johnson", profession: "Electrician" },
    { id: 3, name: "Mike Davis", profession: "Carpenter" },
  ]);

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

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>SmartConnect</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <AntDesign name="notification" size={22} style={{ marginRight: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <AntDesign name="menu-fold" size={24} />
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
      <Modal transparent visible={menuVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
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

      {/* MAIN CONTENT */}
      {!showAnimation && (
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

          {/* STATS */}
          <View style={styles.statsContainer}>
            {[
              { label: "All Workers" },
              { label: "New Responses" },
              { label: "Active Projects" },
              { label: "Demand Forecast" },
            ].map((item, i) => (
              <View key={i} style={styles.statBox}>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* SUGGESTED WORKERS */}
          <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
            <Text style={styles.sectionTitle}>Suggested Workers</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {workers.map((worker) => (
                <View key={worker.id} style={styles.workerCard}>
                  <View style={styles.workerAvatar} />
                  <Text style={styles.workerName}>{worker.name}</Text>
                  <Text style={styles.workerTag}>{worker.profession}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* POST JOB BUTTON */}
          <View style={styles.postJobContainer}>
            <TouchableOpacity
              style={styles.postJobBtn}
              onPress={() => router.push("/postjob")}
            >
              <Text style={styles.postJobText}>Post Job</Text>
            </TouchableOpacity>
          </View>

          {/* NOTIFICATIONS */}
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={styles.sectionTitle}>Notifications & Alerts</Text>
          </View>

        </ScrollView>
      )}

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="home" size={22} color="#83c5be" />
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
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff',
    zIndex: 1,
  },

  modalBackground: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: 70,
    paddingRight: 20,
  },

  popupMenu: {
    backgroundColor: '#fff',
    width: 150,
    borderRadius: 10,
    elevation: 5,
  },

  popupItem: {
    fontSize: 18,
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },

  statsContainer: {
    marginTop: 20,
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

  statLabel: { fontSize: 14, color: "#555" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

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

  /* ✅ FIXED BUTTON */
  postJobContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
  },

  postJobBtn: {
    backgroundColor: "#83c5be",
    paddingVertical: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    elevation: 4,
  },

  postJobText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  bottomNav: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
  },

  navItem: { alignItems: "center" },

  navLabel: {
    fontSize: 12,
    marginTop: 2,
    color: "#444",
  },
});