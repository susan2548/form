import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const OPERATIONS = [
  { key: "ADD", symbol: "+", label: "Addition", colors: ["#34D399", "#059669"] },
  { key: "SUB", symbol: "−", label: "Subtraction", colors: ["#FBBF24", "#D97706"] },
  { key: "MUL", symbol: "×", label: "Multiply", colors: ["#A78BFA", "#7C3AED"] },
  { key: "DIV", symbol: "÷", label: "Division", colors: ["#60A5FA", "#2563EB"] },
];

export default function ArithScreen() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [operation, setOperation] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  const calculate = (op: string) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setError("Please enter both numbers");
      setResult(null);
      return;
    }

    let value = 0;
    if (op === "ADD") value = a + b;
    else if (op === "SUB") value = a - b;
    else if (op === "MUL") value = a * b;
    else if (op === "DIV") {
      if (b === 0) {
        setError("Cannot divide by zero");
        setResult(null);
        return;
      }
      value = a / b;
    }

    setError("");
    setOperation(op);
    setResult(Number.isInteger(value) ? value.toString() : value.toFixed(4));
  };

  const reset = () => {
    setNum1("");
    setNum2("");
    setResult(null);
    setOperation("");
    setError("");
  };

  const activeOp = OPERATIONS.find((o) => o.key === operation);

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#4F46E5", "#6366F1"]}
        style={styles.gradientTop}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Input */}
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Ionicons name="create-outline" size={18} color="#4F46E5" />
            <Text style={styles.cardTitle}>Input Values</Text>
          </View>

          <Text style={styles.inputLabel}>FIRST NUMBER</Text>
          <TextInput
            style={[styles.input, focused === "a" && styles.inputFocus]}
            value={num1}
            onChangeText={setNum1}
            onFocus={() => setFocused("a")}
            onBlur={() => setFocused("")}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#CBD5E1"
          />

          <Text style={styles.inputLabel}>SECOND NUMBER</Text>
          <TextInput
            style={[styles.input, focused === "b" && styles.inputFocus]}
            value={num2}
            onChangeText={setNum2}
            onFocus={() => setFocused("b")}
            onBlur={() => setFocused("")}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#CBD5E1"
          />
        </View>

        {/* Operations */}
        <View style={styles.sectionHead}>
          <View style={styles.sectionBar} />
          <Text style={styles.sectionTitle}>Choose Operation</Text>
        </View>

        <View style={styles.opGrid}>
          {OPERATIONS.map((op) => (
            <Pressable
              key={op.key}
              onPress={() => calculate(op.key)}
              style={({ pressed }) => [
                styles.opWrap,
                pressed && { transform: [{ scale: 0.95 }], opacity: 0.9 },
              ]}
            >
              <LinearGradient
                colors={op.colors as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.opBtn,
                  operation === op.key && styles.opBtnActive,
                ]}
              >
                <Text style={styles.opSymbol}>{op.symbol}</Text>
                <Text style={styles.opKey}>{op.key}</Text>
                <Text style={styles.opLabel}>{op.label}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

        {/* Error */}
        {error !== "" && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={18} color="#E11D48" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Result */}
        {result !== null && activeOp && (
          <LinearGradient
            colors={activeOp.colors as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.resultCard}
          >
            <View style={styles.resultTag}>
              <Text style={styles.resultTagText}>{activeOp.label.toUpperCase()}</Text>
            </View>

            <Text style={styles.expression}>
              {num1} {activeOp.symbol} {num2}
            </Text>
            <View style={styles.equalLine} />
            <Text style={styles.resultValue}>{result}</Text>
          </LinearGradient>
        )}

        {/* Reset */}
        <Pressable
          onPress={reset}
          style={({ pressed }) => [styles.resetBtn, pressed && styles.resetPressed]}
        >
          <Ionicons name="refresh-circle" size={22} color="#4F46E5" />
          <Text style={styles.resetText}>RESET ALL</Text>
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
    height: 130,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: { padding: 18, paddingTop: 22, paddingBottom: 44 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#4F46E5",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  cardHead: { flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 18 },
  cardTitle: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
  inputLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1.2,
    marginBottom: 7,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 20,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 16,
  },
  inputFocus: {
    borderColor: "#6366F1",
    backgroundColor: "#EEF2FF",
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 26,
    marginBottom: 14,
  },
  sectionBar: {
    width: 4,
    height: 18,
    borderRadius: 2,
    backgroundColor: "#6366F1",
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
  opGrid: { flexDirection: "row", flexWrap: "wrap", gap: 11 },
  opWrap: { width: "47.3%" },
  opBtn: {
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  opBtnActive: {
    borderWidth: 3,
    borderColor: "#fff",
  },
  opSymbol: { fontSize: 30, fontWeight: "900", color: "#fff", lineHeight: 34 },
  opKey: {
    fontSize: 12,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1.5,
    marginTop: 3,
  },
  opLabel: {
    fontSize: 9,
    fontWeight: "600",
    color: "rgba(255,255,255,0.75)",
    marginTop: 1,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    backgroundColor: "#FFF1F2",
    borderLeftWidth: 4,
    borderLeftColor: "#E11D48",
    padding: 14,
    borderRadius: 12,
    marginTop: 18,
  },
  errorText: { fontSize: 13, fontWeight: "700", color: "#E11D48" },
  resultCard: {
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  resultTag: {
    backgroundColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  resultTagText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1.5,
  },
  expression: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgba(255,255,255,0.92)",
    marginTop: 14,
  },
  equalLine: {
    width: 60,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginVertical: 10,
    borderRadius: 1,
  },
  resultValue: {
    fontSize: 46,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: -1,
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
    marginTop: 22,
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