import * as React from "react";
import HomeScreen from "./routes/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import registerNNPushToken from "native-notify";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreAllLogs();
  registerNNPushToken(22761, "ec7mjQoE4RdofW06bQj1bp");

  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}
