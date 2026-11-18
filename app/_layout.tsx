import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { colors } from "../styles/style";

export default function RootLayout() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/");
      } else {
        router.replace("/login");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.onPrimary,
        }}
      >
        <Stack.Screen name="index" options={{ title: "My Plants" }} />
        <Stack.Screen name="details" options={{ title: "Details" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="add" options={{ title: "Add Plant" }} />
      </Stack>
    </PaperProvider>
  );
}
