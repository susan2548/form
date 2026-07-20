import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6366F1",
        tabBarInactiveTintColor: "#A5B4CB",
        headerStyle: {
          backgroundColor: "#4F46E5",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "800", fontSize: 19, letterSpacing: 0.3 },
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
          elevation: 20,
          shadowColor: "#4F46E5",
          shadowOpacity: 0.12,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: -4 },
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700", letterSpacing: 0.2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Counter",
          tabBarLabel: "Counter",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "stopwatch" : "stopwatch-outline"}
              size={size + 2}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="arith"
        options={{
          title: "Arithmetic",
          tabBarLabel: "Arith",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calculator" : "calculator-outline"}
              size={size + 2}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="form"
        options={{
          title: "CED Form",
          tabBarLabel: "CED Form",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={size + 2}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}