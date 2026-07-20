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

const YEARS = ["1", "2", "3", "4"];

const FIELDS = [
  { key: "id", label: "STUDENT ID", icon: "card-outline", placeholder: "s6702041610231", type: "numeric" },
  { key: "name", label: "FULL NAME", icon: "person-outline", placeholder: "Supasan Anantasiri", type: "default" },
  { key: "email", label: "EMAIL ADDRESS", icon: "mail-outline", placeholder: "student@email.kmutnb.ac.th", type: "email-address" },
  { key: "phone", label: "PHONE NUMBER", icon: "call-outline", placeholder: "0812345678", type: "phone-pad" },
];

export default function FormScreen() {
  const [values, setValues] = useState<Record<string, string>>({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [year, setYear] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  const setField = (key: string, val: string) =>
    setValues((v) => ({ ...v, [key]: val }));

  const filled = Object.values(values).filter((v) => v !== "").length + (year ? 1 : 0);
  const progress = (filled / 5) * 100;

  const submit = () => {
    if (Object.values(values).some((v) => !v) || !year) {
      setError("Please complete all required fields");
      setSubmitted(false);
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const reset = () => {
    setValues({ id: "", name: "", email: "", phone: "" });
    setYear("");
    setSubmitted(false);
    setError("");
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <LinearGradient
          colors={["#4F46E5", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroIcon}>
            <Ionicons name="school" size={28} color="#fff" />
          </View>
          <Text style={styles.heroTitle}>Student Registration</Text>
          <Text style={styles.heroSub}>Computer Education Department</Text>

          {/* Progress */}
          <View style={styles.progressWrap}>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{filled}/5</Text>
          </View>
        </LinearGradient>

        {/* Form */}
        <View style={styles.card}>
          {FIELDS.map((f) => (
            <View key={f.key}>
              <View style={styles.labelRow}>
                <Ionicons name={f.icon as any} size={13} color="#6366F1" />
                <Text style={styles.inputLabel}>{f.label}</Text>
              </View>
              <TextInput
                style={[styles.input, focused === f.key && styles.inputFocus]}
                value={values[f.key]}
                onChangeText={(t) => setField(f.key, t)}
                onFocus={() => setFocused(f.key)}
                onBlur={() => setFocused("")}
                placeholder={f.placeholder}
                placeholderTextColor="#CBD5E1"
                keyboardType={f.type as any}
                autoCapitalize={f.key === "email" ? "none" : "sentences"}
              />
            </View>
          ))}

          <View style={styles.labelRow}>
            <Ionicons name="layers-outline" size={13} color="#6366F1" />
            <Text style={styles.inputLabel}>YEAR OF STUDY</Text>
          </View>
          <View style={styles.yearRow}>
            {YEARS.map((y) => (
              <Pressable
                key={y}
                onPress={() => setYear(y)}
                style={({ pressed }) => [
                  styles.yearBtn,
                  year === y && styles.yearBtnActive,
                  pressed && { transform: [{ scale: 0.95 }] },
                ]}
              >
                <Text style={[styles.yearText, year === y && styles.yearTextActive]}>
                  {y}
                </Text>
                <Text style={[styles.yearSub, year === y && styles.yearSubActive]}>
                  YEAR
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Error */}
        {error !== "" && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={18} color="#E11D48" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Submit */}
        <Pressable
          onPress={submit}
          style={({ pressed }) => [pressed && { transform: [{ scale: 0.98 }] }]}
        >
          <LinearGradient
            colors={["#4F46E5", "#7C3AED"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitBtn}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.submitText}>SUBMIT REGISTRATION</Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={reset}
          style={({ pressed }) => [styles.resetBtn, pressed && styles.resetPressed]}
        >
          <Ionicons name="refresh-circle" size={22} color="#4F46E5" />
          <Text style={styles.resetText}>RESET FORM</Text>
        </Pressable>

        {/* Result */}
        {submitted && (
          <View style={styles.resultCard}>
            <LinearGradient
              colors={["#10B981", "#059669"]}
              style={styles.successHead}
            >
              <Ionicons name="checkmark-done-circle" size={24} color="#fff" />
              <Text style={styles.successText}>Registration Complete</Text>
            </LinearGradient>

            <View style={styles.resultBody}>
              <ResultRow icon="card-outline" label="Student ID" value={values.id} />
              <ResultRow icon="person-outline" label="Full Name" value={values.name} />
              <ResultRow icon="mail-outline" label="Email" value={values.email} />
              <ResultRow icon="call-outline" label="Phone" value={values.phone} />
              <ResultRow icon="layers-outline" label="Year" value={`Year ${year}`} last />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function ResultRow({
  icon,
  label,
  value,
  last,
}: {
  icon: string;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.resultRow, !last && styles.resultRowBorder]}>
      <View style={styles.resultIcon}>
        <Ionicons name={icon as any} size={15} color="#6366F1" />
      </View>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 18, paddingTop: 18, paddingBottom: 44 },
  hero: {
    borderRadius: 24,
    alignItems: "center",
    paddingVertical: 26,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#4F46E5",
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heroTitle: { fontSize: 19, fontWeight: "900", color: "#fff", letterSpacing: 0.2 },
  heroSub: { fontSize: 12, color: "#DDD6FE", marginTop: 4, fontWeight: "600" },
  progressWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 18,
    width: "100%",
  },
  progressBg: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#fff", borderRadius: 3 },
  progressText: { fontSize: 11, fontWeight: "800", color: "#fff" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#4F46E5",
    shadowOpacity: 0.13,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },
  labelRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 7 },
  inputLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1.2,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  inputFocus: { borderColor: "#6366F1", backgroundColor: "#EEF2FF" },
  yearRow: { flexDirection: "row", gap: 10 },
  yearBtn: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 12,
  },
  yearBtnActive: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
    shadowColor: "#6366F1",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  yearText: { fontSize: 20, fontWeight: "900", color: "#64748B" },
  yearTextActive: { color: "#fff" },
  yearSub: {
    fontSize: 8,
    fontWeight: "800",
    color: "#CBD5E1",
    letterSpacing: 1,
  },
  yearSubActive: { color: "rgba(255,255,255,0.8)" },
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
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 16,
    paddingVertical: 17,
    marginTop: 20,
    shadowColor: "#4F46E5",
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },
  submitText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#fff",
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
    paddingVertical: 15,
    marginTop: 11,
  },
  resetPressed: { backgroundColor: "#EEF2FF", transform: [{ scale: 0.98 }] },
  resetText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#4F46E5",
    letterSpacing: 1.2,
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    marginTop: 22,
    overflow: "hidden",
    shadowColor: "#10B981",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },
  successHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingVertical: 16,
  },
  successText: { fontSize: 15, fontWeight: "900", color: "#fff", letterSpacing: 0.3 },
  resultBody: { padding: 18 },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 11,
  },
  resultRowBorder: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  resultIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  resultLabel: { fontSize: 11, fontWeight: "800", color: "#94A3B8", width: 72 },
  resultValue: { flex: 1, fontSize: 13, fontWeight: "800", color: "#1E293B" },
});