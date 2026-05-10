import { useState } from "react";
import { Text, View, StyleSheet, Switch, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colorScheme = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(colorScheme === "dark");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const baseColor = StyleSheet.create({
    theBorder: {
      borderColor: isEnabled? "#ffffff" : "#000000"
    }
  }) 

  const switchBorder = StyleSheet.flatten([styles.switchContainer, baseColor.theBorder])
  return (
    <SafeAreaView
      style={[styles.container, isEnabled && { backgroundColor: "#000000" }]}
    >
      <View style={switchBorder}>
        <Switch
          trackColor={{ false: "#000000", true: "#ffffff" }}
          thumbColor={isEnabled ? "#000000" : "#ffffff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{ color: isEnabled ? "#fff" : "#000" }}>
          {isEnabled ? "Dark Mode" : "Light Mode"}
        </Text>
      </View>
      <View>
        <Text style={{ color: isEnabled ? "#ffffff" : "#000000" }}>hello</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.33)",
  },
  switchContainer: {
    elevation: 0,
    borderRadius: 50,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
