import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  const scale = useRef(new Animated.Value(1)).current;

  const pop = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.12, duration: 90, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  const increase = () => {
    setCount((c) => c + 1);
    pop();
  };
  const decrease = () => {
    setCount((c) => c - 1);
    pop();
  };
  const reset = () => {
    setCount(0);
    pop();
  };

  const tone =
    count > 0
      ? { c: "#10B981", bg: "#ECFDF5", icon: "trending-up", text: "Positive" }
      : count < 0
      ? { c: "#F43F5E", bg: "#FFF1F2", icon: "trending-down", text: "Negative" }
      : { c: "#94A3B8", bg: "#F8FAFC", icon: "ellipse-outline", text: "Neutral" };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#4F46E5", "#6366F1", "#818CF8"]}
        style={styles.gradientTop}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Main Card */}
        <View style={styles.card}>
          <View style={styles.chip}>
            <View style={styles.chipDot} />
            <Text style={styles.chipText}>LIVE COUNTER</Text>
          </View>

          <Animated.View style={[styles.ring, { transform: [{ scale }] }]}>
            <LinearGradient
              colors={["#EEF2FF", "#E0E7FF"]}
              style={styles.ringInner}
            >
              <Text style={styles.number}>{count}</Text>
            </LinearGradient>
          </Animated.View>

          <View style={[styles.badge, { backgroundColor: tone.bg }]}>
            <Ionicons name={tone.icon as any} size={15} color={tone.c} />
            <Text style={[styles.badgeText, { color: tone.c }]}>{tone.text}</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <Pressable
            onPress={decrease}
            style={({ pressed }) => [styles.btnWrap, pressed && styles.pressed]}
          >
            <LinearGradient
              colors={["#FB7185", "#E11D48"]}
              style={styles.circleBtn}
            >
              <Ionicons name="remove" size={36} color="#fff" />
            </LinearGradient>
            <Text style={styles.btnCaption}>DECREASE</Text>
          </Pressable>

          <Pressable
            onPress={increase}
            style={({ pressed }) => [styles.btnWrap, pressed && styles.pressed]}
          >
            <LinearGradient
              colors={["#34D399", "#059669"]}
              style={styles.circleBtn}
            >
              <Ionicons name="add" size={36} color="#fff" />
            </LinearGradient>
            <Text style={styles.btnCaption}>INCREASE</Text>
          </Pressable>
        </View>

        {/* Reset */}
        <Pressable
          onPress={reset}
          style={({ pressed }) => [styles.resetBtn, pressed && styles.resetPressed]}
        >
          <Ionicons name="refresh-circle" size={22} color="#4F46E5" />
          <Text style={styles.resetText}>RESET TO ZERO</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  gradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  content: { padding: 20, paddingTop: 26, paddingBottom: 40 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 26,
    paddingVertical: 30,
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  chipText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 1.5,
  },
  ring: {
    width: 190,
    height: 190,
    borderRadius: 95,
    padding: 8,
    backgroundColor: "#fff",
    marginVertical: 20,
    shadowColor: "#6366F1",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  ringInner: {
    flex: 1,
    borderRadius: 88,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#C7D2FE",
  },
  number: {
    fontSize: 62,
    fontWeight: "900",
    color: "#4338CA",
    letterSpacing: -2,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  badgeText: { fontSize: 12, fontWeight: "800", letterSpacing: 0.5 },
  btnRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginTop: 30,
  },
  btnWrap: { alignItems: "center", gap: 8 },
  pressed: { transform: [{ scale: 0.93 }], opacity: 0.85 },
  circleBtn: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  btnCaption: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1,
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E0E7FF",
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 32,
    elevation: 2,
  },
  resetPressed: { backgroundColor: "#EEF2FF", transform: [{ scale: 0.98 }] },
  resetText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#4F46E5",
    letterSpacing: 1.2,
  },
});